// SCROLLING ///////////////////////////////////////////////////////////////////

// WEB SCROLLING
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// LINK SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
});

// HERO ANIMATE ////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => { // BUTTON EXPLORE
  const button_explore = document.querySelector('.button-explore');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        button_explore.classList.add('visible', 'draw');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(button_explore);
});
// HERO BOX
document.addEventListener('DOMContentLoaded', () => { 
  const logo = document.querySelector('.box-logo');
  const border = document.querySelector('.box-border');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        logo.classList.add('visible');
        border.classList.add('visible');
        border.classList.add('draw');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(border);
});

// LISTINGS ////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.listing-cards');
  const cards = Array.from(container.querySelectorAll('.listing-card'));

  // Clear the original cards from the container
  container.innerHTML = '';

  // Group every 3 cards into a new row
  for (let i = 0; i < cards.length; i += 3) {
    const row = document.createElement('div');
    row.classList.add('listing-row');

    cards.slice(i, i + 3).forEach(card => row.appendChild(card));
    container.appendChild(row);
  }
});
// SEE MORE
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.listing-card');
  const button = document.querySelector('.button-see-more');

  cards.forEach((card, index) => {
    if (index >= 3) {
      card.classList.add('hidden');
    }
  });

  let expanded = false;

  button.addEventListener('click', () => {
    expanded = !expanded;

    cards.forEach((card, index) => {
      if (index >= 3) {
        card.classList.toggle('hidden', !expanded);
      }
    });

    button.textContent = expanded ? 'SEE LESS' : 'SEE MORE';
  });
});

// ABOUT US ////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav p, .other-navs p');
  const aboutSections = document.querySelectorAll('.about > div');

  navLinks.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.forEach(i => i.classList.remove('active'));

      item.classList.add('active');

      const target = item.dataset.target;

      aboutSections.forEach(section => {
        if (section.classList.contains(target)) {
          section.style.display = 'flex'; // or 'block'
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});
// ABOUT OVERVIEW LABEL ANIMATION
document.addEventListener('DOMContentLoaded', () => {
  const label = document.querySelector('.overview-label');

  function animateOnScroll() {
    const rect = label.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      label.classList.add('animate');
      window.removeEventListener('scroll', animateOnScroll); // only once
    }
  }

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
// ABOUT OVERVIEW BORDER ANIMATION
document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.overview-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        box.classList.add('draw');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(box);
});
// ABOUT SERVICE ANIMATION
document.querySelectorAll('.main-nav p, .other-navs p').forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-target');
    
    // Hide all sections
    document.querySelectorAll('.about > div').forEach((section) => {
      section.style.display = 'none';
    });

    // Show the selected one
    const targetSection = document.querySelector(`.about-${targetId.split('-')[1]}`);
    targetSection.style.display = 'block'; // or 'block' depending on your layout

    // Add animation class for SERVICE SECTION
    if (targetId === 'about-services') {
      const title = targetSection.querySelector('.about-service-title');
      const icons = targetSection.querySelectorAll('.about-service-icon');

      // Reset first (optional if you want to replay animations)
      title.classList.remove('animate');
      icons.forEach((icon) => icon.classList.remove('animate'));

      // Trigger reflow to restart animation (needed sometimes)
      void title.offsetWidth;

      // Animate title
      setTimeout(() => title.classList.add('animate'), 100);

      // Animate icons one by one
      icons.forEach((icon, index) => {
        setTimeout(() => {
          icon.classList.add('animate');
        }, 200 + index * 150);
      });
    }
  });
});
// ABOUT VISION MISSION ANIMATION
document.querySelectorAll('.main-nav p, .other-navs p').forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-target');

    // Hide all sections
    document.querySelectorAll('.about > div').forEach((section) => {
      section.style.display = 'none';
    });

    // Show the selected section
    const targetSection = document.querySelector(`.about-${targetId.split('-')[1]}`);
    targetSection.style.display = 'block';

    // Animate icon (for Vision and Mission)
    const pin = targetSection.querySelector('.about-vision-pin');
    if (pin) {
      // Reset animation
      pin.classList.remove('animate');
      void pin.offsetWidth; // force reflow

      // Trigger animation
      setTimeout(() => pin.classList.add('animate'), 100);
    }
  });
});
// ABOUT LOT PROJECTS ANIMATION
document.querySelectorAll('.main-nav p, .other-navs p').forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-target');

    // Hide all sections
    document.querySelectorAll('.about > div').forEach((section) => {
      section.style.display = 'none';
    });

    // Show the selected one
    const targetSection = document.querySelector(`.about-${targetId.split('-')[1]}`);
    targetSection.style.display = 'flex';

    // Animate LOTS section
    if (targetId === 'about-lots') {
      const text = targetSection.querySelector('.about-lots-text');
      const lots = targetSection.querySelectorAll('.lot-project-card');

      // Reset animations
      text.classList.remove('animate');
      lots.forEach((card) => card.classList.remove('animate'));
      void text.offsetWidth; // force reflow

      // Animate text
      setTimeout(() => text.classList.add('animate'), 100);

      // Animate cards one by one
      lots.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, 25 + index * 50); // stagger delay
      });
    }
  });
});

