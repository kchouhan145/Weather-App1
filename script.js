const APIKey = `1cabb08971961b9149439c3ff8d1d659`;
const APIKeyCity = `160d4289a6214b15b7fa0f4c3b71a824`;

const searchin = document.getElementById('search-in');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const date = document.getElementById('date');
const temperature = document.getElementById('temperature');
const descrip = document.getElementById('description');
const windInfo = document.getElementById('wind');
const humidityInfo = document.getElementById('humidity');
const visibilityInfo = document.getElementById('visibility');
const dataContainer = document.getElementById('dataID');
const container = document.querySelector(".container");
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

async function showSuggestions() {
    let responseCity = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchin.value}&apiKey=${APIKeyCity}`);
    let dataCity = await responseCity.json();
    let suggestions = dataCity.features.map(feature => feature.properties.city);
    
    let suggestionsList = document.getElementById('suggestions');
    suggestionsList.textContent = '';
    
    suggestions.forEach(city => {
        let listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.addEventListener('click', () => {
            searchin.value = city;
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(listItem);
    });
}

async function getWeatherData(city) {
    const valueS=searchin.value.trim();
   if(!valueS)
   {

        swal("Input Required", "Please enter a value to search", "warning");
   }
   else
   {
     let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    let data = await response.json();
    // console.log(data);
    dataContainer.classList.remove('data-container');
    container.style.background="rgba(255, 255, 255, 0.1)";
    container.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.1)";
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthIndex = today.getMonth();
    const monthName = monthNames[monthIndex];
    const year = today.getFullYear();
    const formattedDate = `${day} ${monthName} ${year}`;
    date.textContent = formattedDate;
    cityName.textContent = data.name;
    temperature.textContent = parseInt(data.main.temp)+"°";
    descrip.textContent =  data.weather[0].main;
    windInfo.textContent = data.wind.speed;
    humidityInfo.textContent = data.main.humidity+"%";
    let visibilityData = data.visibility;
    visibilityInfo.textContent = visibilityData/1000 + "KM";
   }
}

searchBtn.addEventListener('click', () => {
    let city = searchin.value;
    getWeatherData(city);
});

searchin.addEventListener('input', showSuggestions);