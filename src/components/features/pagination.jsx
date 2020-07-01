import React,{useState,useEffect} from "react";
import { Pagination } from "react-bootstrap";
import { number } from "joi";

const PaginationList = (props) => {
  let elements = [];
  for (let i = 1; i <= Math.ceil(props.coursesCount / props.pageSize); i++) {
    elements.push(i);
  }
  useEffect(()=>{
    setActivePage(props.activePage)
  },[props.activePage])
  const [activePage,setActivePage]=useState(props.activePage)
  return (
    <Pagination>
      {props.activePage === 1 ? (
        <Pagination.Prev disabled />
      ) : (
        <Pagination.Prev
          onClick={() =>
            props.handlePageClick(+props.activePage - 1)
          }
        />
      )}

      {elements.map((element) => (
      
        <Pagination.Item 
        key={element}
        onClick={() =>{ props.handlePageClick(element);setActivePage(element)}}
        >
        {console.log("element",element,"activePage",activePage)
        }
          {element}
        </Pagination.Item>
      ))}

      {props.activePage === elements.length ? (
        <Pagination.Next disabled />
      ) : (
        <Pagination.Next
          onClick={() =>
            props.handlePageClick(+props.activePage )
          }
        />
      )}
    </Pagination>
  );
};

export default PaginationList;