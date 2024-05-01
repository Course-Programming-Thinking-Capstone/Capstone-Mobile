export const formatDate = (apiDate) => {
    const [datePart, timePart] = apiDate.split(' ');

    const [year, month, day] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');

    const formattedDate = new Date(year, month - 1, day, hour, minute, second);
    formattedDate.setHours(formattedDate.getHours() + 7);

    // Sử dụng padStart để thêm số 0 phía trước nếu cần thiết
    const formattedDateString = `${formattedDate.getDate().toString().padStart(2, '0')}/${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}/${formattedDate.getFullYear()} ${formattedDate.getHours().toString().padStart(2, '0')}:${formattedDate.getMinutes().toString().padStart(2, '0')}:${formattedDate.getSeconds().toString().padStart(2, '0')}`;

    return formattedDateString;
}

export function formatDay(dateString) {
    if (dateString && typeof dateString === 'string') {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return parts[2] + '/' + parts[1] + '/' + parts[0];
        } else {
            return 'Invalid Date';
        }
    } else {
        return 'Invalid Date';
    }
}


