import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import {
  ADD_PATIENT,
  ASSIGN_PATIENT_TO_NURSE,
} from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";
export default function AddPatient() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useAuth();
  const [patientId, setPatientId] = useState(null);
  const [mutateFunction] = useMutation(ADD_PATIENT);
  const [assignPatientMutateFunc] = useMutation(ASSIGN_PATIENT_TO_NURSE);
  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await mutateFunction({ variables: data });
      setPatientId(responseData.addPatient.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePatientAssignment = async () => {
    try {
      const { data } = await assignPatientMutateFunc({
        variables: { nurseId: user.entityId, patientId: [patientId] },
      });
      if (data) {
        setPatientId(null);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              {...register(field.name, field.validators)}
              id={field.name}
              type={field.type}
            />
            {errors[field.name] && (
              <p role="alert">{errors[field.name].message}</p>
            )}
          </div>
        ))}
        <Button label="Add Patient" type="submit" />
      </form>
      <Button
        label="Assign Patient to Self"
        onClick={handlePatientAssignment}
        isDisabled={patientId === null}
      />
    </div>
  );
}

const fields = [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    validators: { required: "First Name is required" },
  },
  {
    label: "Last Name",
    type: "text",
    name: "lastName",
    validators: { required: "Last Name is required" },
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dateOfBirth",
    validators: { required: "Date of Birth is required" },
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    validators: { required: "Email is required" },
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    validators: { required: "Password is required" },
  },
  {
    label: "Phone Number",
    type: "text",
    name: "phoneNumber",
    validators: { required: "Phone Number is required" },
  },
  {
    label: "Address",
    type: "text",
    name: "address",
    validators: { required: "Address is required" },
  },
  {
    label: "Postal Code",
    type: "text",
    name: "postalCode",
    validators: { required: "Postal Code is required" },
  },
  {
    label: "Country",
    type: "text",
    name: "country",
    validators: { required: "Country is required" },
  },
  {
    label: "Image",
    type: "text",
    name: "image",
    validators: { required: "Image is required" },
  },
  {
    label: "Emergency Contact Name",
    type: "text",
    name: "emergencyContactName",
    validators: { required: "Emergency Contact Name is required" },
  },
  {
    label: "Emergency Contact Number",
    type: "text",
    name: "emergencyContactNumber",
    validators: { required: "Emergency Contact Number is required" },
  },
  {
    label: "Emergency Contact Relationship",
    type: "text",
    name: "emergencyContactRelationship",
    validators: { required: "Emergency Contact Relationship is required" },
  },
];
