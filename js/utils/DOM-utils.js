function createElement(tagName, innerText, classArray) {
    var element = document.createElement(tagName);
    if (innerText) {
        var textNode = document.createTextNode(innerText);
        element.appendChild(textNode);
    }
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

function exchangeElements(element1, element2)
{
    var clonedElement1 = element1.cloneNode(true);
    var clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);

    return clonedElement1;
}