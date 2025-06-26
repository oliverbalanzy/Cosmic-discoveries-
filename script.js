document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.pointerEvents = 'none';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileButton = document.querySelector('.mobile');
    const navContainer = document.querySelector('.nav-container');
    
    mobileButton.addEventListener('click', function() {
        navContainer.classList.toggle('active');
        
        const icon = mobileButton.querySelector('i');
        if (navContainer.classList.contains('active')) {
            icon.classList.remove('fa-outdent');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-outdent');
        }
    });
    
    const dropbtns = document.querySelectorAll('.dropbtn');
    
    dropbtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const dropdownContent = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');
            document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
                if (dropdown !== dropdownContent) {
                    dropdown.classList.remove('active');
                    dropdown.previousElementSibling.querySelector('.fa-chevron-down').style.transform = 'rotate(0)';
                }
            });

            dropdownContent.classList.toggle('active');

            if (dropdownContent.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0)';
            }
        });
    });
 
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            navContainer.classList.remove('active');
            mobileButton.querySelector('i').classList.remove('fa-times');
            mobileButton.querySelector('i').classList.add('fa-outdent');

            document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.previousElementSibling.querySelector('.fa-chevron-down').style.transform = 'rotate(0)';
            });
            
        });
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && !event.target.closest('.mobile')) {
            navContainer.classList.remove('active');
            mobileButton.querySelector('i').classList.remove('fa-times');
            mobileButton.querySelector('i').classList.add('fa-outdent');
            
            document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.previousElementSibling.querySelector('.fa-chevron-down').style.transform = 'rotate(0)';
            });
        }
    });
});


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideCount = slides.length;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  slides[index].classList.add('active');

  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  showSlide(currentSlide);
}

setInterval(nextSlide, 7600);

const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => b.classList.remove('active'));

    btn.classList.add('active');

    const targetTab = btn.getAttribute('data-tab');

    document.querySelectorAll('.tab-pane').forEach((pane) => {
      pane.classList.remove('active');
    });

    document.getElementById(targetTab).classList.add('active');
  });
});

function updateVisitorCounter() {
  const counter = document.getElementById('visitorCount');
  let count = parseInt(counter.textContent);
  count += Math.floor(Math.random() * 3) + 1;
  counter.textContent = count;
}
setInterval(updateVisitorCounter, 5000);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      history.pushState(null, null, targetId);
    }
  });
});

const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

function updateScrollPadding() {
  const header = document.querySelector('header');
  if (header) {
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty(
      '--scroll-padding',
      `${headerHeight}px`
    );
  }
}

updateScrollPadding();

window.addEventListener('resize', updateScrollPadding);

function updateDateTime() {
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  document.getElementById('current-date').textContent = now.toLocaleDateString(
    'en-US',
    options
  );

  document.getElementById('current-time').textContent =
    now.toLocaleTimeString('en-US');
}

updateDateTime();
setInterval(updateDateTime, 1000);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(4);
      const lon = position.coords.longitude.toFixed(4);
      document.getElementById(
        'location'
      ).textContent = `Lat: ${lat}°, Lon: ${lon}°`;
    },
    (error) => {
      document.getElementById('location').textContent =
        'Location permission denied';
    }
  );
} else {
  document.getElementById('location').textContent = 'Geolocation not supported';
}
