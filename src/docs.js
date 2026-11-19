const copyButtons = document.querySelectorAll(".copy-code");
copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.closest(".code-block")?.querySelector("pre code")?.textContent;
    if (!code || !navigator.clipboard?.writeText) {
      button.textContent = "Select & copy";
      return;
    }
    const label = button.textContent;
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Copy failed";
    } finally {
      window.setTimeout(() => {
        button.textContent = label;
        button.disabled = false;
      }, 1400);
    }
  });
});
