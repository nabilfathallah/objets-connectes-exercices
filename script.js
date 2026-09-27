const objects = [
  { name: 'Smartphone', category: 'connecte' },
  { name: 'Montre connectée', category: 'connecte' },
  { name: 'Lampe simple', category: 'non-connecte' },
  { name: 'Stylo', category: 'non-connecte' },
  { name: 'Thermostat intelligent', category: 'connecte' },
  { name: 'Chaise', category: 'non-connecte' },
  { name: 'Télévision connectée', category: 'connecte' },
  { name: 'Livre', category: 'non-connecte' },
];

const objectList = document.getElementById('objectList');
const classificationButtons = document.querySelectorAll('[data-category]');

function renderObjectList() {
  objectList.innerHTML = '';
  objects.forEach((obj) => {
    const item = document.createElement('div');
    item.className = 'object-item';

    const name = document.createElement('span');
    name.className = 'tag-name';
    name.textContent = obj.name;

    const badge = document.createElement('span');
    badge.className = `status ${obj.category === 'connecte' ? 'connected' : 'unconnected'}`;
    badge.textContent = obj.category === 'connecte' ? 'Connecté' : 'Non connecté';

    item.appendChild(name);
    item.appendChild(badge);
    objectList.appendChild(item);
  });
}

classificationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    const allItems = [...document.querySelectorAll('.object-item')];
    allItems.forEach((item) => {
      const badge = item.querySelector('.status');
      const name = item.querySelector('.tag-name').textContent;
      const itemCategory = objects.find((obj) => obj.name === name)?.category;
      const shouldHighlight = itemCategory === category;
      item.style.outline = shouldHighlight ? '3px solid #22c55e' : 'none';
      item.style.opacity = shouldHighlight ? '1' : '0.8';
      badge.textContent = shouldHighlight ? (category === 'connecte' ? 'Connecté' : 'Non connecté') : badge.textContent;
    });
  });
});

renderObjectList();

const mcqButtons = document.querySelectorAll('.choice');
mcqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isCorrect = button.dataset.correct === 'true';
    const group = button.parentElement.id;
    const feedback = document.getElementById(`feedback${group.replace('mcq', '')}`);
    const siblings = button.parentElement.querySelectorAll('.choice');

    siblings.forEach((item) => {
      item.disabled = true;
      item.classList.remove('correct', 'incorrect');
      if (item.dataset.correct === 'true') item.classList.add('correct');
      if (item === button && !isCorrect) item.classList.add('incorrect');
    });

    feedback.textContent = isCorrect
      ? 'Bravo ! C’est la bonne réponse.'
      : 'Essayez encore. La bonne réponse est indiquée en vert.';
    feedback.style.color = isCorrect ? '#166534' : '#991b1b';
  });
});

const quizData = [
  {
    question: 'Quel appareil est un objet connecté ?',
    options: ['Lampe classique', 'Montre intelligente', 'Chaise', 'Fleur'],
    answer: 'Montre intelligente',
  },
  {
    question: 'Quelle caractéristique décrit un objet non connecté ?',
    options: [
      'Il peut envoyer des messages sur Internet',
      'Il n’échange pas de données avec un réseau',
      'Il est soulevé par le logiciel',
      'Il a un écran tactile',
    ],
    answer: 'Il n’échange pas de données avec un réseau',
  },
  {
    question: 'Que faire pour rendre un objet connecté ?',
    options: [
      'Le relier à un réseau ou à Internet',
      'Le mettre dans une boîte',
      'Le peindre en vert',
      'Le cacher',
    ],
    answer: 'Le relier à un réseau ou à Internet',
  },
  {
    question: 'Lequel de ces objets est non connecté ?',
    options: ['Téléviseur connecté', 'Thermostat intelligent', 'Réveil mécanique', 'Smartphone'],
    answer: 'Réveil mécanique',
  },
  {
    question: 'Quel est l’avantage principal d’un objet connecté ?',
    options: [
      'Il fonctionne sans batterie',
      'Il peut communiquer et automatiser des tâches',
      'Il est toujours plus lourd',
      'Il ne peut pas être utilisé à l’école',
    ],
    answer: 'Il peut communiquer et automatiser des tâches',
  },
];

const quizApp = document.getElementById('quizApp');

function renderQuiz() {
  quizApp.innerHTML = '';

  quizData.forEach((item, index) => {
    const block = document.createElement('div');
    block.className = 'question-block';

    const qTitle = document.createElement('h3');
    qTitle.textContent = `${index + 1}. ${item.question}`;

    const options = document.createElement('div');
    options.className = 'quiz-options';

    item.options.forEach((option) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', () => {
        const selected = document.querySelectorAll('.quiz-option');
        selected.forEach((el) => {
          el.classList.remove('selected');
        });
        btn.classList.add('selected');
      });
      options.appendChild(btn);
    });

    block.appendChild(qTitle);
    block.appendChild(options);
    quizApp.appendChild(block);
  });

  const resultButton = document.createElement('button');
  resultButton.type = 'button';
  resultButton.className = 'btn primary';
  resultButton.textContent = 'Voir le score';
  resultButton.addEventListener('click', calculateQuizScore);

  const scoreArea = document.createElement('div');
  scoreArea.className = 'quiz-results';
  scoreArea.id = 'quizResults';

  quizApp.appendChild(resultButton);
  quizApp.appendChild(scoreArea);
}

function calculateQuizScore() {
  const blocks = document.querySelectorAll('.question-block');
  let score = 0;

  blocks.forEach((block, index) => {
    const selected = block.querySelector('.quiz-option.selected');
    if (!selected) return;
    const answer = quizData[index].answer;
    if (selected.textContent.trim() === answer) score += 1;
  });

  const resultBox = document.getElementById('quizResults');
  resultBox.innerHTML = `<strong>Score :</strong> ${score} / ${quizData.length}`;
  resultBox.style.color = score >= 3 ? '#166534' : '#92400e';
  resultBox.style.fontSize = '1.1rem';
}

renderQuiz();
