import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiHeaders = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        return {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
    } catch (error) {
        console.error("Error getting access token:", error);
        return {};
    }
};