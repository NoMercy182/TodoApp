// import 'regenerator-runtime/runtime';
import { time } from './time.js';

time();

const select = document.querySelector('#select');

async function getUsersName() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

getUsersName().then(users => {
  for (let key of users) {
    const optionUser = document.createElement('option');
    optionUser.textContent = `${key.name}`;
    //console.log(optionUser);
    select.append(optionUser);
  }
});

const todoContainer = document.querySelector('#todoContainer');
const inProgressContainer = document.querySelector('#inProgressContainer');
const doneContainer = document.querySelector('#doneContainer');

const addCardModal = document.querySelector('.addCardModal');
const addCardModalBtnsContainer = document.querySelector('.addCardModal__btnsContainer');
const titleInput = document.querySelector('.addCardModal__titleInput');
const textInput = document.querySelector('.addCardModal__textInput');
const warningModal = document.querySelector('.warningModal');
const warningModalTitle = document.querySelector('.warningModal__title');
const warningModalContainer = document.querySelector('.warningModal__container');

const addBtn = document.querySelector('#addBtn');
const btnCreateCard = document.querySelector('#btnCreateCard');
const btnFixedCard = document.createElement('button');
btnFixedCard.classList = 'addCardModal__btn';
btnFixedCard.setAttribute('id', 'btnFixedCard');
btnFixedCard.innerText = 'Fixed Card';
const btnCancel = document.querySelector('#btnCancel');
const btnDeleteAll = document.querySelector('#deleteAllBtn');
const btnWarningModalCancel = document.querySelector('#btnWarningModalCancel');
const btnWarningModalOk = document.querySelector('#btnWarningModalOk');

const todosCounter = document.querySelector('#todosCounter');
const inProgressCounter = document.querySelector('#inProgressCounter');
const doneCounter = document.querySelector('#doneCounter');

const wrapper = document.querySelector('.wrapper');

const blockDiv = document.createElement('div');
blockDiv.classList = 'blockDiv';
wrapper.append(blockDiv);

let todosArray = [];
let inProgressArray = [];
let doneArray = [];
let editElem;

// ----------------------------- createCard -----------------------------

function createCard({id, time, colorCard, title, text, user}) {
  const card = document.createElement('div');
  card.classList = 'card';
  card.setAttribute('id', `card-${id}`);
  // card.draggable = 'true';
  card.style.background = colorCard;
  const cardTitle = document.createElement('h3');
  cardTitle.classList = 'card__title';
  cardTitle.innerText = title;
  const cardHead = document.createElement('div');
  cardHead.classList = 'card__head';
  const btnEdit = document.createElement('button');
  btnEdit.classList = 'card__btn';
  btnEdit.innerText = 'Edit';
  const btnMove = document.createElement('button');
  btnMove.classList = 'card__btn';
  btnMove.innerText = 'Move';
  const btnDelete = document.createElement('button');
  btnDelete.classList = 'card__btn';
  btnDelete.innerText = 'Delete';
  const btnBack = document.createElement('button');
  btnBack.classList = 'card__btn';
  btnBack.innerText = 'Back';
  const btnComplete = document.createElement('button');
  btnComplete.classList = 'card__btn';
  btnComplete.innerText = 'Comlete';
  const btnDoneDelete = document.createElement('button');
  btnDoneDelete.classList = 'card__btn';
  btnDoneDelete.innerText = 'Delete';
  const cardText = document.createElement('div');
  cardText.classList = 'card__text';
  cardText.innerText = text;
  const cardTime = document.createElement('div');
  cardTime.classList = 'card__time';
  cardTime.innerText = time;
  const cardUser = document.createElement('div');
  cardUser.classList = 'card__user';
  cardUser.innerText = user;
  cardHead.append(btnEdit, btnMove, btnDelete);
  card.append(cardTitle, cardHead, cardText, cardTime, cardUser);
  
// ----------------------------- btnDelete -----------------------------

  btnDelete.addEventListener('click', () => {
    card.remove();
    todosArray = todosArray.filter(card => !(card.id == `card-${id}`));
    todosCounter.innerText = todosArray.length;
  });
// ----------------------------- btnMove --------------------------------

  btnMove.addEventListener('click', () => {
    if (inProgressArray.length < 6) {
      btnEdit.remove();
      btnMove.remove();
      btnDelete.remove();
      cardHead.append(btnBack, btnComplete);
      card.remove();
      todosArray = todosArray.filter(card => !(card.id == `card-${id}`));
      // card.style.background = 'yellow';
      inProgressContainer.append(card);
      inProgressArray.push(card);
      inProgressCounter.innerText = inProgressArray.length;
      todosCounter.innerText = todosArray.length;
      console.log(inProgressArray.length);
    } else {
      warningModalTitle.style.fontSize = '60px';
      warningModalTitle.innerText = '🖕';
      btnWarningModalOk.remove();
      warningModalContainer.style.justifyContent = 'center';
      warningModal.style.opacity = '1';
      warningModal.style.top = 'calc(40%)';
      blockDiv.style.opacity = '1';
      blockDiv.style.top = '0';
    }
  });

// ----------------------------- btnEdit --------------------------------

  btnEdit.addEventListener('click', () => {
    btnCreateCard.remove();
    addCardModalBtnsContainer.append(btnFixedCard);
    addCardModal.style.opacity = '1';
    addCardModal.style.top = '30%';
    titleInput.value = cardTitle.innerText;
    textInput.value = cardText.innerText;
    select.value = cardUser.innerText;
    blockDiv.style.opacity = '1';
    blockDiv.style.top = '0';
    editElem = card;
  });

 // ----------------------------- btnBack --------------------------------
  
 btnBack.addEventListener('click', () => {
  btnBack.remove();
  btnComplete.remove();
  cardHead.append(btnEdit, btnMove, btnDelete);
  card.remove();
  inProgressArray = inProgressArray.filter(card => !(card.id == `card-${id}`));
  todoContainer.append(card);
  todosArray.push(card);
  inProgressCounter.innerText = inProgressArray.length;
  todosCounter.innerText = todosArray.length;
 });

 // ----------------------------- btnComplete --------------------------------

 btnComplete.addEventListener('click', () => {
  btnBack.remove();
  btnComplete.remove();
  cardHead.append(btnDoneDelete);
  btnDoneDelete.style.margin = '0 auto';
  card.remove();
  inProgressArray = inProgressArray.filter(card => !(card.id == `card-${id}`));
  doneContainer.append(card);
  doneArray.push(card);
  inProgressCounter.innerText = inProgressArray.length;
  doneCounter.innerText = doneArray.length;
  cardTitle.innerText = `${cardTitle.innerText} ✅`;
 });

 // ----------------------------- btnDoneDelete -----------------------------

 btnDoneDelete.addEventListener('click', () => {
  card.remove();
  doneArray = doneArray.filter(card => !(card.id == `card-${id}`));
  doneCounter.innerText = doneArray.length;
 });

 
  
  return card;
}

