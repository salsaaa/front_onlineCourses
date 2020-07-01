import { apiUrl } from "./config.json";
import axios from "axios";

// Get All Courses (For Testing)
export function getAllCourses() {
  return axios.get(`${apiUrl}/courses`);
}

// Get Course By ID
export function getCourseById(id) {
  return axios.get(`${apiUrl}/courses/${id}`);
}

// Add course
export function addCourse(course) {
  return axios.post(`${apiUrl}/courses`, course);
}

// Edit course
export function updateCourse(id, course) {
  return axios.patch(`${apiUrl}/courses/${id}`, course);
}

// Delete Course
export function removeCourse(id) {
  return axios.delete(`${apiUrl}/courses/${id}`);
}

//enroll and unenroll
export function enrollOrUnenroll(cid) {
    return axios.post(`${apiUrl}/courses/${cid}/enroll`)
}
//checkEnrolledCourse
export function checkEnrolledCourse(cid) {
    return axios.post(`${apiUrl}/courses/${cid}/isEnrolled`)
}
//uploadImg
export function uploadImg(file) {
  return axios.post(`${apiUrl}/courses/upload`,file)
}
