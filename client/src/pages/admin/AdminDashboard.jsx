import React from "react";

import { useQuery } from "@apollo/client";
import Button from "../../components/Button";
import { GET_ADMIN_BY_ID, GET_ALL_NURSES } from "../../config/apollo-client";
import useAuth from "../../utils/useAuth";
import Photo from "../../assets/img/admin.jpg"

export default function AdminDashboard() {
  const { user } = useAuth();

  const admin = useQuery(GET_ADMIN_BY_ID, {
    variables: { id: user.entityId },
  });

  const getAllNurses = useQuery(GET_ALL_NURSES);

  if (admin.loading || getAllNurses.loading) {
    return <div>Loading data...</div>;
  }

  if (getAllNurses.error) {
    return <div>Error loading all nurse data!!</div>;
  }

  if (admin.error) {
    return <div>Error loading admin data!!</div>;
  }

  const adminResponse = admin.data.admin;

  const nursesResponse = getAllNurses.data.nurses;

  return (
    <section>
      <header className="dashboard-header">
        <div className="header__left">
          <img
            className="profile-img"
            src={Photo}
            alt={`Profile image of ${Photo}`}
          />
          <div className="header__info">
            <h1 className="title">
              {adminResponse.firstName} {adminResponse.lastName}
            </h1>
            <p>
              {adminResponse.email}
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
        <h2 className="sub-title">All Nurses</h2>

        <div className="rounded shadow-sm p-2 bg-white table-responsive mt-3">
          <table className="table table-borderless table-hover align-middle">
            <thead>
              <tr className="border-bottom">
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {nursesResponse.map((nurse) => (
                <tr key={nurse.id}>
                  <td>{nurse.firstName} {nurse.lastName}</td>
                  <td>{nurse.dateOfBirth}</td>
                  <td>{nurse.email}</td>
                  <td>{nurse.phoneNumber}</td>
                  <td>{nurse.address} {nurse.postalCode}. {nurse.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
