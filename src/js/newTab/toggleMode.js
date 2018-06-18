export default function toggleMode() {
  document.getElementById('mode-toggle').addEventListener("click", function () {
    document.getElementsByTagName("BODY")[0].classList.toggle('lightmode');
  });
}