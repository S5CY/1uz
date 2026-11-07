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
const bedroomGame = document.getElementById("bedroom-game");
const roomPlayer = document.getElementById("room-player");
const roomPlayerSprite = document.getElementById("room-player-sprite");
const coupleInteraction = document.getElementById("couple-interaction");
const gameStoryId = document.getElementById("game-story-id");
const gameSaveButton = document.getElementById("game-save-button");
const gameExit = document.getElementById("game-exit");
const roomGirl = document.getElementById("room-girl");
const npcDialogue = document.getElementById("npc-dialogue");
const npcDialogueText = npcDialogue.querySelector("p");
const npcDialogueClose = document.getElementById("npc-dialogue-close");
const affectionButton = document.getElementById("affection-button");
const affectionPopup = document.getElementById("affection-popup");
const sceneName = document.getElementById("scene-name");
const bedroomDoor = document.getElementById("bedroom-door");
const crossroadHome = document.getElementById("crossroad-home");
const replayDirection = document.getElementById("replay-direction");
const questionDirection = document.getElementById("question-direction");
const shopDoor = document.getElementById("shop-door");
const shelfHotspot = document.getElementById("shelf-hotspot");
const questionHouseDoor = document.getElementById("question-house-door");
const questionHouseExit = document.getElementById("question-house-exit");
const questionSpot = document.getElementById("question-spot");
const sceneToast = document.getElementById("scene-toast");
const memoryShelfModal = document.getElementById("memory-shelf-modal");
const memoryShelfClose = document.getElementById("memory-shelf-close");
const memoryBall = document.querySelector(".memory-ball");
const memoryCompleteBadge = document.getElementById("memory-complete-badge");
const memoryConfirm = document.getElementById("memory-confirm");
const memoryConfirmTitle = document.getElementById("memory-confirm-title");
const memoryConfirmYes = document.getElementById("memory-confirm-yes");
const memoryConfirmNo = document.getElementById("memory-confirm-no");
const replayLives = document.getElementById("replay-lives");
const replayGuide = document.getElementById("replay-guide");
const replayGuideClose = document.getElementById("replay-guide-close");
const replayDialogue = document.getElementById("replay-dialogue");
const replaySpeaker = document.getElementById("replay-speaker");
const replayDialogueText = document.getElementById("replay-dialogue-text");
const replayChoices = document.getElementById("replay-choices");
const replayContinue = document.getElementById("replay-continue");
const affectionGain = document.getElementById("affection-gain");
const achievementBanner = document.getElementById("achievement-banner");
const achievementClose = document.getElementById("achievement-close");
const questionPlacePanel = document.getElementById("question-place-panel");
const questionPlaceTitle = document.getElementById("question-place-title");
const questionPlacePrompt = document.getElementById("question-place-prompt");
const questionSectionMenu = document.getElementById("question-section-menu");
const questionSectionButtons = [...document.querySelectorAll("[data-question-section]")];
const questionFlow = document.getElementById("question-flow");
const questionFlowContent = document.getElementById("question-flow-content");
const questionFlowBack = document.getElementById("question-flow-back");
const questionProgressBar = document.getElementById("question-progress-bar");
const questionProgressText = document.getElementById("question-progress-text");
const questionStarRating = document.getElementById("question-star-rating");
const questionPlaceAnswer = document.getElementById("question-place-answer");
const questionPlaceSave = document.getElementById("question-place-save");
const questionPlaceBack = document.getElementById("question-place-back");
const questionPlaceStatus = document.getElementById("question-place-status");
const affectionValue = document.getElementById("affection-value");
const affectionPopupValue = document.getElementById("affection-popup-value");
const touchControls = [...document.querySelectorAll("[data-direction]")];
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
    options: ["宝宝", "老婆", "妈妈", "自己输入"],
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
let affectionLevel = 10;
let memory111Complete = false;
let memoryRewardFlags = new Set();
let answerLog = [];
let replayHearts = 3;
let replayCheckpoint = "start";
let replayStep = "start";
let replayDialogueAction = null;
let pendingAffectionHint = false;
let activeQuestionSection = null;
let activeQuestionStep = 0;
let selectedEmotionRating = 0;

const soulQuestions = [
  "你还记得当初是什么让我们决定在一起的吗？",
  "你觉得我们现在相处中最需要解决的问题是什么？",
  "为了让我们相处得更好，你最希望我改掉什么？",
  "你最想为这段关系做点什么？",
  "如果以后我们没能走到最后，你觉得最有可能的原因是什么？"
];

const emotionPrompts = [
  "开心", "安全感", "被理解", "被重视", "被爱", "信任", "想念", "内耗",
  "难过", "委屈", "生气", "失望", "焦虑", "害怕失去", "还想继续努力"
];

const relationshipIssues = [
  "缺少报备",
  "（小问题）不愿意带我送的皮筋、手链和项链（但是他说过戴着不舒服……）",
  "没时间陪我",
  "平时缺少沟通",
  "不会安慰人",
  "没耐心"
];

function getStoryStorageKey(storyId) {
  return `1u-story-${encodeURIComponent(storyId)}-onboarding`;
}

function getRoomStorageKey(storyId) {
  return `1u-story-${encodeURIComponent(storyId)}-room-position`;
}

function getGameStateStorageKey(storyId) {
  return `1u-story-${encodeURIComponent(storyId)}-game-state`;
}

