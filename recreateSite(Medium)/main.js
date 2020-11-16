//----------Scroll Smooth---------//
const links = document.querySelectorAll("#navbarSupportedContent ul a");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  //número, em pixels, que representa a distância do elemento para o 
  //topo do elemento pai mais próximo posicionado com relative.
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop - 25,
    behavior: "smooth"
  });

}
//----------END---------//

//----------Modal---------//

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const order = document.querySelector('#order');
const message = document.querySelector('#textArea');
const submit = document.querySelector('#submitButton');

const modal = document.querySelector('#myModal');
const span = document.querySelector('.close')
const messageModal = document.querySelector('#messageModal');

submit.addEventListener('click', onSubmit);
span.addEventListener('click', closeSpan);

function onSubmit(e) {
  e.preventDefault();

  if (firstName.value === '' || lastName.value === '' || email.value === ''
    || order.value === '' || message.value === '') {

    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = '<b>Please Fill all the fields</b>';

    messageModal.appendChild(errorMessage);

  } else {

    const addName = document.createElement('p');
    const addEmail = document.createElement('p');
    const addOrder = document.createElement('p');
    const addMessage = document.createElement('p');

    addName.innerHTML = `Name: ${firstName.value} ${lastName.value}`;
    addEmail.innerHTML = `Email: ${email.value}`;
    addOrder.innerHTML = `Order: ${order.value}`;
    addMessage.innerHTML = `Message: ${message.value}`;

    messageModal.appendChild(addName);
    messageModal.appendChild(addEmail);
    messageModal.appendChild(addOrder);
    messageModal.appendChild(addMessage);


  }
}

function closeSpan() {
  messageModal.innerHTML = '';
  modal.style.display = "none";
}

//----------END---------//


//----------Cards---------//

const cards = [{
  title: "Colosseum",
  description: "This is one of 100 exclusive NFT's of the Official Launch Edition of the OBELIX DeFi Hedge Fund.",
  price: "0.07ETH",
  imgUrl: "https://ipfs.rarible.com/ipfs/QmRgrcqH2Sz6YHYPGxLv4agBMXQX61F2j3EksjKjfmED9y",
  urlBuy: "https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:63481:0xf224f3d60da3eb287c43c780be7aa3499d1faf75"
}, {
  title: "Senate",
  description: "This is one of 64 exclusive NFT's of the Official Launch Edition of the OBELIX DeFi Hedge Fund.",
  price: "0.19ETH",
  imgUrl: "https://ipfs.rarible.com/ipfs/QmeZwA9kuPL1jAkLx7d4Rc8qujtuMK8aYKskbULARfDL8K",
  urlBuy: "https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:63464:0xf224f3d60da3eb287c43c780be7aa3499d1faf75"
}, {
  title: "Maximus",
  description: "This is one of 3 ONLY Exclusive NFT's of the Pre-Launch Edition of the OBELIX DeFi Hedge Fund.",
  price: "4.99ETH",
  imgUrl: "https://ipfs.rarible.com/ipfs/QmZ2aL4njLDkJfotYCfXXk22H9oReZ4DQj3pxtSHpEnzoN",
  urlBuy: "https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:63420:0xf224f3d60da3eb287c43c780be7aa3499d1faf75"
}, {
  title: "Obelix Lambo",
  description: "This is one of ONLY 20 exclusive Lambos of the Official Launch Edition of the OBELIX DeFi Hedge Fund.",
  price: "1.50ETH",
  imgUrl: "https://ipfs.rarible.com/ipfs/QmSeBGfPxytCSW4sH37JhW295wNiqqAcN1GXFR5gyaLyWd",
  urlBuy: "https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:51035:0xf224f3d60da3eb287c43c780be7aa3499d1faf75"
}, {
  title: "Obelix & Dogmatix",
  description: "We introduce you our first animated NFT and first Stage 1 Card ",
  price: "0.69ETH",
  imgUrl: "https://ipfs.rarible.com/ipfs/QmezTyNheqyXUj7d9iCzwx3CkDP9QGZCb7PF5QL4d3giG8/image.gif",
  urlBuy: "https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:66285:0xf224f3d60da3eb287c43c780be7aa3499d1faf75"
}];

const container = document.querySelector('#containerCard');

cards.forEach((result, idx) => {

  const card = document.createElement('div');
  card.classList = 'card-body';

  // Construct card content
  const content = `
   <div class="col-sm-4 mb-5">
    <div class="card">
     <img class="card-img-top" src="${result.imgUrl}" alt="Card image cap">
      <div class="card-body text-center">
        <h5>${result.title}</h5>
        <p>${result.description}</p>
        <p>${result.price}</p>
        <a href="${result.urlBuy}" target="_blank"><button type="button" class="btn btn-outline-dark buttonCard">
        Buy now on UnityDAO
      </button></a>
      </div>
    </div>
   </div>
  `;
  container.innerHTML += content;
});








