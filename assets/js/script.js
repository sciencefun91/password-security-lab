'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    
    let pageToCheck = this.innerHTML.toLowerCase();
    
    // Handle special cases for navbar text mapping
    if (pageToCheck === "password generator") {
      pageToCheck = "blog";
    } else if (pageToCheck === "pwned") {
      pageToCheck = "portfolio";
    }
    
    pages.forEach((page, pageIndex) => {
      if (pageToCheck === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[index].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[pageIndex].classList.remove("active");
      }
    });
    
  });
});

/*-----------------------------------*\
  #PASSWORD GENERATOR
\*-----------------------------------*/

// Password Generator Functions
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const type = document.getElementById('password-type').value;
    
    let password = '';
    
    switch(type) {
        case 'memorable':
            password = generateMemorablePassword(length);
            break;
        case 'letters-numbers':
            password = generateLettersNumbersPassword(length);
            break;
        case 'random':
            password = generateRandomPassword(length);
            break;
        case 'numbers':
            password = generateNumbersPassword(length);
            break;
    }
    
    document.getElementById('generated-password').value = password;
}

function generateMemorablePassword(length) {
    const words = ['apple', 'river', 'sunset', 'mountain', 'ocean', 'forest', 'star', 'cloud', 'bird', 'flower'];
    const numbers = '0123456789';
    let password = '';
    
    while (password.length < length) {
        const word = words[Math.floor(Math.random() * words.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        
        if (password.length + word.length + 1 <= length) {
            password += word + number;
        } else {
            break;
        }
    }
    
    // Fill remaining characters if any
    while (password.length < length) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return password.slice(0, length);
}

function generateLettersNumbersPassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return password;
}

function generateRandomPassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return password;
}

function generateNumbersPassword(length) {
    const numbers = '0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return password;
}

function copyPassword() {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Update length value display
document.getElementById('password-length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value + ' characters';
});
