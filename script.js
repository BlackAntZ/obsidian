const buyOnce = document.getElementById('buy-once');
const buyOnceText = document.getElementById('buy-once-text');
const subscribe = document.getElementById('subscribe-price');
const subscribeText = document.getElementById('subscribe-price-text');

const addAmount = document.getElementById('add-amount');
const subtractAmount = document.getElementById('sub-amount');
const price = document.getElementById('amount');

const changeBuyClassesHandler = () => {
  if (buyOnce.alt === 'Empty checkbox') {
    subscribe.src = 'Ellipse%2017.png';
    subscribe.alt = 'Empty checkbox';
    buyOnce.src = 'Group%20203.png';
    buyOnce.alt = 'Full checkbox';
    subscribe.parentElement.classList.add('turned-off');
    buyOnce.parentElement.classList.remove('turned-off');
  }
}

buyOnce.addEventListener('click', changeBuyClassesHandler);

buyOnceText.addEventListener('click', changeBuyClassesHandler);

const changeSubscribeClassesHandler = () => {
  if (subscribe.alt === 'Empty checkbox') {
    buyOnce.src = 'Ellipse%2017.png';
    buyOnce.alt = 'Empty checkbox';
    subscribe.src = 'Group%20203.png';
    subscribe.alt = 'Full checkbox';
    buyOnce.parentElement.classList.add('turned-off');
    subscribe.parentElement.classList.remove('turned-off');
  }
}

subscribe.addEventListener('click', changeSubscribeClassesHandler);

subscribeText.addEventListener('click', changeSubscribeClassesHandler);

addAmount.addEventListener('click', () => {
  price.value = +price.value + 1;
});

subtractAmount.addEventListener('click', () => {
  if (+price.value > 0) price.value = +price.value - 1;
})