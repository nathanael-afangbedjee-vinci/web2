const btn = document.querySelector("button");
const text = document.querySelector("span");

let start;
let nbClick = 0;
let time = 5;
let TimeID;

btn.addEventListener("click" , WriteClick );
btn.addEventListener("mouseover", startTime);

function startTime(){
    start = new Date();
    TimeID = setTimeout(BadTime, time * 1000);
  }
  
  function WriteClick() {
    ++nbClick;
    if (nbClick ===10) {
      clearTimeout(TimeID);
      GoodTime();
    }
    
  }
  
  function BadTime() {
  alert(`Game over, you did not click 10 times within 5s !`);  
  }

  function GoodTime(){
    const timeIn =  Math.floor(new Date() -start);
    alert(`You win ! You clicked 10 times within ${timeIn} ms`);
    clearTimeout(TimeID);
  }

  