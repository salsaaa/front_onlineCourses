import React from 'react';
import { Tab, Col, Row, Nav, Container, Button,Spinner } from 'react-bootstrap'
import { IoMdArrowDropright } from "react-icons/io";
import { FiCheckCircle } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { getProfile,updateUser} from '../../services/userService'

const CourseLessons = (props) => {
  const [materials, setMaterials] = useState([])
  const [activeMaterial, setActiveMaterial] = useState(1)
  let [count, setCount] = useState(0)
  const [course, setCourse] = useState({})
  let [countIcon, setCountIcon] = useState(0)
  const [materialLength, setMaterialLength] = useState(0)

  const [user, setUser] = useState({})
  const courseId = props.match.params.id;
  const userId=localStorage.getItem("Id");

  useEffect(() => {
    window.scrollTo(0, 0)
    props.onSpinner(true)
    getProfile().then(({ data }) => {
      setUser(data)
      console.log("dataLessons",data)
      const userCourse=data.enrolledCourses.find(c=>c._id==courseId)
      // setActiveMaterial(userCourse.courseId.materials[0]._id)
      setCourse(userCourse)
      const materialLen=userCourse.courseId.materials.length
      setMaterialLength(materialLen)
      embedVideo(userCourse.courseId.materials) 
      if(userCourse.progress===0)
      {
        handleWatched(data,userCourse,materialLen)
      }
      const activeIndex= userCourse.progress/calculateProgress(materialLen)
      const active =userCourse.courseId.materials[activeIndex-1]._id
      console.log("active",active)
      setActiveMaterial(active)
      props.onSpinner(false)
    }).catch((err) => {
      console.log(err)
    })


  }, [])
  const embedVideo = (materials) => {
    const embedMaterials = materials.map(m => {
      if (!m.link.includes('embed')) {

        const embedLink = `https://www.youtube.com/embed/${m.link.split('v=')[1].split('&')[0]}`
        m.link = embedLink
      }
      return m
    });
    setMaterials(embedMaterials)
  }
  const handleNext = () => {
    if (count + 1 < materials.length && count + 1 > 0) {
        count++;
        setCount(count)
        const active = materials[count]._id
        setActiveMaterial(active)
    }
  }
  // const handleEventClick = (e) => {
  //   const key = e.target.attributes[2].value;
  //   const index = materials.findIndex(m => m._id === key)
  //   console.log("key",key)
  //   console.log("count",count)

  //   if(key<=count+1)
  //   {
  //     setCount(index)
  //     setActiveMaterial(key)

  //   }
  // }
  const calculateProgress = (materialLen) => {
    const length = materialLen;
    const progress = 100 / length;
    return progress;
  }
  const checkIncreasingProgress=(course,materialLen)=>{
    const nextProg=course.progress+calculateProgress(materialLen);
    const prevProg=(count+2)*calculateProgress(materialLen)-calculateProgress(materialLen)
    return nextProg===prevProg;
  }
  const handleWatched = (user,course,materialLen) => {
    if(course.progress===0 || checkIncreasingProgress(course,materialLen) ){
      handleCountIcon()
      const newUser={...user}
      const courseIndex=newUser.enrolledCourses.findIndex(c=>c._id==courseId)
      course.progress+=calculateProgress(materialLen);
      newUser.enrolledCourses[courseIndex]=course
      updateUser(userId,newUser).then(({data})=>console.log(data)).catch((err)=>console.log(err))
      console.log("increase progress")
    }

  }
  const handleCountIcon=()=>{
    console.log("countIcon",countIcon)
    countIcon+=1
  }
  return (
    <React.Fragment>

      {
      <div >

        <Container >

          <Tab.Container id="left-tabs-example" activeKey={activeMaterial}>

            <Row>

              <Col sm={3} >
                <Nav variant="pills" className="flex-column" id="shadow">
                  {materials.map(material => (
                    <Nav.Item >
                      <Nav.Link className="activeColor" eventKey={material._id}>{material.title}<div className="float">{countIcon<course.progress/calculateProgress(materialLength)&& <FiCheckCircle />}</div> </Nav.Link>
                    {handleCountIcon()}
                    </Nav.Item>
                  ))}

                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {materials.map(material => (
                    <Tab.Pane eventKey={material._id}>
                      <div className="video">
                        <iframe width="100%" height="500" src={material.link} title="video1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </div>
                    </Tab.Pane>

                  ))}

                  <Button onClick={(event) => { handleNext(event); handleWatched(user,course,materialLength) }} variant="outline-info" className="float">Next <IoMdArrowDropright /> </Button>{' '}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

        </Container>
      </div>
   }
    </React.Fragment>
  );
}

export default CourseLessons;