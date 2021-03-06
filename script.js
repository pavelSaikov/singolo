function navigationOnClick(event) {
  let currentTarget = event.currentTarget;
  let anchors = currentTarget.getElementsByTagName("a");
  for (let anchor of anchors) {
    if (anchor.classList.contains("selected"))
      anchor.classList.remove("selected");
  }

  let target = event.target;
  target.classList.add("selected");
}

let navig = document.getElementsByTagName("nav")[0];
navig.addEventListener("click", navigationOnClick);

/////////////////////////////
function clickOnPhone(event) {
  let parentTarget = event.target.parentElement;
  if (parentTarget.classList.contains("vertical-phone"))
    changeImageVerticalPhone(event);
  if (parentTarget.classList.contains("horizontal-phone"))
    changeImageHorizontalPhone(event);
}

function changeImageVerticalPhone() {
  let parentTarget = event.target.parentElement;
  if (parentTarget.classList.contains("black-display")) {
    let phoneWithImage = document.getElementsByClassName("vertical-phone")[0];
    phoneWithImage.classList.remove("hide");
    parentTarget.classList.add("hide");
  } else {
    let phoneWithoutImage = document.getElementsByClassName(
      "vertical-phone"
    )[1];
    phoneWithoutImage.classList.remove("hide");
    parentTarget.classList.add("hide");
  }
}

function changeImageHorizontalPhone() {
  let parentTarget = event.target.parentElement;
  if (parentTarget.classList.contains("black-display")) {
    let phoneWithImage = document.getElementsByClassName("horizontal-phone")[0];
    phoneWithImage.classList.remove("hide");
    parentTarget.classList.add("hide");
  } else {
    let phoneWithoutImage = document.getElementsByClassName(
      "horizontal-phone"
    )[1];
    phoneWithoutImage.classList.remove("hide");
    parentTarget.classList.add("hide");
  }
}

let phones = document.getElementsByClassName("phones")[0];
phones.addEventListener("click", clickOnPhone);

//////////////////////////////

let items = document.getElementsByClassName("slide");
let currentItem = 0;
let isEnabled = true;

function removeClassActive() {
  for (let item of items) {
    item.classList.remove("active");
  }
}

function swapSlides() {
  let slide = items[0];
  slide.remove();
  document.querySelector(".slides-container").append(slide);
}

function showItemFromLeft() {
  const direction = "from-left";
  items[0].classList.add("next", direction);
  items[0].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function showItemFromRight() {
  const direction = "from-right";
  items[1].classList.add("next", direction);
  items[1].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function hideItemToLeft() {
  const direction = "to-left";
  isEnabled = false;
  items[0].classList.add(direction);
  items[0].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function hideItemToRight() {
  const direction = "to-right";
  isEnabled = false;
  items[1].classList.add(direction);
  items[1].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function previousItem(n) {
  if (currentItem == 0) swapSlides();
  hideItemToRight();
  showItemFromLeft();
  currentItem = 0;
}

function nextItem(n) {
  if (currentItem == 1) swapSlides();
  hideItemToLeft();
  showItemFromRight();
  currentItem = 1;
}

document.querySelector(".left-btn").addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItem);
    let sliderContainer = document.getElementsByClassName(
      "slider-container"
    )[0];

    if (items[currentItem].classList.contains("slide-1")) {
      sliderContainer.classList.remove("slide-color-2");
      sliderContainer.classList.add("slide-color-1");
    } else {
      sliderContainer.classList.remove("slide-color-1");
      sliderContainer.classList.add("slide-color-2");
    }
  }
});

document.querySelector(".right-btn").addEventListener("click", function() {
  if (isEnabled) {
    nextItem(currentItem);
    let sliderContainer = document.getElementsByClassName(
      "slider-container"
    )[0];

    if (items[currentItem].classList.contains("slide-1")) {
      sliderContainer.classList.remove("slide-color-2");
      sliderContainer.classList.add("slide-color-1");
    } else {
      sliderContainer.classList.remove("slide-color-1");
      sliderContainer.classList.add("slide-color-2");
    }
  }
});

