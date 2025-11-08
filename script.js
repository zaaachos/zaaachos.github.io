document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btnTheme = document.querySelector('.fa-moon');
  const btnHamburger = document.querySelector('.fa-bars');
  const header = document.querySelector('.header');
  let lastScroll = 0;

  // Theme handling
  const addThemeClass = (bodyClass, btnClass) => {
    body.classList.add(bodyClass);
    btnTheme.classList.add(btnClass);
    document.documentElement.setAttribute('data-theme', bodyClass);
  }

  const getBodyTheme = localStorage.getItem('portfolio-theme');
  const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

  const setTheme = (bodyClass, btnClass) => {
    // Remove previous theme
    body.classList.remove(localStorage.getItem('portfolio-theme'));
    btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

    // Add new theme with transition
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    addThemeClass(bodyClass, btnClass);

    // Store theme preference
    localStorage.setItem('portfolio-theme', bodyClass);
    localStorage.setItem('portfolio-btn-theme', btnClass);

    // Add theme change animation
    const themeChangeAnimation = document.createElement('div');
    themeChangeAnimation.className = 'theme-change-animation';
    document.body.appendChild(themeChangeAnimation);

    // Remove animation element after it completes
    setTimeout(() => {
      themeChangeAnimation.remove();
    }, 500);
  };

  const toggleTheme = () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    const newIcon = isDark ? 'fa-moon' : 'fa-sun';
    
    // Rotate theme icon
    btnTheme.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      btnTheme.style.transform = '';
    }, 300);

    setTheme(newTheme, newIcon);
  };

  // Theme toggle event listener
  btnTheme.addEventListener('click', toggleTheme);

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (document.querySelector('.display-nav-list')) {
          displayList();
        }
      }
    });
  });

  // Header scroll behavior
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove header shadow based on scroll
    if (currentScroll > 0) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const displayList = () => {
    const navUl = document.querySelector('.nav__list');
    const isExpanded = btnHamburger.classList.contains('fa-times');

    btnHamburger.classList.toggle('fa-bars');
    btnHamburger.classList.toggle('fa-times');
    navUl.classList.toggle('display-nav-list');
    
    // Add slide animation classes
    if (!isExpanded) {
      navUl.classList.add('nav-slide-in');
      navUl.classList.remove('nav-slide-out');
    } else {
      navUl.classList.add('nav-slide-out');
      navUl.classList.remove('nav-slide-in');
    }

    // Update aria-expanded attribute
    btnHamburger.setAttribute('aria-expanded', !isExpanded);
  };

  btnHamburger.addEventListener('click', displayList);

  // Scroll to top button
  const scrollUp = () => {
    const btnScrollTop = document.querySelector('.scroll-top');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 500) {
      btnScrollTop.classList.add('show-scroll-top');
    } else {
      btnScrollTop.classList.remove('show-scroll-top');
    }
  };

  document.addEventListener('scroll', scrollUp);
});