const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const bcrypt = require("bcrypt");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");
const { verifyAccessToken } = require("../middlewares/utils");

// Patient Type definition
const PatientType = new GraphQLObjectType({
  name: "patient",
  description: "This represents a patient object",
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
    image: { type: GraphQLNonNull(GraphQLString) },
    emergencyContactName: { type: GraphQLNonNull(GraphQLString) },
    emergencyContactNumber: { type: GraphQLNonNull(GraphQLString) },
    emergencyContactRelationship: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET PATIENT BY ID
    patient: {
      type: PatientType,
      description: "A Single Patient",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId !== 0 || decodedToken.roleId !== 1) {
          throw new AuthenticationError(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Patient.findById(args.id);
      },
    },

    // GET ALL PATIENTS
    patients: {
      type: new GraphQLList(PatientType),
      description: "List of All Patients",
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId !== 0 || decodedToken.roleId !== 1) {
          throw new AuthenticationError(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Patient.find();
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // ADD PATIENT
    addPatient: {
      type: PatientType,
      description: "Add a new patient",
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
        image: { type: GraphQLNonNull(GraphQLString) },
        emergencyContactName: { type: GraphQLNonNull(GraphQLString) },
        emergencyContactNumber: { type: GraphQLNonNull(GraphQLString) },
        emergencyContactRelationship: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId !== 0 || decodedToken.roleId !== 1) {
            throw new AuthenticationError(
              "Access denied! You are not authorized to access this resource"
            );
          }

          const existingPatient = await Patient.findOne({ email: args.email });

          if (existingPatient) {
            throw new Error("This patient already exists!");
          }

          const patient = new Patient(args);
          const createdPatient = await patient.save();

          if (!createdPatient) {
            throw new Error("Error creating patient!");
          }

          const user = new User({
            roleId: 2,
            email: args.email,
            password: createdPatient.password,
          });

          const savedUser = await user.save();

          if (!savedUser) {
            throw new Error("Error creating user!");
          }

          return createdPatient;
        } catch (error) {
          throw new Error(`Failed to add patient: ${error.message}`);
        }
      },
    },

    // UPDATE PATIENT
    updatePatient: {
      type: PatientType,
      description: "Update a patient",
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
        emergencyContactName: { type: GraphQLString },
        emergencyContactNumber: { type: GraphQLString },
        emergencyContactRelationship: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (
            decodedToken.roleId !== 0 ||
            decodedToken.roleId !== 1 ||
            decodedToken.roleId !== 2
          ) {
            throw new AuthenticationError(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const existingPatient = await Patient.findById(args.id);

          if (!existingPatient) {
            throw new Error("This patient does not exist!");
          }

          if (args.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(args.password, salt);
            args.password = hashedPassword;
          }

          const updatedPatient = await Patient.findByIdAndUpdate(
            args.id,
            { $set: args },
            { new: true }
          );

          if (!updatedPatient) {
            throw new Error("Error Updating Patient!");
          }

          const updatedUser = await User.findOneAndUpdate(
            { email: args.email },
            { $set: { password: args.password } },
            { new: true }
          );

          if (!updatedUser) {
            throw new Error("Error Updating User!");
          }
          return updatedPatient;
        } catch (error) {
          throw new Error(`Failed to update nurse: ${error.message}`);
        }
      },
    },

    // DELETE PATIENT
    deletePatient: {
      type: PatientType,
      description: "Delete a patient",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId !== 0 || decodedToken.roleId !== 1) {
          throw new AuthenticationError(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Patient.findByIdAndDelete(args.id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