function loadGameState(storyId) {
  try {
    return JSON.parse(localStorage.getItem(getGameStateStorageKey(storyId)) || "null");
  } catch {
    localStorage.removeItem(getGameStateStorageKey(storyId));
    return null;
  }
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
  Object.values(sfx).forEach((sound) => {
    sound.volume = audioState.sfx / 100;
  });
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

function updateVolume(kind, input, output, preview = false) {
  audioState[kind] = Number(input.value);
  output.value = `${input.value}%`;
  if (kind === "sfx") {
    if (audioState.sfx > 0 && audioState.muted) {
      audioState.muted = false;
      soundToggle.setAttribute("aria-pressed", "false");
      soundToggle.setAttribute("aria-label", "关闭全部声音");
    }
    Object.values(sfx).forEach((sound) => {
      sound.volume = audioState.sfx / 100;
    });
  }
  saveAudioState();
  if (preview) playSfx("soft");
}

bgmVolume.addEventListener("input", () => updateVolume("bgm", bgmVolume, bgmValue));
let sfxPreviewTimer;
sfxVolume.addEventListener("input", () => {
  updateVolume("sfx", sfxVolume, sfxValue);
  window.clearTimeout(sfxPreviewTimer);
  sfxPreviewTimer = window.setTimeout(() => playSfx("soft"), 90);
});
sfxVolume.addEventListener("change", () => updateVolume("sfx", sfxVolume, sfxValue, true));

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
  const savedGameState = loadGameState(storyId);
  playSfx("message");
  loginStatus.textContent = `正在载入「${storyId}」的故事……`;
  window.setTimeout(() => {
    document.body.classList.remove("login-active");
    loginScreen.hidden = true;
    if (savedAnswers.length >= onboardingQuestions.length) {
      enterBedroomGame(savedGameState);
      return;
    }
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
    dialogueStatus.textContent = "存档完成，正在进入卧室……";
    window.setTimeout(() => enterBedroomGame(), 650);
  }
});

const movementKeys = new Set();
const directionKeys = {
  w: "up",
  arrowup: "up",
  s: "down",
  arrowdown: "down",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right"
};
const playerSprites = {
  front: "assets/boy-walk-front.png",
  back: "assets/boy-walk-back.png",
  left: "assets/boy-walk-left.png",
  right: "assets/boy-walk-left.png"
};
const playerPosition = { x: 50, y: 64 };
let movementFrame;
let lastMovementTime = 0;
let lastWalkFrameTime = 0;
let walkFrame = 1;
let lastAutoSaveTime = 0;
let girlAnimationTimers = [];

function renderPlayerPosition() {
  roomPlayer.style.left = `${playerPosition.x}%`;
  roomPlayer.style.top = `${playerPosition.y}%`;
  updateGirlProximity();
  updateSceneProximity();
}

function updateGirlProximity() {
  if (!["bedroom", "memory-bedroom"].includes(bedroomGame.dataset.scene)) {
    roomGirl.classList.remove("is-near");
    return false;
  }
  const inReplay = bedroomGame.dataset.scene === "memory-bedroom";
  const girlX = window.innerWidth <= 700 ? (inReplay ? 73 : 27) : (inReplay ? 79 : 23);
  const girlY = window.innerWidth <= 700 ? (inReplay ? 46 : 53) : (inReplay ? 60 : 68);
  const closeEnough = Math.abs(playerPosition.x - girlX) <= 15 && Math.abs(playerPosition.y - girlY) <= 11;
  roomGirl.classList.toggle("is-near", closeEnough);
  roomGirl.setAttribute("aria-label", closeEnough ? "和她说话" : "走近一点再和她说话");
  return closeEnough;
}

const sceneLabels = {
  bedroom: "卧室",
  crossroads: "门外 · 三岔路",
  "shop-exterior": "记忆小店 · 店外",
  "shop-interior": "记忆商店 · 大堂",
  "question-exterior": "问题小屋 · 门外",
  "question-interior": "问题小屋",
  "memory-bedroom": "11.1 · 场景重演"
};

function showSceneToast(message) {
  sceneToast.textContent = message;
  sceneToast.classList.add("is-visible");
  window.clearTimeout(showSceneToast.timer);
  showSceneToast.timer = window.setTimeout(() => sceneToast.classList.remove("is-visible"), 1800);
}

function setScene(scene, position = { x: 50, y: 72 }, facing = "front") {
  bedroomGame.dataset.scene = scene;
  bedroomGame.setAttribute("aria-label", sceneLabels[scene] || "可以探索的场景");
  sceneName.textContent = sceneLabels[scene] || "";
  playerPosition.x = position.x;
  playerPosition.y = position.y;
  setPlayerFacing(facing);
  npcDialogue.hidden = true;
  replayDialogue.hidden = true;
  affectionPopup.hidden = true;
  memoryShelfModal.hidden = true;
  questionPlacePanel.hidden = true;
  renderPlayerPosition();
  saveGameState(false);
  playSfx("soft");
}

function updateSceneProximity() {
  const scene = bedroomGame.dataset.scene || "bedroom";
  const nearBedroomDoor = (scene === "bedroom" || scene === "memory-bedroom") && playerPosition.x >= 72 && playerPosition.y >= 53;
  const nearHome = scene === "crossroads" && playerPosition.x <= 27 && playerPosition.y >= 48;
  const nearShopDoor = scene === "shop-exterior" && playerPosition.y <= 37 && playerPosition.x >= 35 && playerPosition.x <= 65;
  const nearShelf = scene === "shop-interior" && playerPosition.x >= 67 && playerPosition.y <= 57;
  const nearQuestionDoor = scene === "question-exterior" && playerPosition.y <= 38 && playerPosition.x >= 36 && playerPosition.x <= 64;
  const nearQuestionExit = scene === "question-interior" && playerPosition.x <= 26 && playerPosition.y >= 52;
  const nearQuestionSpot = scene === "question-interior" && playerPosition.y <= 48 && playerPosition.x >= 34 && playerPosition.x <= 66;

  bedroomDoor.classList.toggle("is-near", nearBedroomDoor);
  crossroadHome.classList.toggle("is-near", nearHome);
  shopDoor.classList.toggle("is-near", nearShopDoor);
  shelfHotspot.classList.toggle("is-near", nearShelf);
  questionHouseDoor.classList.toggle("is-near", nearQuestionDoor);
  questionHouseExit.classList.toggle("is-near", nearQuestionExit);
  questionSpot.classList.toggle("is-near", nearQuestionSpot);
  replayDirection.classList.toggle("is-visible", scene === "crossroads" && playerPosition.x >= 58);
  questionDirection.classList.toggle("is-visible", scene === "crossroads" && playerPosition.y <= 45 && playerPosition.x >= 35 && playerPosition.x <= 65);
}

