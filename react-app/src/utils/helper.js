
export function  getMonthYear (dateStr) {

    let arr = dateStr.split('-');
    const date = new Date(dateStr)
    const year = arr[0];
    const month = arr[1]
    const dateValue = arr[2]
    let mon
    switch (parseInt(month)) {
        case 1:
            mon = "January";
            break;
        case 2:
            mon = "February";
            break;
        case 3:
            mon = "March";
            break;
        case 4:
            mon = "April";
            break;
        case 5:
            mon = "May";
            break;
        case 6:
            mon = "June";
            break;
        case 7:
            mon = "July";
            break;
        case 8:
            mon = "August";
            break;
        case 9:
            mon = "September";
            break;
        case 11:
            mon = "November";
            break;
        case 12:
            mon = "December";
            break;
        default:
            mon = "October"
            break; 
    }
    let res = mon + " "+ dateValue +', ' + year
    
    return mon + " "+ dateValue +', ' + year;
}
