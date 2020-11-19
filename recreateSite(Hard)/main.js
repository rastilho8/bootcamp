const changeContent = document.querySelector('.myContent');
const contactContent = document.querySelector('#contactContent');
const aboutContent = document.querySelector('#aboutContent');
const homeContent = document.querySelector('#homeContent');
const titleMain = document.querySelector('#titleMain');
const subtitleMain = document.querySelector('#subtitleMain');
const body = document.querySelector('body');

contactContent.addEventListener('click', changeToContact);

function loadContent(path) {
  var xmlhttp = new XMLHttpRequest();
  var pathToFile = `${path}`;
  xmlhttp.open("GET", pathToFile, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

function changeToContact(e) {
  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {
    titleMain.innerHTML = "Contact us!";
    subtitleMain.innerHTML = "Have questions? We have answers."
    changeContent.innerHTML = loadContent('contact.html');

    // Fade in
    body.style.opacity = 1;
  }, 500);
}

aboutContent.addEventListener('click',changeToAbout);

function changeToAbout(e){
  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {
    titleMain.innerHTML = "About us!";
    subtitleMain.innerHTML = "Want to know about us?"
    changeContent.innerHTML = loadContent('aboutUs.html');

    // Fade in
    body.style.opacity = 1;
  }, 500);
}

homeContent.addEventListener('click', changeToHome);

function changeToHome(e){
  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {
    titleMain.innerHTML = "Crypto Blog!";
    subtitleMain.innerHTML = "Welcome to the crypto ship!?"
   

    // Fade in
    body.style.opacity = 1;
  }, 500);
}

