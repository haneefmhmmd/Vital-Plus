const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const bcrypt = require("bcrypt");
const Nurse = require("../models/nurse.model");
const { createToken } = require("../middlewares/utils");

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
          return await nurse.save();
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
        if (args.password) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(args.password, salt);
          args.password = hashedPassword;
        }

        return await Nurse.findByIdAndUpdate(
          args.id,
          { $set: args },
          { new: true }
        );
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

    // NURSE LOGIN
    nurseLogin: {
      type: LoginResponseType,
      description: "Login for a nurse",
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const { email, password } = args;

          const nurse = await Nurse.findOne({ email });

          if (!nurse) {
            throw new Error("Nurse not found!");
          }

          const passwordMatch = await bcrypt.compare(password, nurse.password);

          if (!passwordMatch) {
            throw new Error("Invalid password!");
          }

          // Generate token
          const token = createToken(nurse._id);

          return { nurse, token };
        } catch (error) {
          throw new Error(`Nurse login failed: ${error.message}`);
        }
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
