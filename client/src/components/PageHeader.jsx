import React from "react";

export default function PageHeader({ data, addBtnHandler }) {
  return (
    <header className="page-header">
      <div className="page-info">
        <h1 className="m-0">{data.title}</h1>
        <p>{data.desc}</p>
      </div>
      <div className="action-items">
        <button
          type="button"
          className="btn btn-success"
          onClick={addBtnHandler}
        >
          {data.cta}
        </button>
      </div>
    </header>
  );
}
