// object describing the possible values for the light/dark theme
const themes = {
  light: {
    background: "#FFFFFF",
    color: "#222222",
    shadow: "#dddddd",
  },
  dark: {
    background: "#231f2a",
    color: "#cccccc",
    shadow: "#111",
  },
};

// target the form element
const form = document.querySelector("form");
// boolean to keep track of the current theme
let theme = "light";

// function called when the change event is registered on the form
function handleChange(e) {
  // toggle the theme between light and dark
  theme = theme === "light" ? "dark" : "light";
  // toggle the .checked class from the form, to translate the pseudo element
  form.classList.toggle("checked");

  // retrieve the property-value pairs from the theme matching the current selection
  const entries = Object.entries(themes[theme]);

  // target the body and modify the custom properties to match the theme values
  const body = document.querySelector("body");
  entries.forEach(([property, value]) => {
    body.style.setProperty(`--${property}`, value);
  });
  // show/ hide the first circle in the background depending on the theme
  body.style.backgroundSize = theme === "light" ? "50%, 50%" : "0%, 50%";

  // target the svg element to animate the circle and the mask
  const svg = document.querySelector("svg.phone--theme");

  // update the circle with the gradient matching the selected theme
  const circle = svg.querySelector("#theme-circle");
  circle.setAttribute("fill", `url(#gradient-${theme}-theme)`);

  // update the mask to crop out a section of the circle if need be
  const mask = svg.querySelector("#mask-circle");
  // ! applying a transition on the circle works on chrome, but not on firefox, nor edge
  // anime.js is used instead
  // mask.style.transition = 'all 0.5s ease-out';
  anime({
    targets: mask,
    easing: "easeOutCubic",
    r: theme === "light" ? 0 : 50,
    cx: theme === "light" ? 100 : 70,
    cy: theme === "light" ? 0 : 30,
    duration: 500,
  });
}

form.addEventListener("change", handleChange);

// bonus points: add the current hour and minutes in the span element
// using the h:mm format
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const zeroPadded = (num) => (num >= 10 ? num.toString() : `0${num}`);

const span = document.querySelector("nav span");
span.textContent = `${hours}:${zeroPadded(minutes)}`;
