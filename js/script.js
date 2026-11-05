const stars = document.getElementById("stars");
const soundToggle = document.getElementById("sound-toggle");
const motionToggle = document.getElementById("motion-toggle");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const statusMessage = document.getElementById("status-message");

function createStars() {
  const count = window.innerWidth < 700 ? 14 : 22;
  stars.replaceChildren();

  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.style.left = `${24 + Math.random() * 52}%`;
    star.style.top = `${4 + Math.random() * 31}%`;
    star.style.setProperty("--size", `${2 + Math.random() * 3}px`);
    star.style.setProperty("--speed", `${2.2 + Math.random() * 3.2}s`);
    star.style.setProperty("--delay", `${-Math.random() * 4}s`);
    stars.appendChild(star);
  }
}

function setStatus(message) {
  statusMessage.textContent = message;
  window.clearTimeout(setStatus.timeout);
  setStatus.timeout = window.setTimeout(() => {
    statusMessage.textContent = "";
  }, 2600);
}

soundToggle.addEventListener("click", () => {
  const enabled = soundToggle.getAttribute("aria-pressed") !== "true";
  soundToggle.setAttribute("aria-pressed", String(enabled));
  soundToggle.setAttribute("aria-label", enabled ? "关闭声音" : "开启声音");
  soundToggle.firstElementChild.textContent = enabled ? "♫" : "♪";
  setStatus(enabled ? "声音已开启" : "声音已关闭");
});

motionToggle.addEventListener("click", () => {
  const reduced = motionToggle.getAttribute("aria-pressed") !== "true";
  motionToggle.setAttribute("aria-pressed", String(reduced));
  motionToggle.setAttribute("aria-label", reduced ? "恢复动态效果" : "减少动态效果");
  document.body.classList.toggle("reduce-motion", reduced);
  setStatus(reduced ? "动态效果已暂停" : "动态效果已恢复");
});

startButton.addEventListener("click", () => {
  startButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(.96)" },
      { transform: "scale(1.04)" },
      { transform: "scale(1)" }
    ],
    { duration: 420, easing: "ease-out" }
  );
  setStatus("故事，从这一句话开始。");
});

continueButton.addEventListener("click", () => {
  setStatus("还没有保存的故事。");
});

let resizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(createStars, 160);
});

createStars();
