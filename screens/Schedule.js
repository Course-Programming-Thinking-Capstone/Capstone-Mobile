import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { getSchedule } from '../Api/Schedule';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Schedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const scheduleData = await getSchedule();
            if (scheduleData) {
                setSchedule(scheduleData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (!schedule || !schedule.studyDay) {
        return null;
    }

    const events = [];

    const startDate = moment(schedule.openClass, 'YYYY/MM/DD');
    const endDate = moment(schedule.closeClass, 'YYYY/MM/DD');
    const durationInDays = endDate.diff(startDate, 'days') + 1;

    for (let i = 0; i < durationInDays; i++) {
        const currentDate = startDate.clone().add(i, 'days');
        const dayOfWeek = currentDate.format('dddd');
        if (schedule.studyDay.includes(dayOfWeek)) {
            const start = moment(`${currentDate.format('YYYY/MM/DD')} ${schedule.startSlot}`, 'YYYY/MM/DD HH:mm:ss');
            const eventStart = moment(`${currentDate.format('YYYY/MM/DD')} ${schedule.startSlot}`, 'YYYY/MM/DD HH:mm:ss');
            const eventEnd = moment(`${currentDate.format('YYYY/MM/DD')} ${schedule.endSlot}`, 'YYYY/MM/DD HH:mm:ss');
            const durationMs = eventEnd.diff(eventStart);
            const duration = moment.utc(durationMs).format("HH:mm:ss"); 

            for (let j = 0; j < schedule.classId; j++) {
                const eventStart = start.clone().add(j * schedule.slotDuration, 'minutes');
                const eventEnd = eventStart.clone().add(schedule.duration, 'hours');
                events.push({
                    start: eventStart.format('YYYY-MM-DD HH:mm:ss'),
                    duration: duration, 
                    note: `${schedule.classCode}`,
                    roomUrl: schedule.roomUrl,
                    teacherName:schedule.teacherName,
                    totalSlot: schedule.totalSlot
                });
            }
        }
    }
    return (
        <View style={styles.container}>
            <WeeklyCalendar events={events} dayLabelStyle={{ color: 'blue', fontWeight: '600' }} style={{ flex: 1, backgroundColor: 'white'}} themeColor='blue' />
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