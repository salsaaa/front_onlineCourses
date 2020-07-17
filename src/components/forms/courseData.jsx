import React from 'react';
import { Row, Col, Button, Container, Form, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Joi from "joi-browser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdAccessAlarms } from 'react-icons/md';
import { FiBookmark } from 'react-icons/fi';
import { RiUploadLine } from 'react-icons/ri';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { addCourse, updateCourse, getCourseById, uploadImg } from '../../services/courseService'
import { getAllCategories } from '../../services/categoryService'
import { FaMinusCircle } from "react-icons/fa"
import { GiStarsStack } from "react-icons/gi"


const CourseData = (props) => {
    const [state, setState] = useState({
        course: {
            title: "",
            description: "",
            duration: 0,
            payment: 0,
            materials: [],
            categoryId: null,
            userId: "",
            points: 0,
            selectedFile: null,
            img: ""
        },
        nestedInfo: {
            title: "",
            link: "",
        },
        errors: {},
        categories: [],
        priceVisibility: false,
        categoryTitle: "",

    })
    useEffect(() => {
        const path = props.match.path;
        if (path === "/courses/:id/edit") {
            props.onSpinner(true)
            const courseId = props.match.params.id;
            Promise.all([getAllCategories(), getCourseById(courseId)]).then(function (values) {
                const newCourse = { ...values[1].data.course }
                if(newCourse.img){

                    newCourse["img"] = `data:image/jpeg;base64,${values[1].data.img}`
                }
                setState({ ...state, categories: values[0].data, course: newCourse })
                props.onSpinner(false)
            })

        }
        else if (path === "/courses/add") {
            const currentId = localStorage.getItem("Id");
            state.course.userId = currentId
            props.onSpinner(true)
            Promise.all([getAllCategories()]).then(function (values) {
                setState({ ...state, categories: values[0].data })
                props.onSpinner(false)
            })
        }
    }, [])
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required().max(256),
        duration: Joi.number().required(),
        payment: Joi.number().required(),
        materials: Joi.array().min(1),
        categoryId: Joi,
        userId: Joi.required(),
        points: Joi.number().required(),
        selectedFile: Joi,
        img: Joi
    };
    const handlePriceVisibility = (visible) => {
        if (visible === false) {
            state.course.payment = 0
        }
        setState({ ...state, priceVisibility: visible })
    }
    const handleDropDown = (e, id, name) => {
        const course = { ...state.course };
        course[e.target.name] = id;
        if (e.target.name === "categoryId") {

            setState({ ...state, course, categoryTitle: name });
        }

    }
    const handleChange = ({ target }) => {
        const course = { ...state.course };
        course[target.name] = target.value;
        setState({ ...state, course });
    };
    const handleNestedChange = ({ target }) => {
        const nestedInfo = { ...state.nestedInfo };
        nestedInfo[target.name] = target.value;
        setState({ ...state, nestedInfo });

    };

    const handleArray = (property, courseProperty) => {
        if (state.nestedInfo[property] !== "") {
            const course = { ...state.course }
            if (typeof (property) == "string") {
                course[courseProperty].push(state.nestedInfo[property]);
            }
            else if (typeof (property) == "object") {
                course[courseProperty].push(property);
            }
            const nestedInfo = {
                title: "",
                link: "",
            }
            setState({ ...state, course, nestedInfo })
        }
    }
    const handleMaterialDelete = (id) => {
        const course = { ...state.course }
        const index = course.materials.findIndex(c => c._id === id);
        course.materials.splice(index, 1)
        setState({ ...state, course })

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = validate();
        if (errors === null || Object.keys(errors).length === 0) {
            setState({ ...state, errors: {} });
            const path = props.match.path;
            const course = { ...state.course }

            if (path === "/courses/add") {
                props.onSpinner(true)
                const img = new FormData()
                img.append('file', state.course.selectedFile)
                uploadImg(img).then(({ data }) => { // then print response status
                    course["img"] = data.filename;
                    addCourse(course)
                        .then(async ({ data }) => {
                            props.onSpinner(false)
                            props.history.replace("/manage");
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }).catch((err) => console.log(err))
            }
            else if (path === "/courses/:id/edit") {
                props.onSpinner(true)
                const img = new FormData()
                img.append('file', state.course.selectedFile)
                uploadImg(img).then(({ data }) => { // then print response status
                    course["img"] = data.filename;
                    const courseId = props.match.params.id;
                    updateCourse(courseId, course).then((data) => {
                        props.onSpinner(false)
                        props.history.replace("/manage");

                    }).catch((err) => {
                        console.log(err)
                    })
                })

            }
            return;
        }
        //clone
        console.log("errors", errors)

        setState({ ...state, errors });



    };
    const validate = () => {
        const res = Joi.validate(state.course, schema, {
            abortEarly: false
        });
        if (res.error === null) {
            return null;
        }
        const errors = {};

        for (const err of res.error.details) {
            errors[err.path] = err.message;
        }
        const path = props.match.path;
        if (path === "/courses/:id/edit") {
            delete errors._id;

        }

        return errors;
    };
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const onImgChange = (event) => {
        const course = { ...state.course };
        const file = event.target.files[0];
        course["selectedFile"] = file;
        getBase64(file, (result) => {
            course["img"] = result
            setState({ ...state, course })
        });
        console.log(course)
        setState({ ...state, course });
    }
    // const errorToasting=(errors)=>{
    //     for (const err of Object.values(state.errors)) {
    //         console.log(err)
    //         toast.warning(err, {
    //             position: toast.POSITION.BOTTOM_RIGHT
    //         });
    //     }

    // }

    return (
        !props.spinner&&
        <React.Fragment>
            <ToastContainer />
            <Container>
                <div className="course">
                    <Row>
                        <Col sm={9}>
                            <div className="course__intro">
                                <input value={state.course.title} name="title" onChange={handleChange} className="course__control course__control--text" type="text" placeholder="Course Title" />
                                {state.errors.title && <div className="alert alert-warning">{state.errors.title}</div>}

                                <div className="course__data course__add">

                                    <div className="course__info course__info-add">
                                        <img className="course__info-img" src={require('../../images/user/photo.jpg')} />
                                        <div className="course__data-info">
                                            <span className="course__data-title">Admin</span>
                                            <p className="course__data-name course__data-name--lg">{localStorage.getItem("Name")}</p>
                                        </div>
                                    </div>

                                    <div className="course__info course__info-add">
                                        <div className="course__info-icon">
                                            <FiBookmark />
                                        </div>
                                        <div className="course__data-info">
                                            <span className="course__data-title">Category</span>
                                            <Dropdown >
                                                <Dropdown.Toggle className="course__control course__control--dropdown" id="dropdown-basic">
                                                    {state.categoryTitle || state.course.categoryId?.title || "Choose Category"}
                                                </Dropdown.Toggle>


                                                <Dropdown.Menu >
                                                    {state.categories.map(category => (
                                                        <Dropdown.Item name="categoryId" onClick={e => handleDropDown(e, category._id, category.title)} >{category.title}</Dropdown.Item>
                                                    ))}

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="course__details">
                                <div className="course__details-info">
                                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                                        <input id="imgInput" accept="image/*" type="file" onChange={onImgChange} multiple style={{ display: 'none' }} />
                                        {state.course.img ? <label htmlFor="imgInput" className="course__details-img imgCourse">

                                            <img
                                                className="course__details-img"
                                                src={state.course.img}
                                                alt="Course"
                                            />
                                        </label>
                                            :
                                            <label htmlFor="imgInput"  >
                                                <div className="course__control course__control--file">
                                                    <div className="course__control--file-icon">
                                                        <RiUploadLine />
                                                        <input id="imgInput" accept="image/*" type="file" onChange={onImgChange} multiple style={{ display: 'none' }} />
                                                    </div>
                                                    <label >Upload course image</label>
                                                </div>
                                            </label>
                                        }
                                        <textarea value={state.course.description} name="description" onChange={handleChange} className="course__control course__control--text" rows="8" placeholder="Course Description"></textarea>
                                        {state.errors.description && <div className="alert alert-warning">{state.errors.description}</div>}

                                    </Form.Group>
                                </div>
                                <div className="course__details-inf">
                                    <h2 className="course__details-title course__add-title">Course Material</h2>
                                    <Row>
                                        <Col>
                                            <input value={state.nestedInfo.link} onChange={handleNestedChange} name="link" className="course__control course__control--text" type="text" placeholder="Lesson Link" />
                                            {state.errors.materials && <div className="alert alert-warning">{"materials must contain at least 1 link"}</div>}

                                        </Col>
                                        <Col>
                                            <input value={state.nestedInfo.title} onChange={handleNestedChange} name="title" className="course__control course__control--text" type="text" placeholder="Lesson Title" />
                                            {state.errors.materials && <div className="alert alert-warning">{"materials must contain at least 1 title"}</div>}

                                        </Col>
                                        <span onClick={() => { handleArray({ link: state.nestedInfo.link, title: state.nestedInfo.title }, "materials") }} className="course__add-icon">
                                            <BsFillPlusCircleFill />
                                        </span>
                                    </Row>
                                    <ul className="course__details-list course__add-list">
                                        {state.course.materials?.map(material => (
                                            <row>
                                                <Col>
                                                    <li className="listItem">
                                                        <div className="material__title">

                                                            {material.title}

                                                            <span >

                                                                <FaMinusCircle onClick={() => handleMaterialDelete(material._id)} className="crud__delete--red" />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            {material.link}

                                                        </div>
                                                    </li>
                                                </Col>


                                            </row>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="course__features">
                                <div className="middle">
                                    <label>
                                        <input type="radio" name="radio" checked readOnly />
                                        <div className="box" onClick={() => handlePriceVisibility(false)}>
                                            <span>For free</span>
                                        </div>
                                    </label>

                                    <label>
                                        <input type="radio" name="radio" />
                                        <div className="box" onClick={() => handlePriceVisibility(true)}>
                                            <span>Payment</span>
                                        </div>
                                        {state.priceVisibility && <input value={state.course.payment} name="payment" onChange={handleChange} className="course__control course__control-price course__num course__num--ml" type="number" placeholder="Enter Price" />}
                                    </label>
                                </div>
                                <ul className="list--none course__features-list">
                                    <li className="course__features-item">
                                        Duration: <input value={state.course.duration} onChange={handleChange} name="duration" className="course__num course__control" type="number" />
                                        <span className="course__features-icon"><MdAccessAlarms /></span>
                                    </li>

                                </ul>
                                <ul className="list--none course__features-list">
                                    <li className="course__features-item">
                                        Points: <input value={state.course.points} onChange={handleChange} name="points" className="course__num course__control" type="number" />
                                        <span className="course__features-icon"><GiStarsStack /></span>
                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Button onClick={handleSubmit} className="btn btn--primary-dark btn--mt0 btn--upper">{props.match.path == "/courses/add" ? "Submit Course" : "Edit Course"}</Button>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default CourseData;