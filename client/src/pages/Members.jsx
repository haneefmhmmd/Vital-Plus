import { useState } from "react";
import { v4 as uuid } from "uuid";
import FormModal from "../components/FormModal";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { memberFormModal } from "../utils/formModal.util";
import { convertMembersDataToTableData } from "../utils/tableDataConverter.util";
import { useFetch } from "../utils/useFetch";
export default function Members() {
  const [formData, setFormData] = useState(null);
  const [loadMembers, setLoadMembers] = useState(false);
  const { isLoading, response, error } = useFetch(
    "http://localhost:8084/api/members",
    {},
    convertMembersDataToTableData,
    [loadMembers]
  );
  const openFormModal = () => {
    const formModalData = {};
    formModalData.title = "Add Member";
    formModalData.url = `http://localhost:8084/api/members`;
    formModalData.method = "POST";
    formModalData.fields = memberFormModal();
    setFormData(formModalData);
  };

  const openEditFormModal = (memberId) => {
    fetch(`http://localhost:8084/api/members/${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        const formModalData = {};
        formModalData.title = "Edit Member";
        formModalData.url = `http://localhost:8084/api/members/${memberId}`;
        formModalData.method = "PUT";
        formModalData.fields = memberFormModal(data);
        setFormData(formModalData);
      });
  };

  const closeFormModal = () => {
    setFormData(null);
  };

  const saveBtnHandler = () => {
    setFormData(null);
    setLoadMembers(uuid());
  };

  const deleteBtnHandler = (memberId) => {
    console.log("deleting...");
    fetch(`http://localhost:8084/api/members/${memberId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoadMembers(uuid());
        }
      });
  };

  return (
    <>
      <PageHeader data={headerData} addBtnHandler={openFormModal} />
      {!isLoading && !error && (
        <Table
          headers={tableHeaders}
          data={response}
          editBtnHandler={openEditFormModal}
          deleteBtnHandler={deleteBtnHandler}
        />
      )}
      {formData && (
        <FormModal
          data={formData}
          closeHandler={closeFormModal}
          saveBtnHandler={saveBtnHandler}
        />
      )}
    </>
  );
}

const headerData = {
  title: "Members",
  desc: "To create a member and view the members list",
  cta: "Add Member",
};

const tableHeaders = [
  "Member Id",
  "Name",
  "Address",
  "Member Type",
  "Member Date",
  "Expiry Date",
];
