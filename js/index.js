const modifiers = {
  elHeaderOpenEls: 'header__toggler--open'
}

const elBtnOpen = document.querySelector(".btn__toggler--js");
const elBtnClose = document.querySelector(".nav__close--js");
const elHeader = document.querySelector(".header")

elBtnOpen.addEventListener("click", () => {
  elHeader.classList.add(modifiers.elHeaderOpenEls);
})
elBtnClose.addEventListener("click", () => {
  elHeader.classList.remove(modifiers.elHeaderOpenEls);
})


//DESTINATION SECTION SCRIPT
const destinationBtn = document.querySelectorAll(".btn__destination--js");
const btnInfo = document.getElementById("destination-moon");
const btnName = document.getElementById("destination__name");
const btnImg = document.getElementById("destination__img")
const btnDistance = document.getElementById("destiantion__distance");
const btnTravel = document.getElementById("destination__travel");

destinationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    destinationBtn.forEach(el => el.classList.remove('link__active'));

    btn.classList.add('link__active')

    const getData = (resourse) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener("readystatechange", () => {
          if(request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);
            resolve(data);
          }else if(request.readyState === 4) {
            reject('error');
          }
        })


        request.open("GET", resourse);
        request.send();
      })
    }

    getData("../json/data.json").then((data) => {
      data.destinations.forEach((el, index)=> {
        if(btn.textContent == el.name) {
          btnName.textContent = el.name;
          btnInfo.textContent = el.description;
          btnImg.setAttribute("src", el.images.png);
          btnDistance.textContent = el.distance;
          btnTravel.textContent = el.travel;
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  })
})


//CREW SECTION SCRIPT
const crewBtn = document.querySelectorAll(".slider__item--js");
const crewJob = document.querySelector("#crew__job");
const crewName = document.querySelector("#crew__name");
const crewInfo = document.querySelector("#crew__info");
const crewImg = document.querySelector("#crew__img");

crewBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const btnDataName = btn.dataset.name;


    crewBtn.forEach(el => el.classList.remove("item__active"))
    btn.classList.add("item__active")

    fetch("../json/data.json")
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      const crewMember = data.crew.find((member) => member.name === btnDataName);

      if(crewMember) {
      crewJob.textContent = crewMember.role;
      crewName.textContent = crewMember.name;
      crewInfo.textContent = crewMember.bio;
      crewImg.setAttribute("src", crewMember.images.png);
      }else {
        console.log("err");
      }
    })
    .catch((err) => {console.log(err)})
  })
})


//TECHNOLOGY SECTION SCRIPT
let screenWidth = window.innerWidth;
const btnTechno = document.querySelectorAll(".techno__item--js");
const technoName = document.querySelector("#techno__name")
const technoInfo = document.querySelector("#techno__info")
const technoImg = document.querySelector("#techno__img")

const widthLaptop = setInterval(() => {
  return window.innerWidth;
}, 500)


const getDatA = async (resurse) => {
  const request = await fetch(resurse);
  if (request.status != 200) {
    throw new Error("Xato bor bolam")
  }

  const data = await request.json();
  return data;
}



btnTechno.forEach((btn) => {
  btn.addEventListener('click', () => {
    const btnDataName = btn.dataset.item;

    btnTechno.forEach(el => el.classList.remove("slider__item--active"))
    btn.classList.add("slider__item--active");

    getDatA("../json/data.json")
    .then((data) => {
      const technoMember = data.technology.find((member) => member.name === btnDataName);
      if (technoMember) {
        console.log(technoMember);
        technoName.textContent = technoMember.name;
        technoInfo.textContent = technoMember.description

        if(widthLaptop > 935) {
          technoImg.setAttribute("src", technoMember.images.portrait)
        }else if(widthLaptop < 935){
          technoImg.setAttribute("src", technoMember.images.landscape)
        }
      }

    })
    .catch((err) => {
      console.log(err.message);
    })
  })
})