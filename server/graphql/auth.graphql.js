const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const Nurse = require("../models/nurse.model");
const { createToken } = require("../middlewares/utils");

const LoginType = new GraphQLObjectType({
  name: "LoginType",
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    roleId: { type: GraphQLInt },
  }),
});

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    userId: { type: GraphQLString },
    roleId: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    entityId: { type: GraphQLString },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET ALL PATIENTS
    logins: {
      type: new GraphQLList(LoginType),
      description: "List of All Users",
      resolve: async () => {
        return await User.find();
      },
    },

    // GET PATIENT BY ID
    login: {
      type: LoginType,
      description: "A Single Users",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await User.findById(args.id);

        return await User.findById(args.id);
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // LOGIN
    login: {
      type: LoginResponseType,
      description: "Login for a patient",
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const checkUser = await User.findOne({ email: args.email });

          if (!checkUser) {
            throw new Error("User not found!");
          }

          const user = await User.login(args.email, args.password);

          const token = createToken(user._id, user.roleId, user.email);

          context.res.set("Authorization", `Bearer ${token}`);

          context.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
          });

          return {
            userId: user._id,
            roleId: user.roleId,
            email: args.email,
            token,
          };
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