function getSceneBounds() {
  switch (bedroomGame.dataset.scene) {
    case "crossroads": return { minX: 8, maxX: 92, minY: 26, maxY: 84 };
    case "shop-exterior": return { minX: 14, maxX: 86, minY: 24, maxY: 84 };
    case "shop-interior": return { minX: 12, maxX: 88, minY: 28, maxY: 84 };
    case "question-exterior": return { minX: 12, maxX: 88, minY: 25, maxY: 84 };
    case "question-interior": return { minX: 12, maxX: 88, minY: 30, maxY: 84 };
    case "memory-bedroom": return { minX: 12, maxX: 88, minY: 55, maxY: 77 };
    default: return { minX: 12, maxX: 88, minY: 55, maxY: 77 };
  }
}

function clearGirlAnimation() {
  girlAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  girlAnimationTimers = [];
}

function playGirlHmph() {
  clearGirlAnimation();
  [
    [0, 0],
    [1, 170],
    [2, 340],
    [3, 540]
  ].forEach(([frame, delay]) => {
    girlAnimationTimers.push(window.setTimeout(() => {
      roomGirl.dataset.frame = String(frame);
    }, delay));
  });
  girlAnimationTimers.push(window.setTimeout(() => {
    npcDialogueText.textContent = "不想理你...";
    npcDialogue.hidden = false;
    playSfx("message");
  }, 420));
}

function getHerTitle() {
  return onboardingAnswers[2] || "宝宝";
}

function updateAffectionDisplay() {
  const label = `${affectionLevel}%`;
  affectionValue.textContent = label;
  affectionPopupValue.textContent = label;
  document.documentElement.style.setProperty("--affection", label);
}

function showAffectionGain(rewardId, amount = 5) {
  if (rewardId && memoryRewardFlags.has(rewardId)) {
    showSceneToast("这个记忆点的好感度已经记录过了 ♡");
    return false;
  }
  if (rewardId) memoryRewardFlags.add(rewardId);
  affectionLevel = Math.min(100, affectionLevel + amount);
  updateAffectionDisplay();
  affectionGain.textContent = `♥ 好感度 +${amount}`;
  affectionGain.hidden = false;
  affectionGain.getAnimations().forEach((animation) => animation.cancel());
  affectionGain.animate(
    [{ opacity: 0, transform: "translate(-50%,18px) scale(.7)" }, { opacity: 1, transform: "translate(-50%,0) scale(1)", offset: .25 }, { opacity: 1, transform: "translate(-50%,0) scale(1)", offset: .75 }, { opacity: 0, transform: "translate(-50%,-18px) scale(.9)" }],
    { duration: 1900, easing: "ease-out" }
  );
  window.setTimeout(() => { affectionGain.hidden = true; }, 1900);
  const state = saveGameState(false);
  const storyId = localStorage.getItem("1u-current-story-id");
  if (state && storyId) sendProgressToBackend(storyId, state);
  return true;
}

function updateReplayLives() {
  [...replayLives.children].forEach((heart, index) => heart.classList.toggle("is-lost", index >= replayHearts));
}

function getBackendBaseUrl() {
  return String(window.ONE_U_CONFIG?.apiBaseUrl || "").replace(/\/$/, "");
}

function getSessionId() {
  let sessionId = sessionStorage.getItem("1u-session-id");
  if (!sessionId) {
    sessionId = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("1u-session-id", sessionId);
  }
  return sessionId;
}

async function sendAnswerToBackend(entry) {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) return;
  const storyId = localStorage.getItem("1u-current-story-id");
  if (!storyId) return;
  try {
    await fetch(`${baseUrl}/api/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        storyId,
        sessionId: getSessionId(),
        eventType: entry.scene.startsWith("question-room") ? "written-answer" : "choice",
        scene: entry.scene,
        prompt: entry.prompt,
        answer: entry.answer,
        clientTimestamp: entry.recordedAt,
        metadata: { affection: affectionLevel }
      })
    });
  } catch {
    // Local storage remains the offline fallback. A later answer can still sync normally.
  }
}

function recordAnswer(prompt, answer, scene = bedroomGame.dataset.scene || "unknown") {
  const entry = { scene, prompt, answer, recordedAt: new Date().toISOString() };
  answerLog.push(entry);
  saveGameState(false);
  sendAnswerToBackend(entry);
}

function showReplayDialogue({ speaker = "她", text, choices = [], onContinue = null }) {
  replaySpeaker.textContent = speaker;
  replayDialogueText.textContent = text;
  replayChoices.replaceChildren();
  replayDialogueAction = onContinue;
  replayContinue.hidden = Boolean(choices.length) || !onContinue;
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${choice.label}`;
    button.addEventListener("click", () => {
      recordAnswer(text, choice.label);
      choice.action();
    }, { once: true });
    replayChoices.appendChild(button);
  });
  replayDialogue.hidden = false;
  movementKeys.clear();
  playSfx("message");
}

function hideReplayDialogue() {
  replayDialogue.hidden = true;
  replayChoices.replaceChildren();
  replayDialogueAction = null;
}

function playCoupleMoment(action, duration, onComplete) {
  movementKeys.clear();
  coupleInteraction.dataset.action = action;
  coupleInteraction.hidden = false;
  bedroomGame.classList.add("is-couple-moment");
  coupleInteraction.getAnimations().forEach((animation) => animation.cancel());
  playSfx("confirm");
  window.setTimeout(() => {
    coupleInteraction.hidden = true;
    bedroomGame.classList.remove("is-couple-moment");
    onComplete?.();
  }, duration);
}

function resetReplayToCheckpoint() {
  hideReplayDialogue();
  bedroomGame.classList.remove("is-couple-moment");
  coupleInteraction.hidden = true;
  if (replayCheckpoint === "quiet") {
    replayStep = "quiet";
    roomGirl.dataset.mood = "sad";
  } else {
    replayStep = "start";
    roomGirl.dataset.mood = "turned";
  }
  roomGirl.dataset.frame = "3";
  playerPosition.x = 78;
  playerPosition.y = 66;
  setPlayerFacing("left");
  renderPlayerPosition();
  showSceneToast("重新走近她，再试一次。" );
}

