// function to fetch the weather
async function getWeather(location) {
  const weather = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fd7a3d95ad1ccad3cd5bae68ac1a5a0c`,
    {
      mode: "cors",
      method: "GET",
    }
  );
  const actualWeather = await weather.json();
  return actualWeather;
}

function kelvin2Celsius(kelvin) {
  return parseInt(kelvin, 10) - 273.15;
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = form.elements.loc.value;
  getWeather(loc).then((weather) =>
    console.log(kelvin2Celsius(weather.main.temp))
  );
});

// ask the user what location they want the weather for

// getWeather("london").then(weather => console.log(kelvin2Celsius(weather.main.temp)));
if (true) {
  // nonempty
}

async function getWeather2(location) {
  const weather = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fd7a3d95ad1ccad3cd5bae68ac1a5a0c`,
    { mode: "cors", method: "GET" }
  );

  function sayHi(name) {
    const age = 10;
    return age;
  }
}

const age = 12;

const things = ["cool", "double!!"];
