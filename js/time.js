export function time() {
  const clock = document.querySelector('#time');

  const timer = () => clock.textContent = new Date().toLocaleTimeString();

  setInterval(timer, 1000);
}