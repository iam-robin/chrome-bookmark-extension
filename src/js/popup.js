import "../css/popup.css";

// DOM elements
let url = document.getElementById('url');
let title = document.getElementById('title');
let category = document.getElementById('category');
let saveButton = document.getElementById('save');

// bookmark object
let bookmark;

// events
url.addEventListener("input", inputChanged);
title.addEventListener("input", inputChanged);
category.addEventListener("input", inputChanged);

// get tab informations
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {

    let tabUrl = tabs[0].url;
    let tabTitle = tabs[0].title;
    let tabCategory = 'uncategorized';

    url.value = tabUrl;
    title.value = tabTitle;

    bookmark = {
      url: tabUrl,
      title: tabTitle,
      category: tabCategory
    };
  }
);

// input change saved into bookmark object
function inputChanged(e) {
  if (this.id === "url") {
    bookmark.url = this.value;
  }

  if (this.id === "title") {
    bookmark.title = this.value;
  }

  if (this.id === "category") {
    bookmark.category = this.value;
  }
}

saveButton.onclick = function () {
  //sending a message
  chrome.runtime.sendMessage({ saveBookmark: bookmark }, function (response) {
    window.close();
  });
};
