import React, { useState } from "react";
import { Table, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { removeCourse } from "../../services/courseService"
import { removeCategory, addCategory, editCategory, getCategoryById } from "../../services/categoryService"
import {disableUser} from "../../services/userService"

const ManageTable = (props) => {
    let [count, setCount] = useState(0)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletedId, setDeletedId] = useState(0)
    const [showAddInput, setShowAddInput] = useState(false)
    const [showEditInput, setShowEditInput] = useState(false)
    const [editId, setEditId] = useState(0)
    const [catTitle, setCatTitle] = useState("")


    const handleClose = () => setShowDeleteDialog(false);
    const handleDeleteSubmit = () => {
        if (props.manageBy === "courses") {

            removeCourse(deletedId).then(({ data }) => {

                props.onDelete(data)
                setShowDeleteDialog(false);
            })
        } else if (props.manageBy === "categories") {
            removeCategory(deletedId).then(({ data }) => {
                props.onDelete(data)
                setShowDeleteDialog(false)
            })
        }
    }
    const handleAddInputShow = () => {
        setShowAddInput(!showAddInput)
        setShowEditInput(false)
    }
    const handleEditInputShow = (id) => {
        setShowEditInput(!showEditInput)
        setShowAddInput(false)
        setEditId(id)
        getCategoryById(id).then(({ data }) => {
            setCatTitle(data.title)
        }).catch((err) => console.log(err))

    }
    const handleDelete = (id) => {
        console.log("deletedId", id)
        setShowDeleteDialog(true);
        setDeletedId(id)
    }

    const handleChange = ({ target }) => {
        const title = target.value;
        setCatTitle(title);
        console.log(catTitle)
    };
    const handleCatAdd = () => {
        addCategory({ title: catTitle }).then(({ data }) => {
            console.log(data)
            setCatTitle("")
            setShowAddInput(false)
            props.onAdd(data)
        }).catch((err) => console.log(err))
    }
    const handleCatEdit = (id) => {
        editCategory(id, { title: catTitle }).then(({ data }) => {
            console.log(data)
            setCatTitle("")
            setShowEditInput(false)
            props.onEdit(data)
        }).catch((err) => console.log(err))
    }
    const handleDisable=(id,disable)=>{
        disableUser(id).then(({data})=>{
            console.log(data)
            props.onDisable(id,!disable)
        }).catch((err)=>console.log(err))
    }
    return (
        <React.Fragment>

            <Modal show={showDeleteDialog} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalText">Confirmation message</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalText">Are you sure you want to delete that {props.manageBy === "courses"? "course" : "category"}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleDeleteSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="search-add">
                <Form inline>
                    <FormControl onChange={props.handleSearchWord} type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                {props.manageBy === "courses" ? <Link to="/courses/add" className="crud__add">
                    <BsFillPlusCircleFill />
                </Link>
                    : props.manageBy === "categories" &&
                    <div className="crud__add" onClick={handleAddInputShow}>

                        <BsFillPlusCircleFill />
                    </div>
                }

            </div>
            {showAddInput && <div className="add-input">

                <input name="title" onChange={handleChange} className="course__control course__control--text add-input__input" type="text" placeholder="Category Title" />
                <button onClick={handleCatAdd} type="button" class="btn btn-outline-info add-input__btn">Add</button>
            </div>}
            <div className="table-container">

                <Table className="table" striped bordered hover>
                    <thead>
                        {props.manageBy === "courses" ?
                            <tr className="table__header">
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Points</th>
                                <th>Payment</th>
                                <th>Duration</th>
                            </tr> :
                            props.manageBy === "categories" ?
                                <tr className="table__header">
                                    <th>#</th>
                                    <th>Title</th>
                                </tr>
                                :
                                props.manageBy === "users" &&
                                <tr className="table__header">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Points</th>
                                </tr>
                        }
                    </thead>
                    <tbody>
                        {props.manageBy === "courses" ? props.data.map(course =>

                            <tr onClick={() => props.history.push(`/courses/${course._id}/details`)} className="table__row">

                                {/* <Link to={`/courses/${course._id}/details`}> */}
                                <td className="table__header">{++count}</td>
                                <td>{course?.title}</td>
                                <td>{course?.categoryId?.title}</td>
                                <td>{course?.points + " points"}</td>
                                <td>{course?.payment === 0 ? "Free" : course.payment + "$"}</td>
                                <td>{course?.duration + " h"}</td>

                                <td className="crud">
                                    <Link to={`/courses/${course._id}/edit`}>
                                        <FiEdit onClick={e => e.stopPropagation()} className="crud__edit" />
                                    </Link>
                                    <FaTrashAlt onClick={e => { e.stopPropagation(); handleDelete(course._id) }} className="crud__delete" />
                                </td>
                                {/* </Link> */}
                            </tr>
                        ) : //edit category
                            props.manageBy === "categories" ?
                                props.data.map(category =>
                                    showEditInput && editId === category._id ?
                                        <tr>
                                            <td className="table__header">{++count}</td>
                                            <td>
                                                <input value={catTitle} name="title" onChange={handleChange} className="course__control course__control--text add-input__input" type="text" placeholder="Category Title" />
                                            </td>
                                            <td>
                                                <button onClick={() => handleCatEdit(category._id)} type="button" class="btn btn-outline-info add-input__btn">Edit</button>

                                            </td>
                                        </tr>
                                        :
                                        <tr className="table__row">


                                            <td className="table__header">{++count}</td>
                                            <td>{category?.title}</td>
                                            <td className="crud">
                                                <FiEdit onClick={() => handleEditInputShow(category._id)} className="crud__edit" />

                                                <FaTrashAlt onClick={e => handleDelete(category._id)} className="crud__delete" />
                                            </td>

                                        </tr>

                                ) : props.manageBy === "users" &&

                                props.data.map(user =>
                                    <tr onClick={() => props.history.push(`/profile/${user._id}`)} className="table__row">
                                        {console.log("usersgowa", props.data)}
                                        {/* <Link to={`/courses/${course._id}/details`}> */}
                                        <td className="table__header">{++count}</td>
                                        <td>{user?.fullName}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.points}</td>


                                        <td className="crud">
                                            <Button onClick={e => { e.stopPropagation(); handleDisable(user._id,user.disable) }} variant="danger btn-sm delete-btn">{user.disable?"Enable":"Disable"}</Button>
                                        </td>
                                        {/* </Link> */}
                                    </tr>
                                )

                        }

                    </tbody>
                </Table>

            </div>
        </React.Fragment>
    );
}

export default ManageTable;