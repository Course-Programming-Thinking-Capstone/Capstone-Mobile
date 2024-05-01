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
export const getCommonId = async (Id) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/courses/${Id}`, { headers });
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

export const checkStudy = async (sectionIds) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/courses/check-study`, sectionIds, { headers });
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error adding new child:", error);
        return false;
    }
};
export const getStarted = async (sectionId,CourseId) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/courses/start-study`, {
            sectionId: sectionId,
            courseId: CourseId
        }, { headers });
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error adding new child:", error);
        return false;
    }
};
export const markLesson = async (Id) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.patch(`${BASE_URL}/courses/mark-lesson-completed?lessonId=${Id}`, {
        }, { headers });
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error adding new child:", error);
        return false;
    }
};