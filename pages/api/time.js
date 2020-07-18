const app_id = process.env.APP_ID;
const app_code = process.env.APP_CODE;

export default async (req, res) => {
  var { location: name } = req.query;
  name = name && name.trim();
  const maxLength = 500;
  const url = "https://weather.cit.api.here.com/weather/1.0/report.json";
  const product = "forecast_astronomy";
  const search = new URLSearchParams({ product, name, app_id, app_code });
  const weatherApi = url + "?" + search.toString();

  const localTime = (timezone) => {
    const clientTime = new Date();
    const timezoneOffset = clientTime.getTimezoneOffset() / 60;
    const gmt = clientTime.getHours() + timezoneOffset;
    const localHour = (gmt + timezone) % 24;
    return { hour: localHour, minute: clientTime.getMinutes() };
  };

  const sunTime = (time) => {
    const split = time.split(":");
    var hour = Number(split[0]);
    const minute = Number(split[1].slice(0, 2));
    const meridiem = split[1].slice(2);
    meridiem.toLowerCase() === "pm" && (hour = Number(hour) + 12);
    return { hour, minute };
  };

  const whichSun = (sunrise, sunset, timezone) => {
    const sunriseT = sunTime(sunrise);
    const sunsetT = sunTime(sunset);
    const currentT = localTime(timezone);
    return currentT.hour < sunriseT.hour ||
      (currentT.hour === sunriseT.hour && currentT.minute < sunriseT.minute)
      ? {
          render: "sunrise",
          diff: sunriseT.hour - currentT.hour,
          ...sunriseT,
        }
      : currentT.hour < sunsetT.hour ||
        (currentT.hour === sunsetT.hour && currentT.minute < sunsetT.minute)
      ? {
          render: "sunset",
          diff: sunsetT.hour - currentT.hour,
          ...sunsetT,
        }
      : {
          render: "sunrise",
          diff: sunriseT.hour - currentT.hour + 24,
          ...sunriseT,
        };
  };

  const handleSuccess = (data) => {
    const { city, state, timezone, astronomy } = data.astronomy;
    const { sunrise, sunset } = astronomy[0];
    const sun = whichSun(sunrise, sunset, timezone);
    const { hour: _hour, minute, render, diff } = sun;
    const padded_minute = minute.toString().padEnd(2, "0");
    const hour = _hour % 12;
    minute > 30 && hour === hour + 1;
    const meridiem = _hour > 12 ? "PM" : "AM";
    res.json({
      citystate: city + ", " + state,
      sunset: `${hour}:${padded_minute} ${meridiem}` || "12 AM",
      hour:
        `${
          render == "sunset" ? hour - 1 : hour
        }:${padded_minute} ${meridiem}` || "12 AM",
      what: render,
      diff: diff || 0,
    });
  };

  const handleFail = (err) =>
    res.status(500).send(err || "Failed to get location.");

  !name
    ? res.status(400).send("Please provide a location.")
    : name.length > maxLength
    ? res
        .status(400)
        .send(`Location can't be more than ${maxLength} characters.`)
    : await fetch(weatherApi)
        .then((fetchResponse) => fetchResponse.json())
        .then((fetchData) =>
          fetchData && fetchData.astronomy && fetchData.astronomy.astronomy
            ? handleSuccess(fetchData)
            : handleFail("Failed to get location.")
        )
        .catch(handleFail);
};
