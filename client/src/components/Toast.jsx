import React from "react";

export default function Toast({ message, isErrorToast = true }) {
  const handleToastClose = (e) => {
    e.currentTarget.closest(".toast").remove();
  };

  return (
    message && (
      <div
        className={`toast align-items-center text-white ${
          isErrorToast ? "bg-danger" : "bg-success"
        } border-0 d-block`}
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={handleToastClose}
          ></button>
        </div>
      </div>
    )
  );
}
