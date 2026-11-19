const copyButton = document.querySelector("#copy-code");
const snippet = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@v0.1.0/dist/brutal.min.css" />';
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(snippet);
    copyButton.textContent = "Copied ✓";
    window.setTimeout(() => { copyButton.textContent = "Copy ↗"; }, 1600);
  } catch {
    copyButton.textContent = "Copy unavailable";
  }
});
