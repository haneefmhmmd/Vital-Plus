require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { stitchSchemas } = require("@graphql-tools/stitch");
const { graphqlHTTP } = require("express-graphql");

const patientSchema = require("./graphql/patient.graphql");
const vitalSchema = require("./graphql/vital.graphql");
const nurseSchema = require("./graphql/nurse.graphql");
const adminSchema = require("./graphql/admin.graphql");
const authSchema = require("./graphql/auth.graphql");
const consultationSchema = require("./graphql/consultation.graphql");

mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: "VitalPlus",
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB : ", err);
    process.exit();
  });

app.use(
  cors({
    origin: "*",
  })
);

const contextMiddleware = (req, res, next) => {
  req.context = { req, res };
  next();
};

const stitchedSchema = stitchSchemas({
  subschemas: [
    { schema: patientSchema },
    { schema: vitalSchema },
    { schema: nurseSchema },
    { schema: adminSchema },
    { schema: authSchema },
    { schema: consultationSchema },
  ],
});

app.use(contextMiddleware);

app.use(
  "/vitalplus",
  graphqlHTTP((req) => ({
    schema: stitchedSchema,
    graphiql: true,
    context: req.context,
  }))
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port : http://localhost:${process.env.PORT}`
  );
  console.log(`VitalPlus @ http://localhost:${process.env.PORT}/vitalplus`);
});
