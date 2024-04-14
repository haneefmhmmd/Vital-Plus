import React from "react";

import { useQuery } from "@apollo/client";
import Button from "../../components/Button";
import { GET_PATIENT_BY_ID } from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_PATIENT_BY_ID, {
    variables: { id: user.entityId },
  });

  if (loading) {
    return <div>Loading Patient data...</div>;
  }

  if (error) {
    return <div>Error loading patient data!!</div>;
  }

  return (
    <section>
      <header className="dashboard-header">
        <div className="header__left">
          <img
            className="profile-img"
            src={data.patient.image}
            alt={`Profile image of ${data.patient.firstName}`}
          />
          <div className="header__info">
            <h1 className="title">
              {data.patient.firstName} {data.patient.lastName}
            </h1>
            <p>
              {data.patient.email} | {data.patient.phoneNumber}
            </p>
          </div>
        </div>
        <div className="header__right">
          <Button
            variant="secondary"
            label="Add Vitals"
            elementType="link"
            href="/add-vital"
          />
        </div>
      </header>
      <div className="mt-4">
        <h2 className="sub-title">Your Consultations...</h2>
      </div>
    </section>
  );
}
