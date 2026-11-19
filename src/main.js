const menuToggle = document.querySelector(".nav-menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);
}

const copyButton = document.querySelector("#copy-code");
const copyStatus = document.querySelector("#copy-status");
const snippet = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@main/dist/brutal.min.css" />';

copyButton?.addEventListener("click", async () => {
  if (!navigator.clipboard?.writeText) {
    if (copyStatus) copyStatus.textContent = "Clipboard access requires a secure context.";
    return;
  }

  const originalLabel = copyButton.textContent;
  copyButton.disabled = true;

  try {
    await navigator.clipboard.writeText(snippet);
    copyButton.textContent = "Copied ✓";
    if (copyStatus) copyStatus.textContent = "CDN snippet copied to clipboard.";
  } catch {
    copyButton.textContent = "Copy failed";
    if (copyStatus) copyStatus.textContent = "Could not access the clipboard. Select and copy the snippet manually.";
  } finally {
    window.setTimeout(() => {
      copyButton.textContent = originalLabel || "Copy ↗";
      copyButton.disabled = false;
    }, 1600);
  }
});
