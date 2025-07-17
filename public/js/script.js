window.addEventListener('DOMContentLoaded', () => {

  // Login button
  const loginhtml = document.getElementById('navbutton');
  if (loginhtml) {
    loginhtml.addEventListener('click', () => {
      window.location.href = "login.html";
    });
  }

  // Search button
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'search.html';
      } else {
        alert("Please type something to search");
      }
    });
  }

  // Plant Card generate
  const plantlist = [
    { image: "images/plantpicture1.jpg", name: "Pathos", size: "large", price: 120 },
    { image: "images/plantpicture2.jpg", name: "Areca Palm", size: "medium", price: 180 },
    { image: "images/plantpicture12.jpg", name: "Snake", size: "small", price: 150 },
    { image: "images/plantpicture4.jpg", name: "Plant", size: "small", price: 150 },
    { image: "images/plantpicture9.jpg", name: "S", size: "small", price: 150 }
  ];

  const cardContainer = document.getElementById('main');
  if (cardContainer) {
    plantlist.forEach(plant => {
      const carddiv = document.createElement('div');
      carddiv.classList.add('cardcls');

      const img = document.createElement('img');
      img.src = plant.image;

      const name = document.createElement('h3');
      name.textContent = plant.name;

      const size = document.createElement('p');
      size.textContent = plant.size;

      const price = document.createElement('p');
      price.textContent = `৳${plant.price}`;

      const button = document.createElement('button');
      button.textContent = 'Add';

      carddiv.appendChild(img);
      carddiv.appendChild(name);
      carddiv.appendChild(size);
      carddiv.appendChild(price);
      carddiv.appendChild(button);

      cardContainer.appendChild(carddiv);
       sendallproduct(plant);
    });
  }

  // Best Selling Section
  const bestsell = [
    { image1: "images/plantpicture9.jpg", name1: "Monstera", price1: 150 },
    { image1: "images/plantpicture13.jpg", name1: "Monstera", price1: 150 },
    { image1: "images/plantpicture14.jpg", name1: "Monstera", price1: 150 }
  ];

  const sellplant = document.getElementById('sell');
  if (sellplant) {
    bestsell.forEach(item => {
      const selldiv = document.createElement('div');
      selldiv.classList.add('selldiv');

      const bestimg = document.createElement('img');
      bestimg.src = item.image1;

      const bestname = document.createElement('h3');
      bestname.textContent = item.name1;

      const bestprice = document.createElement('p');
      bestprice.textContent = `৳${item.price1}`;

      selldiv.appendChild(bestimg);
      selldiv.appendChild(bestname);
      selldiv.appendChild(bestprice);

      sellplant.appendChild(selldiv);
    });
  }

  // Functions for sending data (optional)
  async function sendallproduct(plant) {
    try {
      const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(plant),
      });
      const data = await res.json();
      console.log('data send successful', data);
    } catch (error) {
      console.error('failed to send', error);
    }
  }

  async function senditemdata(item) {
    try {
      const senddata = await fetch('/bestsell', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await senddata.json();
      console.log('data send successful', data);
    } catch (error) {
      console.error('failed to send', error);
    }
  }

}); // end of DOMContentLoaded
