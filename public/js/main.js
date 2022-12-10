const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_val = document.getElementById('temp_val');
const data_hide = document.querySelector('.middle_layer');

const getinfo = async (event) => {
    event.preventDefault();
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Plz write the name in the search area"
        data_hide.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=1bd40e1408d74c799c342e7bf4578839`;
            const responce = await fetch(url);
            const data = await responce.json();
            // console.log(data);
            const arrData = [data];

            let fv = parseInt(arrData[0].main.temp);
            let cv = (fv - 32) * 5 / 9;
            // conversion of temp
            temp_val.innerText = cv.toFixed(2);

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            // temp_status.innerText = arrData[0].weather[0].main;

            const tempStatus = arrData[0].weather[0].main;
            if (tempStatus === "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68'></i>";
            } else if (tempStatus == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>";
            } else if (tempStatus === "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68'></i>";
            }
            data_hide.classList.remove('data_hide');
        } catch {
            city_name.innerText = "Plz write the name properly"
            data_hide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getinfo);