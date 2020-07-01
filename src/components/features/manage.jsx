import React, { useEffect, useState } from "react";
import { Tab, Col, Row, Nav, Container } from 'react-bootstrap'
import ManageTable from "./manageTable"
import { getAllCourses } from "../../services/courseService"
import { getAllCategories } from "../../services/categoryService"
import { getAllUsers } from "../../services/userService"
const Manage = (props) => {
    const [data, setData] = useState([])
    let [showedData, setShowedData] = useState([])
    const [searchWord, setSearchWord] = useState("")
    const [manageBy, setManageBy] = useState("courses")
    useEffect(() => {
        window.scrollTo(0,0)
        props.onSpinner(true)
        getAllCourses().then(({ data }) => {
            setData(data.reverse())
            props.onSpinner(false)

        }).catch((err) => console.log(err))
    }, [])
    const handleCourses = () => {
        setManageBy("courses")
        props.onSpinner(true)
        getAllCourses().then(({ data }) => {
            setData(data.reverse())
            props.onSpinner(false)
        }).catch((err) => console.log(err))
    }
    const handleCategories = () => {
        props.onSpinner(true)
        setManageBy("categories")
        getAllCategories().then(({ data }) => {
            setData(data.reverse())
            props.onSpinner(false)
        }).catch((err) => console.log(err))
    }
    const handleUsers = () => {
        setManageBy("users")
        props.onSpinner(true)
        getAllUsers().then(({ data }) => {
            setData(data.reverse())
            props.onSpinner(false)
        }).catch((err) => console.log(err))
    }
    const handleSearchWord = ({ target }) => {
        setSearchWord(target.value)
    }
    const onDelete = (deleted) => {
        const newData = [...data]
        const index = newData.findIndex(d => d._id === deleted._id)
        newData.splice(index, 1);
        setData(newData)
    }
    const onAdd = (added) => {
        const newData = [...data]
        newData.unshift(added)
        setData(newData)
    }
    const onEdit = (added) => {
        const newData = [...data]
        const index = newData.findIndex(d => d._id === added._id)
        newData[index] = added;
        setData(newData)
    }
    const onDisable = (id, disable) => {
        const newData = [...data]
        const index = newData.findIndex(d => d._id === id)
        newData[index].disable = disable;
        setData(newData)
    }
    showedData = data.filter(i => (i[i.title ? 'title' : 'fullName'].toLowerCase().includes(searchWord.toLowerCase())))
    return (
      
        <React.Fragment>
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column" id="shadow">
                                <Nav.Item>
                                    <Nav.Link onClick={handleCourses} className="activeColor activeColor__manage" eventKey="first">Courses</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={handleCategories} className="activeColor activeColor__manage" eventKey="second">Categories</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={handleUsers} className="activeColor activeColor__manage" eventKey="third">Users</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ManageTable
                                        {...props}
                                        data={showedData}
                                        onDelete={onDelete}
                                        handleSearchWord={handleSearchWord}
                                        manageBy={manageBy}
                                        onSpinner={props.onSpinner}
                                        spinner={props.spinner}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ManageTable
                                        {...props}
                                        data={showedData}
                                        onDelete={onDelete}
                                        handleSearchWord={handleSearchWord}
                                        manageBy={manageBy}
                                        onAdd={onAdd}
                                        onEdit={onEdit}
                                        onSpinner={props.onSpinner}
                                        spinner={props.spinner}
                                    />

                                </Tab.Pane><Tab.Pane eventKey="third">
                                    <ManageTable
                                        {...props}
                                        data={showedData}
                                        handleSearchWord={handleSearchWord}
                                        manageBy={manageBy}
                                        onDisable={onDisable}
                                        onSpinner={props.onSpinner}
                                        spinner={props.spinner}

                                    />

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </React.Fragment>
    );
}

export default Manage;