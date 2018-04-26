function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function shuffleArray(arr) {
    var i, j;
    var length = arr.length - 1;
    for (i = length; i > 0; i--) {
        j = getRandomInt(0, length);
        swap(arr[i], arr[j]);
    }
}

function swap(x, y, arr) {
    var tmp = arr[y];
    arr[y] = arr[x];
    arr[x] = tmp;
}

var b = list[y];
list[y] = list[x];
list[x] = b;

function swapInDOM(elemenA, elementB, containingElement) {
    var dummyNode = document.createElement('div');
    containingElement.replaceChild(dummyNode, elemenA);
    containingElement.replaceChild(elemenA, elementB);
    containingElement.replaceChild(elementB, dummyNode);
}

function hideElement(selector) {
    var element = document.querySelector(selector);
    element.style.display = 'none';
}

function showElement(selector) {
    var element = document.querySelector(selector);
    element.style.display = 'block';
}