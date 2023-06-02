
let outerDiv = document.querySelector('.outerDiv');

let row1 = document.querySelector('.row1');
row1.setAttribute('class', 'row justify-content-center bg-light fs-1');
row1.setAttribute('style','color:red;font-weight:bold');
row1.textContent = 'RestCountries Weather Details';

let row2 = document.querySelector('.row2');
row2.setAttribute('class', 'row justify-content-center');
row2.setAttribute('style', 'background-color:#6f7385');

let allCountries = document.querySelector('.allCountry');
let countryDetail = document.querySelector('.countryDetail');

let countryFlag = document.querySelector('.countryFlag');

let row3 = document.querySelector('.row3')


async function fetchdata() {
    let response = await fetch('https://restcountries.com/v3.1/all');
    let data = await response.json();
    console.log(data)
    return data;
}

async function weatherData(id) {
let country = await fetchdata()
let cityName = country[id].name.common
let apiKey = 'd92e3b7365d2e22d7605e9aeb27c267e';
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
let data = await response.json();
return data;
}

getCards();

document.body.prepend(outerDiv)
outerDiv.append(row1,row2);
row2.appendChild(allCountries);

async function createCards(id) {
let content = await fetchdata();
let name = content[id].name.common;
let capital = content[id].capital;


let flag = content[id].cca2;

let colDiv = document.createElement('div');
colDiv.setAttribute('class','col-lg-4  mt-4 mb-3 justify-content-center');

let card = document.createElement('div');
card.setAttribute('class','card m-3');

let cardHeader = document.createElement('h4');
cardHeader.setAttribute('class','card-header mt-2 bg-secondary text-white text-center fs-3')
cardHeader.textContent = name;

let cardBody = document.createElement('div');
cardBody.setAttribute('class','card-body text-center fs-4 fw-bold')

let image = document.createElement('img');
image.setAttribute('class','card-img');
image.setAttribute('style','height:12rem');
image.setAttribute('src',`https://flagcdn.com/w320/${flag.toLowerCase()}.png`);
image.setAttribute('alt','flag');

let details = document.createElement("div");
details.setAttribute('class','fs-5 mt-3');
details.innerHTML = `Capital : ${capital}<br>`

let button = document.createElement('button');
button.setAttribute('class','btn btn-primary mt-3 fs-5 fw-bold');
button.textContent = 'Click for More Details'
button.onclick = async function() {
    row2.removeChild(allCountries)
    getCountryCard(id)

    async function getCountryCard(id) {
        let content = await fetchdata(id);
        let name = content[id].name.common;
        let capital = content[id].capital;
        let region = content[id].region;
        let subregion = content[id].subregion;
        let latitude = content[id].latlng[0]
        let longitude = content[id].latlng[1]
        let countryCode = content[id].cca3
        let flag = content[id].cca2;
        let continent = content[id].continents;
        let population = content[id].population;
        let startOfWeek = content[id].startOfWeek;
        let timeZone = content[id].timezones;
        let borders = content[id].borders;

    let cardImg = document.createElement('img');
    cardImg.setAttribute('class','card-img card-rounded');
    cardImg.src = `https://flagcdn.com/w320/${flag.toLowerCase()}.png`;
    

    let details = document.createElement('div')
    details.setAttribute('class','text-white fw-bold fs-3')
    details.innerHTML = `<em>${name}</em><br><br>`;

    details.innerHTML += `Capital :  <em>${capital}</em><br>`
    details.innerHTML += `Continent :  <em>${continent}</em><br>`
    details.innerHTML += `Region : <em>${region}</em><br>`
    details.innerHTML += `Sub-Region : <em>${subregion}</em><br>`
    details.innerHTML += `Latitude : <em>${latitude}</em>, Longitude : <em>${longitude}</em><br>`
    details.innerHTML += `Country code : <em>${countryCode}</em><br><br>`
    details.innerHTML += `Population : <em>${population}</em><br>`
    details.innerHTML += `StartOfWeek : <em>${startOfWeek}</em><br>`
    details.innerHTML += `TimeZone : <em>${timeZone}</em><br><br>`
    details.innerHTML += `Borders : <em>${borders}</em><br>`

    let button1 = document.createElement("button")
    button1.setAttribute("class", "btn btn-primary mt-3")
    button1.innerText = "Go Back"
    button1.onclick = function() {
        row2.append(allCountries)
           
        countryFlag.remove(cardImg, button1)
        countryDetail.remove(details)
        location.reload();
    }

    countryFlag.append(cardImg, button1)
    countryDetail.append(details)
    
    }
}


allCountries.appendChild(colDiv)
colDiv.appendChild(card);
card.append(cardHeader,cardBody);
cardBody.append(image,details);
details.appendChild(button);
}

async function getCards() {
for(let i=0; i<250; i++) {
    await createCards(i)
}
}