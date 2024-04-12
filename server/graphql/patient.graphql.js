const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const bcrypt = require("bcrypt");
const Patient = require("../models/patient.model");
const { createToken } = require("../middlewares/utils");

// Employee Type definition
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

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    patient: { type: PatientType },
    token: { type: GraphQLString },
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
      resolve: async (parent, args) => {
        return await Patient.findById(args.id);
      },
    },

    // GET ALL PATIENTS
    patients: {
      type: new GraphQLList(PatientType),
      description: "List of All Patients",
      resolve: async () => {
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
      resolve: async (parent, args) => {
        try {
          const existingPatient = await Patient.findOne({ email: args.email });

          if (existingPatient) {
            throw new Error("This patient already exists!");
          }
          const patient = new Patient(args);
          return await patient.save();
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
      resolve: async (parent, args) => {
        if (args.password) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(args.password, salt);
          args.password = hashedPassword;
        }

        return await Patient.findByIdAndUpdate(
          args.id,
          { $set: args },
          { new: true }
        );
      },
    },

    // DELETE PATIENT
    deletePatient: {
      type: PatientType,
      description: "Delete a patient",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Patient.findByIdAndDelete(args.id);
      },
    },

    // LOGIN
    login: {
      type: LoginResponseType,
      description: "Login for a patient",
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const { email, password } = args;

          const patient = await Patient.findOne({ email });

          if (!patient) {
            throw new Error("Patient not found!");
          }

          const passwordMatch = await bcrypt.compare(
            password,
            patient.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid password!");
          }

          // Generate token
          const token = createToken(patient._id);

          return { patient, token };
        } catch (error) {
          throw new Error(`Login failed: ${error.message}`);
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
