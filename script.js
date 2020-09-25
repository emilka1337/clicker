let counter = 0;

function findMin(arr) {
    let min = Infinity;

    for (let i of arr) {
        if (i < min) {
            min = i;
        }
    }

    return min;
}

function startTimer() {
    secondsLeft = 10;
    document.getElementById('result').innerText = '';

    setTimeout(() => {
        document.getElementById('result').innerText = `Result: ${counter}`;
        writeRecords(counter);
    }, 10000);
    setTimeout(() => {
        
        document.getElementById('clicks').innerText = `0`;
        resetCounter();
    }, 13000);

    document.getElementById('timer').innerText = secondsLeft;
    let showSeconds = setInterval(() => {
        if (secondsLeft > 0) {
            document.getElementById('timer').innerText = secondsLeft - 1;
            secondsLeft--;
        } else {
            clearInterval(showSeconds);
        }

    }, 1000);
}

function increaseCounter() {
    if (!counter) {
        startTimer();
    }
    counter++;
    showClicks();
}

function resetCounter() {
    counter = 0;
}

function showClicks() {
    document.getElementById('clicks').innerText = counter;
}

function writeRecords(result) {
    let records = JSON.parse(localStorage.getItem('clickerRecords'));
    let min = findMin(records);
    let tempIndex;

    for (let i = 0; i < 5; i++) {
        if (result > min) {
            tempIndex = i;
        }
    }

    if (tempIndex >= 0) {
        records.splice(tempIndex, 1, result);
    }

    records.sort((a, b) => b - a);

    localStorage.setItem('clickerRecords', JSON.stringify(records));
    displayRecords();
}

function displayRecords() {
    let records = JSON.parse(localStorage.getItem('clickerRecords'));
    document.getElementById('recordList').innerHTML = ``;

    if (!records) {
        records = [0, 0, 0, 0, 0];
    }

    for (let i = 0; i < 5; i++) {
        let li = document.createElement('li');
        li.innerHTML = `${i + 1}:   <span>${records[i]} clicks</span>`;
        document.getElementById('recordList').appendChild(li);
    }
}

function resetRecords() {
    localStorage.removeItem('clickerRecords');
    displayRecords();
}

document.getElementById('mainButton').addEventListener('click', increaseCounter);
document.getElementById('resetRecords').addEventListener('click', resetRecords);

(function () {
    if (!localStorage.getItem('clickerRecords')) {
        let records = [0, 0, 0, 0, 0];
        localStorage.setItem('clickerRecords', JSON.stringify(records));
    }
    displayRecords();
}());