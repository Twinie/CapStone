// TODO: Is this being used? There is no export here. Remove if unused
function currentWeather(data1) {

    console.log(data1);
    document.getElementById('temp').innerHTML = `Temperature : ${data1.data[0].temp} degree Celcius`;
    document.getElementById('wind').innerHTML = `Wind : ${data1.data[0].wind_spd} metre/sec`;
}
