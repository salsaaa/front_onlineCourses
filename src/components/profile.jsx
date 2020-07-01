import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Card, Container, Nav, Button, Form } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillInstagram, AiFillStar, AiOutlineStar, AiFillEdit } from 'react-icons/ai';

import CourseCard from './cards/courseCard';
import PageNoResult from './core/pageNoResult';
import * as userService from '../services/userService';
import {uploadImg } from '../services/courseService'
const fs = require("fs");






const Profile = props => {
    const [currentUser, setCurrentUser] = useState({

        fullName: "",
        email: "",
        selectedFile:null,

    })

    const [oldUser, setOldUser] = useState({
        fullName: "",
        email: "",
    })
    const [img,setImg]=useState("")
    const [points, setPoints] = useState(0)
    const [profile, setProfile] = useState({});
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const { type, match } = props;
    const path = match.path;
    const [isEdit, setIsEdit] = useState(path === '/profile/edit');


    useEffect(() => {
        console.log("pathprofile",path)
        if (path!=="/profile/:id") {
            props.onSpinner(true)

        }
        console.log("props.match.path", props.match.params.id)
        const id = props.match.params.id || localStorage.getItem("Id")
        userService.getUserById(id).then(({ data }) => {
            console.log("profileData", data)
            setImg(`data:image/jpeg;base64,${data.img}`)
            setProfile(data);
            setCurrentUser(data);
            setOldUser(data)
            setPoints(data.points)
            setEnrolledCourses(data.enrolledCourses)
            props.onSpinner(false)


        })

    }, [props.match.path])

    const handleChange = ({ target }) => {
        const editUser = { ...currentUser };
        editUser[target.name] = target.value;
        setCurrentUser(editUser);

    };
    const onImgChange = (event) => {
        const user = { ...currentUser };
        const file=event.target.files[0]
        user["selectedFile"] =file ;
        getBase64(file, (result) => {
            console.log(result)
            setImg(result)
       });
        console.log(user)
        setCurrentUser(user)
    }
    const getBase64=(file, cb)=> {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (isEdit) {
            props.onSpinner(true)
            const img = new FormData()
            img.append('file', currentUser.selectedFile)
            console.log(img)
            uploadImg(img).then(({ data }) => { // then print response status
                console.log(data)
                currentUser["img"] = data.filename;
                userService.updateUser(profile._id, currentUser).then(({data}) => {
                    console.log(data)
                    console.log("currentUser.img",currentUser.img)
                    setIsEdit(false);
                    props.history.replace("/profile");
                    props.onSpinner(false)

                })
            })

        }

    }
    const handleCancel = async e => {
        e.preventDefault();
        if (isEdit) {

            setCurrentUser(oldUser);

        }
    }
    const handlePoints = (newPoints) => {
        setPoints(newPoints)
    }
    return (
        <React.Fragment>
            {console.log(img)}
            {!props.spinner && <div className="InstCard ">
                <Container className="profileContainer">
                    <Card className="card--borderless">
                        <Card.Img className="card__card-img" src={img} alt={path === '/profile'?"You can add Photo by clicking on edit icon..":"No Photo"} />
                        {isEdit &&
                            <div>
                                <div id="cameraParent" className="profile_edit profile_edit--upload  ">
                                    <Form.File onChange={onImgChange} id="camera" label='📷' style={{cursor:"pointer"}} />
                                </div>
                            </div>
                        }
                        <Card.Body>
                            <Card.Title className="card__card-title">{currentUser.fullName}</Card.Title>

                        </Card.Body>
                    </Card>
                    <div className="profile">
                        <div className="profile__header">
                            <div>
                                {isEdit ?
                                    <div className="edit">
                                        <input className="course_control course_control--text" type="text" placeholder="Name" name="fullName" onChange={handleChange} value={currentUser.fullName} />
                                        <input className="course_control course_control--text" type="text" placeholder="Email" name="email" onChange={handleChange} value={currentUser.email} />
                                    </div>
                                    :
                                    <h1>{currentUser.fullName}</h1>
                                }

                            </div>

                            <div >
                                {path === '/profile' &&
                                    <Link to="/profile/edit" onClick={() => { setIsEdit(true); props.onSpinner(false) }}> <AiFillEdit className="profile__edit" /></Link>
                                }
                            </div>
                            <div className="prof-icons">
                                <FaFacebook className="profile_icons profile_icons--facebook" />
                                <AiFillTwitterCircle className="profile_icons profile_icons--twitter" />
                                <AiFillInstagram className="profile_icons profile_icons--instagram" />
                            </div>
                        </div>
                        <div>


                            {isEdit &&
                                <React.Fragment>
                                    <Button className="btn btn--primary-dark btn--pd btn--mt0 btn--mr0" onClick={handleSubmit}>Save</Button>
                                    <Button className="btn btn--danger btn--pd btn--mt0 btn--mr0" onClick={handleCancel}>Cancel</Button>
                                </React.Fragment>
                            }

                            <hr className="line" />
                            <div className="CourseCard__text--colored bt">
                                {points} points
                    </div>
                            <hr className="line" />

                            <div>
                                <h2 className="profile__header">Enrolled Courses</h2>
                            </div>

                            {
                                enrolledCourses.length > 0 ?
                                    <React.Fragment>
                                        <div className="courseCardsContainer courseCardsContainer--ml">
                                            <div className="courseCardsContainer__sub">
                                                {enrolledCourses?.map(course => (
                                                    <div className="CourseCard CourseCard--width" key={course._id}>
                                                        <CourseCard
                                                            {...props}
                                                            type={type}
                                                            path={props.match.path}
                                                            course={course}
                                                            onPoints={handlePoints}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <PageNoResult />
                            }

                        </div>
                    </div>
                </Container>
            </div>
            }
        </React.Fragment>
    );
}

export default Profile;