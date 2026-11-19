const initialized = new WeakSet();

function eventElement(target) {
  return target?.nodeType === 1 ? target : target?.parentElement ?? null;
}

function findById(root, id) {
  if (!id) return null;
  const doc = root.ownerDocument ?? (root.nodeType === 9 ? root : document);
  const candidate = doc.getElementById(id);
  return candidate && (root === doc || root.contains(candidate)) ? candidate : null;
}

export function initBrutalKit(root = document) {
  if (!root || initialized.has(root)) return;
  initialized.add(root);

  const returnFocus = new WeakMap();

  root.querySelectorAll("[data-bk-tabs]").forEach((tablist) => {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')]
      .filter((tab) => tab.closest("[data-bk-tabs]") === tablist);
    if (tabs.length === 0) return;

    const panels = tabs.map((tab) => findById(root, tab.getAttribute("aria-controls")));
    const enabledIndexes = tabs
      .map((tab, index) => tab.disabled || tab.getAttribute("aria-disabled") === "true" ? -1 : index)
      .filter((index) => index >= 0);

    if (enabledIndexes.length === 0) return;

    const requestedInitial = tabs.findIndex((tab, index) =>
      tab.getAttribute("aria-selected") === "true" && enabledIndexes.includes(index)
    );
    const initial = requestedInitial >= 0 ? requestedInitial : enabledIndexes[0];

    const activate = (index, moveFocus = false) => {
      if (!enabledIndexes.includes(index)) return;

      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (panels[i]) panels[i].hidden = !selected;
      });

      if (moveFocus) tabs[index].focus();
    };

    activate(initial);

    tablist.addEventListener("click", (event) => {
      const target = eventElement(event.target);
      const tab = target?.closest('[role="tab"]');
      const index = tabs.indexOf(tab);
      if (index >= 0) activate(index);
    });

    tablist.addEventListener("keydown", (event) => {
      const target = eventElement(event.target);
      const current = tabs.indexOf(target?.closest('[role="tab"]'));
      if (current < 0 || !enabledIndexes.includes(current)) return;

      const vertical = tablist.getAttribute("aria-orientation") === "vertical";
      const nextKey = vertical ? "ArrowDown" : "ArrowRight";
      const previousKey = vertical ? "ArrowUp" : "ArrowLeft";
      const position = enabledIndexes.indexOf(current);
      let nextPosition;

      if (event.key === nextKey) nextPosition = (position + 1) % enabledIndexes.length;
      else if (event.key === previousKey) nextPosition = (position - 1 + enabledIndexes.length) % enabledIndexes.length;
      else if (event.key === "Home") nextPosition = 0;
      else if (event.key === "End") nextPosition = enabledIndexes.length - 1;
      else return;

      event.preventDefault();
      activate(enabledIndexes[nextPosition], true);
    });
  });

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const openTrigger = target?.closest("[data-bk-dialog-open]");

    if (openTrigger) {
      const dialog = findById(root, openTrigger.getAttribute("data-bk-dialog-open"));
      if (dialog?.tagName === "DIALOG" && typeof dialog.showModal === "function" && !dialog.open) {
        returnFocus.set(dialog, openTrigger);
        dialog.showModal();
      }
      return;
    }

    const closeTrigger = target?.closest("[data-bk-dialog-close]");
    const dialog = closeTrigger?.closest("dialog[data-bk-dialog]");
    if (dialog?.open) dialog.close();
  });

  root.querySelectorAll("dialog[data-bk-dialog]").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      const trigger = returnFocus.get(dialog);
      if (trigger?.isConnected) trigger.focus();
      returnFocus.delete(dialog);
    });
  });
}

if (typeof document !== "undefined") initBrutalKit();
