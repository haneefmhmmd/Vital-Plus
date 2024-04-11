import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import FormModal from "../components/FormModal";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { bookFormModal } from "../utils/formModal.util";
import { convertBooksDataToTableData } from "../utils/tableDataConverter.util";
import { useFetch } from "../utils/useFetch";
export default function Books() {
  const [formData, setFormData] = useState(null);
  const [loadBooks, setLoadBooks] = useState(false);
  const { isLoading, response, error } = useFetch(
    "http://localhost:8084/api/books",
    {},
    convertBooksDataToTableData,
    [loadBooks]
  );

  const closeFormModal = () => {
    setFormData(null);
  };

  const openFormModal = () => {
    fetch("http://localhost:8084/api/publishers")
      .then((res) => res.json())
      .then((publishers) => {
        const formModalData = {};
        formModalData.title = "Add Book";
        formModalData.url = `http://localhost:8084/api/books`;
        formModalData.method = "POST";
        formModalData.fields = bookFormModal({}, publishers);
        setFormData(formModalData);
      });
  };

  const addBookHandler = () => {
    setFormData(null);
    setLoadBooks(uuid());
  };

  const openEditFormModal = (bookId) => {
    const fetchBookReq = fetch(
      `http://localhost:8084/api/books/${bookId}`
    ).then((res) => res.json());
    const fetchPublishersReq = fetch(
      "http://localhost:8084/api/publishers"
    ).then((res) => res.json());

    Promise.all([fetchBookReq, fetchPublishersReq]).then(
      ([book, publishers]) => {
        const formModalData = {};
        formModalData.title = "Edit Book";
        formModalData.url = `http://localhost:8084/api/books/${bookId}`;
        formModalData.method = "PUT";
        formModalData.fields = bookFormModal(book, publishers);
        setFormData(formModalData);
      }
    );
  };

  const deleteBtnHandler = (bookId) => {
    fetch(`http://localhost:8084/api/books/${bookId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoadBooks(uuid());
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
          saveBtnHandler={addBookHandler}
        />
      )}
    </>
  );
}

const headerData = {
  title: "Books",
  desc: "To create a book and view the books list",
  cta: "Add Book",
};
const tableHeaders = [
  "Book Id",
  "Title",
  "Price",
  "Availability",
  "Author",
  "Publisher",
];
