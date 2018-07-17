export default function toggleMode(currentStates) {

  // click event
  document.getElementById('mode-toggle').addEventListener("click", function () {
    document.getElementsByTagName("BODY")[0].classList.toggle('lightmode');

    if (localStorage.getItem('states') === null) {
      let states = [];
      states.push(currentStates);
      localStorage.setItem('states', JSON.stringify(states));
    } else {
      let states = JSON.parse(localStorage.getItem('states'));
      states[0].lightmode = !states[0].lightmode;
      localStorage.setItem('states', JSON.stringify(states));
    }
  });
}
