const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const bcrypt = require("bcrypt");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");

// Admin Type definition
const AdminType = new GraphQLObjectType({
  name: "Admin",
  description: "This represents an admin object",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Root Query and Mutation definitions
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // GET ADMIN BY ID
    admin: {
      type: AdminType,
      description: "A Single Admin",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Admin.findById(args.id);
      },
    },

    // GET ALL ADMINS
    admins: {
      type: new GraphQLList(AdminType),
      description: "List of All Nurses",
      resolve: async () => {
        return await Admin.find();
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // ADD ADMIN
    addAdmin: {
      type: AdminType,
      description: "Add a new admin",
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          console.log("Admin req...");
          const existingAdmin = await Admin.findOne({ email: args.email });

          if (existingAdmin) {
            throw new Error("This admin already exists!");
          }
          const admin = new Admin(args);
          const createdAdmin = await admin.save();

          if (!createdAdmin) {
            throw new Error("Error creating admin!");
          }

          const user = new User({
            roleId: 0,
            email: args.email,
            password: createdAdmin.password,
          });

          const savedUser = await user.save();

          if (!savedUser) {
            throw new Error("Error creating user!");
          }

          return createdAdmin;
        } catch (error) {
          throw new Error(`Failed to add admin: ${error.message}`);
        }
      },
    },

    // UPDATE NURSE
    updateAdmin: {
      type: AdminType,
      description: "Update an admin",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const existingAdmin = await Admin.findById(args.id);

          if (!existingAdmin) {
            throw new Error("This admin does not exist!");
          }

          if (args.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(args.password, salt);
            args.password = hashedPassword;
          }

          const updatedAdmin = await Admin.findByIdAndUpdate(
            args.id,
            { $set: args },
            { new: true }
          );

          if (!updatedAdmin) {
            throw new Error("Error Updating Admin!");
          }

          const updatedUser = await User.findOneAndUpdate(
            { email: args.email },
            { $set: { password: args.password } },
            { new: true }
          );

          if (!updatedUser) {
            throw new Error("Error Updating User!");
          }

          return updatedAdmin;
        } catch (error) {
          throw new Error(`Failed to update admin: ${error.message}`);
        }
      },
    },

    // DELETE NURSE
    deleteAdmin: {
      type: AdminType,
      description: "Delete admin",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await Admin.findByIdAndDelete(args.id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
