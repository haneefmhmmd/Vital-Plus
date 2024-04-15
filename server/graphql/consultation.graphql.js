const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const Consultation = require("../models/consultation.model");
const Patient = require("../models/patient.model");
const { verifyAccessToken } = require("../middlewares/utils");

// Consultation Type definition
const consultationType = new GraphQLObjectType({
  name: "consultationType",
  description: "This represents a consultation object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    patient: { type: GraphQLNonNull(GraphQLString) },
    nurse: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    possibleDiagnosis: { type: GraphQLNonNull(GraphQLString) },
    suggestions: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET ALL CONSULTATIONS BY PATIENT ID
    getConsultationsByPatientId: {
      type: new GraphQLList(consultationType),
      description: "Consultations of patients",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId !== 0 && decodedToken.roleId !== 1) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Consultation.find({ patient: args.patientId });
      },
    },

    // GET ALL CONSULTATIONS BY NURSE ID
    getConsultationsByNurseId: {
      type: new GraphQLList(consultationType),
      description: "Consultations of nurses",
      args: {
        nurseId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId !== 0 && decodedToken.roleId !== 1) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Consultation.find({ nurse: args.nurseId });
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // PLACE CONSULTATION
    addConsultation: {
      type: consultationType,
      description: "Add a new consultation",
      args: {
        patient: { type: GraphQLNonNull(GraphQLString) },
        nurse: { type: GraphQLNonNull(GraphQLString) },
        possibleDiagnosis: { type: GraphQLNonNull(GraphQLString) },
        suggestions: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId !== 0 && decodedToken.roleId !== 1) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }

          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const date = `${year}-${month}-${day}`;

          const measurementsWithDate = args.measurements.map((measurement) => ({
            ...measurement,
            date: date,
          }));

          const consultation = new Consultation(args);
          const createdConsultation = await consultation.save();

          if (!createdConsultation) {
            throw new Error("Error creating patient!");
          }

          return createdConsultation;
        } catch (error) {
          console.log(error);
          throw new Error(`Failed to add consultation: ${error.message}`);
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
