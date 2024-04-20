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