function loseReplayHeart(reaction) {
  showReplayDialogue({
    speaker: "她",
    text: reaction,
    onContinue: () => {
      replayHearts -= 1;
      updateReplayLives();
      playSfx("soft");
      if (replayHearts <= 0) {
        hideReplayDialogue();
        replayLives.hidden = true;
        roomGirl.dataset.mood = "";
        setScene("shop-interior", { x: 72, y: 55 }, "right");
        showSceneToast("机会用完了，回到记忆商店重新再来吧。" );
      } else {
        roomGirl.dataset.mood = "turned";
        resetReplayToCheckpoint();
      }
    }
  });
}

function showFirstChoices() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "心里想法",
    text: `${title}生气了，得安慰一下她……但是我不知道她为什么生气，怎么办？`,
    choices: [
      { label: "不理", action: () => loseReplayHeart("她抱紧手臂，把脸扭得更远了。") },
      { label: "你咋了", action: () => loseReplayHeart("她皱了皱眉，没有回答。") },
      { label: `${title}怎么了嘛，告诉我好不好`, action: () => {
        roomGirl.dataset.mood = "sad";
        showReplayDialogue({ speaker: "心里想法", text: `${title}好像还是在生气...`, onContinue: showSecondChoices });
      } },
      { label: "不要再浪费时间，写作业", action: () => loseReplayHeart("她的表情一下子更冷了。") }
    ]
  });
}

function showSecondChoices() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "选择回应",
    text: "她低着头，还是没有开口。",
    choices: [
      { label: "你在吗？还生气？", action: () => loseReplayHeart("她沉默着，向旁边挪了一点。") },
      { label: "不就说两句", action: () => loseReplayHeart("她抿住嘴，明显更难过了。") },
      { label: "那我先不理你，你冷静一会儿", action: () => loseReplayHeart("她没有挽留，只是把头低得更深。") },
      { label: `${title}，告诉我怎么了嘛`, action: () => showReplayDialogue({ speaker: "她", text: "没事...", onContinue: showThirdThought }) }
    ]
  });
}

function showThirdThought() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "心里想法",
    text: `${title}说没事也不代表没事，我得继续哄。`,
    onContinue: () => showReplayDialogue({
      speaker: "选择回应",
      text: "接下来要怎么做？",
      choices: [
        { label: "不理她，做自己的事去", action: () => loseReplayHeart("她看着你走开，眼神慢慢暗了下来。") },
        { label: "抱抱她，承认错误", action: startHugSequence }
      ]
    })
  });
}

function startHugSequence() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "你",
    text: `${title}，我不知道我哪里错了，但是不想惹${title}生气嘛。告诉我好不好？`,
    onContinue: () => {
      hideReplayDialogue();
      playCoupleMoment("hug", 1550, () => {
        replayCheckpoint = "quiet";
        replayStep = "quiet";
        roomGirl.dataset.mood = "sad";
        showAffectionGain("11.1-hug");
        showSceneToast("她好像有话要说。走近她，再点击她。" );
        playerPosition.x = 54;
        playerPosition.y = 68;
        renderPlayerPosition();
      });
    }
  });
}

function startQuietConversation() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "心里想法",
    text: "她怎么不开口...",
    choices: [
      { label: "快点说，什么事！", action: () => loseReplayHeart("她被你的语气吓了一下，又不说话了。") },
      { label: `${title}，我理解你现在不高兴。我等你愿意了，你再告诉我为什么生气，好吗？`, action: () => {
        roomGirl.dataset.mood = "nod";
        showReplayDialogue({ speaker: "旁白", text: "过了一会儿之后...", onContinue: () => showReplayDialogue({ speaker: "她", text: "呃呃...", onContinue: showAfterWaitChoices }) });
      } }
    ]
  });
}

function showAfterWaitChoices() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "选择回应",
    text: "她终于小声开口了。",
    choices: [
      { label: "呃啥啊", action: () => loseReplayHeart("“呃啥啊？”\n她刚鼓起的勇气又缩了回去。") },
      { label: "亲亲，然后问怎么了", action: () => {
        hideReplayDialogue();
        playCoupleMoment("kiss", 1450, () => {
          showReplayDialogue({ speaker: "你", text: `怎么了，${title}？我在，慢慢说。`, onContinue: showHerExplanation });
        });
      } }
    ]
  });
}

function showHerExplanation() {
  roomGirl.dataset.mood = "sad";
  showAffectionGain("11.1-explanation");
  const lines = [
    "你刚才一直在催我学习...",
    "我不喜欢你这样...",
    "我本来压力就很大了，我妈也要说我...",
    "你还要催我...",
    "我感觉不像我男朋友，像我妈...",
    "我不喜欢你这样。"
  ];
  let index = 0;
  const next = () => {
    showReplayDialogue({ speaker: "她", text: lines[index], onContinue: () => {
      index += 1;
      if (index < lines.length) next();
      else showFinalChoice();
    } });
  };
  next();
}

function showFinalChoice() {
  const title = getHerTitle();
  showReplayDialogue({
    speaker: "心里想法",
    text: "原来是这样啊。",
    choices: [
      { label: `好，${title}，我知道了。我以后不会这样了，对不起`, action: completeMemory111 },
      { label: "没听懂你为啥生气啊？", action: () => loseReplayHeart("她看着你，像是不知道还能怎么解释。") }
    ]
  });
}

function completeMemory111() {
  hideReplayDialogue();
  memory111Complete = true;
  memoryCompleteBadge.hidden = false;
  bedroomGame.classList.add("memory-complete");
  replayLives.hidden = true;
  roomGirl.dataset.mood = "nod";
  saveGameState(false);
  achievementBanner.hidden = false;
  playSfx("confirm");
}

function enterMemoryReplay() {
  memoryShelfModal.hidden = true;
  memoryConfirm.hidden = true;
  replayHearts = 3;
  replayCheckpoint = "start";
  replayStep = "start";
  updateReplayLives();
  replayLives.hidden = false;
  bedroomGame.classList.remove("memory-complete", "is-couple-moment");
  coupleInteraction.hidden = true;
  roomGirl.dataset.frame = "0";
  roomGirl.dataset.mood = "turned";
  setScene("memory-bedroom", { x: 78, y: 66 }, "left");
  replayGuide.hidden = false;
}

