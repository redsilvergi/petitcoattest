const mobNav = document.querySelector(".nav-toggle");
const mobDd = document.querySelector(".mob-dd");
const shopDd = document.querySelector(".shop-dd");
const aboutDd = document.querySelector(".about-dd");

const shopNav = document.querySelector(".shop-nav");
const aboutNav = document.querySelector(".about-nav");
const loginNav = document.querySelector(".login-nav");
const cartNav = document.querySelector(".cart-nav");

const toggleList = [mobNav, shopNav, aboutNav, loginNav, cartNav];
const shopNavList = ["NEW ARRIVAL", "ALL", "PHONE CASE", "GRIPTOK", "SELECT"];
const aboutNavList = ["BRAND STORY", "LOOKBOOK", "SHOWROOM", "CUSTOMER CARE"];

const updateHtml = (navList) => {
  return navList
    .map((item) => {
      return `<li><a href="/${item
        .toLowerCase()
        .replace(" ", "")}" class="nav-link">${item}</a></li>`;
    })
    .join("");
};

toggleList.map((item) => {
  item.addEventListener("click", () => {
    switch (item) {
      case mobNav:
        mobDd.classList.toggle("open");
        break;
      case shopNav:
        const ulEl = document.querySelector(".shop-dd .dd-ul");
        ulEl.innerHTML = updateHtml(shopNavList);
        shopDd.classList.toggle("open");
        break;
      case aboutNav:
        const abulEl = document.querySelector(".about-dd .dd-ul");
        abulEl.innerHTML = updateHtml(aboutNavList);
        aboutDd.classList.toggle("open");
        break;
      default:
        break;
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!mobDd.contains(target) && !mobNav.contains(target)) {
    mobDd.classList.remove("open");
  }

  if (!shopDd.contains(target) && !shopNav.contains(target)) {
    shopDd.classList.remove("open");
  }

  if (!aboutDd.contains(target) && !aboutNav.contains(target)) {
    aboutDd.classList.remove("open");
  }
});
