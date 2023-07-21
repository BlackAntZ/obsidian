const buyOnce = document.getElementById('buy-once');
const buyOnceText = document.getElementById('buy-once-text');
const subscribe = document.getElementById('subscribe-price');
const subscribeText = document.getElementById('subscribe-price-text');

const addAmount = document.getElementById('add-amount');
const subtractAmount = document.getElementById('sub-amount');
const price = document.getElementById('amount');

const ingredientExpand = document.querySelectorAll('.ingredient i');

const wrapper = document.querySelector(".carousel-container");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".carousel-container i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

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

ingredientExpand.forEach(icon => icon.addEventListener('click', ev => {
  if (ev.target.classList.contains('bx-plus')) {
    ev.target.classList.remove('bx-plus');
    ev.target.classList.add('bx-minus');
    ev.target.parentElement.parentElement.lastElementChild.classList.remove('display-none');
  } else {
    ev.target.classList.add('bx-plus');
    ev.target.classList.remove('bx-minus');
    ev.target.parentElement.parentElement.lastElementChild.classList.add('display-none');
  }
}));

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));