import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import * as userService from '../../services/userService';


import {
  AiFillStar,
  AiOutlineStar,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";

const CourseCard = props => {

  const { path, course } = props;
  const stars = [1, 2, 3, 4];
  const handleClaimRewards = () => {
    userService.getProfile().then(({data})=>{
      const newUser={...data}
      const courseIndex=newUser.enrolledCourses.findIndex(c=>c._id==course._id)
      if(newUser.enrolledCourses[courseIndex].claimed===false)
      {
        newUser.points+=course.courseId.points;
        course.claimed=true
        newUser.enrolledCourses[courseIndex]=course
        props.onPoints( newUser.points)
        userService.updateUser(localStorage.getItem("Id"), newUser).then((data) => {
          console.log("updatedProfile",data)
        })
      }

    })
  }
  return (
    <React.Fragment>
      {console.log("course", course)}
      <Link to={localStorage.getItem("JWT") ? `/courses/${path === '/profile'|| path === '/profile/:id'?course?.courseId?._id:course?._id}/details` : '/login'} className="CourseCard__container" >
        <div className="CourseCard__img">
          <img
            className="CourseCard__img-sm"
            src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_933383882_2000133420009280345_410292.jpg"
            alt="course"
          />
        </div>
        <div className="CourseCard--box">
          <p className="CourseCard__text CourseCard__text--font titleColored">
            {path === '/profile' || path === '/profile/:id'?course?.courseId?.title:course.title}
          </p>
        </div>

        <div className="CourseCard__items-container">
          <span className="CourseCard__text CourseCard__text--space CourseCard__text--font">
            {path === '/profile'|| path === '/profile/:id'?course?.courseId?.materials?.length:course?.materials?.length} Videos
            </span>
          <div className="CourseCard__icon-container">
            {course?.payment===0 ||course?.courseId?.payment === 0 ?
              <span className="CourseCard__text CourseCard__text--space CourseCard__text--font priceColored">
                Free
              </span>
              : <span className="CourseCard__text CourseCard__text--space CourseCard__text--font priceColored">
                ${path === '/profile'|| path === '/profile/:id'?course?.courseId?.payment:course?.payment}
              </span>
            }
          </div>
        </div>

        <div className="CourseCard__items-container">
          <span className="CourseCard__text CourseCard__text--space CourseCard__text--font ">
            {path === '/profile'|| path === '/profile/:id'?course?.courseId?.duration:course?.duration} Hours
            </span>
          <span className="CourseCard__text CourseCard__text--space CourseCard__text--font ">
            {path === '/profile'|| path === '/profile/:id'?
            course?.courseId?.categoryId?.title:course?.categoryId?.title}
          </span>
        </div>
        <div className="CourseCard__items-container">
          <div className="CourseCard__stars-container">
            <div className="CourseCard__text CourseCard__text--space">
              {stars.map(star => <AiFillStar className="CourseCard__star" key={star} ></AiFillStar>)}
              <AiOutlineStar className="CourseCard__star "></AiOutlineStar>

            </div>
          </div>
        </div>
        {(path === '/profile'|| path === '/profile/:id') &&
          <div className="CourseCard__items-container">
            <ProgressBar variant="info" animated now={course?.progress} />
            <div className="CourseCard__text--colored">
              {course?.progress} %
                    </div>
          </div>
        }
        <div className="CourseCard__btnCont">
          {path !== '/profile' && <span className=" CourseCard__btn CourseCard__text--font" >Show Details</span>}

          {path === '/profile/:id' || path === '/profile' &&
           <Link
           className="CourseCard__btn CourseCard__text--font"
           to={course?.progress!==100&&`/courses/${course._id}/lessons`}
           onClick={e => { e.stopPropagation();( course?.progress===100 && handleClaimRewards()) }}
           >
           {console.log("path",path)}
            {course?.progress === 0 ?
              'Start Course'
              : course?.progress === 100 ?
              course?.claimed?'claimed':
                'claim points'
                : 'Continue'
            }
          </Link>}

        </div>
      </Link>
    </React.Fragment>
  )
};
export default CourseCard;
