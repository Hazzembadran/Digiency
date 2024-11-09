const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = document.querySelector("#btn-bars");

const menuSun = document.getElementById("menu-sun");
const menuSunIcon = menuSun.querySelector("i");

const body = document.getElementsByTagName("body");



//to show list of ul 
menuBtnIcon.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");

  menuBtnIcon.setAttribute("class", isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars")
})


navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
})


// Change Theme
menuSunIcon.addEventListener("click", (e) => {

  if (menuSunIcon.className === "fa-solid fa-sun") {
    withLightTheme();

  }
  else {
    withDarkTheme();

  }

  document.body.classList.toggle("darkmode")
});



const withLightTheme = () => {
  menuSunIcon.classList.remove("fa-solid")
  menuSunIcon.classList.remove("fa-sun")

  menuSunIcon.classList.add("fa-regular")
  menuSunIcon.classList.add("fa-sun")

  menuSunIcon.style.color = "white";


  menuBtnIcon.style.color = "white";

};


const withDarkTheme = () => {
  menuSunIcon.classList.remove("fa-regular");
  menuSunIcon.classList.remove("fa-sun");

  menuSunIcon.classList.add("fa-solid");
  menuSunIcon.classList.add("fa-sun");

  menuSunIcon.style.color = "black";

  menuBtnIcon.style.color = "black";

}

// A function that determines which words will appear
function truncateWords(elementId, maxWords) {
  const ele = document.getElementById(elementId);
  const text = ele.textContent;
  const words = text.split(' ');
  const truncateWords = words.slice(0, maxWords);
  ele.textContent = truncateWords.join(' ');
}

let widthSceen = window.innerWidth;


if (widthSceen < 1024) {
  truncateWords("feed_p", 38);
  truncateWords("feed_p2", 38);
}

if (widthSceen < 767) {
  truncateWords("feed_p", 8);
  truncateWords("feed_p2", 8);
}



// Counters in Our Work Section
let counters = {
  customer: { upto: 0, target: 250, interval: 20, elementId: "customer" },
  projects: { upto: 0, target: 165, interval: 20, elementId: "projects-completed" },
  team: { upto: 0, target: 50, interval: 20, elementId: "team-member" },
  company: { upto: 0, target: 15, interval: 60, elementId: "our-company" }
};

function startCounting() {
  Object.keys(counters).forEach(type => {
    console.log(type)
    counters[type].intervalId = setInterval(function () {
      updated(type);
    }, counters[type].interval);
  });
}

function updated(type) {
  // console.log(type)
  let counter = counters[type];
  let ele = document.getElementById(counter.elementId);

  ele.innerHTML = `${++counter.upto}+`;

  if (counter.upto === counter.target) {
    clearInterval(counter.intervalId);  // إيقاف المؤقت الخاص بالعداد عند الوصول إلى الهدف
  }
}

// مراقبة السكشن باستخدام IntersectionObserver
let sectionWork = document.getElementById("haz");
let observer = new IntersectionObserver(function (entries) {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      startCounting();  // بدء العد عند ظهور السكشن
      observer.unobserve(sectionWork);  // إيقاف المراقبة بعد البدء
    }
  });
}, { threshold: 0.5 });

// بدء المراقبة
observer.observe(sectionWork);





// Button that scrolls to the top of the page when clicked
document.getElementById("scrollToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Determine active link based on scrolling
let sections = document.querySelectorAll('section');
let aNav = document.querySelectorAll('nav ul a');

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // إزالة الصنف النشط من جميع الروابط
      aNav.forEach(link => {
        link.classList.remove('active');
      });

      // إضافة الصنف النشط للرابط المناسب
      let activeLink = document.querySelector('nav ul a[href*=' + id + ']');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
};





