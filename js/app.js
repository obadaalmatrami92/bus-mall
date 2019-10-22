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
BusMall.centerimage = document.getElementById('centerimage');
BusMall.rightImage = document.getElementById('rightimage');

BusMall.leftTitle = document.getElementById('lefttitle');
BusMall.centerTitle = document.getElementById('centertitle');
BusMall.rightTitle = document.getElementById('righttitle');

BusMall.leftObject = null;
BusMall.centerObject = null;
BusMall.rightObject = null;

new BusMall('Bag', 'images/bag.jpg');
new BusMall('Banana', 'images/banana.jpg');
new BusMall('Bathroom', 'images/bathroom.jpg');
new BusMall('Boots', 'images/boots.jpg');
new BusMall('Breakfast', 'images/breakfast.jpg');
new BusMall('Bubblegum', 'images/bubblegum.jpg');
new BusMall('Chair', 'images/chair.jpg');
new BusMall('Cthulhu', 'images/cthulhu.jpg');
new BusMall('Dog-duck', 'images/dog-duck.jpg');
new BusMall('Dragon', 'images/dragon.jpg');
new BusMall('Pen', 'images/pen.jpg');
new BusMall('Pet-sweep', 'images/pet-sweep.jpg');
new BusMall('Scissors', 'images/scissors.jpg');
new BusMall('Shark', 'images/shark.jpg');
new BusMall('Sweep', 'images/sweep.png');
new BusMall('Tauntaun', 'images/tauntaun.jpg');
new BusMall('Unicorn', 'images/unicorn.jpg');
new BusMall('Usb', 'images/usb.gif');
new BusMall('Water-can', 'images/water-can.jpg');
new BusMall('Wine-glass', 'images/wine-glass.jpg');





function renderBus() {

    var forbidden = [BusMall.leftObject, BusMall.centerObject, BusMall.rightObject];

    do {

        BusMall.leftObject = getRandomitems();

    } while (forbidden.includes(BusMall.leftObject))

    forbidden.push(BusMall.leftObject);

    do {

        BusMall.centerObject = getRandomitems();

    } while (forbidden.includes(BusMall.centerObject))

    forbidden.push(BusMall.centerObject);
    do {

        BusMall.rightObject = getRandomitems();

    } while (forbidden.includes(BusMall.rightObject));



    BusMall.leftObject.shownCtr++;
    BusMall.centerObject.shownCtr++;
    BusMall.rightObject.shownCtr++;

    var leftImageElement = BusMall.leftImage;
    var centerimageElement = BusMall.centerimage;
    var rightBusMallImageElement = BusMall.rightImage;

    leftImageElement.setAttribute('src', BusMall.leftObject.src);
    leftImageElement.setAttribute('alt', BusMall.leftObject.title);
    centerimageElement.setAttribute('src', BusMall.centerObject.src);
    centerimageElement.setAttribute('alt', BusMall.centerObject.title);
    rightBusMallImageElement.setAttribute('src', BusMall.rightObject.src);
    rightBusMallImageElement.setAttribute('alt', BusMall.rightObject.title);

    BusMall.leftTitle.textContent = BusMall.leftObject.title;
    BusMall.centerTitle.textContent = BusMall.centerObject.title;
    BusMall.rightTitle.textContent = BusMall.rightObject.title;
}



function getRandomitems() {
    var index = Math.floor(Math.random() * BusMall.all.length);
    return BusMall.all[index];
}


function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}


function rendernewul() {
    var contentul = document.getElementById('content-ul')
    for (var i = 0; i < BusMall.all.length; i++) {
        var currentul = BusMall.all[i];
        var state = currentul.title + ' had ' + currentul.clickCtr + ' votes ' + ' and was shown ' + currentul.shownCtr;
        addElement('li', contentul, state);

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

function getbusmall() {
    var data = localStorage.getItem('productsitem');
    var busmalldata = JSON.parse(data);
    if (busmalldata) {

        BusMall.all = busmalldata;
    }

}


function setbusmall() {
    var BusString = JSON.stringify(BusMall.all)
    localStorage.setItem('productsitem', BusString)
}


function clickItem(event) {

    var clickedId = event.target.id;
    var itemClicked;
    setbusmall();
    if (clickedId === 'leftimage') {
        itemClicked = BusMall.leftObject;
    } else if (clickedId === 'centerimage') {
        itemClicked = BusMall.centerObject;
    } else if (clickedId === 'rightimage') {
        itemClicked = BusMall.rightObject;
    } else {
        console.log('Um, what was clicked on???', clickedId);
    }

    if (itemClicked) {
        itemClicked.clickCtr++;
        BusMall.roundCtr++;

        if (BusMall.roundCtr === BusMall.roundLimit) {
            rendernewul();

            alert('No more clicking for you!');

            BusMall.container.removeEventListener('click', clickItem);

        } else {

            renderBus();
            // setbusmall();
        }
    }
}




function rendermallitems() {
    var MallArray = [];
    var ClickedArray = [];
    var shownArray = [];
    for (let i = 0; i < BusMall.all.length; i++) {
        var MallInstenc = BusMall.all[i];
        MallArray.push(MallInstenc.title + ' Vote');
        MallArray.push(MallInstenc.title + ' Shown');
        ClickedArray.push(MallInstenc.clickCtr);
        shownArray.push(MallInstenc.shownCtr);
    }


    var ctx = document.getElementById('Chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
                'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
            ],
            datasets: [{
                    label: 'Item Vote',
                    backgroundColor: 'Blue',
                    borderColor: 'black',
                    data: ClickedArray,
                },
                {
                    label: 'Item Shown',
                    backgroundColor: 'red',
                    borderColor: 'black',
                    data: shownArray,
                }
            ],
            options: {}
        }
    });
}

BusMall.container.addEventListener('click', clickItem);

renderBus();
getbusmall();