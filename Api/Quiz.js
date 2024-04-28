import axios from 'axios';
import { getApiHeaders } from '../Api/Headers';
import { BASE_URL } from '../Api/Api'
export const submitQuiz = async (quizId, questionIds, optionIds, duration, timeTaken) =>
{
    try {
        // console.log("1",quizId);
        // console.log("2",questionIds);
        // console.log("3",optionIds);
        // console.log("4",duration);
        // console.log("5",timeTaken);
        const headers = await getApiHeaders();
        const quizResults = questionIds.map((questionId, index) => ({
            questionId,
            optionId: optionIds[index]
        }));

        const response = await axios.post( 
            `${BASE_URL}/courses/quiz/submit`,
            {
                quizId:1,
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
