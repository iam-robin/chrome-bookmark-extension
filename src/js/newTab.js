import "../css/newTab.css";
import fetchBookmarks from "./newTab/fetchBookmarks";
import categoryCollapse from "./newTab/categoryCollapse";
import toggleMode from "./newTab/toggleMode";
import toggleCollapse from "./newTab/toggleCollapse";
import toggleShrink from "./newTab/toggleShrink";
import deleteBookmark from "./newTab/deleteBookmark";

let states = JSON.parse(localStorage.getItem('states'));

let currentStates = {
  lightmode: states[0].lightmode
}

fetchBookmarks(currentStates);
categoryCollapse();
toggleMode(currentStates);
toggleCollapse();
toggleShrink();
deleteBookmark();


// get messages
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // message from background.js -> new bookmark saved
    if (request.message == "reload") {
      let states = JSON.parse(localStorage.getItem('states'));
      fetchBookmarks(currentStates);
      deleteBookmark(currentStates);
      deleteBookmark();
    }
});