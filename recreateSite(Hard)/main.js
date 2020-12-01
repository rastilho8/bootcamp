const changeContent = document.querySelector('.myContent');
const contactContent = document.querySelector('#contactContent');
const aboutContent = document.querySelector('#aboutContent');
const homeContent = document.querySelector('#homeContent');
const postsContent = document.querySelector('#postsContent');
const titleMain = document.querySelector('#titleMain');
const subtitleMain = document.querySelector('#subtitleMain');
const body = document.querySelector('body');
const header = document.querySelector('header');
const html = document.querySelector('html');

function loadContent(path) {
  var xmlhttp = new XMLHttpRequest();
  var pathToFile = `${path}`;
  let returnResponse = null;
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      returnResponse = xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", pathToFile, false);
  xmlhttp.send();
  return returnResponse;
}

/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/

contactContent.addEventListener('click', changeToContact);

function changeToContact(e) {

  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {

    header.style = "";
    titleMain.style = "";
    subtitleMain.style = "";


    titleMain.innerHTML = "Contact us!";
    subtitleMain.innerHTML = "Have questions? We have answers."
    changeContent.innerHTML = loadContent('contact.html');

    // Fade in
    body.style.opacity = 1;
  }, 500);
}


/*--------------------------------------------------------------
# About Us
--------------------------------------------------------------*/

aboutContent.addEventListener('click', changeToAbout);

function changeToAbout(e) {
  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {

    header.style = "";
    titleMain.style = "";
    subtitleMain.style = "";

    titleMain.innerHTML = "About us!";
    subtitleMain.innerHTML = "Want to know about us?"
    changeContent.innerHTML = loadContent('aboutUs.html');

    // Fade in
    body.style.opacity = 1;
  }, 500);
}


/*--------------------------------------------------------------
# Home & Posts
--------------------------------------------------------------*/
window.onload = function () {
  let eventTrigger = new Event("click");
  homeContent.dispatchEvent(eventTrigger);
}

homeContent.addEventListener('click', changeToHomeOrPosts);
postsContent.addEventListener('click', changeToHomeOrPosts);

