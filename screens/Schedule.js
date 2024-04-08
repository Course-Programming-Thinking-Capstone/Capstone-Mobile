import {
    View,
    StyleSheet,
} from 'react-native';
import React, { useState } from "react-native";
import WeeklyCalendar from 'react-native-weekly-calendar';

const Schedule = () => {
    const sampleEvents = [
        { 'start': '2024-04-01 09:00:00', 'duration': '00:20:00', 'note': 'Schedule 1' },
        { 'start': '2024-04-01 14:00:00', 'duration': '01:00:00', 'note': 'Schedule 2' },
        { 'start': '2024-04-01 08:00:00', 'duration': '00:30:00', 'note': 'Schedule 3' },
        { 'start': '2024-04-02 14:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
        { 'start': '2024-04-02 19:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' },
        { 'start': '2024-04-03 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 6' },
        { 'start': '2024-04-03 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 7' },
        { 'start': '2024-04-04 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 8' },
        { 'start': '2024-04-04 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 9' },
        { 'start': '2024-04-09 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 10' }  
    ]
    return (
        <View style={styles.container}>
            <WeeklyCalendar events={sampleEvents} dayLabelStyle={{color:'blue',fontWeight:'600'}} style={{ flex:1,backgroundColor:'white'}} themeColor='blue' />
        </View>
    );
};
export default Schedule;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});