///////////////////////////////////////////////////
function shuffle(arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function portfolioCategoriesOnClick(event) {
  if (event.target.tagName == "P") {
    const currentTarget = event.currentTarget;
    const categories = currentTarget.getElementsByTagName("p");
    for (let category of categories) {
      if (category.classList.contains("active"))
        category.classList.remove("active");
    }
    const target = event.target;
    target.classList.add("active");

    const containerPhotoCollection = document.getElementsByClassName(
      "portfolio-imgs"
    )[0];
    const photoCollection = containerPhotoCollection.children;

    const arrImgs = [];
    while (photoCollection.length != 0) {
      let img = photoCollection[0];
      containerPhotoCollection.removeChild(img);
      arrImgs.push(img);
    }

    shuffle(arrImgs);

    while (arrImgs.length != 0) {
      containerPhotoCollection.append(arrImgs.pop());
    }
  }
}

document
  .getElementsByClassName("portfolio-categories")[0]
  .addEventListener("click", portfolioCategoriesOnClick);

/////////////////////////////////////////
function portfolioImagesOnClick(event) {
  console.log(event.target.tagName);
  if (event.target.tagName == "IMG") {
    const divWithImgsCollection = document.getElementsByClassName(
      "portfolio-imgs"
    )[0].children;

    for (let div of divWithImgsCollection) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
      }
    }

    event.target.parentElement.classList.add("active");
  }
}

document
  .getElementsByClassName("portfolio-imgs")[0]
  .addEventListener("click", portfolioImagesOnClick);

///////////////////////////////////////////

document
  .getElementsByClassName("communication-form-container")[0]
  .addEventListener("submit", function(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll("input");

    let email = inputs[1].value;
    let subject = inputs[2].value;
    let describe = document.querySelector("textarea").value;

    let modalWindow = document.querySelector(".modal-window");

    let messageContainer = modalWindow.firstElementChild;
    while (messageContainer.firstElementChild)
      messageContainer.removeChild(messageContainer.firstElementChild);

    let messageHasSendedDiv = document.createElement("div");
    let paragraph = document.createElement("p");
    paragraph.innerText = "Письмо отправлено";
    messageHasSendedDiv.append(paragraph);
    messageContainer.append(messageHasSendedDiv);

    let subjectDiv = document.createElement("div");
    paragraph = document.createElement("p");
    if (subject.length != 0) {
      paragraph.innerText = "Тема: " + subject;
    } else {
      paragraph.innerText = "Без темы";
    }
    subjectDiv.append(paragraph);
    messageContainer.append(subjectDiv);

    let describeDiv = document.createElement("div");
    describeDiv.style.maxWidth = "100%";
    paragraph = document.createElement("p");
    if (describe.length != 0) {
      paragraph.innerText = "Описание: " + describe;
    } else {
      paragraph.innerText = "Без описания";
    }
    describeDiv.append(paragraph);
    messageContainer.append(describeDiv);

    let button = document.createElement("button");
    button.innerText = "Ok";
    button.style.width = "5%";
    button.style.maxWidth = "150px";
    button.addEventListener("click", function(event) {
      modalWindow.classList.remove("active");
      inputs[0].value = "";
      inputs[1].value = "";
      inputs[2].value = "";
      document.querySelector("textarea").value = "";
    });
    messageContainer.append(button);

    modalWindow.classList.add("active");
  });

//////////////////////////////////////////

function openSideMenu() {
  document.getElementsByClassName("side-menu")[0].classList.add("active");
  document.getElementsByClassName("dark-background")[0].classList.add("active");
  document.getElementsByClassName("hamburger")[0].style.transform =
    "rotate(-90deg)";
  document.getElementsByTagName("body")[0].classList.add("disable-scroll");
}

function closeSideMenu() {
  document.getElementsByClassName("side-menu")[0].classList.remove("active");
  document
    .getElementsByClassName("dark-background")[0]
    .classList.remove("active");
  document.getElementsByClassName("hamburger")[0].style.transform =
    "rotate(0deg)";
  document.getElementsByTagName("body")[0].classList.remove("disable-scroll");
}

document
  .getElementsByClassName("hamburger")[0]
  .addEventListener("click", closeSideMenu);
document
  .getElementsByClassName("hamburger")[1]
  .addEventListener("click", openSideMenu);

const sideMenuItems = document.getElementsByClassName("menu-items__item");
for (let item of sideMenuItems) {
  item.addEventListener("click", closeSideMenu);
}

//////////////////////////////////////////
