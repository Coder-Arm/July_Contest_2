const hrs = document.getElementsByClassName("hrs");
const mins = document.getElementsByClassName("mins");
const secs = document.getElementsByClassName("secs");
const setTimeBtn = document.getElementById("set-btn");
const activeSection = document.getElementById("active-container");

setTimeBtn.addEventListener("click", () => {
  if (hrs[0].value != 0 || mins[0].value != 0 || secs[0].value != 0) {
    const activeDiv = document.createElement("div");
    activeDiv.className = "set-time-box";
    activeDiv.innerHTML = `<span>Time Left :</span>
           <div class="inputs">
             <input type="number" class="hrs" placeholder="hh" />
             <span>:</span>
             <input type="number" class="mins" placeholder="mm" />
             <span>:</span>
             <input type="number" class="secs" placeholder="ss" />
           </div>
           <button class = "delete-btn">Delete</button>`;

        if (activeSection.innerText === "You have no timers currently!") {
          activeSection.innerText = "";
        }
    activeDiv.getElementsByClassName("hrs")[0].value = hrs[0].value;
    activeDiv.getElementsByClassName("mins")[0].value = mins[0].value;
    activeDiv.getElementsByClassName("secs")[0].value = secs[0].value;

    activeSection.appendChild(activeDiv);
    timer(activeDiv, hrs[0].value, mins[0].value, secs[0].value);
    hrs[0].value = "";
    mins[0].value = "";
    secs[0].value = "";
  }
});

function timer(element, hrs, mins, secs) {
  const interval = setInterval(() => {
    if (hrs == 0 && mins == 0 && secs == 0) {
      hrs = "";
      mins = "";
      secs = "";
      clearInterval(interval);
      timesUp(element);
    } else if (secs > 59) {
      const times = Math.floor(secs / 60);
      mins = mins + times;
      secs -= 60 * times;
    } else if (secs != 0) {
      secs--;
    } else if (mins > 59 && secs == 0) {
      const times = Math.floor(mins / 60);
      hrs = hrs + times;
      mins -= 60 * times;
    } else if (mins != 0 && secs == 0) {
      mins--;
      secs = 59;
    } else if (hrs != 0 && mins == 0) {
      hrs--;
      mins = 59;
      secs = 59;
    }
      
    element.getElementsByClassName("hrs")[0].value = hrs;
    element.getElementsByClassName("mins")[0].value = mins;
    element.getElementsByClassName("secs")[0].value = secs;
  }, 1000);

  element.getElementsByClassName("delete-btn")[0].addEventListener('click',()=>{
    element.remove();
  })
}

function timesUp(element) {

  element.style.display = "none";
  const activeDiv = document.createElement("div");
  activeDiv.className = "set-time-box timesUpBox";
  activeDiv.innerHTML = `<audio class= "audio" src="./mixkit-happy-bells-notification-937.wav" loop ></audio><span class="timesUpText">Time is Up !</span><button id="stop-btn">Stop</button>`;
  activeSection.appendChild(activeDiv);
  const audioElement = activeDiv.querySelector(".audio");
  audioElement.play();
  document.getElementById("stop-btn").addEventListener("click", () => {
    activeDiv.remove();
  });
}
