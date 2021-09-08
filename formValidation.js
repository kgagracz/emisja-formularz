fetch('https://funds.ec-at.com/api/stock-data')
.then(response => response.json())
.then(data => {

    availableStocks = data.availableStocks;
    

const form = document.getElementById('order');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const documentNumber = document.getElementById('documentNumber');
const lastname = document.getElementById('lastname');
const phone = document.getElementById('phone');
const personalNumber = document.getElementById('personalNumber');
const quantity = document.getElementById('quantity');
const street = document.getElementById('street');
const state = document.getElementById('state');
const city = document.getElementById('city');
const postalcode = document.getElementById('postalcode');
const policy = document.getElementById('policy');
const contract = document.getElementById('contract');
const inputs = [...document.querySelectorAll('.ecat-input')];

form.addEventListener('submit', (e) => {
    validate(e);
})

inputs.forEach(input => {
    input.addEventListener('click', () => {
        input.className = 'ecat-input';
        const small = document.querySelector(`#${input.id} ~ small`);
        small.textContent = '';
    })
})

const validate = (e) => {

    const emailValue = email.value.trim();
    const quantityValue = quantity.value.trim();
    inputs.splice(inputs.indexOf(state), 1)
    inputs.forEach(input => {
        if(input.value === '' || input.value === null) {
            setErrorFor(input, 'Pole nie może być puste');
                e.preventDefault();
        }
    })


    if(!(validateEmail(emailValue))) {
        setErrorFor(email, 'Adres e-mail jest niepoprawny');
            e.preventDefault();;
    }

    if(quantityValue > availableStocks ) {
        setErrorFor(quantity, 'Ilość pakietów jest większa od dostępnej ilości pakietów akcji');
            e.preventDefault();;
    }

    if(!(policy.checked)) {
        setErrorFor(policy, 'Zgoda jest wymagana');
            e.preventDefault();;
    }
    if(!(contract.checked)) {
        setErrorFor(contract, 'Zgoda jest wymagana');
            e.preventDefault();;
    }

}

const setErrorFor = (target, message) => {
    const small = document.querySelector(`#${target.id} ~ small`);
    target.classList.add('ecat-error');
    small.innerText = message;
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

})