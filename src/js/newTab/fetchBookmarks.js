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

    // filter only unique categories
    categories = categories.filter(onlyUnique);

    //if category has backslash -> create new div inside the parent div
    // ...
    
    // create category div for each unique category
    categories.forEach(function (i) {
      containerElement.innerHTML += '<div id="' + i + '">' +
      '<h2>'+ i +'</h2></div>';
    });

    // render bookmarks in the specific category div
    for (let i = 0; i < bookmarks.length; i++) {
      let url = bookmarks[i].url;
      let title = bookmarks[i].title;
      let id = bookmarks[i].id;
      let category = String(bookmarks[i].category);

      let currentCategoryElement = document.getElementById(category);

      currentCategoryElement.innerHTML += '<div class="item" id="' + id + '">' +
        '<a href="' + url + '">' + title + '</a>' +
        '<span class="close">x</span>' +
        '</div>';
    }
  }

  // get only unique values in array
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}