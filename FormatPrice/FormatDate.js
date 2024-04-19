export const formatDate = (apiDate) => {
    // Tách ngày và thời gian
    const [datePart, timePart] = apiDate.split(' ');

    // Tách ngày thành các phần
    const [year, month, day] = datePart.split('/');

    // Tách thời gian thành các phần
    const [hour, minute, second] = timePart.split(':');

    // Tạo một đối tượng ngày mới
    const formattedDate = new Date(year, month - 1, day, hour, minute, second);

    // Thêm 7 giờ
    formattedDate.setHours(formattedDate.getHours() + 7);

    // Format lại ngày và thời gian
    const formattedDateString = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()} ${formattedDate.getHours()}:${formattedDate.getMinutes()}:${formattedDate.getSeconds()}`;

    return formattedDateString;
}
