export default function fetchBookmarks() {
  // if bookmarks in local storage
  if (localStorage.getItem('bookmarks') != null) {

    // elements
    let categories = [];
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let containerElement = document.getElementById('bookmark-container');

    containerElement.innerHTML = '';

    // push all bookmark categories in categorie array
    for (let i = 0; i < bookmarks.length; i++) {
      categories.push(bookmarks[i].category);
    }

    // convert array with category paths to object tree
    categories = arrayToTree(categories);

    // generate container elements out of object tree
    buildTree(categories, containerElement);

    // render bookmarks in the specific category div
    for (let i = 0; i < bookmarks.length; i++) {
      let url = bookmarks[i].url;
      let title = bookmarks[i].title;
      let id = bookmarks[i].id;
      let favicon = bookmarks[i].favicon;
      let category = String(bookmarks[i].category);
      category = category.replace(/\//g, '_');

      let currentCategoryElement = document.getElementById(category);

      currentCategoryElement.innerHTML = '<div class="item" id="' + id + '">' +
        '<a href="' + url + '">' +
        '<img src="'+ favicon +'" alt="favicon" class="favicon">' +
        title + '</a>' +
        '<span class="close">x</span>' +
        '</div>' + currentCategoryElement.innerHTML;
    }
  }

  // Build HTML tree recursively from object.
  function buildTree(obj, context, prefix) {
    for (var key in obj) {
      let div = document.createElement('div'),
      pID = prefix ? prefix + '_' + key : key;

      div.innerHTML = "<span class='title'>" + key + "</span><div class='content'></div><span class='icon'></span>";
      let content = div.children[1];
      content.setAttribute('id', pID);
      content.classList.add(key);
      div.classList.add("category");
      buildTree(obj[key], content, pID);
      context.appendChild(div);
    }
  }

  // format array as tree
  function arrayToTree(arr, separator) {
    let formatted = {};

    if (!separator) {
      separator = '/';
    }

    for (let i = 0; i < arr.length; i++) {
      let category = arr[i],
        parts = category.split(separator),
        current = formatted;

      for (let e = 0; e < parts.length; e++) {
        let lvl = parts[e];

        if (!current[lvl]) {
          current[lvl] = {};
        }

        current = current[lvl];
      }
    }
    return formatted;
  }
}