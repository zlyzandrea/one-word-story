import * as firebase from 'firebase';
import forEach from 'lodash.foreach';

import { makeColorFromString } from './makeColor';

let uid;

const config = {
  apiKey: "AIzaSyB7qB3Jxprx4-AK539MPVQbsH9jnX3x-bQ",
  authDomain: "pixels-1664f.firebaseapp.com",
  databaseURL: "https://pixels-1664f.firebaseio.com",
  projectId: "pixels-1664f",
  storageBucket: "",
  messagingSenderId: "518960973503"
};

const db = firebase
  .initializeApp(config)
  .database()
  .ref('onewordstory-authors')

firebase
  .auth()
  .signInAnonymously()
  .catch((err) => {
    console.warn(err);
  });

firebase
  .auth()
  .onAuthStateChanged((user) => {
    if (user) {
      console.warn('user set', user.uid);
      uid = user.uid;
    }
  })

db.on('value', (snapshot) => {
  let currentStory = []
  const wordVals = snapshot.val()

  const output = document.getElementsByClassName('output')[0]
  output.innerHTML = '';

  forEach(wordVals, (v, k) => {
    let newWord = document.createElement('span');
    newWord.innerHTML = v.word;
    newWord.style.color = makeColorFromString(v.author);

    output.appendChild(newWord);
  });
});

document.addEventListener("DOMContentLoaded", init);

function addEntry(e) {
  startLoadingSpinner();

  const wordInput = document.getElementById('nextword-input');
  const nextWord = wordInput.value;
  wordInput.value = "";

  db.push()
    .set({
      author: uid,
      word: nextWord,
    }, wordAdded);

  e.preventDefault();
}

function startLoadingSpinner() {
  const wordInput = document.getElementById('nextword-input');
  wordInput.disabled = true;
}

function wordAdded() {
  const wordInput = document.getElementById('nextword-input');
  wordInput.disabled = false;

  wordInput.focus();
}

function init() {
  document
    .getElementById('nextword')
    .addEventListener('submit', addEntry);

  const inputElement = document.getElementById('nextword-input')
  inputElement.focus();

  inputElement.onblur = () => {inputElement.focus()};
}
