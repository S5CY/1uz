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
const loginScreen = document.getElementById("login-screen");
const loginBack = document.getElementById("login-back");
const loginForm = document.getElementById("login-form");
const storyIdInput = document.getElementById("story-id");
const loginStatus = document.getElementById("login-status");
const onboardingScreen = document.getElementById("onboarding-screen");
const onboardingForm = document.getElementById("onboarding-form");
const onboardingQuestion = document.getElementById("onboarding-question");
const answerArea = document.getElementById("answer-area");
const dialogueNext = document.getElementById("dialogue-next");
const dialogueStatus = document.getElementById("dialogue-status");
const sceneStep = document.getElementById("scene-step");
const sceneBack = document.getElementById("scene-back");
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
const onboardingQuestions = [
  {
    type: "input",
    question: "在故事开始以前，可以先告诉我——你叫什么名字吗？",
    placeholder: "输入你的名字"
  },
  {
    type: "choice",
    question: "她平时最常怎么叫你？",
    options: ["宝宝", "老公", "哥哥", "自己输入"],
    customPlaceholder: "输入她对你的称呼"
  },
  {
    type: "choice",
    question: "那你平时怎么称呼她？",
    options: ["宝宝", "老婆", "自己输入"],
    customPlaceholder: "输入你对她的称呼"
  },
  {
    type: "input",
    question: "如果她现在就在你面前，你最想先对她说哪一句话？",
    placeholder: "把想说的话写在这里……"
  },
  {
    type: "choice",
    question: "你希望这次故事，最后带你们去哪里？",
    options: ["把话好好说完", "更懂彼此一点", "重新开始", "我还不知道"]
  }
];
let onboardingIndex = 0;
const onboardingAnswers = [];

function getStoryStorageKey(storyId) {
  return `1u-story-${encodeURIComponent(storyId)}-onboarding`;
}

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
  window.setTimeout(() => {
    loginScreen.hidden = false;
    document.body.classList.add("login-active");
    window.setTimeout(() => storyIdInput.focus(), 380);
  }, 220);
});

loginBack.addEventListener("click", () => {
  playSfx("soft");
  document.body.classList.remove("login-active");
  loginStatus.textContent = "";
  window.setTimeout(() => {
    loginScreen.hidden = true;
    startButton.focus();
  }, 320);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const storyId = storyIdInput.value.trim();

  if (storyId.length < 2) {
    playSfx("soft");
    loginStatus.textContent = "故事 ID 至少需要两个字符呀";
    storyIdInput.focus();
    return;
  }

  localStorage.setItem("1u-current-story-id", storyId);
  let savedAnswers = [];
  try {
    savedAnswers = JSON.parse(localStorage.getItem(getStoryStorageKey(storyId)) || "[]");
  } catch {
    localStorage.removeItem(getStoryStorageKey(storyId));
  }
  onboardingAnswers.splice(0, onboardingAnswers.length, ...savedAnswers);
  playSfx("message");
  loginStatus.textContent = `正在载入「${storyId}」的故事……`;
  window.setTimeout(() => {
    document.body.classList.remove("login-active");
    loginScreen.hidden = true;
    onboardingScreen.hidden = false;
    document.body.classList.add("onboarding-active");
    onboardingIndex = 0;
    renderOnboardingQuestion();
  }, 650);
});

function renderOnboardingQuestion() {
  const current = onboardingQuestions[onboardingIndex];
  sceneStep.textContent = `${String(onboardingIndex + 1).padStart(2, "0")} / ${String(onboardingQuestions.length).padStart(2, "0")}`;
  onboardingQuestion.textContent = current.question;
  dialogueStatus.textContent = "";
  answerArea.replaceChildren();

  if (current.type === "input") {
    const input = document.createElement("input");
    input.className = "story-answer-input";
    input.name = "story-answer";
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder = current.placeholder;
    input.value = onboardingAnswers[onboardingIndex] || "";
    input.required = true;
    answerArea.appendChild(input);
    window.setTimeout(() => input.focus(), 120);
  } else {
    const choices = document.createElement("div");
    choices.className = "answer-choices";
    const savedAnswer = onboardingAnswers[onboardingIndex] || "";
    const standardOptions = current.options.filter((option) => option !== "自己输入");
    const hasCustomAnswer = Boolean(savedAnswer) && !standardOptions.includes(savedAnswer);

    current.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "answer-choice";
      const isChecked = savedAnswer === option || (option === "自己输入" && hasCustomAnswer);
      label.innerHTML = `<input type="radio" name="story-answer" value="${option}" ${isChecked ? "checked" : ""}><span>${String.fromCharCode(65 + index)}</span><b>${option}</b>`;
      choices.appendChild(label);
    });
    answerArea.appendChild(choices);

    if (current.options.includes("自己输入")) {
      const customInput = document.createElement("input");
      customInput.className = "story-answer-input custom-choice-input";
      customInput.name = "custom-answer";
      customInput.type = "text";
      customInput.autocomplete = "off";
      customInput.placeholder = current.customPlaceholder;
      customInput.value = hasCustomAnswer ? savedAnswer : "";
      customInput.hidden = !hasCustomAnswer;
      answerArea.appendChild(customInput);

      choices.addEventListener("change", (event) => {
        const choosingCustom = event.target.value === "自己输入";
        customInput.hidden = !choosingCustom;
        if (choosingCustom) customInput.focus();
      });
    }
  }

  dialogueNext.querySelector("span").textContent = onboardingIndex === onboardingQuestions.length - 1 ? "确认" : "继续";
}

onboardingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = onboardingForm.elements["story-answer"];
  let value = selected instanceof RadioNodeList ? selected.value : selected.value.trim();

  if (value === "自己输入") {
    value = onboardingForm.elements["custom-answer"].value.trim();
  }

  if (!value) {
    playSfx("soft");
    dialogueStatus.textContent = "先留下你的答案，再继续吧。";
    return;
  }

  onboardingAnswers[onboardingIndex] = value;
  playSfx("message");
  if (onboardingIndex < onboardingQuestions.length - 1) {
    onboardingIndex += 1;
    renderOnboardingQuestion();
  } else {
    const storyId = localStorage.getItem("1u-current-story-id");
    localStorage.setItem(getStoryStorageKey(storyId), JSON.stringify(onboardingAnswers));
    dialogueStatus.textContent = "问题预览结束——答案已暂存在这台设备。";
  }
});

sceneBack.addEventListener("click", () => {
  playSfx("soft");
  document.body.classList.remove("onboarding-active");
  onboardingScreen.hidden = true;
  loginScreen.hidden = false;
  loginStatus.textContent = "";
  document.body.classList.add("login-active");
});

continueButton.addEventListener("click", () => {
  playSfx("soft");
  setStatus("还没有保存的故事。");
});

[startButton, continueButton, soundToggle, audioSettingsToggle, loginBack].forEach((button) => {
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
