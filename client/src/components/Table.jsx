import React from "react";

export default function Table({
  headers,
  data,
  editBtnHandler,
  deleteBtnHandler,
  editBtnLabel = "Edit",
  deleteBtnLabel = "Delete",
  hasEditBtn = true,
  hasDeleteBtn = true,
}) {
  const Row = ({ rowData }) => {
    return rowData.map((data, id) => (
      <td key={`rowdata-${data}-${id}`}>
        {Array.isArray(data) ? data.join(",") : data}
      </td>
    ));
  };

  return (
    <div className="rounded shadow-sm p-2 bg-white table-responsive">
      <table className="table table-borderless table-hover m-0  align-middle">
        <thead>
          <tr className="border-bottom">
            {headers.map((header, id) => (
              <th scope="col" key={`header-${id}`}>
                {header}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, id) => (
            <tr key={`row-${id}`}>
              <Row rowData={row} key={`row-${id}`} />
              <td>
                {hasEditBtn && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => editBtnHandler(row[0])}
                  >
                    {editBtnLabel}
                  </button>
                )}
                {hasDeleteBtn && (
                  <button
                    type="button"
                    className="ms-2 btn btn-danger btn-sm"
                    onClick={() => deleteBtnHandler(row[0])}
                  >
                    {deleteBtnLabel}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
