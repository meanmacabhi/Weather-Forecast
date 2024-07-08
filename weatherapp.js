const URL ="http://api.weatherapi.com/v1/forecast.json?key=71329eee1ac04af98e562705240104&days=6&aqi=no&alerts=no";

const city = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");





async function getweatherdata(location){
    const output = await fetch(URL + `&q=${location}`);//output is of jSON format
    // console.log(output);
    var data = await output.json();//converting JSON format to JS object
     console.log(data);
    document.querySelector(".city").innerHTML = data.location.name+","+data.location.country;
    document.querySelector(".temp").innerHTML = data.current.temp_c+"°C";

    document.querySelector(".Wind").innerHTML = data.current.wind_kph+" km/h";
    document.querySelector(".Humidity").innerHTML = data.current.humidity+"%";
    document.querySelector(".Precipitation").innerHTML = data.current.precip_mm+" mm";
    document.querySelector(".Pressure").innerHTML = data.current.pressure_in+" in";


   


      // Loop through forecast days to chnage respective icons,min/max temp and dates
for (let i = 0; i < 6; i++) {
  let cond = data.forecast.forecastday[i].day.condition.text;
  let icon;

  switch (cond) {
    case 'Sunny':
      icon = 'fas fa-sun'; // Sunny
      break;
    case 'Partly Cloudy ':
      icon = 'fa-solid fa-cloud'; // Cloudy
      break;
      case 'Mist':
      icon = 'fa-solid fa-cloud'; // Cloudy
      break;
      case 'Light rain':
      icon = 'fa-solid fa-cloud-rain'; // Cloudy
      break;
      case 'Moderate or heavy rain with thunder':
      icon = 'fa-solid fa-cloud-bolt'; // Cloudy
      break;
      case 'Patchy rain nearby':
      icon= 'fa-solid fa-cloud-rain'; // Cloudy
      break;
      case 'Overcast':
      icon= 'fa-solid fa-cloud'; // Cloudy
      break;
    // Add more cases for other weather conditions as needed
    default:
      icon = 'fas fa-question'; // Default icon
      break;
  }
  if(i==0){
    document.querySelector(".weatherlogo").innerHTML = `<i class="${icon}"></i>`;
  }

  // Update the weather icon,min,max temp,date for each day
  else{
  document.querySelector(`.l${i}`).innerHTML = `<i class="${icon}"></i>`;
  document.querySelector(`.t${i}`).innerHTML = `${data.forecast.forecastday[i].day.mintemp_c}°C/${data.forecast.forecastday[i].day.maxtemp_c}°C`;
  document.querySelector(`.date${i}`).innerHTML = data.forecast.forecastday[i].date;
  }
}





   
};


searchbtn.addEventListener("click",()=>{
    getweatherdata(city.value);
})




