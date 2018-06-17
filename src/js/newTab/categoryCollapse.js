export default function categoryCollapse() {
  var categories = document.getElementsByClassName("category");
  for (var i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("collapsed");
    });
  }

  var items = document.getElementsByClassName("item");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}