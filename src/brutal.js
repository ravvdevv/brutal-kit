const initialized = new WeakSet();

export function initBrutalKit(root = document) {
  if (initialized.has(root)) return;
  initialized.add(root);

  root.querySelectorAll("[data-bk-tabs]").forEach((tablist) => {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => {
      const id = tab.getAttribute("aria-controls");
      return id ? root.getElementById?.(id) ?? root.querySelector(`#${CSS.escape(id)}`) : null;
    });

    const activate = (index, moveFocus = false) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i]?.toggleAttribute("hidden", !selected);
      });
      if (moveFocus) tabs[index]?.focus();
    };

    const initial = Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));
    activate(initial);

    tablist.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      const index = tabs.indexOf(tab);
      if (index >= 0) activate(index);
    });

    tablist.addEventListener("keydown", (event) => {
      const current = tabs.indexOf(event.target.closest('[role="tab"]'));
      if (current < 0) return;
      const vertical = tablist.getAttribute("aria-orientation") === "vertical";
      const nextKey = vertical ? "ArrowDown" : "ArrowRight";
      const previousKey = vertical ? "ArrowUp" : "ArrowLeft";
      let next = current;

      if (event.key === nextKey) next = (current + 1) % tabs.length;
      else if (event.key === previousKey) next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(next, true);
    });
  });

  root.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-bk-dialog-open]");
    if (openTrigger) {
      const dialogId = openTrigger.getAttribute("data-bk-dialog-open");
      const dialog = dialogId ? root.getElementById?.(dialogId) ?? root.querySelector(`#${CSS.escape(dialogId)}`) : null;
      if (dialog instanceof HTMLDialogElement && !dialog.open) {
        dialog.showModal();
        dialog.dataset.bkReturnFocus = openTrigger.id || "";
        if (!openTrigger.id) {
          openTrigger.id = `bk-trigger-${Math.random().toString(36).slice(2)}`;
          dialog.dataset.bkReturnFocus = openTrigger.id;
        }
      }
      return;
    }

    const closeTrigger = event.target.closest("[data-bk-dialog-close]");
    if (closeTrigger) closeTrigger.closest("dialog")?.close();
  });

  root.querySelectorAll("dialog[data-bk-dialog]").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      const triggerId = dialog.dataset.bkReturnFocus;
      if (triggerId) root.getElementById(triggerId)?.focus();
      delete dialog.dataset.bkReturnFocus;
    });
  });
}

if (typeof document !== "undefined") initBrutalKit();
