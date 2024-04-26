import axios from 'axios';
import { getApiHeaders } from '../Api/Headers';
import { BASE_URL } from '../Api/Api'
export const getCourse = async () => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/1`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
export const getCourseById = async (CourseId) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/${CourseId}`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
export const getCourseStudyById = async (CourseId) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/study/${CourseId}`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


export const getAllCourse = async () => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
export const getLessonById = async (Id) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/study/section/lesson/${Id}`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
export const getQuizById = async (Id) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/study/section/quiz/${Id}`, { headers });
        if (typeof response.data === 'object' && response.data !== null) {
            return response.data;
        } else {
            console.error("Invalid data received from the server:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}