/**
* Mô tả: Xử lý  lỗi
* created by : DDPHUONG
* created date: 06-07-2023 03:48:05
*/

const handleApiErr = (error, textDialog) => {
    if(error.response.status == 400){
        const Errors = error.response.data.ErrorMsgs;
        let keys = Object.keys(Errors);
        for(let key of keys){
            textDialog.push(...Errors[key]);
        }
    }
    else if(error.response.status == 500){
        const Errors = error.response.data.ErrorMsgs;
        let keys = Object.keys(Errors);
        for(let key of keys){
            textDialog.push(...Errors[key]);
        }
    }
    return error.response.data.ErrorMsgs;
}

export {
    handleApiErr
}