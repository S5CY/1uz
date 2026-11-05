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
const sfx = {
  soft: new Audio("assets/audio/sfx/ui-soft.wav"),
  start: new Audio("assets/audio/sfx/ui-start.wav"),
  hover: new Audio("assets/audio/sfx/ui-hover.wav"),
  toggle: new Audio("assets/audio/sfx/ui-toggle.wav"),
  message: new Audio("assets/audio/sfx/ui-message.mp3"),
  confirm: new Audio("assets/audio/sfx/ui-confirm.wav")
};
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

function playSfx(name = "soft") {
  if (audioState.muted || audioState.sfx === 0) return;
  const sound = sfx[name];
  if (!sound) return;
  sound.pause();
  sound.currentTime = 0;
  sound.volume = audioState.sfx / 100;
  sound.play().catch(() => {});
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
  if (!audioState.muted) playSfx("toggle");
  setStatus(audioState.muted ? "全部声音已关闭" : "声音已恢复");
});

audioSettingsToggle.addEventListener("click", () => {
  const opening = audioSettings.hidden;
  audioSettings.hidden = !opening;
  audioSettingsToggle.setAttribute("aria-expanded", String(opening));
  audioSettingsToggle.setAttribute("aria-label", opening ? "关闭声音设置" : "打开声音设置");
  playSfx("toggle");
});

function updateVolume(kind, input, output) {
  audioState[kind] = Number(input.value);
  output.value = `${input.value}%`;
  saveAudioState();
}

bgmVolume.addEventListener("input", () => updateVolume("bgm", bgmVolume, bgmValue));
sfxVolume.addEventListener("input", () => updateVolume("sfx", sfxVolume, sfxValue));
sfxVolume.addEventListener("change", () => playSfx("confirm"));

document.addEventListener("click", (event) => {
  if (!audioSettings.hidden && !event.target.closest(".utility-controls")) {
    audioSettings.hidden = true;
    audioSettingsToggle.setAttribute("aria-expanded", "false");
    audioSettingsToggle.setAttribute("aria-label", "打开声音设置");
  }
});

startButton.addEventListener("click", () => {
  playSfx("start");
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
  playSfx("soft");
  setStatus("还没有保存的故事。");
});

[startButton, continueButton, soundToggle, audioSettingsToggle].forEach((button) => {
  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") playSfx("hover");
  });
});

let resizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(createStars, 160);
});

createStars();
updateAudioControls();
characterSprites.forEach((sprite, index) => scheduleBlink(sprite, index * 420));