var post_object = [];
function changeToHomeOrPosts(e) {
  //Fade out
  body.style.opacity = 0;

  // Wait for the transition 
  setTimeout(function () {
    scroll(0, 0);
    post_object = [];
    changeContent.innerHTML = '';
    header.style = "";
    titleMain.style = "";
    subtitleMain.style = "";

    const addButton = document.createElement('button');
    addButton.classList.add('btn');
    addButton.classList.add('mybutton');
    addButton.classList.add('float-right');
    addButton.style.paddingLeft = "40px";
    addButton.style.paddingRight = "40px";


    if (e.target.id === "homeContent") {
      titleMain.innerHTML = "Crypto Blog!";
      subtitleMain.innerHTML = "Welcome to the crypto ship!?";
      addButton.innerHTML = "View All Posts ->";
      addButton.setAttribute("id", "buttonHome");
    } else {
      titleMain.innerHTML = "Posts";
      subtitleMain.innerHTML = "";
      addButton.innerHTML = "Older Posts ->";
      addButton.setAttribute("id", "buttonPosts");
    }


    let i = 1;
    //populate array with the posts available
    for (i = 1; i <= 6; i++) {
      post_object.push(JSON.parse(loadContent("posts/post" + i + ".json")));
    }
    console.log(post_object);
    post_object.reverse();

    /*--------------------------------------------------------------
    # Start creating the content of the first 5 posts
    --------------------------------------------------------------*/
    let x = 0;
    for (x = 0; x <= 4; x++) {

      const addTitle = document.createElement('a');
      const addTitleStyle = document.createElement('h2');
      const addSubTittle = document.createElement('h4');
      const addAuthor = document.createElement('p');
      const addTimeRead = document.createElement('p');
      const addSeparator = document.createElement('hr');

      addTimeRead.style.marginBottom = "0px";
      addAuthor.style.marginTop = "0px";
      addTimeRead.classList.add('text-muted');
      addAuthor.classList.add('text-muted');

      addSeparator.classList.add('my-4');
      addSubTittle.classList.add('text-muted');
      addSubTittle.style.fontFamily = "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

      addTitleStyle.innerHTML = post_object[x].title;
      addTitle.appendChild(addTitleStyle);
      addTitle.href = "#";
      addTitle.style.textDecoration = "none";
      addTitle.style.color = "black";

      addTitle.onmouseout = function () {
        addTitle.style.color = "black";
      }

      addTitle.onmouseover = function () {
        addTitle.style.color = "blue";
      }

      addSubTittle.innerHTML = post_object[x].subtitle;
      addTimeRead.innerHTML = "Date: " + post_object[x].date + " Time Read: " + post_object[x].timeRead + " minutes";
      addAuthor.innerHTML = "Created by " + post_object[x].author;

      addTitle.setAttribute("id", "" + (x + 1));

      changeContent.appendChild(addTitle);
      changeContent.appendChild(addSubTittle);
      changeContent.appendChild(addTimeRead);
      changeContent.appendChild(addAuthor);
      changeContent.appendChild(addSeparator);

      let position = 0;

      //Show the post full content when is clicked
      addTitle.addEventListener('click', function (e) {
        //Fade out
        body.style.opacity = 0;

        setTimeout(function () {


          titleMain.innerHTML = post_object[(addTitle.getAttribute("id") - 1)].title;
          titleMain.style.fontSize = "45px";
          titleMain.style.textAlign = "left";
          subtitleMain.style.fontSize = "20px"
          subtitleMain.style.textAlign = "left";
          subtitleMain.innerHTML = post_object[addTitle.getAttribute("id") - 1].subtitle;

          header.style.height = "70vh"
          header.style.backgroundImage = "url('" + post_object[addTitle.getAttribute("id") - 1].imgLocation + "')";

          let findInfo = post_object[addTitle.getAttribute("id") - 1].content;
          changeContent.innerHTML = loadContent('' + findInfo);


          const divButton = document.createElement('div');
          divButton.classList.add('container');
          divButton.classList.add('d-flex')
          divButton.classList.add('justify-content-between');

          const addButtonOlder = document.createElement('button');
          const addButtonNew = document.createElement('button');

          addButtonOlder.classList.add('btn');
          addButtonNew.classList.add('btn');
          addButtonOlder.innerHTML = "<- Old Post";
          addButtonNew.innerHTML = "New Post ->";
          addButtonOlder.classList.add('mybutton');
          addButtonNew.classList.add('mybutton');

          addButtonOlder.style.paddingLeft = "40px";
          addButtonOlder.style.paddingRight = "40px";
          addButtonNew.style.paddingLeft = "40px";
          addButtonNew.style.paddingRight = "40px";

          position = addTitle.getAttribute("id") - 1;

          if (addTitle.getAttribute("id") - 1 >= 1) {
            divButton.appendChild(addButtonOlder);
            divButton.appendChild(addButtonNew);
          } else if (addTitle.getAttribute("id") - 1 < 1) {
            divButton.appendChild(addButtonOlder);
          }

          changeContent.appendChild(divButton);

          addButtonOlder.addEventListener('click', function (e) {
            body.style.opacity = 0;

            setTimeout(function () {

              scroll(0, 0);
              divButton.innerHTML = '';
              titleMain.innerHTML = post_object[position + 1].title;
              titleMain.style.fontSize = "45px";
              titleMain.style.textAlign = "left";
              subtitleMain.style.fontSize = "20px"
              subtitleMain.style.textAlign = "left";
              subtitleMain.innerHTML = post_object[position + 1].subtitle;

              header.style.height = "70vh"
              header.style.backgroundImage = "url('" + post_object[position + 1].imgLocation + "')";

              let findInfo = post_object[position + 1].content;
              changeContent.innerHTML = loadContent('' + findInfo);

              addButtonOlder.classList.add('btn');
              addButtonNew.classList.add('btn');
              addButtonOlder.innerHTML = "<- Old Post";
              addButtonNew.innerHTML = "New Post ->";
              addButtonOlder.classList.add('mybutton');
              addButtonNew.classList.add('mybutton');

              addButtonOlder.style.paddingLeft = "40px";
              addButtonOlder.style.paddingRight = "40px";
              addButtonNew.style.paddingLeft = "40px";
              addButtonNew.style.paddingRight = "40px";

              position++;

              if (position + 1 < 5) {
                divButton.appendChild(addButtonOlder);
                divButton.appendChild(addButtonNew);
              } else if (position >= 5) {
                divButton.appendChild(addButtonNew);
              }
              changeContent.appendChild(divButton);

              body.style.opacity = 1;
            }, 500);
          }, false);

          addButtonNew.addEventListener('click', function (e) {
            body.style.opacity = 0;

            setTimeout(function () {

              scroll(0, 0);
              divButton.innerHTML = '';
              titleMain.innerHTML = post_object[position - 1].title;
              titleMain.style.fontSize = "45px";
              titleMain.style.textAlign = "left";
              subtitleMain.style.fontSize = "20px"
              subtitleMain.style.textAlign = "left";
              subtitleMain.innerHTML = post_object[position - 1].subtitle;

              header.style.height = "70vh"
              header.style.backgroundImage = "url('" + post_object[position - 1].imgLocation + "')";

              let findInfo = post_object[position - 1].content;
              changeContent.innerHTML = loadContent('' + findInfo);

              addButtonOlder.classList.add('btn');
              addButtonNew.classList.add('btn');
              addButtonOlder.innerHTML = "<- Old Post";
              addButtonNew.innerHTML = "New Post ->";
              addButtonOlder.classList.add('mybutton');
              addButtonNew.classList.add('mybutton');

              addButtonOlder.style.paddingLeft = "40px";
              addButtonOlder.style.paddingRight = "40px";
              addButtonNew.style.paddingLeft = "40px";
              addButtonNew.style.paddingRight = "40px";

              position--;

              if (position - 1 > 0) {
                divButton.appendChild(addButtonOlder);
                divButton.appendChild(addButtonNew);
              } else if (position - 1 <= 0) {
                divButton.appendChild(addButtonOlder);
              }
              changeContent.appendChild(divButton);

              body.style.opacity = 1;
            }, 500);
          }, false);

          body.style.opacity = 1;
        }, 500);
      });

    }

    changeContent.appendChild(addButton);

    addButton.addEventListener('click', changeToButton);


    function changeToButton(e) {
      if (e.target.id === "buttonHome") {
        let eventTrigger = new Event("click");
        postsContent.dispatchEvent(eventTrigger);
      } else {
        /*--------------------------------------------------------------
        # Show the last post it is hard coded xD and it is not very efficient
        --------------------------------------------------------------*/
        body.style.opacity = 0;

        setTimeout(function () {
          changeContent.innerHTML = '';
          header.style = "";
          titleMain.style = "";
          subtitleMain.style = "";

          const addTitle = document.createElement('a');
          const addTitleStyle = document.createElement('h2');
          const addSubTittle = document.createElement('h4');
          const addAuthor = document.createElement('p');
          const addTimeRead = document.createElement('p');
          const addSeparator = document.createElement('hr');

          addTitleStyle.innerHTML = post_object[5].title;
          addSubTittle.innerHTML = post_object[5].subtitle;
          addTimeRead.innerHTML = "Date: " + post_object[5].date + " Time Read: " + post_object[4].timeRead + " minutes";
          addAuthor.innerHTML = "Created by " + post_object[5].author;

          addTitle.setAttribute("id", "" + 6);

          addTimeRead.style.marginBottom = "0px";
          addAuthor.style.marginTop = "0px";
          addTimeRead.classList.add('text-muted');
          addAuthor.classList.add('text-muted');

          addSeparator.classList.add('my-4');
          addSubTittle.classList.add('text-muted');
          addSubTittle.style.fontFamily = "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

          addTitleStyle.innerHTML = post_object[5].title;
          addTitle.appendChild(addTitleStyle);
          addTitle.href = "#";
          addTitle.style.textDecoration = "none";
          addTitle.style.color = "black";

          addTitle.onmouseout = function () {
            addTitle.style.color = "black";
          }

          addTitle.onmouseover = function () {
            addTitle.style.color = "blue";
          }

          changeContent.appendChild(addTitle);
          changeContent.appendChild(addSubTittle);
          changeContent.appendChild(addTimeRead);
          changeContent.appendChild(addAuthor);
          changeContent.appendChild(addSeparator);


          addTitle.addEventListener('click', function (e) {
            //Fade out
            body.style.opacity = 0;

            setTimeout(function () {
              titleMain.innerHTML = post_object[(addTitle.getAttribute("id") - 1)].title;
              titleMain.style.fontSize = "45px";
              titleMain.style.textAlign = "left";
              subtitleMain.style.fontSize = "20px"
              subtitleMain.style.textAlign = "left";
              subtitleMain.innerHTML = post_object[addTitle.getAttribute("id") - 1].subtitle;

              header.style.height = "70vh"
              header.style.backgroundImage = "url('" + post_object[addTitle.getAttribute("id") - 1].imgLocation + "')";

              let findInfo = post_object[addTitle.getAttribute("id") - 1].content;
              changeContent.innerHTML = loadContent('' + findInfo);
              body.style.opacity = 1;
            }, 500);
          });
          body.style.opacity = 1;
        }, 500);
      }
    }
    // Fade in
    body.style.opacity = 1;
  }, 500);

}




