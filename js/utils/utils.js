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


