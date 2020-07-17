import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Container, Button,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MdAccessAlarms } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";

import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineVideoCamera,
} from "react-icons/ai";

import * as courseService from "../../services/courseService";

const CourseDetails = (props) => {

  const id = props.match.params.id;
  const [courseDetails, setCourse] = useState({});
  let [enrolled, setEnrolled] = useState(false);
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState(0)
  const [img, setImg] = useState("")

  const handleClose = () => setShow(false);
  const handleSave = () => {
    props.onSpinner(true)
    courseService.removeCourse(deletedId).then(({ data }) => {
    setShow(false);
      props.onSpinner(false)
      props.history.replace("/manage");
    })
  }
  const handleDelete = (id) => {
    setShow(true);
    setDeletedId(id)
  }
  useEffect(() => {
    props.onSpinner(true)
    window.scrollTo(0,0)
    courseService.getCourseById(id).then(({ data }) => {
      setCourse(data.course);
      setEnrolled(data.enrolled)
      // setImg(data.img)
      props.onSpinner(false)
    })

  }, [id]);

  const handleEnrolledClick = () => {
    setEnrolled(!enrolled)
    courseService.enrollOrUnenroll(courseDetails._id)
      .then(({ data }) => {

      }).catch((err) => {
        console.log(err)
      })

  }
  return (
    !props.spinner&&
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Confirmation message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalText">Are you sure you want to delete that {props.courses ? "course" : "category"}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                    </Button>
          <Button variant="primary" onClick={handleSave}>
            Delete
                    </Button>
        </Modal.Footer>
      </Modal>

      {!props.spinner&&<Container>
        <div className="course">
          <Row>
            <Col sm={9}>
              <div className="course__intro">
                <h1 className="course__heading">{courseDetails?.title}</h1>

                <div className="course__data">


                  <div className="course__info">
                    <div className="course__info-icon">
                      <FiBookmark />
                    </div>
                    <div className="course__data-info">
                      <span className="course__data-title">Category</span>
                      <p className="course__data-name">
                        {courseDetails.categoryId?.title}
                      </p>
                    </div>
                  </div>

                  <div className="course__feedback">
                    <div>
                      <span className="course__feedback-stars">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                        <AiOutlineStar />
                      </span>
                      4.3
                    </div>
                  </div>
                </div>
              </div>
              <div className="course__details">
                <div className="course__details-info">
                  <img
                    className="course__details-img"
                    src={courseDetails?.img}
                    alt="Course"
                  />
                  <p className="course__details-desc">
                    {courseDetails.description}
                  </p>
                </div>
                {localStorage.getItem("UserType") === "admin" && <div className="course__details-inf">
                  <h2 className="course__details-title">Materials</h2>
                  <ul className="course__details-list">
                    {courseDetails.materials?.map((material) => (
                      <li key={material._id}>{material.title}<div>{material.link}</div></li>
                    ))}
                  </ul>
                </div>}
              </div>

            </Col>
            <Col sm={3}>
              <div className="course__features">

                {localStorage.getItem("UserType") === "user" ?
                  (courseDetails.payment === 0 ?
                    <Button onClick={handleEnrolledClick} className={`btn btn--full btn--upper enrolled`}>
                      {enrolled ? "Enrolled" : "Enroll now"}
                    </Button> :
                    <Link className="btn btn--secondary btn--full btn--upper" to={`/courses/${id}/paymentform`}>
                      Buy Course
                    <span className="course__features-pounds"> &nbsp; ${courseDetails.payment}</span>
                    </Link>)
                  :
                  (localStorage.getItem("UserType") === "admin" &&

                    <div>
                      <Link to={`/courses/${courseDetails._id}/edit`} type="button" className="btn btn-outline-info courseCrud__delete">Edit Course</Link>
                      <button type="button" onClick={()=>handleDelete(courseDetails._id)} className="btn btn-outline-warning courseCrud__edit">Delete Course</button>
                    </div>
                  )

                }


                <ul className="list--none course__features-list">
                  <li className="course__features-item">
                    Duration: {courseDetails.duration} hours
                    <span className="course__features-icon">
                      <MdAccessAlarms />
                    </span>
                  </li>

                  <li className="course__features-item">
                    Videos: {courseDetails.materials?.length} Viedos
                    <span className="course__features-icon">
                      <AiOutlineVideoCamera />
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    }
    </React.Fragment>
  );
};

export default CourseDetails;
