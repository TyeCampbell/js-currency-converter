const endpoint = `https://api.exchangeratesapi.io/latest`;
const currencyDropDowns = document.querySelectorAll(".app select");
const inputAmount = document.querySelector(".app input");
const toAmount = document.querySelector(".to_amount");
const fromCurrency = currencyDropDowns[0];
const toCurrency = currencyDropDowns[1];

const currencies = {
    USD: 'United States Dollar',
    AUD: 'Australian Dollar',
    BGN: 'Bulgarian Lev',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    CZK: 'Czech Republic Koruna',
    DKK: 'Danish Krone',
    GBP: 'British Pound Sterling',
    HKD: 'Hong Kong Dollar',
    HRK: 'Croatian Kuna',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Sheqel',
    INR: 'Indian Rupee',
    JPY: 'Japanese Yen',
    KRW: 'South Korean Won',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    NOK: 'Norwegian Krone',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    PLN: 'Polish Zloty',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    TRY: 'Turkish Lira',
    ZAR: 'South African Rand',
    EUR: 'Euro',
  };

function generateOptions(options) {
  return Object.values(options).map(item => `<option alt="${item}">${item}</option>`)
}

currencyDropDowns.forEach((dropdownItem => { 
  return dropdownItem.insertAdjacentHTML('beforeend', generateOptions(currencies));
}));

async function fetchCurrency(base) {
  const response = await fetch(`${endpoint}?base=${base}`, {
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json'
    }});
  const data = await response.json();
  return data.rates;
}
//TODO: need to use Object.entries() on the data from fetchCurrency

//TODO: if statement needed -- if from_curr and to_curr and input are all filled out then excute function


function getKeyByValue(object, value) {
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      if(object[prop] === value) {
        return prop;
      }
    }
  }
}

async function calculateCurrency(amount, fromCur, toCur) {
  if (amount !== "" && fromCur !== 'Select a Currency' && toCur !== 'Select a Currency') {    
    const symbolFrom = getKeyByValue(currencies, fromCur);  
    const symbolTo = getKeyByValue(currencies, toCur);
    const exchangeRates = await fetchCurrency(symbolFrom);
    const finalRate = (exchangeRates[symbolTo] * amount);
    new Intl.NumberFormat()
    toAmount.textContent = finalRate; 
  }
}


function handleChange(e) {
  calculateCurrency(inputAmount.value, fromCurrency.value, toCurrency.value);
}

fromCurrency.addEventListener('change', handleChange);
toCurrency.addEventListener('change', handleChange);
inputAmount.addEventListener('change', handleChange);