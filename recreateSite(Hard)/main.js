const changeContent = document.querySelector('.myContent');
const aboutContent = document.querySelector('#aboutContent');

aboutContent.addEventListener('click', doChange);

function loadContent(){
  var xmlhttp = new XMLHttpRequest();
  var pathToFile = 'contact.html';
  xmlhttp.open("GET", pathToFile , false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

function doChange(e){
  changeContent.innerHTML = loadContent();
}