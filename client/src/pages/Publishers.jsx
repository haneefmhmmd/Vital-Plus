import { useState } from "react";
import { v4 as uuid } from "uuid";
import FormModal from "../components/FormModal";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { publisherFormModal } from "../utils/formModal.util";
import { convertPublishersDataToTableData } from "../utils/tableDataConverter.util";
import { useFetch } from "../utils/useFetch";

export default function Publishers() {
  const [formData, setFormData] = useState(null);
  const [loadPublishers, setLoadPublishers] = useState(false);
  const { isLoading, response, error } = useFetch(
    "http://localhost:8084/api/publishers",
    {},
    convertPublishersDataToTableData,
    [loadPublishers]
  );

  const openFormModal = () => {
    const formModalData = {};
    formModalData.title = "Add Publisher";
    formModalData.url = `http://localhost:8084/api/publishers`;
    formModalData.method = "POST";
    formModalData.fields = publisherFormModal();
    setFormData(formModalData);
  };

  const openEditFormModal = (publisherId) => {
    fetch(`http://localhost:8084/api/publishers/${publisherId}`)
      .then((res) => res.json())
      .then((data) => {
        const formModalData = {};
        formModalData.title = "Edit Publisher";
        formModalData.url = `http://localhost:8084/api/publishers/${publisherId}`;
        formModalData.method = "PUT";
        formModalData.fields = publisherFormModal(data);
        setFormData(formModalData);
      });
  };

  const closeFormModal = () => {
    setFormData(null);
  };

  const saveBtnHandler = () => {
    setFormData(null);
    setLoadPublishers(uuid());
  };

  const deleteBtnHandler = (publisherId) => {
    fetch(`http://localhost:8084/api/publishers/${publisherId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoadPublishers(uuid());
        }
      });
  };

  return (
    <>
      <PageHeader data={headerData} addBtnHandler={openFormModal} />
      {error && "Error occurred loading books"}
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
  title: "Publishers",
  desc: "To create a publisher and view the publisher list",
  cta: "Add Publisher",
};

const tableHeaders = ["Publisher Id", "Name", "Address"];
