// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
function init() {
  const gate = document.querySelector(".gate");
  const startBtn = document.querySelector(".gate__button");
  const cancelBtn = document.querySelector(".gate__panel-btn--cancel");
  const confirmBtn = document.querySelector(".gate__panel-btn--confirm");
  if (!gate || !startBtn || !cancelBtn || !confirmBtn) return;

  startBtn.addEventListener("click", () => {
    gate.dataset.state = "confirm";
    confirmBtn.focus();
  });

  cancelBtn.addEventListener("click", () => {
    gate.dataset.state = "idle";
    startBtn.focus();
  });

  confirmBtn.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const examPath = params.get("exam");
    if (examPath) {
      window.location.href = "../" + examPath;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
// @license-end
