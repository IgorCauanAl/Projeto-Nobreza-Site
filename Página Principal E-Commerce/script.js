const products = document.getElementById('products');
const menu = document.getElementById('menu-products-hidden');
let timeout;

products.addEventListener('mouseenter', () => {
  menu.classList.add('show');
});

products.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    if (!menu.matches(':hover')) {
      menu.classList.remove('show');
    }
  }, 100);
});

menu.addEventListener('mouseenter', () => {
  clearTimeout(timeout);
  menu.classList.add('show');
});

menu.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    if (!products.matches(':hover')) {
      menu.classList.remove('show');
    }
  }, 100);
});

const search = document.getElementById('button-search');
const menu_search = document.getElementById('sub-search-hidden');

search.addEventListener('click', () => {
  menu_search.classList.add('show-hidden');
});

search.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    if (!menu_search.matches(':hover') && !search.matches(':hover')) {
      menu_search.classList.remove('show-hidden');
    }
  }, 100);
});

menu_search.addEventListener('click', () => {
  clearTimeout(timeout);
  search.classList.add('show-hidden');
});

menu_search.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    if (!menu.matches(':hover')) {
      menu_search.classList.remove('show-hidden');
    }
  }, 100);
});
