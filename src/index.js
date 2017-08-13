import * as firebase from 'firebase';
import forEach from 'lodash.foreach';

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
  .ref('onewordstory')

db.on('value', (snapshot) => {
  let currentStory = []
  const wordVals = snapshot.val()
  forEach(wordVals, (v, k) => {
    currentStory.push(v);
  })
  const output = document.getElementsByClassName('output')[0]
  output.innerHTML = currentStory.join(' ');
});

document.addEventListener("DOMContentLoaded", init);

function addEntry(e) {
  startLoadingSpinner();

  const wordInput = document.getElementById('nextword-input');
  const nextWord = wordInput.value;
  wordInput.value = "";
  db.push(nextWord, wordAdded);

  e.preventDefault();
}

function startLoadingSpinner() {

}

function wordAdded() {
  console.warn('success');
}

function init() {
  document
    .getElementById('nextword')
    .addEventListener('submit', addEntry);

    document
    .getElementById('nextword-input')
    .focus();
}
