import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

const TablePagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  let [p1, setP1] = useState(0);
  let [p2, setP2] = useState(1);

  return (
    <>
      <Pagination style={{ fontSize: "14px" }}>
        <Pagination.Prev
          style={{ fontSize: "14px" }}
          disabled={p2 == 1 ? true : false}
          className="page-action"
          onClick={() => {
            setP1(p1 - 1);
            setP2(p2 - 1);
            paginate(p2 - 1);
          }}
        >
          Previous
        </Pagination.Prev>
        {pageNumbers.slice(p1, p2).map((number, id) => {
          return (
            <Pagination.Item
              style={{ fontSize: "14px" }}
              key={id}
              className="page-items"
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          style={{ fontSize: "14px" }}
          className="page-action"
          disabled={p2 == pageNumbers.length ? true : false}
          onClick={() => {
            setP1(p1 + 1);
            setP2(p2 + 1);
            paginate(p2 + 1);
          }}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </>
  );
};
export default TablePagination;
