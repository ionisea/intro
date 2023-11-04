import {
    allTowns,
    countySeats,
} from './lists.js'

let statDisplay = document.getElementById('stats');
let questionDisplay = document.getElementById('question');
let correctDisplay = document.getElementById('answers');
let hintButton = document.getElementById('hint');
let pastAnswers = [];
let hintCount = 0;
let stats = { correct: 0, wrong: 0 };

let current;

const createLi = (text) => {
  const li = document.createElement('li');
  li.append(text);
  return li;
};

window.onload = () => {
  nextQ();
};

const fillAnswer = (correct, answer) => {
  let string = `The county ${current.town} is in is ${current.county} county. ` + `(Your answer: ${answer} ${correct ? '✓' : '✗'}; Hints used: ${hintCount})`;
  pastAnswers = [string].concat(pastAnswers);
  correctDisplay.textContent = '';
  pastAnswers.forEach(e => correctDisplay.append(createLi(e)));
};

const nextQ = () => {
  statDisplay.textContent = '';
  questionDisplay.textContent = '';
  current = allTowns[Math.floor(Math.random() * allTowns.length)];
  statDisplay.append('correct: ' + stats.correct + '; incorrect: ' + stats.wrong);
  questionDisplay.append('What county is ' + current.town + ' in?');
};

hintButton.onclick = (e) => {
    alert( `not yet functional`)
  /*hintCount++
  if (hintCount % 2 === 1) {
    alert(`'${currentCountry.capitals[0][0]}' is the first letter of the capital you are looking for.`);
  } else if (hintCount % 2 === 0) {
    alert(`The name of the capital you are looking for is ${currentCountry.capitals[0].length} letters long (including spaces).`);
  };*/
};


document.onkeydown = ((e) => {
  console.log(e);
  const input = document.getElementById('answerInput').value;
  if ((e.key == "Enter") && (input != '')) {
    const maybeCorrect = (input === current.county ) || (input.toLowerCase() === current.county.toLowerCase());
    if (maybeCorrect) {
      if (hintCount < 2) stats.correct++
    } else {
      stats.wrong++
    };
    document.getElementById('answerInput').value = ''
    fillAnswer(maybeCorrect, input);
    hintCount = 0;
    nextQ();
  };
});