function setPlayerFacing(direction) {
  if (!direction || roomPlayer.dataset.facing === direction) return;
  roomPlayer.dataset.facing = direction;
  roomPlayerSprite.src = playerSprites[direction];
  roomPlayerSprite.classList.toggle("is-mirrored", direction === "right");
}

async function sendProgressToBackend(storyId, state) {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl || !storyId) return;
  try {
    await fetch(`${baseUrl}/api/progress`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        storyId,
        scene: state.scene,
        affection: state.affection,
        memory111Complete: state.memory111Complete,
        payload: {
          position: state.position,
          facing: state.facing,
          memoryRewardFlags: state.memoryRewardFlags,
          onboardingAnswers,
          savedAt: state.savedAt
        }
      })
    });
  } catch {
    // Keep the local save even when the backend is offline.
  }
}

function saveGameState(showFeedback = false) {
  const storyId = localStorage.getItem("1u-current-story-id");
  if (!storyId) return null;
  const currentScene = bedroomGame.dataset.scene || "bedroom";
  const state = {
    scene: currentScene === "memory-bedroom" ? "shop-interior" : currentScene,
    position: currentScene === "memory-bedroom" ? { x: 72, y: 55 } : { x: playerPosition.x, y: playerPosition.y },
    facing: roomPlayer.dataset.facing || "front",
    affection: affectionLevel,
    memory111Complete,
    memoryRewardFlags: [...memoryRewardFlags],
    answerLog,
    replayHearts,
    audio: { ...audioState },
    savedAt: Date.now()
  };
  localStorage.setItem(getGameStateStorageKey(storyId), JSON.stringify(state));
  localStorage.setItem("1u-last-saved-story-id", storyId);
  if (state.scene === "bedroom") localStorage.setItem(getRoomStorageKey(storyId), JSON.stringify(state.position));
  if (showFeedback) {
    sendProgressToBackend(storyId, state);
    showSceneToast("已保存 ♡");
    playSfx("confirm");
  }
  return state;
}

function savePlayerPosition() { saveGameState(false); }

function movementLoop(timestamp) {
  if (!document.body.classList.contains("bedroom-game-active")) return;
  if (!memoryShelfModal.hidden || !questionPlacePanel.hidden || !replayDialogue.hidden || !replayGuide.hidden || !achievementBanner.hidden) {
    movementKeys.clear();
    movementFrame = window.requestAnimationFrame(movementLoop);
    return;
  }
  const elapsed = Math.min((timestamp - lastMovementTime) / 16.67 || 1, 2);
  lastMovementTime = timestamp;
  let horizontal = 0;
  let vertical = 0;

  if (movementKeys.has("left")) horizontal -= 1;
  if (movementKeys.has("right")) horizontal += 1;
  if (movementKeys.has("up")) vertical -= 1;
  if (movementKeys.has("down")) vertical += 1;

  if (horizontal || vertical) {
    if (timestamp - lastWalkFrameTime >= 150) {
      walkFrame = (walkFrame + 1) % 6;
      roomPlayer.dataset.walkFrame = String(walkFrame);
      lastWalkFrameTime = timestamp;
    }
    const diagonal = horizontal && vertical ? Math.SQRT1_2 : 1;
    const bounds = getSceneBounds();
    playerPosition.x = Math.max(bounds.minX, Math.min(bounds.maxX, playerPosition.x + horizontal * .34 * elapsed * diagonal));
    playerPosition.y = Math.max(bounds.minY, Math.min(bounds.maxY, playerPosition.y + vertical * .34 * elapsed * diagonal));
    setPlayerFacing(Math.abs(horizontal) > Math.abs(vertical) ? (horizontal < 0 ? "left" : "right") : (vertical < 0 ? "back" : "front"));
    roomPlayer.classList.add("is-walking");
    renderPlayerPosition();
    if (timestamp - lastAutoSaveTime >= 650) {
      saveGameState(false);
      lastAutoSaveTime = timestamp;
    }

    if (bedroomGame.dataset.scene === "crossroads" && playerPosition.x >= 91) {
      setScene("shop-exterior", { x: 17, y: 72 }, "right");
    } else if (bedroomGame.dataset.scene === "crossroads" && playerPosition.y <= 26 && playerPosition.x >= 35 && playerPosition.x <= 65) {
      setScene("question-exterior", { x: 50, y: 79 }, "back");
    } else if (bedroomGame.dataset.scene === "shop-exterior" && playerPosition.x <= 14) {
      setScene("crossroads", { x: 88, y: 78 }, "left");
    } else if (bedroomGame.dataset.scene === "shop-exterior" && playerPosition.y <= 25 && playerPosition.x >= 35 && playerPosition.x <= 65) {
      setScene("shop-interior", { x: 25, y: 76 }, "back");
    } else if (bedroomGame.dataset.scene === "shop-interior" && playerPosition.y >= 83 && playerPosition.x <= 35) {
      setScene("shop-exterior", { x: 50, y: 36 }, "front");
    } else if (bedroomGame.dataset.scene === "question-exterior" && playerPosition.y >= 83) {
      setScene("crossroads", { x: 50, y: 30 }, "front");
    }
  } else {
    roomPlayer.classList.remove("is-walking");
    walkFrame = 1;
    roomPlayer.dataset.walkFrame = "1";
  }

  movementFrame = window.requestAnimationFrame(movementLoop);
}

