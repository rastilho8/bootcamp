
const myForm = document.querySelector('.my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('#message');


myForm.addEventListener('submit', onSubmit);


function onSubmit(e) {
    e.preventDefault();


    if (nameInput.value === '' || emailInput.value === '' || msg.value === '') {

        console.error('error')


    } else if (/[^\d\.]/.test(phoneInput.value)) {
        console.error('Provide a valid number');

    } else {

        console.log(`Name: ${nameInput.value}, Email: ${emailInput.value}, Phone: ${phoneInput.value}, Message: ${msg.value}`);

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = ''
        msg.value = ''
    }
}

