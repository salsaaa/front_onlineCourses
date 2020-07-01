import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import About from "../core/about";
import BackGround from "./backGround";
import Filters from "../features/filters";
import CourseCard from "../cards/courseCard";
import PaginationList from './../features/pagination';
import * as courseService from '../../services/featuresService';

import { BsFillPlusCircleFill } from 'react-icons/bs';

const Home = props => {
    const { type, match } = props;
    const path = match.path;


    const [pageSize, setPageSize] = useState(6);
    const [paginatedCourses, setPaginatedCourses] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [coursesCount, setCoursesCount] = useState(0)
    const [filterdArr, setFilterdArr] = useState([])


    const getFilteredCourses = (arr, page) => {
        props.onSpinner(true);
        let strings = ""
        if (arr) {

            strings = arr.toString();
        }
        courseService.filterAndPagination(strings, page, pageSize).then(({ data }) => {
            setPaginatedCourses(data.filters);
            setCoursesCount(data.coursesCount)
            props.onSpinner(false)

        })
        setFilterdArr(arr);
        setActivePage(1)

    }
    useEffect(() => {
        getFilteredCourses(filterdArr, activePage)
    }, []);
    const onFilter = (arr) => {
        getFilteredCourses(arr, activePage)
        // setActivePage(1)

    }

    const handlePageClick = (pageNum) => {
        setActivePage(pageNum);
        getFilteredCourses(filterdArr, pageNum)

    }

    return (
        <React.Fragment>
        {!props.spinner&&<div>
            <BackGround />

            <About />

            <div className="FixedSection">
                <div className="FixedSection__bg"></div>
                <div className="row">
                    <div className="col-md-6 FixedSection__info">
                        <h2 className="FixedSection__text"> Ceteros fuisset mei no, soleat epicurei adipiscing ne vis.</h2>
                        <p className="FixedSection__text">Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et his suas veniam nominati.</p>
                        <a href="#/" className="FixedSection__btn">Get Started!</a>
                    </div>
                </div>
            </div>

            <div className="courses">

                <Filters
                    onFilter={onFilter}
                />

                <div className="courses__container">
                    <div className=" instructor ">
                        <h2 className="instructor__Inst-title">Available Courses</h2>
                    </div>
                    <div className="courseCardsContainer">
                        <div className="CourseCard__container">
                            <div className="courseCardsContainer__sub">
                                {paginatedCourses?.map((course) => (
                                    <div className="CourseCard" key={course._id}>
                                        <CourseCard {...props} path={path} course={course} />
                                    </div>
                                ))}

                            </div>
                            <div className="CourseCard__pagination">
                                {console.log("activeBefore", activePage)}
                                <PaginationList
                                    key={activePage}
                                    type="free courses"
                                    coursesCount={coursesCount}
                                    pageSize={pageSize}
                                    activePage={activePage}
                                    handlePageClick={handlePageClick}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {type === 'instructor' &&
                <Link to="/courses/add" className="addCourse">
                    <BsFillPlusCircleFill />
                </Link>
            }
            </div>}
        </React.Fragment>
    );
};





export default Home;