function enterBedroomGame(savedState = null) {
  const storyId = localStorage.getItem("1u-current-story-id") || "未命名";
  const validScenes = new Set(Object.keys(sceneLabels));
  let savedPosition = savedState?.position;
  const savedScene = validScenes.has(savedState?.scene) ? savedState.scene : "bedroom";
  try {
    if (!savedPosition) savedPosition = JSON.parse(localStorage.getItem(getRoomStorageKey(storyId)) || "null");
  } catch {
    savedPosition = null;
  }
  if (savedState?.audio) {
    if (typeof savedState.audio.muted === "boolean") audioState.muted = savedState.audio.muted;
    if (Number.isFinite(savedState.audio.bgm)) audioState.bgm = savedState.audio.bgm;
    if (Number.isFinite(savedState.audio.sfx)) audioState.sfx = savedState.audio.sfx;
    saveAudioState();
    updateAudioControls();
  }
  affectionLevel = Number.isFinite(savedState?.affection) ? savedState.affection : 10;
  memory111Complete = Boolean(savedState?.memory111Complete);
  memoryRewardFlags = new Set(Array.isArray(savedState?.memoryRewardFlags) ? savedState.memoryRewardFlags : []);
  answerLog = Array.isArray(savedState?.answerLog) ? savedState.answerLog : [];
  replayHearts = Number.isFinite(savedState?.replayHearts) ? Math.max(0, Math.min(3, savedState.replayHearts)) : 3;
  memoryCompleteBadge.hidden = !memory111Complete;
  updateAffectionDisplay();
  gameStoryId.textContent = storyId;
  onboardingScreen.hidden = true;
  document.body.classList.remove("onboarding-active");
  bedroomGame.hidden = false;
  bedroomGame.dataset.scene = savedScene;
  bedroomGame.setAttribute("aria-label", sceneLabels[savedScene] || "可以探索的场景");
  sceneName.textContent = sceneLabels[savedScene];
  document.body.classList.add("bedroom-game-active");
  const facing = savedState?.facing || "front";
  roomPlayer.dataset.facing = facing;
  roomPlayerSprite.src = playerSprites[facing] || "assets/boy-casual.png";
  roomPlayerSprite.classList.toggle("is-mirrored", facing === "right");
  roomGirl.dataset.frame = "0";
  npcDialogue.hidden = true;
  affectionPopup.hidden = true;
  affectionButton.setAttribute("aria-expanded", "false");
  const bounds = getSceneBounds();
  playerPosition.x = Number.isFinite(savedPosition?.x) ? Math.max(bounds.minX, Math.min(bounds.maxX, savedPosition.x)) : 50;
  playerPosition.y = Number.isFinite(savedPosition?.y) ? Math.max(bounds.minY, Math.min(bounds.maxY, savedPosition.y)) : (savedScene === "bedroom" ? 66 : 78);
  renderPlayerPosition();
  window.cancelAnimationFrame(movementFrame);
  lastMovementTime = performance.now();
  movementFrame = window.requestAnimationFrame(movementLoop);
}

bedroomDoor.addEventListener("click", () => {
  if (!bedroomDoor.classList.contains("is-near")) return showSceneToast("走到门边再出门吧。");
  if (bedroomGame.dataset.scene === "memory-bedroom") {
    if (!memory111Complete) return showSceneToast("门还锁着。先好好和她把话说完。" );
    replayLives.hidden = true;
    roomGirl.dataset.mood = "";
    bedroomGame.classList.remove("memory-complete");
    return setScene("shop-interior", { x: 72, y: 55 }, "right");
  }
  setScene("crossroads", { x: 18, y: 67 }, "right");
});

crossroadHome.addEventListener("click", () => {
  if (!crossroadHome.classList.contains("is-near")) return;
  setScene("bedroom", { x: 78, y: 66 }, "left");
});

shopDoor.addEventListener("click", () => {
  if (!shopDoor.classList.contains("is-near")) return;
  setScene("shop-interior", { x: 25, y: 76 }, "back");
});

shelfHotspot.addEventListener("click", () => {
  if (!shelfHotspot.classList.contains("is-near")) return showSceneToast("走近货架，再点击查看。" );
  memoryShelfModal.hidden = false;
  memoryConfirm.hidden = true;
  movementKeys.clear();
  playSfx("message");
});

questionDirection.addEventListener("click", () => {
  const closeEnough = bedroomGame.dataset.scene === "crossroads" && playerPosition.y <= 34 && playerPosition.x >= 35 && playerPosition.x <= 65;
  if (!closeEnough) return showSceneToast("沿着上方小路再走近一点。" );
  setScene("question-exterior", { x: 50, y: 79 }, "back");
});

questionHouseDoor.addEventListener("click", () => {
  if (!questionHouseDoor.classList.contains("is-near")) return showSceneToast("走到门口再进去吧。" );
  setScene("question-interior", { x: 20, y: 72 }, "back");
});

questionHouseExit.addEventListener("click", () => {
  if (!questionHouseExit.classList.contains("is-near")) return;
  setScene("question-exterior", { x: 50, y: 44 }, "front");
});

function updateQuestionSectionBadges() {
  questionSectionButtons.forEach((button) => {
    const rewardIds = {
      "his-heart": "question-his-heart",
      "her-heart": "question-her-heart",
      relationship: "question-relationship",
      soul: "question-soul"
    };
    const rewardId = rewardIds[button.dataset.questionSection] || "";
    button.classList.toggle("is-complete", Boolean(rewardId && memoryRewardFlags.has(rewardId)));
  });
}

function showQuestionMenu() {
  activeQuestionSection = null;
  activeQuestionStep = 0;
  questionPlaceTitle.textContent = "问题小屋";
  questionPlacePrompt.textContent = "想从哪里开始了解彼此？";
  questionSectionMenu.hidden = false;
  questionFlow.hidden = true;
  questionPlaceStatus.textContent = "";
  questionPlaceAnswer.value = "";
  questionStarRating.hidden = true;
  updateQuestionSectionBadges();
}

function renderStarRating() {
  questionStarRating.replaceChildren();
  questionStarRating.hidden = false;
  for (let rating = 1; rating <= 5; rating += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "★";
    button.setAttribute("aria-label", `${rating} 星`);
    button.classList.toggle("is-selected", rating <= selectedEmotionRating);
    button.addEventListener("click", () => {
      selectedEmotionRating = rating;
      renderStarRating();
      playSfx("toggle");
    });
    questionStarRating.appendChild(button);
  }
}

