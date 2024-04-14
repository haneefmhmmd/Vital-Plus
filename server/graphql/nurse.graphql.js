const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const bcrypt = require("bcrypt");
const Nurse = require("../models/nurse.model");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");
const { verifyAccessToken } = require("../middlewares/utils");

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
    patients: { type: GraphQLList(GraphQLString) },
  }),
});

// Patient Type definition
const PatientType = new GraphQLObjectType({
  name: "patient",
  description: "This represents a patient object",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
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

const NursePatientsResponseType = new GraphQLObjectType({
  name: "NursePatientResponse",
  fields: () => ({
    patients: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(PatientType))),
    },
  }),
});

const NursePatientCountResponseType = new GraphQLObjectType({
  name: "NursePatientCountResponse",
  description: "Count of patients associated with a nurse",
  fields: () => ({
    count: { type: GraphQLNonNull(GraphQLInt) },
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
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId == 2) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }

        return await Nurse.findById(args.id);
      },
    },

    // GET ALL NURSES
    nurses: {
      type: new GraphQLList(NurseType),
      description: "List of All Nurses",
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId == 2) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }
        return await Nurse.find();
      },
    },

    // GET PATIENTS BY NURSE ID
    getPatientsByNurseId: {
      type: NursePatientsResponseType,
      description: "Get Patients by Nurse ID",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const nurseDetails = await Nurse.findById(args.id);

          if (!nurseDetails) {
            throw new Error("Nurse not found!");
          }

          const patientIds = nurseDetails.patients;

          const patientsDetails = await Promise.all(
            patientIds.map(async (patientId) => {
              const patientDetails = await Patient.findById(patientId);

              if (!patientDetails) {
                throw new Error(`Patient with ID ${patientId} not found!`);
              }

              return {
                ...patientDetails.toObject(),
                id: patientDetails._id.toString(),
              };
            })
          );

          return { patients: patientsDetails };
        } catch (error) {
          throw new Error(
            `Error getting patients by nurse ID: ${error.message}`
          );
        }
      },
    },

    //GET PATIENT COUNT BY NURSE ID
    getPatientCountByNurseId: {
      type: NursePatientCountResponseType,
      description: "Get Patient Count by Nurse ID",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
          const nurseDetails = await Nurse.findById(args.id);

          if (!nurseDetails) {
            throw new Error("Nurse not found!");
          }

          const patientCount = nurseDetails.patients.length;

          return { count: patientCount };
        } catch (error) {
          throw new Error(
            `Error getting patient count by nurse ID: ${error.message}`
          );
        }
      },
    },

    // GET LAST ADDED PATIENT
    getLastAddedPatient: {
      type: PatientType,
      description: "Get the last added patient",
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }

          const lastAddedPatient = await Patient.findOne().sort({
            createdAt: -1,
          });

          if (!lastAddedPatient) {
            throw new Error("No patients found!");
          }

          return lastAddedPatient;
        } catch (error) {
          throw new Error(
            `Error getting the last added patient: ${error.message}`
          );
        }
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
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
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
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
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
      resolve: async (parent, args, context) => {
        const decodedToken = verifyAccessToken(context);

        if (decodedToken.roleId == 2) {
          throw new Error(
            "Access denied! You are not authorized to access this resource"
          );
        }
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
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
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
      resolve: async (parent, args, context) => {
        try {
          const decodedToken = verifyAccessToken(context);

          if (decodedToken.roleId == 2) {
            throw new Error(
              "Access denied! You are not authorized to access this resource"
            );
          }
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
