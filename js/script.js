const stars = document.getElementById("stars");
const soundToggle = document.getElementById("sound-toggle");
const audioSettingsToggle = document.getElementById("audio-settings-toggle");
const audioSettings = document.getElementById("audio-settings");
const bgmVolume = document.getElementById("bgm-volume");
const sfxVolume = document.getElementById("sfx-volume");
const bgmValue = document.getElementById("bgm-value");
const sfxValue = document.getElementById("sfx-value");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const statusMessage = document.getElementById("status-message");
const characterSprites = [...document.querySelectorAll(".character-sprite")];
const savedAudio = JSON.parse(localStorage.getItem("1u-audio") || "{}");
const audioState = {
  muted: Boolean(savedAudio.muted),
  bgm: Number.isFinite(savedAudio.bgm) ? savedAudio.bgm : 55,
  sfx: Number.isFinite(savedAudio.sfx) ? savedAudio.sfx : 65
};

function saveAudioState() {
  localStorage.setItem("1u-audio", JSON.stringify(audioState));
}

function updateAudioControls() {
  soundToggle.setAttribute("aria-pressed", String(audioState.muted));
  soundToggle.setAttribute("aria-label", audioState.muted ? "恢复全部声音" : "关闭全部声音");
  bgmVolume.value = String(audioState.bgm);
  sfxVolume.value = String(audioState.sfx);
  bgmValue.value = `${audioState.bgm}%`;
  sfxValue.value = `${audioState.sfx}%`;
}

function playUiClick() {
  if (audioState.muted || audioState.sfx === 0) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = playUiClick.context || new AudioContextClass();
  playUiClick.context = context;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(620, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + .055);
  gain.gain.setValueAtTime(.045 * audioState.sfx / 100, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .07);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + .075);
}

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

const BLINK_INTERVAL = 3000;
const BLINK_DURATION = 170;

function scheduleBlink(sprite, initialDelay = 0) {
  const blinkImage = new Image();
  blinkImage.src = sprite.dataset.closed;

  const blink = () => {
    if (!document.body.classList.contains("reduce-motion")) {
      sprite.src = sprite.dataset.closed;
      window.setTimeout(() => {
        sprite.src = sprite.dataset.open;
      }, BLINK_DURATION);
    }
  };

  sprite.blinkTimer = window.setTimeout(() => {
    blink();
    sprite.blinkTimer = window.setInterval(blink, BLINK_INTERVAL);
  }, BLINK_INTERVAL + initialDelay);
}

soundToggle.addEventListener("click", () => {
  audioState.muted = !audioState.muted;
  saveAudioState();
  updateAudioControls();
  if (!audioState.muted) playUiClick();
  setStatus(audioState.muted ? "全部声音已关闭" : "声音已恢复");
});

audioSettingsToggle.addEventListener("click", () => {
  const opening = audioSettings.hidden;
  audioSettings.hidden = !opening;
  audioSettingsToggle.setAttribute("aria-expanded", String(opening));
  audioSettingsToggle.setAttribute("aria-label", opening ? "关闭声音设置" : "打开声音设置");
  playUiClick();
});

function updateVolume(kind, input, output) {
  audioState[kind] = Number(input.value);
  output.value = `${input.value}%`;
  saveAudioState();
}

bgmVolume.addEventListener("input", () => updateVolume("bgm", bgmVolume, bgmValue));
sfxVolume.addEventListener("input", () => updateVolume("sfx", sfxVolume, sfxValue));
sfxVolume.addEventListener("change", playUiClick);

document.addEventListener("click", (event) => {
  if (!audioSettings.hidden && !event.target.closest(".utility-controls")) {
    audioSettings.hidden = true;
    audioSettingsToggle.setAttribute("aria-expanded", "false");
    audioSettingsToggle.setAttribute("aria-label", "打开声音设置");
  }
});

startButton.addEventListener("click", () => {
  playUiClick();
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
  playUiClick();
  setStatus("还没有保存的故事。");
});

let resizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(createStars, 160);
});

createStars();
updateAudioControls();
characterSprites.forEach((sprite, index) => scheduleBlink(sprite, index * 420));
