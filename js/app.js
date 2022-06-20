/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/** Define Global Variables*/

const navlist = document.querySelector("#navbar__list");
const array = ["SECTION 1", "SECTION 2", "SECTION 3", "SECTION 4"];
const lengthOfList = array.length;
const targetSection = document.querySelectorAll("section");
/* End of Global Varibales */

/* start Helper Functions*/

var isInViewport = function (elem) {
  var distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  )
}

/* End Helper Functions*/

/* start main function - buildNav(): is the function to build the navigation as well as style it */

function buildNav(list) {
  for (i = 0; i < lengthOfList; i++) {
    //number of limes the loop shoould run
    const liTag = document.createElement("li"); //create an li tag
    const anchor = document.createElement("a"); //create an a tag
    anchor.href = `#section${i + 1}`; //create an href attribute for the each a tag
    anchor.appendChild(document.createTextNode(list[i])); // set the text of the a tag
    liTag.appendChild(anchor);
    navlist.appendChild(liTag);
  }
  //Function to style the navigation bar

  function styleNav() {
    //styling ul tag (nav ul)

    navlist.style.cssText = "text-align:right";

    //styling li tag (nav ul li)
    const liNodeList = document.querySelectorAll("li");
    liNodeList.forEach((elem) => {
      elem.style.cssText = "margin: 0 10px; padding: 10px";
      const childNodes = elem.childNodes;
      childNodes.forEach((item) => {
        item.style.cssText =
          "text-decoration: none; color: #40b2c9; font-size: 17px; font-weight: 500; transition: 0.5s; font-family: Merriweather, serif";
      })
    })
  }
  styleNav()
}

/*Function to scroll to specific section when it is clicked upon on the navbar */

function navFunc() {
  //get the anchor taags and loop through them to get each anchor for each section
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      //listen for a click event on any anchor
      e.preventDefault();
      //get the attribute link which we are to scroll to and scroll to it
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })
}

/* Function to distingush section when it is in viewport and set the class to be active */
// entries is an object that contains methods that we can manipulate,

function distinguishSection(entries) {
  //looping through the entries which is a list containing the objects
  entries.forEach((method) => {
    if (method.target && method.isIntersecting) {
      //target means the element we have currently, isIntersecting to heck if in viewport
      // Add class 'active' to section when near top of viewport, style would be displayed if it is active
      method.target.classList.toggle("active");
    }
  })
}

//Intersectionobserver API used intead of getBoundingClientRect to imrpove performance
let observer = new IntersectionObserver(distinguishSection, {
  threshold: [1] //threshold 1 means when 100% of the target is visible
})
//looping through the targetsection because it in a node list format
targetSection.forEach((elem) => {
  //passing it element in the list(section) as an argument to the function observer
  observer.observe(elem);
})

//calling functions
buildNav(array)
navFunc()

/**
 * End Main Functions
 *
 */
