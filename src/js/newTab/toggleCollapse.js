export default function toggleCollapse() {
  let isCollapsed = false;
  document.getElementById('collapse-toggle').addEventListener("click", function () {
    let categories = document.getElementsByClassName("category");
    for (let i = 0; i < categories.length; ++i) {
      let category = categories[i];
      if (!isCollapsed) {
        category.classList.add('collapsed');
      } else {
        category.classList.remove('collapsed');
      }
    }
    isCollapsed = !isCollapsed;
  });
}
