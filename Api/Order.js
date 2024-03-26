import axios from 'axios';
import { getApiHeaders } from '../Api/Headers';
import { BASE_URL } from '../Api/Api'
export const CreateOrder = async (studentId, count) => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/orders`, {
            studentId: studentId,
            courseId: 5,
            voucherId: 0,
            paymentType: 2,
            quantity: count,
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

export const getOrder = async () => {
    try {
        const headers = await getApiHeaders();
        const response = await axios.get(`${BASE_URL}/orders`, { headers });
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
export const CreatePayment = async (success) => {
    try {
        const headers = await getApiHeaders();
        const orderId = success.orderId;
        const response = await axios.post(`${BASE_URL}/payment/momo/${orderId}`, {}, { headers });
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error("Error adding new child:", error);
        return false;
    }
};
export const getOrderDetail = async (success) => {
    try {
        const headers = await getApiHeaders();
        const orderId = success.orderId;
        const response = await axios.get(`${BASE_URL}/orders/detail/${orderId}`, { headers });
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