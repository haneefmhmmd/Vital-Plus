import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { ADD_VITAL, GET_PATIENTS_BY_NURSE_ID } from "../config/apollo-client";
import useAuth from "../utils/useAuth";

export default function AddPatient() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { user } = useAuth();

  const patientsQuery = useQuery(GET_PATIENTS_BY_NURSE_ID, {
    variables: { id: user.entityId },
  });

  const [mutateFunction] = useMutation(ADD_VITAL);

  const onSubmit = async (data) => {
    try {
      data.bodyTemperature = parseFloat(data.bodyTemperature);
      data.bodyPressure = parseFloat(data.bodyPressure);
      data.respiratoryRate = parseFloat(data.respiratoryRate);
      data.weight = parseFloat(data.weight);

      if (!data.id) {
        data.id = user.entityId;
      }

      const symptomsArray = data.symptoms
        .split(",")
        .map((symptom) => symptom.trim());

      const newData = { ...data, symptoms: symptomsArray };

      const response = await mutateFunction({ variables: newData });

      if (response) {
        alert("Vital added succesfully!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const SelectPatient = () => {
    return patientsQuery.loading ? (
      <p>Loading...</p>
    ) : patientsQuery.error ? (
      <p>Error loading patients</p>
    ) : (
      <div className="input-wrapper">
        <label className="input-label" htmlFor="id">
          Select Patient:
        </label>
        <select className="input" {...register("id")} id="id">
          {patientsQuery.data.getPatientsByNurseId.patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="title">New Vital Measurements</h1>
      </header>
      <div className="page__body">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {(user.roleId == 0 || user.roleId == 1) && <SelectPatient />}
          {fields.map((field, index) => (
            <div className="input-wrapper" key={index}>
              <label className="input-label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                className="input"
                {...register(field.name, field.validators)}
                id={field.name}
                type={field.type}
              />
              {errors[field.name] && (
                <p className="input-errpr" role="alert">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          <Button label="Add Vital" type="submit" />
        </form>
      </div>
    </div>
  );
}

const fields = [
  {
    label: "Body Temperature",
    type: "number",
    name: "bodyTemperature",
    validators: { required: "Body temperature is required" },
  },
  {
    label: "Body Pressure",
    type: "number",
    name: "bodyPressure",
    validators: { required: "Body pressure is required" },
  },
  {
    label: "Respiratory Rate",
    type: "number",
    name: "respiratoryRate",
    validators: { required: "Respiratory rate is required" },
  },
  {
    label: "Weight",
    type: "number",
    name: "weight",
    validators: { required: "Weight is required" },
  },
  {
    label: "Symptoms",
    type: "text",
    name: "symptoms",
    placeholder: "For now, seperate by ,",
    validators: { required: "Symptoms are required" },
  },
];
