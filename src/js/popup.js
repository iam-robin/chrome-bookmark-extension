import "../css/popup.css";
import hello from "./popup/example";

// DOM elements
let url = document.getElementById('url');
let title = document.getElementById('title');
let saveButton = document.getElementById('save');

// bookmark object
let bookmark;

// events
url.addEventListener("input", inputChanged);
title.addEventListener("input", inputChanged);

// get tab informations
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {

    let tabUrl = tabs[0].url;
    let tabTitle = tabs[0].title;

    url.value = tabUrl;
    title.value = tabTitle;

    bookmark = {
      url: tabUrl,
      title: tabTitle
    };
  }
);

// input change saved into bookmark object
function inputChanged(e) {
  if (this.id === "url") {
    bookmark.url = this.value;
    console.log(bookmark);
  }

  if (this.id === "title") {
    bookmark.title = this.value;
    console.log(bookmark);
  }
}

saveButton.onclick = function () {
  //sending a message
  chrome.runtime.sendMessage({ bookmark: bookmark }, function (response) {
    console.log(response);
    window.close();
  });
};
