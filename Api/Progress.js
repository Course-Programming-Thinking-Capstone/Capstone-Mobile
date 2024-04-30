import axios from 'axios';
import { getApiHeaders } from '../Api/Headers';
import { BASE_URL } from '../Api/Api'
export const getStarted = async (sectionId, CourseId) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/courses/start-study`, {
            sectionId: sectionId,
            courseId: CourseId,
        }, { headers });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error adding new child:", error);
        return false;
    }
};
export const getProgress = async (Id,courseId) => {
    try {

        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/students/progress/course/lessons?studentId=${Id}&courseId=${courseId}`, { headers });
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
