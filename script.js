const apiKey = "";//replace with your api key
const weatherResult = document.getElementById("weatherResult");
const getWeatherButton = document.getElementById("getWeather");
const refreshPageButton = document.getElementById("refreshPage");

getWeatherButton.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  const apiUrl = `https://weather-backend-bnuj.onrender.com/weather?city=${city}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      if(errorData.message){
        weatherResult.textcontent = `Error: ${errorData.message}`;
      }
      else{
        weatherResult.textContent = "city not found. please check the city name.";
      }
      return;
    }

    const data = await response.json();
    const { main, weather, name } = data;

    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${main.temp}°C</p>
      <p>Condition: ${weather[0].description}</p>
    `;
  } catch (error) {
    weatherResult.textContent = error.message;
  }
});

refreshPageButton.addEventListener("click", () => {
    location.reload();
})
