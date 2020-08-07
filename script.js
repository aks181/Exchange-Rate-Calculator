const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap-btn');
const rate = document.getElementById('rate');


//fetching exchange rates from api & update DOM
function calculate() {
    const currency1 = currencyOne.value;
    const currency2 = currencyTwo.value;
    
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency1}`)
        .then(response => response.json())
        .then(data => {
            const rateValue = data.rates[currency2];
            rate.innerText = `1 ${currency1} = ${rateValue} ${currency2}`;
            amountTwo.value = (amountOne.value * rateValue).toFixed(2);
        });
}

function swapCurrency () {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}

//event listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrency);

calculate();