function renderQuestionFlow() {
  questionPlaceStatus.textContent = "";
  questionPlaceAnswer.value = "";
  questionFlowContent.replaceChildren();
  questionStarRating.hidden = true;

  if (activeQuestionSection === "his-heart" || activeQuestionSection === "her-heart") {
    const guessingHer = activeQuestionSection === "her-heart";
    const emotion = emotionPrompts[activeQuestionStep];
    selectedEmotionRating = 0;
    questionPlaceTitle.textContent = guessingHer ? "她的内心" : "你的内心";
    questionPlacePrompt.textContent = guessingHer
      ? `你觉得她现在对「${emotion}」的感受有几颗星？`
      : `你现在对「${emotion}」的感受有几颗星？`;
    questionProgressText.textContent = `${activeQuestionStep + 1} / ${emotionPrompts.length}`;
    questionProgressBar.style.width = `${((activeQuestionStep + 1) / emotionPrompts.length) * 100}%`;
    questionFlowContent.innerHTML = `<div class="question-flow-card"><strong>${emotion}</strong><p>${guessingHer ? "按照你对她的了解来猜。" : "没有正确答案，只需要诚实。"}</p></div>`;
    renderStarRating();
    questionPlaceAnswer.hidden = false;
    questionPlaceAnswer.placeholder = "为什么这样选？（选填）";
    questionPlaceSave.textContent = activeQuestionStep === emotionPrompts.length - 1 ? "完成这一部分" : "保存并继续";
    return;
  }

  if (activeQuestionSection === "relationship") {
    questionPlaceTitle.textContent = "你们之间的问题";
    const issueIndex = Math.floor(activeQuestionStep / 2);
    const enteringHisThought = activeQuestionStep % 2 === 0;
    const total = relationshipIssues.length * 2;
    questionProgressText.textContent = `第 ${issueIndex + 1} 轮 / ${relationshipIssues.length}`;
    questionProgressBar.style.width = `${((activeQuestionStep + 1) / total) * 100}%`;
    if (enteringHisThought) {
      questionPlacePrompt.textContent = `第 ${issueIndex + 1} 个：你觉得你们之间还有什么问题？`;
      questionFlowContent.innerHTML = `<div class="question-flow-card"><strong>先写下你的想法</strong><p>提交以后，才会看到她对应的第 ${issueIndex + 1} 个想法。</p></div>`;
      questionPlaceAnswer.hidden = false;
      questionPlaceAnswer.placeholder = "把你认为的问题写在这里……";
      questionPlaceSave.textContent = "提交并看看她的想法";
      return;
    }
    const issue = relationshipIssues[issueIndex];
    questionPlacePrompt.textContent = "这是她认为你们之间存在的问题。";
    questionFlowContent.innerHTML = `<div class="question-flow-card"><span class="question-issue-count">她认为的问题 ${issueIndex + 1} / ${relationshipIssues.length}</span><strong>${issue}</strong><p>看完以后，再进入下一轮。</p></div>`;
    questionPlaceAnswer.hidden = true;
    questionPlaceSave.textContent = issueIndex === relationshipIssues.length - 1 ? "我全部看完了" : "进入下一轮";
    return;
  }

  questionPlaceTitle.textContent = "灵魂考问";
  questionPlacePrompt.textContent = soulQuestions[activeQuestionStep];
  questionProgressText.textContent = `${activeQuestionStep + 1} / ${soulQuestions.length}`;
  questionProgressBar.style.width = `${((activeQuestionStep + 1) / soulQuestions.length) * 100}%`;
  questionFlowContent.innerHTML = `<div class="question-flow-card"><strong>认真回答，不用急。</strong><p>答案会保存下来，让她看到你的真实想法。</p></div>`;
  questionPlaceAnswer.hidden = false;
  questionPlaceAnswer.placeholder = "把真实答案写在这里……";
  questionPlaceSave.textContent = activeQuestionStep === soulQuestions.length - 1 ? "完成灵魂考问" : "保存并继续";
}

function startQuestionSection(section) {
  activeQuestionSection = section;
  activeQuestionStep = 0;
  questionSectionMenu.hidden = true;
  questionFlow.hidden = false;
  renderQuestionFlow();
  playSfx("message");
}

questionSpot.addEventListener("click", () => {
  if (!questionSpot.classList.contains("is-near")) return showSceneToast("走近桌边，再开始回答。" );
  showQuestionMenu();
  questionPlacePanel.hidden = false;
  movementKeys.clear();
  playSfx("message");
});

questionSectionButtons.forEach((button) => {
  button.addEventListener("click", () => startQuestionSection(button.dataset.questionSection));
});

questionPlaceSave.addEventListener("click", () => {
  if (activeQuestionSection === "his-heart" || activeQuestionSection === "her-heart") {
    if (!selectedEmotionRating) return void (questionPlaceStatus.textContent = "先选择 1–5 颗星呀。");
    const guessingHer = activeQuestionSection === "her-heart";
    const emotion = emotionPrompts[activeQuestionStep];
    const reason = questionPlaceAnswer.value.trim();
    const answer = `${selectedEmotionRating}/5 星${reason ? `；原因：${reason}` : "；未填写原因"}`;
    recordAnswer(
      guessingHer ? `你觉得她对「${emotion}」的感受有几颗星？` : `你对「${emotion}」的感受有几颗星？`,
      answer,
      guessingHer ? "question-room-her-heart" : "question-room-his-heart"
    );
    activeQuestionStep += 1;
    if (activeQuestionStep >= emotionPrompts.length) {
      const rewardId = guessingHer ? "question-her-heart" : "question-his-heart";
      const amount = guessingHer ? 5 : 10;
      const rewarded = showAffectionGain(rewardId, amount);
      showQuestionMenu();
      questionPlaceStatus.textContent = rewarded
        ? `${guessingHer ? "她的内心" : "你的内心"}已完成，好感度 +${amount} ♡`
        : "这一部分已重新完成，最新答案已经保存 ♡";
    } else {
      renderQuestionFlow();
    }
    playSfx("confirm");
    return;
  }

  if (activeQuestionSection === "relationship") {
    const issueIndex = Math.floor(activeQuestionStep / 2);
    const enteringHisThought = activeQuestionStep % 2 === 0;
    if (enteringHisThought) {
      const answer = questionPlaceAnswer.value.trim();
      if (!answer) return void (questionPlaceStatus.textContent = "先写下你认为的问题呀。");
      recordAnswer(`你认为的问题 ${issueIndex + 1}`, answer, "question-room-relationship");
    } else {
      const issue = relationshipIssues[issueIndex];
      recordAnswer(`她认为的问题 ${issueIndex + 1}`, `已阅读：${issue}`, "question-room-relationship");
    }
    activeQuestionStep += 1;
    if (activeQuestionStep >= relationshipIssues.length * 2) {
      const rewarded = showAffectionGain("question-relationship", 5);
      showQuestionMenu();
      questionPlaceStatus.textContent = rewarded ? "你们之间的问题已看完，好感度 +5 ♡" : "你已经看完过这一部分了，回答已重新保存 ♡";
    } else {
      renderQuestionFlow();
    }
    playSfx("confirm");
    return;
  }

  if (activeQuestionSection === "soul") {
    const answer = questionPlaceAnswer.value.trim();
    if (!answer) return void (questionPlaceStatus.textContent = "这道题需要留下真实答案呀。");
    recordAnswer(soulQuestions[activeQuestionStep], answer, "question-room-soul");
    activeQuestionStep += 1;
    if (activeQuestionStep >= soulQuestions.length) {
      const rewarded = showAffectionGain("question-soul", 10);
      showQuestionMenu();
      questionPlaceStatus.textContent = rewarded ? "灵魂考问完成，好感度 +10 ♡" : "灵魂考问已重新完成，回答已更新 ♡";
    } else {
      renderQuestionFlow();
    }
    playSfx("confirm");
  }
});

