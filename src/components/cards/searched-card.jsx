import React from "react";
import { Link } from "react-router-dom";

const SearchedCard = (props) => {
  return (
    <React.Fragment>
      <Link to={`/courses/${props.data._id}/details`}>

      <div className="search-card">
        <div className="row">
          <div >
            <img className="search-img" src={props.data?.img} alt="" />
          </div>
          <div className="col">
            <h6 className="search-name">{props.data[props.searchBy]}</h6>
           <p className="search-job">{props.data?.categoryId?.title}</p>
          </div>
        </div>
      </div>
      </Link>

    </React.Fragment>
  );
}

export default SearchedCard;