// AGENT IMAGES ////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  const agentImages = document.querySelectorAll('.agent-image');
  let current = 0;

  // Ensure at least one image starts as visible
  agentImages[current].classList.add('active');

  setInterval(() => {
    agentImages[current].classList.remove('active');
    current = (current + 1) % agentImages.length;
    agentImages[current].classList.add('active');
  }, 3000);
});

// FAQ  ////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
     // Toggle active class
    item.classList.toggle('active');
  });
});

// SERVICE SLIDER //////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.service-slide');
  const dotsContainer = document.querySelector('.dots');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let current = 0;
  let autoplay = true;
  let interval;

  // STEP 1: Create dots once
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  // STEP 2: Function to show the active slide and update dots
  function showSlide(index) {
    const offset = -index * 100;
    document.querySelector('.service-slides').style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // STEP 2: Navigation
  leftArrow.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  rightArrow.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // STEP 4: Autoplay
  if (autoplay) {
    interval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);

    const slider = document.querySelector('.service-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 5000);
    });
  }

  // STEP 5: Initialize
  showSlide(current);
});

// PHOTO SLIDER
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.photo-slide');
  const dotsContainer = document.querySelector('.dots');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let current = 0;
  let autoplay = true;
  let interval;

  // STEP 1: Create dots once
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  // STEP 2: Function to show the active slide and update dots
  function showSlide(index) {
    const offset = -index * 100;
    document.querySelector('.photo-slides').style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // STEP 2: Navigation
  leftArrow.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  rightArrow.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // STEP 4: Autoplay
  if (autoplay) {
    interval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);

    const slider = document.querySelector('.service-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 5000);
    });
  }

  // STEP 5: Initialize
  showSlide(current);
});

// ALL ARROWS
document.addEventListener("DOMContentLoaded", () => {
  function setupSlider(containerSelector, slidesSelector) {
    const slider = document.querySelector(containerSelector);
    const slides = slider.querySelectorAll(slidesSelector);
    const slidesWrapper = slider.querySelector(`${slidesSelector}s`);
    const dotsContainer = slider.querySelector('.dots');
    const leftArrow = slider.querySelector('.arrow.left');
    const rightArrow = slider.querySelector('.arrow.right');

    let current = 0;
    let autoplay = true;
    let interval;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        current = i;
        showSlide(current);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function showSlide(index) {
      const offset = -index * 100;
      slidesWrapper.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    leftArrow.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    rightArrow.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    if (autoplay) {
      interval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 5000);

      slider.addEventListener('mouseenter', () => clearInterval(interval));
      slider.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
          current = (current + 1) % slides.length;
          showSlide(current);
        }, 5000);
      });
    }

    // SWIPE ACROSS SLIDES
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // swipe threshold
        if (diff > 0) {
          // Swipe left
          current = (current + 1) % slides.length;
        } else {
          // Swipe right
          current = (current - 1 + slides.length) % slides.length;
        }
        showSlide(current);
      }
    }
  }

  // Initialize each slider separately
  setupSlider('.service-slider', '.service-slide');
  setupSlider('.photo-slider', '.photo-slide');
});

// SERVICE 
function centerBox(element) {
  element.style.justifySelf = 'center';
  element.style.borderTopLeftRadius = '50px';
  element.style.borderBottomLeftRadius = '25px';
  element.style.borderTopRightRadius = '0';
  element.style.borderBottomRightRadius = '0';
  element.style.boxShadow = '-2px 2px 2px rgba(109, 10, 10, 0.25)';
}

// SERVICE ICON ANIMATE //////////////////////////////////////////////////////////////
  document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
    });

    services.forEach(service => observer.observe(service));
  });

// SHARE WEBSITE LINK
function copyWebsiteLink(event) {
  event.preventDefault();

  const url = window.location.href;

  // Copy to clipboard
  navigator.clipboard.writeText(url)
    .then(() => alert('Website link copied to clipboard!'))
    .catch(err => alert('Failed to copy: ' + err));
}

// VEHICLE RENTAL LIST
document.addEventListener('DOMContentLoaded', () => {
  const rentBoxes = document.querySelectorAll('.rent-list .rent-box');
  const btnMore = document.querySelector('.btn-more');
  let visibleCount = 4;
  // Hide all except the first 4
  rentBoxes.forEach((box, index) => {
    if (index >= visibleCount) {
      box.classList.add('hidden-rent-box');
    }
  });

  btnMore.addEventListener('click', () => {
    const nextVisibleCount = visibleCount + 4;
    rentBoxes.forEach((box, index) => {
      if (index < nextVisibleCount) {
        box.classList.remove('hidden-rent-box');
      }
    });

    visibleCount = nextVisibleCount;
    if (visibleCount >= rentBoxes.length) {
      btnMore.style.display = 'none';
    }
  });
});