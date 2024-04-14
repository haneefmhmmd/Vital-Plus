import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Button from "../components/Button";
import {
  GET_NURSE_BY_ID,
  GET_PATIENT_BY_ID,
  UPDATE_NURSE_BY_ID,
  UPDATE_PATIENT_BY_ID,
} from "../config/apollo-client";
import useAuth from "../utils/useAuth";

export default function ManageAccount() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useAuth();
  const [isPatient, setIsPatient] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useQuery(user.roleId == 1 ? GET_NURSE_BY_ID : GET_PATIENT_BY_ID, {
    variables: { id: user.entityId },
  });

  const [updateUserMutation] = useMutation(
    user.roleId == 1 ? UPDATE_NURSE_BY_ID : UPDATE_PATIENT_BY_ID
  );

  useEffect(() => {
    if (userData && user.roleId == 1) {
      setUserDetails(fieldsWithData(userData.nurse));
      console.log(fieldsWithData(userData.nurse));
    } else if (userData && user.roleId == 2) {
      console.log(user.roleId);
      setUserDetails(fieldsWithData(userData.patient, true));
      console.log(fieldsWithData(userData.patient));
    }
  }, [loading]);

  const onSubmit = async (data) => {
    try {
      data.id = user.entityId;
      const { data: responseData } = await updateUserMutation({
        variables: data,
      });
      if (responseData) {
        handleRefetch();
      }
      console.log("Details updated successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRefetch = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        console.log("Query refetched successfully");
      }
    } catch (error) {
      console.error("Error refetching query:", error);
    }
  };

  if (loading) {
    return <div>Loading patient details...</div>;
  }
  if (error) {
    return <div>Error while loading patient details...</div>;
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1 className="title">Manage Account</h1>
      </header>
      <div className="page__body">
        {userDetails && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {userDetails.map((field, index) => (
              <div className="input-wrapper" key={index}>
                <label className="input-label" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  className="input"
                  {...register(field.name, field.validators)}
                  id={field.name}
                  type={field.type}
                  defaultValue={field.value}
                />
                {errors[field.name] && (
                  <p className="input-error" role="alert">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
            <Button label="Save" type="submit" />
          </form>
        )}
      </div>
    </section>
  );
}

const fieldsWithData = (data, isPatient = false) => {
  const fields = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      value: data.firstName,
      validators: { required: "First Name is required" },
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      value: data.lastName,
      validators: { required: "Last Name is required" },
    },
    {
      label: "Date of Birth",
      type: "date",
      name: "dateOfBirth",
      value: data.dateOfBirth,
      validators: { required: "Date of Birth is required" },
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: data.email,
      validators: { required: "Email is required" },
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: data.password,
      validators: { required: "Password is required" },
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNumber",
      value: data.phoneNumber,
      validators: { required: "Phone Number is required" },
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      value: data.address,
      validators: { required: "Address is required" },
    },
    {
      label: "Postal Code",
      type: "text",
      name: "postalCode",
      value: data.postalCode,
      validators: { required: "Postal Code is required" },
    },
    {
      label: "Country",
      type: "text",
      name: "country",
      value: data.country,
      validators: { required: "Country is required" },
    },
    {
      label: "Image",
      type: "text",
      name: "image",
      value: data.image,
      validators: { required: "Image is required" },
    },
  ];

  if (!isPatient) {
    return fields;
  }
  const additionalPatientFields = [
    {
      label: "Emergency Contact Name",
      type: "text",
      name: "emergencyContactName",
      value: data.emergencyContactName,
      validators: { required: "Emergency Contact Name is required" },
    },
    {
      label: "Emergency Contact Number",
      type: "text",
      name: "emergencyContactNumber",
      value: data.emergencyContactNumber,
      validators: { required: "Emergency Contact Number is required" },
    },
    {
      label: "Emergency Contact Relationship",
      type: "text",
      name: "emergencyContactRelationship",
      value: data.emergencyContactRelationship,
      validators: { required: "Emergency Contact Relationship is required" },
    },
  ];

  return [...fields, ...additionalPatientFields];
};
