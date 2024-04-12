require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const patientSchema = require("./graphql/patient.graphql");
const vitalSchema = require("./graphql/vital.graphql");
const nurseSchema = require("./graphql/nurse.graphql");

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

app.use(
  "/patient",
  expressGraphQL({
    schema: patientSchema,
    graphiql: true,
  })
);

app.use(
  "/vital",
  expressGraphQL({
    schema: vitalSchema,
    graphiql: true,
  })
);

app.use(
  "/nurse",
  expressGraphQL({
    schema: nurseSchema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port : http://localhost:${process.env.PORT}`
  );
  console.log(`Patient @ http://localhost:${process.env.PORT}/patient`);
  console.log(`Vital @ http://localhost:${process.env.PORT}/vital`);
  console.log(`Nurse @ http://localhost:${process.env.PORT}/nurse`);
});
