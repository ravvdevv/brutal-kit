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
