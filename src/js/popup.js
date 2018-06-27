import "../css/popup.css";
import arrayToTree from "./general/arrayToTree";

// DOM elements
let urlInput = document.getElementById('url-input');
let titleInput = document.getElementById('title-input');
let categoryInput = document.getElementById('category-input');
let existentCategoryContainer = document.getElementById('categoryContainer');
let saveButton = document.getElementById('save');

// objects / variables
let bookmark;
let existentCategories = [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

// events
urlInput.addEventListener("input", inputChanged);
titleInput.addEventListener("input", inputChanged);
categoryInput.addEventListener("input", inputChanged);

// push all bookmark categories in categorie array
if (bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    existentCategories.push(bookmarks[i].category);
  }
  existentCategories = arrayToTree(existentCategories, '/');
  categoryTree(existentCategories, existentCategoryContainer);
}

function categoryTree(obj, parent, start = true) {
  for (var key in obj) {
    let div = document.createElement("div");
    div.textContent = key;
    div.classList.add("category");
    if (parent.children) parent.className += " bold";
    if (!start) div.className = "normal hide category";

    div.addEventListener('click', function (e) {
      e.stopPropagation()
      Array.from(div.children).forEach(child => {
        child.classList.toggle('hide');
      })
      categoryInput.value = getParents(e.target);
      bookmark.category = getParents(e.target);
    })
    categoryTree(obj[key], div, false)
    parent.appendChild(div)
  }
}

function getParents(node, path) {
  let thisName = node.childNodes[0].textContent;
  path = path ? (thisName + "/" + path) : thisName;
  console.log(node.parentNode.className.split(/\s+/).indexOf("categoryContainer"));
  if (node.parentNode.className.split(/\s+/).indexOf("categoryContainer") !== -1) {
    return path;
  } else {
    return getParents(node.parentNode, path);
  }
}

// popup input change saved into bookmark object
function inputChanged(e) {
  if (this.id === "url-input") {
    bookmark.url = this.value;
  }

  if (this.id === "title-input") {
    bookmark.title = this.value;
  }

  if (this.id === "category-input") {
    bookmark.category = this.value.toUpperCase();
  }
}

// get tab informations
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {

    let tabUrl = tabs[0].url;
    let tabTitle = tabs[0].title;
    let tabCategory = '';
    let tabFavIcon = tabs[0].favIconUrl;

    urlInput.value = tabUrl;
    titleInput.value = tabTitle;

    bookmark = {
      url: tabUrl,
      title: tabTitle,
      category: tabCategory,
      favicon: tabFavIcon
    };
  }
);

//sending bookmark object to background.js
saveButton.onclick = function () {
  chrome.runtime.sendMessage({ saveBookmark: bookmark }, function (response) {
    window.close();
  });
};
