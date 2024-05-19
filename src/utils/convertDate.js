export const convertDate = (date) => {
    const date1 = new Date(date);

    const day = date1.getDate();
    const month = date1.getMonth() + 1;
    const year = date1.getFullYear();

    const dateString = day + '/' + month + '/' + year;
    return dateString;
}