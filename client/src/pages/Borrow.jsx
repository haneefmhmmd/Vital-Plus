import { useState } from "react";
import { v4 as uuid } from "uuid";
import FormModal from "../components/FormModal";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import {
  borrowBooksFormModal,
  publisherFormModal,
} from "../utils/formModal.util";
import {
  convertBorrowedBooksDataToTableData,
  convertPublishersDataToTableData,
} from "../utils/tableDataConverter.util";
import { useFetch } from "../utils/useFetch";

export default function Borrow() {
  const [formData, setFormData] = useState(null);
  const [loadBorrowedBooks, setLoadBorrowedBooks] = useState(false);
  const { isLoading, response, error } = useFetch(
    "http://localhost:8084/api/books/borrow-history",
    {},
    convertBorrowedBooksDataToTableData,
    [loadBorrowedBooks]
  );

  const openFormModal = () => {
    const booksFetchReq = fetch("http://localhost:8084/api/books").then((res) =>
      res.json()
    );
    const publishersFetchReq = fetch("http://localhost:8084/api/members").then(
      (res) => res.json()
    );

    Promise.all([booksFetchReq, publishersFetchReq]).then(
      ([books, members]) => {
        const formModalData = {};
        formModalData.title = "Borrow Book";
        formModalData.url = `http://localhost:8084/api/books/borrow`;
        formModalData.method = "POST";
        formModalData.fields = borrowBooksFormModal(books, members);
        setFormData(formModalData);
      }
    );
  };

  const returnBtnHandler = (borrowingId) => {
    fetch(`http://localhost:8084/api/books/return/${borrowingId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoadBorrowedBooks(uuid());
        }
      });
  };

  const closeFormModal = () => {
    setFormData(null);
  };

  const saveBtnHandler = () => {
    setFormData(null);
    setLoadBorrowedBooks(uuid());
  };

  return (
    <>
      <PageHeader data={headerData} addBtnHandler={openFormModal} />
      {error && "Error occurred loading books"}
      {!isLoading && !error && (
        <Table
          headers={tableHeaders}
          data={response}
          editBtnHandler={returnBtnHandler}
          editBtnLabel="Return"
          hasDeleteBtn={false}
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
  title: "Borrow Book",
  desc: "To borrow and return books as well as view borrowed books.",
  cta: "Borrow Book",
};

const tableHeaders = [
  "Id",
  "Book Id",
  "MemberId",
  "Issue Date",
  "Return Date",
  "Due Date",
];
