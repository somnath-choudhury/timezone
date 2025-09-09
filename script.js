// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");
// const rememberMeCheckbox = document.getElementById("checkbox");
// const submitButton = document.getElementById("submit");
// const existingUserButton = document.getElementById("existing");

// window.onload = function() {
//     const savedUserName = localStorage.getItem("username")
//     const savedPassword = localStorage.getItem("password")

//     if (savedUserName && savedPassword) {
//         existingUserButton.style.display = 'inline-block'
//     }
//     else {
//         existingUserButton.style.display = 'none'
//     }

//     usernameInput.value = "";
//     passwordInput.value = "";
//     rememberMeCheckbox.checked = false;
// }

// submitButton.addEventListener('click', function() {
//     const username = usernameInput.value.trim();
//     const password = passwordInput.value;

//     if (!username || !password) {
//         alert("Please enter username and password...")
//         return;
//     }

//     alert(`Logged in as ${username}`)

//     if (rememberMeCheckbox.checked) {
//         localStorage.setItem("username", username);
//         localStorage.setItem("password", password);
//     }
//     else {
//         localStorage.removeItem("username")
//         localStorage.removeItem("password")
//     }

//     const savedUserName = localStorage.getItem("username");
//     const savedPassword = localStorage.getItem("password");
//     existingUserButton.style.display = (savedUserName && savedPassword)? "inline-block" : "none"
// });


// existingUserButton.addEventListener('click', function() {
//     const savedUsername = localStorage.getItem("username");
//     if (savedUsername) {
//         alert(`Logged in as ${savedUsername}`)
//     }
// })

// const itemNameInput = document.querySelector('.item-name');
// const deadlineInput = document.querySelector('.deadline');
// const priorityInput = document.querySelector('.priority');
// const addButton = document.querySelector('.add-btn');

// const todayContainer = document.getElementById('today');
// const futureContainer = document.getElementById('future');
// const completedContainer = document.getElementById('completed');

// const STORAGE_KEY = "todoList"

// let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// function getTodayDate() {
//   return new Date().toISOString().split('T')[0];
// }

// function saveTodos() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
// }

// function renderTodos() {
//   document.getElementById('today').innerHTML = '<p>Today’s TodoList</p>';
//   document.getElementById('future').innerHTML = '<p>Future TodoList</p>';
//   document.getElementById('completed').innerHTML = '<p>Completed TodoList</p>';

//   todoList.forEach((todo, index) => {
//     const todoDiv = document.createElement('div');
//     todoDiv.className = 'todo-item';

//     todoDiv.innerHTML = `
//       <span class="item-name">${index + 1}. ${todo.name}</span>
//       <span class="item-date">${todo.date}</span>
//       <span class="item-priority">${todo.priority}</span>
//     `;

//     const actions = document.createElement('span');
//     actions.className = 'item-actions';

//     if (!todo.completed) {
//       const checkBtn = document.createElement('img');
//       checkBtn.src = "check-circle.png";
//       checkBtn.alt = "Complete";
//       checkBtn.style.cursor = 'pointer';

//       checkBtn.onclick = () => {
//         todo.completed = true;
//         saveTodos();
//         renderTodos();
//       };

//       actions.appendChild(checkBtn);
//     }

//     const deleteBtn = document.createElement('img');
//     deleteBtn.src = todo.completed ? '2.png' : 'trash.png';
//     deleteBtn.alt = 'Delete';
//     deleteBtn.style.cursor = 'pointer';

//     deleteBtn.onclick = () => {
//       todoList.splice(index, 1);
//       saveTodos();
//       renderTodos();
//     };

//     actions.appendChild(deleteBtn);
//     todoDiv.appendChild(actions);

//     if (todo.completed) {
//       todoDiv.classList.add('completed-item');
//       document.getElementById('completed').appendChild(todoDiv);
//     } else if (todo.date === getTodayDate()) {
//       document.getElementById('today').appendChild(todoDiv);
//     } else {
//       document.getElementById('future').appendChild(todoDiv);
//     }
//   });
// }

// addButton.addEventListener('click', () => {
//   const name = itemNameInput.value.trim();
//   const date = deadlineInput.value;
//   const priority = priorityInput.value;

//   if (!name || !date || priority === 'Priority') {
//     alert("Please fill all the fields...");
//     return; // prevent further execution
//   }

//   const newTodo = {
//     name,
//     date,
//     priority,
//     completed: false
//   };

//   todoList.push(newTodo);
//   saveTodos();

//   // Clear input fields
//   itemNameInput.value = '';
//   deadlineInput.value = '';
//   priorityInput.value = 'Priority';

//   renderTodos();
// });

// // Initial render on page load
// renderTodos();

