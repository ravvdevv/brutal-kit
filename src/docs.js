const copyButtons = document.querySelectorAll(".copy-code");

copyButtons.forEach((button) => {
  button.setAttribute("aria-live", "polite");
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
      button.textContent = "Copied ✓";
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

const sectionLinks = [...document.querySelectorAll(".docs-sidebar .sidebar-link[href^='#']")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const linkBySection = new Map(
    sectionLinks.map((link) => [document.querySelector(link.getAttribute("href")), link])
  );

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    const activeLink = linkBySection.get(visible.target);
    if (activeLink) {
      activeLink.classList.add("active");
      activeLink.setAttribute("aria-current", "location");
      if (window.matchMedia("(max-width: 650px)").matches) {
        activeLink.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }, {
    rootMargin: "-18% 0px -68% 0px",
    threshold: [0, 0.15, 0.4, 0.7]
  });

  sections.forEach((section) => observer.observe(section));
}
