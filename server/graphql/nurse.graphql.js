const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const bcrypt = require("bcrypt");
const Nurse = require("../models/nurse.model");
const User = require("../models/user.model");

// Nurse Type definition
const NurseType = new GraphQLObjectType({
  name: "Nurse",
  description: "This represents a nurse object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    postalCode: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    patients: { type: GraphQLList(GraphQLString) }, // Assuming patients are stored as an array of patientIds
  }),
});

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    nurse: { type: NurseType },
    token: { type: GraphQLString },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET NURSE BY ID
    nurse: {
      type: NurseType,
      description: "A Single Nurse",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Nurse.findById(args.id);
      },
    },

    // GET ALL NURSES
    nurses: {
      type: new GraphQLList(NurseType),
      description: "List of All Nurses",
      resolve: async () => {
        return await Nurse.find();
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // ADD NURSE
    addNurse: {
      type: NurseType,
      description: "Add a new nurse",
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        postalCode: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        patients: { type: GraphQLList(GraphQLString) }, // Assuming patients are stored as an array of patientIds
      },
      resolve: async (parent, args) => {
        try {
          const existingNurse = await Nurse.findOne({ email: args.email });

          if (existingNurse) {
            throw new Error("This nurse already exists!");
          }
          const nurse = new Nurse(args);
          const createdNurse = await nurse.save();

          if (!createdNurse) {
            throw new Error("Error creating nurse!");
          }

          const user = new User({
            roleId: 1,
            email: args.email,
            password: createdNurse.password,
          });

          const savedUser = await user.save();

          if (!savedUser) {
            throw new Error("Error creating user!");
          }

          return createdNurse;
        } catch (error) {
          throw new Error(`Failed to add nurse: ${error.message}`);
        }
      },
    },

    // UPDATE NURSE
    updateNurse: {
      type: NurseType,
      description: "Update a nurse",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        country: { type: GraphQLString },
        image: { type: GraphQLString },
        patients: { type: GraphQLList(GraphQLString) }, // Assuming patients are stored as an array of patientIds
      },
      resolve: async (parent, args) => {
        try {
          const existingNurse = await Nurse.findById(args.id);

          if (!existingNurse) {
            throw new Error("This nurse does not exist!");
          }

          if (args.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(args.password, salt);
            args.password = hashedPassword;
          }

          const updatedNurse = await Nurse.findByIdAndUpdate(
            args.id,
            { $set: args },
            { new: true }
          );

          if (!updatedNurse) {
            throw new Error("Error Updating Nurse!");
          }

          const updatedUser = await User.findOneAndUpdate(
            { email: args.email },
            { $set: { password: args.password } },
            { new: true }
          );

          if (!updatedUser) {
            throw new Error("Error Updating User!");
          }

          return updatedNurse;
        } catch (error) {
          throw new Error(`Failed to update nurse: ${error.message}`);
        }
      },
    },

    // DELETE NURSE
    deleteNurse: {
      type: NurseType,
      description: "Delete a nurse",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Nurse.findByIdAndDelete(args.id);
      },
    },

    // ADD PATIENTS TO NURSE
    addPatientsToNurse: {
      type: NurseType,
      description: "Add patients to a nurse",
      args: {
        nurseId: { type: GraphQLNonNull(GraphQLString) },
        patientIds: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
      },
      resolve: async (parent, args) => {
        try {
          const { nurseId, patientIds } = args;

          const nurse = await Nurse.findById(nurseId);

          if (!nurse) {
            throw new Error("Nurse not found!");
          }

          nurse.patients.push(...patientIds);
          await nurse.save();

          return nurse;
        } catch (error) {
          throw new Error(`Failed to add patients to nurse: ${error.message}`);
        }
      },
    },

    // DELETE PATIENTS
    deletePatientsFromNurse: {
      type: NurseType,
      description: "Delete patients from a nurse",
      args: {
        nurseId: { type: GraphQLNonNull(GraphQLString) },
        patientIds: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
      },
      resolve: async (parent, args) => {
        try {
          const { nurseId, patientIds } = args;

          const nurse = await Nurse.findById(nurseId);

          if (!nurse) {
            throw new Error("Nurse not found!");
          }

          nurse.patients = nurse.patients.filter(
            (patientId) => !patientIds.includes(patientId)
          );
          await nurse.save();

          return nurse;
        } catch (error) {
          throw new Error(
            `Failed to delete patients from nurse: ${error.message}`
          );
        }
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
