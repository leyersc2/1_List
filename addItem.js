const electron = require('electron');
const {ipcRenderer} = electron;

// const form = document.querySelector('form');
// form.addEventListener('submit', submitForm);

function submitForm(){
//   e.preventDefault();
  let anItem = document.getElementById('item');
  console.log(anItem.value);
}