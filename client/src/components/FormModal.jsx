import React, { useState } from "react";

const createFormDataModel = (fields) => {
  const formModel = {};
  fields.forEach((field) => {
    formModel[field.name] = field.value;
  });
  return formModel;
};

export default function FormModal({
  data,
  closeHandler,
  saveBtnHandler,
  isUpdate = false,
}) {
  const [formData, setFormData] = useState(createFormDataModel(data.fields));
  const [toastMsg, setToastMsg] = useState(null);
  const onInputChange = (e, field) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSaveBtnClick = (e) => {
    e.preventDefault();
    let isFormValid = true;

    for (const key in formData) {
      if (formData[key] === "") {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid) {
      fetch(data.url, {
        method: data.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.message) {
            saveBtnHandler();
          } else {
            displayToast(data.message || "Error while saving data!");
          }
        })
        .catch((data) => {
          displayToast(data.message);
        });
    } else {
      displayToast("All input fields must be filled!");
    }
  };

  const displayToast = (message) => {
    setToastMsg(message);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  return (
    <div
      className="modal"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title title" id="exampleModalLabel">
              {data.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeHandler}
            />
          </div>
          <div className="modal-body">
            {toastMsg && (
              <div
                className="toast align-items-center text-white bg-danger border-0 show"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="d-flex">
                  <div className="toast-body">{toastMsg}</div>
                </div>
              </div>
            )}
            <form>
              {data.fields.map((field, id) => (
                <div className="mb-2" key={`${field}-${id}`}>
                  <label htmlFor={field.name} className="form-label mb-1">
                    {field.label}
                  </label>
                  {field.type !== "select" && (
                    <input
                      type={field.type}
                      className="form-control form-control-sm"
                      id={field.name}
                      onChange={onInputChange}
                      value={formData[field.name]}
                      required
                    />
                  )}
                  {field.type == "select" && (
                    <select
                      className="form-select form-select-sm"
                      id={field.name}
                      onChange={onInputChange}
                      value={formData[field.name]}
                    >
                      <option className="d-none"></option>
                      {field.options.map((option) => (
                        <option value={option.value} key={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-danger"
              data-bs-dismiss="modal"
              onClick={closeHandler}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={onSaveBtnClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
