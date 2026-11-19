# Implementation recipes

These examples use the current public API. Adapt accessible names and content to the consuming application.

## Button

```html
<button class="bk-button bk-button--primary" type="button">Save changes</button>
<a class="bk-button bk-button--secondary" href="/settings">Settings</a>
```

Use buttons for actions and anchors for navigation.

## Form field

```html
<div class="bk-field">
  <label class="bk-label" for="email">Email address</label>
  <input class="bk-input" id="email" name="email" type="email"
    autocomplete="email" aria-describedby="email-hint">
  <p class="bk-field__hint" id="email-hint">Use your work email.</p>
</div>
```

For invalid input, set `aria-invalid="true"` and connect a visible error through `aria-describedby`.

## Tabs

```html
<div class="bk-tabs" data-bk-tabs role="tablist" aria-label="Account settings">
  <button class="bk-tab" id="profile-tab" type="button" role="tab"
    aria-selected="true" aria-controls="profile-panel">Profile</button>
  <button class="bk-tab" id="security-tab" type="button" role="tab"
    aria-selected="false" aria-controls="security-panel" tabindex="-1">Security</button>
</div>
<section class="bk-tabpanel" id="profile-panel" role="tabpanel"
  aria-labelledby="profile-tab">Profile settings</section>
<section class="bk-tabpanel" id="security-panel" role="tabpanel"
  aria-labelledby="security-tab" hidden>Security settings</section>
```

Import the optional module once. It auto-initializes the document in a browser; call `initBrutalKit(root)` for a separately mounted root.

## Dialog

```html
<button class="bk-button bk-button--primary" type="button"
  data-bk-dialog-open="confirm-dialog">Delete item</button>
<dialog class="bk-dialog" id="confirm-dialog" data-bk-dialog
  aria-labelledby="confirm-title">
  <h2 class="bk-dialog__title" id="confirm-title">Delete this item?</h2>
  <p class="bk-dialog__body">This action cannot be undone.</p>
  <button class="bk-button" type="button" data-bk-dialog-close>Cancel</button>
</dialog>
```

Native `dialog` supplies modal behavior and Escape handling. Provide a visible close action. Focus returns to the opener after close.
