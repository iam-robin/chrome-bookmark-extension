export default function getCategories() {

  let categories = [];
  // get bookmarks from local storage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (!bookmarks[i] == '') {
      categories.push(bookmarks[i].category);
    }
  }

  // get only unique values in array
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var uniqueCategories = categories.filter(onlyUnique);
  return uniqueCategories;
}