import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, { useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import moment from 'moment';

const Schedule = () => {
    const [items, setItems] = useState({});
    const hasData = (dateString) => {
        if (dateString === '2024-03-15' || dateString === '2024-03-20' || dateString === '2024-03-28') {
            return true;
        }
        return false;
    };

    const loadItemsForWeek = (day) => {
        const newItems = {};
        const startDate = moment(day.dateString).startOf('isoWeek'); // Ngày đầu tuần (Thứ 2)
        const endDate = moment(day.dateString).endOf('isoWeek'); // Ngày cuối tuần (Chủ nhật)

        for (let date = startDate; date.isSameOrBefore(endDate); date.add(1, 'day')) {
            const dateString = date.format('YYYY-MM-DD');
            if (hasData(dateString)) {
                newItems[dateString] = [
                    { day: dateString, height: 50, status: "Absent", startTime: '7:30', endTime: '11:30', name: "Toan" },
                    { day: dateString, height: 50, status: "Attendance", startTime: '7:30', endTime: '11:30', name: "Toan 2" },
                    { day: dateString, height: 101, status: "Attendance", startTime: '7:30', endTime: '11:30', name: "Dia" },
                ];
            } else {
                newItems[dateString] = [];
            }
        }

        setItems(newItems);
    };
    const markedDates = {
        '2024-03-15': { marked: true },
        '2024-03-20': { marked: true },
        '2024-03-28': { marked: true },
    };
    const renderItem = (reservation, isFirst) => {
        return (
            <View>
                <TouchableOpacity
                    style={[styles.item]}
                    onPress={() => Alert.alert(reservation?.name)}
                >
                    <Text>{reservation?.name}</Text>
                    <Text>{reservation?.startTime} - {reservation?.endTime}</Text>
                    <Text
                        style={[
                            reservation?.status.toLowerCase() == "attendance"
                                ? styles.attendance
                                : styles.absent,
                        ]}
                    >
                        {reservation?.status}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const currentDate = moment().format('YYYY-MM-DD');

    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                minDate={"2024-03-01"}
                maxDate={currentDate}
                loadItemsForMonth={loadItemsForWeek}
                renderItem={renderItem}
                markedDates={markedDates}
            ></Agenda>
        </View>
    );
};
export default Schedule;
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    separator: {
        height: 5, width: 90, backgroundColor: 'blue'
    }
});