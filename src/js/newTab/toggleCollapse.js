export default function toggleCollapse() {
  let count = 0;
  document.getElementById('collapse-toggle').addEventListener("click", function () {
    let categories = document.getElementsByClassName("category");
    for (var i = 0; i < categories.length; ++i) {
      let category = categories[i];
      if (count === 0) {
        category.classList.add('collapsed');
      } else {
        category.classList.remove('collapsed');
      }
    }
    if (count == 0) {
      count = 1;
    } else {
      count = 0;
    }
  });
}