const modifiers = {
  elHeaderOpenEls: 'header__toggler--open'
}

let toggle = true;

const elBtnOpen = document.querySelector(".btn__toggler--js");
const elBtnClose = document.querySelector(".nav__close--js");
const elHeader = document.querySelector(".header")

elBtnOpen.addEventListener("click", () => {
  elHeader.classList.add(modifiers.elHeaderOpenEls);
})
elBtnClose.addEventListener("click", () => {
  elHeader.classList.remove(modifiers.elHeaderOpenEls);
})
