let form = document.querySelector('.kuralForm');
let noInput = document.querySelector('.noInput');
let kuralInfo = document.querySelector('.kuralInfo');

let body = document.querySelector('body');
body.style.backgroundImage = "url('https://store-images.s-microsoft.com/image/apps.45926.9007199266363818.c9e1da9b-7f12-4b39-afab-e4988fbae01d.97ce31d9-5f40-434f-be62-1b35cf861da6')"

let searchButton = document.querySelector('.searchButton');

async function getKural(no) {
    try{
        let response = await fetch(`https://api-thirukkural.vercel.app/api?num=${no}`);
        let data = await response.json();
        console.log(data)
        let sect_tam = data.sect_tam;
        let sect_eng = data.sect_eng;
        let chapgrp_tam = data.chapgrp_tam;
        let chapgrp_eng =  data.chapgrp_eng;
        let chap_tam = data.chap_tam;
        let chap_eng = data.chap_eng;
        let line1 = data.line1;
        let line2 = data.line2;
        let tam_exp = data.tam_exp;
        let eng_exp = data.eng_exp;

        kuralInfo.innerHTML = '';

        let box = document.createElement('div');
        box.setAttribute('class','container mt-5 border border-5 text-center p-3 fs-3');
        box.innerHTML = `<em><b>${sect_tam} - ${sect_eng}</em></b>`;
        box.setAttribute('style','background-color:white;');

        let header = document.createElement('div');
        header.setAttribute('class','row mt-3')
        header.setAttribute('style','background-color:#43536e; color:white' );

        let headerLeft = document.createElement('p');
        headerLeft.setAttribute('class','col-6 text-left');
        headerLeft.innerHTML = `பால் / Section : ${chapgrp_tam} / ${chapgrp_eng}`;

        let headerRight = document.createElement('p');
        headerRight.setAttribute('class','col-6 text-right');
        headerRight.innerHTML = `இயல்கள் / ChapterGroups : ${chap_tam} / ${chap_eng}`

        let body = document.createElement('div');
        body.setAttribute('class','row justify-content-center mt-5')
        body.setAttribute('style','background-color:#43536e; color:white');
        body.innerHTML = `<em>குறள்/Kural ${no}:<br></em>`
        body.innerHTML += `${line1}<br>${line2}<br><br><br>`
        body.innerHTML += `<em>விளக்கம் / Explanation<br></em>`
        body.innerHTML += `${tam_exp}<br><br>${eng_exp}`

        kuralInfo.appendChild(box);
        box.append(header,body);
        header.append(headerLeft,headerRight)
    } catch(error){
        console.log('error fetching the data')
    }
}

function handleSubmit(event) {
    event.preventDefault();

    let no = noInput.value;
    getKural(no)
}

form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit);
