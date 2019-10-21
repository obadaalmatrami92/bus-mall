'use strict';

function BusMall(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    BusMall.all.push(this);
}

BusMall.roundCtr = 0;
BusMall.roundLimit = 25;

BusMall.all = [];

BusMall.container = document.getElementById('item-container');
BusMall.leftImage = document.getElementById('leftimage');
BusMall.middleImage = document.getElementById('middleimage');
BusMall.rightImage = document.getElementById('rightimage');

BusMall.leftTitle = document.getElementById('lefttitle');
BusMall.middleTitle = document.getElementById('middletitle');
BusMall.rightTitle = document.getElementById('righttitle');

BusMall.leftObject = null;
BusMall.middleObject = null;
BusMall.rightObject = null;

new BusMall('bag', 'images/bag.jpg');
new BusMall('banana', 'images/banana.jpg');
new BusMall('bathroom', 'images/bathroom.jpg');
new BusMall('boots', 'images/boots.jpg');
new BusMall('breakfast', 'images/breakfast.jpg');
new BusMall('bubblegum', 'images/bubblegum.jpg');
new BusMall('chair', 'images/chair.jpg');
new BusMall('cthulhu', 'images/cthulhu.jpg');
new BusMall('dog-duck', 'images/dog-duck.jpg');
new BusMall('dragon', 'images/dragon.jpg');
new BusMall('pen', 'images/pen.jpg');
new BusMall('pet-sweep', 'images/pet-sweep.jpg');
new BusMall('scissors', 'images/scissors.jpg');
new BusMall('shark', 'images/shark.jpg');
new BusMall('sweep', 'images/sweep.png');
new BusMall('tauntaun', 'images/tauntaun.jpg');
new BusMall('unicorn', 'images/unicorn.jpg');
new BusMall('usb', 'images/usb.gif');
new BusMall('water-can', 'images/water-can.jpg');
new BusMall('wine-glass', 'images/wine-glass.jpg');

function renderBus() {

    var forbidden = [BusMall.leftObject, BusMall.middleObject, BusMall.rightObject];

    do {

        BusMall.leftObject = getRandomGoat();

    } while (forbidden.includes(BusMall.leftObject))

    forbidden.push(BusMall.leftObject);

    do {

        BusMall.middleObject = getRandomGoat();

    } while (forbidden.includes(BusMall.middleObject))

    forbidden.push(BusMall.middleObject);
    do {

        BusMall.rightObject = getRandomGoat();

    } while (forbidden.includes(BusMall.rightObject));



    BusMall.leftObject.shownCtr++;
    BusMall.middleObject.shownCtr++;
    BusMall.rightObject.shownCtr++;

    var leftImageElement = BusMall.leftImage;
    var middleImageElement = BusMall.middleImage;
    var rightBusMallImageElement = BusMall.rightImage;

    leftImageElement.setAttribute('src', BusMall.leftObject.src);
    leftImageElement.setAttribute('alt', BusMall.leftObject.title);
    middleImageElement.setAttribute('src', BusMall.middleObject.src);
    middleImageElement.setAttribute('alt', BusMall.middleObject.title);
    rightBusMallImageElement.setAttribute('src', BusMall.rightObject.src);
    rightBusMallImageElement.setAttribute('alt', BusMall.rightObject.title);

    BusMall.leftTitle.textContent = BusMall.leftObject.title;
    BusMall.middleTitle.textContent = BusMall.middleObject.title;
    BusMall.rightTitle.textContent = BusMall.rightObject.title;
}

function getRandomGoat() {
    var index = Math.floor(Math.random() * BusMall.all.length);
    return BusMall.all[index];
}

// not using this, just showing the better way vs. ceil
function randomInRange(min, max) {
    var range = max - min + 1; // add one since we will be flooring
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}

function TotalItems() {

    var tableBody = document.getElementById('content-area');


    tableBody.innerHTML = '';


    for (var i = 0; i < BusMall.all.length; i++) {
        var item = BusMall.all[i];
        var row = addElement('tr', tableBody);
        addElement('td', row, item.title);
        addElement('td', row, '' + item.clickCtr);
        addElement('td', row, '' + item.shownCtr);

    }
}

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}

function clickItem(event) {

    var clickedId = event.target.id;
    var itemClicked;

    if (clickedId === 'leftimage') {
        itemClicked = BusMall.leftObject;
    } else if (clickedId === 'middleimage') {
        itemClicked = BusMall.middleObject;
    } else if (clickedId === 'rightimage') {
        itemClicked = BusMall.rightObject;
    } else {
        console.log('Um, what was clicked on???', clickedId);
    }

    if (itemClicked) {
        itemClicked.clickCtr++;
        BusMall.roundCtr++;

        TotalItems();

        if (BusMall.roundCtr === BusMall.roundLimit) {

            alert('No more clicking for you!');

            BusMall.container.removeEventListener('click', clickItem);

        } else {

            renderBus();
        }
    }
}

// Notice that we're attaching event listener to the container, 
// but event.target will allow us to which child element was actually clicked
BusMall.container.addEventListener('click', clickItem);

TotalItems();

renderBus();