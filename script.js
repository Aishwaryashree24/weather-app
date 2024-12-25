const apiKey = "0e30f7cfa72aef3d4214d2be5951e4ef";
const weatherResult = document.getElementById("weatherResult");
const getWeatherButton = document.getElementById("getWeather");
const refreshPageButton = document.getElementById("refreshPage");

getWeatherButton.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
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
