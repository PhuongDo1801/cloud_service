/**
* Mô tả: Hàm format date
* created by : DDPHUONG
* created date: 29-05-2023 20:21:03
*/
const formatDateWithSlash = (dateValue) => {
        if(!dateValue){
            return "";
        }
        else{
            let date = new Date(dateValue);
            let dateString = (date.getDate()).toString().padStart(2, "0");
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let year = date.getFullYear();
            return `${year}-${month}-${dateString}`;
        } 
};

const formatDateWithDash = (dateValue) => {
    if(!dateValue){
        return "";
    }
    else{
        let date = new Date(dateValue);
        let dateString = (date.getDate()).toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();
        return `${dateString}/${month}/${year}`;
    } 
}

export {
    formatDateWithSlash, formatDateWithDash
}