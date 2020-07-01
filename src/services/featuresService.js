import { apiUrl } from './config.json';
import axios from 'axios';



// Search
export function searchByCourses() {
    return axios.get(`${apiUrl}/search/courses`);
};


//filter and paginate
export function filterAndPagination(catsId, no, size) {
    return axios.get(
      `${apiUrl}/courses/filters&pagination?catsId=${catsId}&pageNo=${no}&size=${size}`
    );
  }

