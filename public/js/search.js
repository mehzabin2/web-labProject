window.addEventListener('load', async () => {
  const query = localStorage.getItem('searchQuery') || '';
  const container = document.getElementById('searchResults');

  if (!query) {
    container.textContent = 'No search query found.';
    return;
  }

  try {
    const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      container.textContent = 'No products found.';
      return;
    }

    container.innerHTML = '';

    products.forEach(plant => {
      const card = document.createElement('div');
      card.classList.add('cardcls');
      card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" />
        <h3>${plant.name}</h3>
        <p>${plant.size}</p>
        <p>৳${plant.price}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.textContent = 'Error loading search results.';
  }
});
