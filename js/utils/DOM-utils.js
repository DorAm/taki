function createElement(tagName, innerText, classArray) {
    var element = document.createElement(tagName);
    var textNode = document.createTextNode(innerText);
    element.appendChild(textNode);
    classArray.forEach(function (className) {
        element.classList.add(className)
    });
}

function hideElement(selector) {
    var element = document.querySelector(selector);
    element.style.display = 'none';
}

function showElement(selector) {
    var element = document.querySelector(selector);
    element.style.display = 'block';
}

function swapInDOM(elementA, elementB, containingElement) {
    var dummyNode = document.createElement('div');
    containingElement.replaceChild(elementA, dummyNode);
    containingElement.replaceChild(elementB, elementA);
    containingElement.replaceChild(dummyNode, elementB);
}