// ----------------------------- appendCard -----------------------------

addBtn.addEventListener('click', () => {
  btnFixedCard.remove();
  addCardModalBtnsContainer.append(btnCreateCard);
  addCardModal.style.opacity = '1';
  addCardModal.style.top = '30%';
  blockDiv.style.opacity = '1';
  blockDiv.style.top = '0';
});

let todosLocalArray = [];

const addCard = () => {
  if (titleInput.value != '' && textInput.value != '') {
    const arrColors = ['rgba(235, 250, 15, 0.5)', 'rgba(83, 87, 21, 0.5)', 
                     'rgba(119, 70, 25, 0.5)', 'rgba(222, 118, 21, 0.5)', 
                     'rgba(238, 52, 24, 0.5)', 'rgba(131, 238, 24, 0.5)', 
                     'rgba(17, 154, 35, 0.5)', 'rgba(17, 154, 147, 0.5)',
                     'rgba(17, 31, 154, 0.5)', 'rgba(176, 61, 225, 0.5)'];
    const obj = {
      id : Math.floor(Math.random() * 1000) + 1,
      time : (new Date()).toLocaleString(),
      colorCard : arrColors[Math.floor(Math.random() * 10) + 1],
      title : titleInput.value,
      text : textInput.value,
      user : select.value
    };
    titleInput.value = '';
    textInput.value = '';
    addCardModal.style.opacity = '0';
    addCardModal.style.top = '-30%';
    todosArray.push(createCard(obj));
    todosCounter.innerText = todosArray.length;
    blockDiv.style.opacity = '0';
    blockDiv.style.top = '-100%';
    todoContainer.append(createCard(obj));
    todosLocalArray.push(obj);
    localStorage.setItem('arr', JSON.stringify(todosLocalArray));
  }
};

btnCreateCard.addEventListener('click', () => addCard());

let returnArr = JSON.parse(localStorage.getItem('arr'));

returnArr.forEach(localObj => {
  todosLocalArray.push(localObj);
  todoContainer.append(createCard(localObj));
});


// ----------------------------- btnCancel -----------------------------

btnCancel.addEventListener('click', () => {
  titleInput.value = '';
  textInput.value = '';
  addCardModal.style.opacity = '0';
  addCardModal.style.top = '-30%';
  blockDiv.style.opacity = '0';
  blockDiv.style.top = '-100%';
});

// ----------------------------- btnFixedCard -----------------------------

btnFixedCard.addEventListener('click', () => {
  editElem.firstChild.innerText = titleInput.value;
  editElem.firstChild.nextElementSibling.nextElementSibling.innerText = textInput.value;
  addCardModal.style.opacity = '0';
  addCardModal.style.top = '-30%';
  titleInput.value = '';
  textInput.value = '';
  blockDiv.style.opacity = '0';
  blockDiv.style.top = '-100%';
  editElem.lastChild.innerText = select.value;
});

// ----------------------------- btnDeleteAll -----------------------------

btnDeleteAll.addEventListener('click', () => {
  if (doneArray.length > 0) {
    warningModalContainer.style.justifyContent = 'space-between';
    warningModalTitle.style.fontSize = '25px';
    warningModalTitle.innerText = 'Kill Them All 💀?';
    warningModalContainer.append(btnWarningModalOk);
    warningModal.style.opacity = '1';
    warningModal.style.top = 'calc(40%)';
    blockDiv.style.opacity = '1';
    blockDiv.style.top = '0';
  } 
});

// ----------------------------- btnWarningModalCancel -----------------------------

btnWarningModalCancel.addEventListener('click', () => {
  warningModal.style.opacity = '0';
  warningModal.style.top = 'calc(-40%)';
  blockDiv.style.opacity = '0';
  blockDiv.style.top = '-100%';
});

// ----------------------------- btnWarningModalOk -----------------------------

btnWarningModalOk.addEventListener('click', () => {
  warningModal.style.opacity = '0';
  warningModal.style.top = 'calc(-40%)';
  blockDiv.style.opacity = '0';
  blockDiv.style.top = '-100%';
  doneContainer.innerHTML = '';
  doneArray = [];
  doneCounter.innerText = doneArray.length;
});
