const message= new String;
const dateTimeNow = new Date();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

function addDateTime(message){
    message = "This is the best moment to have a look at this website !"
    return dateTimeNow.toLocaleDateString()+ " " + dateTimeNow.toLocaleTimeString()+ " " + message
}

alert(addDateTime(message));

