import axios from 'axios';
import { getApiHeaders } from '../Api/Headers';
import { BASE_URL } from '../Api/Api'
export const submitQuiz = async (quizId, questionIds, optionIds, duration, timeTaken) => {
    try {
        const headers = await getApiHeaders();
        const quizResults = questionIds.map((questionId, index) => ({
            questionId,
            optionId: optionIds[index]
        }));

        const response = await axios.post(
            `${BASE_URL}/courses/quiz/submit`,
            {
                quizId: quizId,
                quizResults,
                duration,
                quizMinutes: timeTaken
            },
            { headers }
        );
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error submitting quiz:", error);
        return false;
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