document.addEventListener('DOMContentLoaded', () => {
  const currLat = document.getElementById("current-lat");
  const currLon = document.getElementById("current-long") 
  const currTimezone = document.getElementById('curr-timezone')
  const STD = document.getElementById('curr-std')
  const STD_seconds = document.getElementById('curr-std-seconds')
  const DST = document.getElementById('curr-offset-dst')
  const DST_seconds = document.getElementById('curr-offset-dst-seconds')
  const currCountry = document.getElementById('curr-country')
  const currPostcode = document.getElementById('curr-postcode')
  const currCity = document.getElementById('curr-city')

  const submitBtn = document.getElementById('submit-btn')

  const apiKey = "a5f44210cbdb4354ae3198b2edc2084f";


  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
    else {
      currLat.innerHTML = `Geolocation is not supported on this device...`
    }
  }

  function success(position) {
    const currLatitude = position.coords.latitude;
    const currLongitude = position.coords.longitude;

    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${currLatitude}&lon=${currLongitude}&format=json&apiKey=${apiKey}`)
    .then(resp => {
      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      return resp.json();
    })
    .then(result => {
      console.log("Full response:", result);

      if (result.results && result.results.length > 0) {
        const timezone = result.results[0].timezone.name;
        const offset_STD = result.results[0].timezone.offset_STD
        const offset_STD_seconds = result.results[0].timezone.offset_STD_seconds
        const offset_DST = result.results[0].timezone.offset_DST
        const offset_DST_seconds = result.results[0].timezone.offset_DST_seconds
        const country = result.results[0].country
        const postcode = result.results[0].postcode
        const city = result.results[0].city
        console.log(city);

        currLat.innerHTML += `${currLatitude}`
        currLon.innerHTML += `${currLongitude}`
        currTimezone.innerHTML += `${timezone}`
        STD.innerHTML += `${offset_STD}`
        STD_seconds.innerHTML += `${offset_STD_seconds}`
        DST.innerHTML += `${offset_DST}`
        DST_seconds.innerHTML += `${offset_DST_seconds}`
        currCountry.innerHTML += `${country}`
        currCity.innerHTML += `${city}`
        currPostcode.innerHTML += `${postcode}`
        
        
      } else {
        console.log("No location found");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err.message);
    });


  }

  function error() {
    alert(`Sorry no position available`)
  }

  function getInputLocation() {
      const inputTimeDetails = document.getElementById('input-time-details')
      const addressInput = document.getElementById('address-input')

      if (addressInput.value.trim() === '') {
        inputTimeDetails.innerHTML = ``;
        inputTimeDetails.innerHTML = `
        <p style="color: red;">Please enter an address</p>
        `
      }
      else {
        const address = addressInput.value.trim();

  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&format=json&apiKey=${apiKey}`)
    .then(resp => {
      if (!resp.ok) throw new Error(`Geocoding API error! Status: ${resp.status}`);
      return resp.json();
    })
    .then(geoResult => {
      if (geoResult.results && geoResult.results.length > 0) {
        const lat = geoResult.results[0].lat;
        const lon = geoResult.results[0].lon;

        return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`);
      } else {
        inputTimeDetails.innerHTML = `<p style="color: red;">Address not found. Please enter a valid one.</p>`;
        throw new Error("Invalid address.");
      }
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`Timezone API error! Status: ${resp.status}`);
      return resp.json();
    })
    .then(timezoneResult => {
      if (timezoneResult.results && timezoneResult.results.length > 0) {
        const data = timezoneResult.results[0];

        const timezone = data.timezone.name;
        const inputLatitude = data.lat
        const inputLongitude = data.lon
        const offset_STD = data.timezone.offset_STD;
        const offset_STD_seconds = data.timezone.offset_STD_seconds;
        const offset_DST = data.timezone.offset_DST;
        const offset_DST_seconds = data.timezone.offset_DST_seconds;
        const country = data.country;
        const postcode = data.postcode || "N/A";
        const city = data.city || data.state || "Unknown";


        inputTimeDetails.innerHTML = `
          <p>Name of Time Zone: ${timezone}</p>
          <p>Latitude: ${inputLatitude}</p>
          <p>Longitude: ${inputLongitude}</p>
          <p>Offset STD: ${offset_STD} (${offset_STD_seconds} seconds)</p>
          <p>Offset STD Seconds: ${offset_STD} (${offset_STD_seconds} seconds)</p>
          <p>Offset DST: ${offset_DST} (${offset_DST_seconds} seconds)</p>
          <p>Offset DST Seconds: ${offset_DST} (${offset_DST_seconds} seconds)</p>
          <p>Country: ${country}</p>
          <p>Postcode: ${postcode}</p>
          <p>City:  ${city}</p>
          
        `;
      } else {
        inputTimeDetails.innerHTML = `<p style="color: red;">Could not retrieve timezone for this location.</p>`;
      }
    })
    .catch(err => {
      console.error("Error:", err.message);
      if (!inputTimeDetails.innerHTML.includes("Address not found")) {
        inputTimeDetails.innerHTML = `<p style="color: red;">An unexpected error occurred.</p>`;
      }
    });
      }
  }

  getCurrentLocation()
  submitBtn.addEventListener('click', getInputLocation)
})