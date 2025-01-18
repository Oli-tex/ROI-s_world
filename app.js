let toggleNavStatus = false;

let toggleNav = function () {
  let getSidebar = document.querySelector(".navbar-menu");
  let getSidebarUL = document.querySelector(".side-nav ul");
  let getSidebarLinks = document.querySelectorAll(".side-nav a");
  let getSidebarVisibility = document.querySelector(".side-nav");
  var htmlGrab = document.querySelector("html");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".overlay");
  const mobileWrapper = document.querySelector(".mobile-nav");

  hamburger.classList.toggle("is-active");
  htmlGrab.classList.toggle("scroll__pattern");

  if (toggleNavStatus === false) {
    getSidebarVisibility.style.visibility = "visible";
    getSidebarVisibility.style.pointerEvents = "initial";

    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = "1";
      item.style.visibility = "visible";
    });
    getSidebar.style.width = "60%";
    getSidebar.style.position = "fixed";
    overlay.style.width = "100%";
    mobileWrapper.style.position = "fixed";
    mobileWrapper.style.width = "100%";
    htmlGrab.classList.add("clicked");
    toggleNavStatus = true;
    // servicesUL.classList.add("clicked");
  } else if (toggleNavStatus === true) {
    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transitionDelay = "0s";
      item.style.visibility = "hidden";
    });
    getSidebar.style.width = "0";
    overlay.style.width = "0";
    htmlGrab.classList.remove("clicked");
    toggleNavStatus = false;
    // servicesUL.classList.remove("clicked");
    getSidebarVisibility.style.pointerEvents = "none";
  }
};

// ------------------------------------------------- DARK MODE -----------------------------

/* Body and Core Elements */
var body = document.querySelector("body");

// Dark Mode Action
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".dark-mode-button");
// for an optional footer dark mode button as well
const darkModeToggleFooter = document.querySelector("footer .dark-mode-button");

// This is where you add the dakr mode class.  When the dark mode is enabled as true in localstorage,
// it will add all the dark-mode classes to the elements we created in the variables above
const enableDarkMode = () => {
  // Core dark mode styles
  body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
};

// This is where we remove dark mode.  Just copy and paste all the lines where you added a class
// and paste them into this function, then change "addClass" to "removeClass"
const disableDarkMode = () => {
  body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", null);
};

if (darkMode == "enabled") {
  enableDarkMode();
}

// add event listener to the dark mode button toggle
darkModeToggle.addEventListener("click", () => {
  // on click, check localstorage for the dark mode value
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    // if dark mode is not enabled, run this function to set it to enabled
    enableDarkMode();
  } else {
    // if dark mode is enabled, run this function to set it to disabled
    disableDarkMode();
  }
});

// sticky nav

const headerEl = document.querySelector("header");
const navEl = document.querySelector("nav");
const navHeight = navEl.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navEl.classList.add("sticky");
  else navEl.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(headerEl);

// reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section__hidden");
  observer.observe(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

// tabbed components

const tabsContainer = document.querySelector(".faq-faq-group");
const tabs = document.querySelectorAll(".faq-faq-item");
const tabsContent = document.querySelectorAll(".faq-item-text");

tabs.forEach((t) => t.classList.remove("active"));

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".faq-faq-item");

  clicked.classList.toggle("active");
  document
    .querySelector(`.item-${clicked.dataset.tab}`)
    .classList.add("active");
});

// scroll to page and count stats

const counters = document.querySelectorAll(".counter");
const container = document.querySelector(".stats-card-group");

// variablbe that tracks if the counters have been activated

let activated = false;

// add scroll to the page

window.addEventListener("scroll", () => {
  // if the page is scrolled to the containers element and the counters are not activated

  if (
    pageYOffset > container.offsetTop - container.offsetHeight - 200 &&
    activated === false
  ) {
    // select all the counters
    counters.forEach((counter) => {
      // set counter values to zero
      counter.innerText = 0;
      // set counter variable to track the count
      let count = 0;

      // update count function

      function updateCount() {
        // get counter target number to count to
        const target = parseInt(counter.dataset.count);
        // as long as the count is below the target number
        if (count < target) {
          // increment the count
          count++;
          // set the counter text to the count
          counter.innerText = count;
          // repeat this every 10 milliseconds
          setTimeout(updateCount, 20);
          // count speed and when the target is reached
        } else {
          // set the counter text to the target number
          counter.innerText = target;
        }
      }
      // run the function initially
      updateCount();
      // set activated to true
      activated = true;
    });
  } else if (
    pageYOffset < container.offsetTop - container.offsetHeight - 500 ||
    (pageYOffset === 0 && activated === true)
  ) {
    // select all counters
    counters.forEach((counter) => {
      counter.innerText = 0;
    });
    // set activated to false
    activated = false;
  }
});
