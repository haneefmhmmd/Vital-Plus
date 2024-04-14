const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
} = require("graphql");

const Vital = require("../models/vital.model");
const { verifyAccessToken } = require("../middlewares/utils");

const MeasurementInputType = new GraphQLInputObjectType({
  name: "measurements",
  description: "This represents a vital measurement object",
  fields: () => ({
    bodyTemperature: { type: GraphQLNonNull(GraphQLFloat) },
    bodyPressure: { type: GraphQLNonNull(GraphQLFloat) },
    respiratoryRate: { type: GraphQLNonNull(GraphQLFloat) },
    weight: { type: GraphQLNonNull(GraphQLFloat) },
    symptoms: { type: GraphQLList(GraphQLString) },
  }),
});

const MeasurementType = new GraphQLObjectType({
  name: "Measurement",
  description: "This represents a vital measurement object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    date: { type: GraphQLString },
    bodyTemperature: { type: GraphQLNonNull(GraphQLFloat) },
    bodyPressure: { type: GraphQLNonNull(GraphQLFloat) },
    respiratoryRate: { type: GraphQLNonNull(GraphQLFloat) },
    weight: { type: GraphQLNonNull(GraphQLFloat) },
    symptoms: { type: GraphQLList(GraphQLString) },
  }),
});

// Vital Type definition
const VitalType = new GraphQLObjectType({
  name: "Vital",
  description: "This represents a vital object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    patient: { type: GraphQLNonNull(GraphQLID) },
    measurements: {
      type: GraphQLList(GraphQLNonNull(MeasurementType)),
    },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET VITAL BY PATIENT ID
    vitalByPatientId: {
      type: GraphQLList(VitalType),
      description: "List of vitals for a patient",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (
          decodedToken.roleId !== 0 &&
          decodedToken.roleId !== 1 &&
          decodedToken.roleId !== 2
        ) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Vital.find({ patient: args.patientId });
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // ADD VITAL
    addVital: {
      type: VitalType,
      description: "Add a new vital",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLID) },
        measurements: {
          type: GraphQLList(MeasurementInputType),
        },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (
            decodedToken.roleId !== 0 &&
            decodedToken.roleId !== 1 &&
            decodedToken.roleId !== 2
          ) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const checkVitalExist = await Vital.findOne({
            patient: args.patientId,
          });

          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const date = `${year}-${month}-${day}`;

          const measurementsWithDate = args.measurements.map((measurement) => ({
            ...measurement,
            date: date,
          }));

          if (!checkVitalExist) {
            const vital = new Vital({
              patient: args.patientId,
              measurements: measurementsWithDate,
            });
            return await vital.save();
          }

          checkVitalExist.measurements.push(...measurementsWithDate);
          await checkVitalExist.save();
          return checkVitalExist;
        } catch (error) {
          throw new Error(`Failed to add vital: ${error.message}`);
        }
      },
    },

    // UPDATE MEASUREMENT
    updateMeasurement: {
      type: VitalType,
      description:
        "Update a measurement on a given vital ID with measurement ID",
      args: {
        vitalId: { type: GraphQLNonNull(GraphQLID) },
        measurementId: { type: GraphQLNonNull(GraphQLID) },
        measurement: { type: GraphQLNonNull(MeasurementInputType) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (
            decodedToken.roleId !== 0 &&
            decodedToken.roleId !== 1 &&
            decodedToken.roleId !== 2
          ) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const vital = await Vital.findById(args.vitalId);
          if (!vital) {
            throw new Error("Vital not found");
          }
          const measurementIndex = vital.measurements.findIndex(
            (measurement) => measurement.id === args.measurementId
          );
          if (measurementIndex === -1) {
            throw new Error("Measurement not found");
          }
          vital.measurements[measurementIndex] = args.measurement;
          await vital.save();
          return vital;
        } catch (error) {
          throw new Error(error);
        }
      },
    },

    // DELETE VITAL
    deleteVital: {
      type: VitalType,
      description: "Delete vital measurements for a given patient",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (
            decodedToken.roleId !== 0 &&
            decodedToken.roleId !== 1 &&
            decodedToken.roleId !== 2
          ) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const vital = await Vital.findOneAndDelete({
            patient: args.patientId,
          });
          if (!vital) {
            throw new Error("Vital not found");
          }
          return vital;
        } catch (error) {
          throw new Error(`Failed to delete vital: ${error.message}`);
        }
      },
    },

    // DELETE MEASUREMENT
    deleteMeasurement: {
      type: VitalType,
      description: "Delete a measurement for a given patient",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLID) },
        measurementId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (
            decodedToken.roleId !== 0 ||
            decodedToken.roleId !== 1 ||
            decodedToken.roleId !== 2
          ) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const vital = await Vital.findOne({ patient: args.patientId });
          if (!vital) {
            throw new Error("Vital not found");
          }
          vital.measurements = vital.measurements.filter(
            (measurement) => measurement.id !== args.measurementId
          );
          await vital.save();
          return vital;
        } catch (error) {
          throw new Error(error);
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
