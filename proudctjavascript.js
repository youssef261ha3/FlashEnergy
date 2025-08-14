const cards = document.querySelectorAll('.card, .battery-card, .battery-card1');

function checkCards() {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const cardBottom = card.getBoundingClientRect().bottom;

    if (cardTop < triggerBottom && cardBottom > 0) {
      card.classList.add('show');
    } else {
      card.classList.remove('show');
    }
  });
}

window.addEventListener('scroll', checkCards);
window.addEventListener('load', checkCards);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".sidebar").classList.add("show");
});

const searchBox = document.getElementById('searchBox');
const searchInput = searchBox.querySelector('input');

searchBox.querySelector('i').addEventListener('click', () => {
  searchBox.classList.add('open');
  searchInput.focus();
});

document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target)) {
    searchBox.classList.remove('open');
    searchInput.value = '';
  }
});

const searchBtn = document.getElementById('searchBtn');
const loadingEl = document.getElementById('loading');
const notFoundEl = document.getElementById('notFound');

function searchProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const items = document.querySelectorAll('.card, .battery-card, .battery-card1');
  let found = false;

  loadingEl.style.display = "block";
  notFoundEl.style.display = "none";

  setTimeout(() => {
    items.forEach(item => {
      const titleElement = item.querySelector('.tag, .model, .title, .meta');
      const title = titleElement ? titleElement.textContent.toLowerCase() : '';

      if (title.includes(searchValue) && searchValue !== '') {
        found = true;
        if (item.classList.contains('battery-card') || item.classList.contains('battery-card1')) {
          item.style.display = "flex";
        } else {
          item.style.display = "block";
        }
        setTimeout(() => item.classList.remove('hide'), 10);
      } else {
        item.classList.add('hide');
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });

    loadingEl.style.display = "none";

    if (!found && searchValue !== '') {
      notFoundEl.style.display = "block";
    }
  }, 500);
}

searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchProducts();
  }
});

// Animation Observer (بطاريات تظهر وتختفي بالـ scroll)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target.classList.contains('battery-card') || entry.target.classList.contains('battery-card1')) {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-battery");
        entry.target.classList.remove("hide-battery");
      } else {
        entry.target.classList.remove("animate-battery");
        entry.target.classList.add("hide-battery");
      }
    } else {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.card, .battery-card, .battery-card1').forEach(el => {
  observer.observe(el);
});

const productTitle = document.querySelector('h1.prduct');
const breadcrumb = document.querySelector('.breadcrumb');

// All Products
document.getElementById('showAll').addEventListener('click', (e) => {
  e.preventDefault();

  const items = document.querySelectorAll('.card, .battery-card');
  const items2 = document.querySelectorAll('.battery-card1');
  items.forEach(item => {
    if (item.classList.contains('battery-card') || item.classList.contains('battery-card1')) {
      item.style.display = "flex";
    } else {
      item.style.display = "block";
    }
    item.classList.remove('hide');
  });

  loadingEl.style.display = "none";
  notFoundEl.style.display = "none";

  productTitle.textContent = "All Products";
  breadcrumb.innerHTML = "Home &gt; All Products";
});

// Batteries
document.getElementById('showBatteries').addEventListener('click', (e) => {
  e.preventDefault();

  const cards = document.querySelectorAll('.card');
  const batteries = document.querySelectorAll('.battery-card');
  const batteries2 = document.querySelectorAll('.battery-card1');
  cards.forEach(card => {
    card.style.display = "none";
    card.classList.add('hide');
  });

  batteries.forEach(battery => {
    battery.style.display = "flex";
    battery.classList.remove('hide');
  });

  loadingEl.style.display = "none";
  notFoundEl.style.display = "none";

  productTitle.textContent = "Batteries";
  breadcrumb.innerHTML = "Home &gt; Batteries";
});

// Inverters
document.getElementById('showInverters').addEventListener('click', (e) => {
  e.preventDefault();

  const cards = document.querySelectorAll('.card');
  const batteries = document.querySelectorAll('.battery-card, .battery-card1');

  cards.forEach(card => {
    card.style.display = "block";
    card.classList.remove('hide');
  });

  batteries.forEach(battery => {
    battery.style.display = "none";
    battery.classList.add('hide');
  });

  loadingEl.style.display = "none";
  notFoundEl.style.display = "none";

  productTitle.textContent = "Inverters";
  breadcrumb.innerHTML = "Home &gt; Inverters";
});

// تأثير تكبير عند المرور بالماوس
const allCards = document.querySelectorAll('.card, .battery-card, .battery-card1');
allCards.forEach(card => {
  card.style.transition = "transform 0.3s ease";
  card.addEventListener('mouseenter', () => {
    card.style.transform = "scale(1.05)";
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = "scale(1)";
  });
});