questionFlowBack.addEventListener("click", showQuestionMenu);

questionPlaceBack.addEventListener("click", () => {
  questionPlacePanel.hidden = true;
  playSfx("soft");
});

memoryShelfClose.addEventListener("click", () => {
  memoryShelfModal.hidden = true;
  memoryConfirm.hidden = true;
  playSfx("soft");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !memoryShelfModal.hidden) {
    memoryShelfModal.hidden = true;
    playSfx("soft");
  }
});

roomGirl.addEventListener("click", () => {
  if (!updateGirlProximity()) {
    npcDialogueText.textContent = "再靠近一点...";
    npcDialogue.hidden = false;
    playSfx("soft");
    return;
  }
  if (bedroomGame.dataset.scene === "memory-bedroom") {
    if (replayStep === "quiet") startQuietConversation();
    else showReplayDialogue({ speaker: "她", text: "哼～", onContinue: showFirstChoices });
    return;
  }
  if (affectionLevel < 50) pendingAffectionHint = true;
  playGirlHmph();
});

memoryBall.addEventListener("click", () => {
  memoryConfirmTitle.textContent = memory111Complete ? "你已经完成了这个记忆点，要重温一遍吗？" : "确定要重演那天的场景吗？";
  memoryConfirmYes.textContent = memory111Complete ? "要" : "确定";
  memoryConfirmNo.textContent = memory111Complete ? "不要" : "我再想想";
  memoryConfirm.hidden = false;
  playSfx("message");
});

memoryBall.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    memoryBall.click();
  }
});

memoryConfirmYes.addEventListener("click", enterMemoryReplay);
memoryConfirmNo.addEventListener("click", () => {
  memoryConfirm.hidden = true;
  memoryShelfModal.hidden = true;
  playSfx("soft");
});

replayGuideClose.addEventListener("click", () => {
  replayGuide.hidden = true;
  showSceneToast("走近她，再点击她。" );
});

replayContinue.addEventListener("click", () => {
  const action = replayDialogueAction;
  replayDialogueAction = null;
  if (action) action();
});

achievementClose.addEventListener("click", () => {
  achievementBanner.hidden = true;
  showSceneToast("门已经解锁，可以离开了。" );
});

npcDialogueClose.addEventListener("click", () => {
  if (pendingAffectionHint) {
    pendingAffectionHint = false;
    npcDialogueText.textContent = `提示：好感度达到 50% 后，才能和${getHerTitle()}好好沟通。`;
    playSfx("message");
    return;
  }
  npcDialogue.hidden = true;
  playSfx("soft");
});

affectionButton.addEventListener("click", () => {
  const opening = affectionPopup.hidden;
  affectionPopup.hidden = !opening;
  affectionButton.setAttribute("aria-expanded", String(opening));
  playSfx("toggle");
});

document.addEventListener("click", (event) => {
  if (!affectionPopup.hidden && !event.target.closest(".affection-control")) {
    affectionPopup.hidden = true;
    affectionButton.setAttribute("aria-expanded", "false");
  }
});

function setMovement(direction, active) {
  if (active) movementKeys.add(direction);
  else movementKeys.delete(direction);
}

window.addEventListener("keydown", (event) => {
  const direction = directionKeys[event.key.toLowerCase()];
  if (!direction || !document.body.classList.contains("bedroom-game-active") || !memoryShelfModal.hidden) return;
  event.preventDefault();
  setMovement(direction, true);
});

window.addEventListener("keyup", (event) => {
  const direction = directionKeys[event.key.toLowerCase()];
  if (!direction) return;
  setMovement(direction, false);
  savePlayerPosition();
});

touchControls.forEach((button) => {
  const direction = button.dataset.direction;
  const stop = () => {
    setMovement(direction, false);
    savePlayerPosition();
  };
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    setMovement(direction, true);
  });
  button.addEventListener("pointerup", stop);
  button.addEventListener("pointercancel", stop);
  button.addEventListener("lostpointercapture", stop);
});

gameExit.addEventListener("click", () => {
  saveGameState(false);
  movementKeys.clear();
  window.cancelAnimationFrame(movementFrame);
  document.body.classList.remove("bedroom-game-active");
  bedroomGame.hidden = true;
  npcDialogue.hidden = true;
  clearGirlAnimation();
  loginScreen.hidden = false;
  loginStatus.textContent = "";
  storyIdInput.value = localStorage.getItem("1u-current-story-id") || "";
  document.body.classList.add("login-active");
  playSfx("soft");
});

gameSaveButton.addEventListener("click", () => saveGameState(true));

window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s" && document.body.classList.contains("bedroom-game-active")) {
    event.preventDefault();
    saveGameState(true);
  }
});

window.addEventListener("beforeunload", () => {
  if (document.body.classList.contains("bedroom-game-active")) saveGameState(false);
});

window.addEventListener("pagehide", () => {
  if (document.body.classList.contains("bedroom-game-active")) saveGameState(false);
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && document.body.classList.contains("bedroom-game-active")) saveGameState(false);
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
