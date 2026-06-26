# Site Settings

This is the **one place** to switch the site between modes. You only ever change
the word `true` or `false` after the colon — nothing else.

You can edit, reorder, or add notes anywhere in this file: only the lines below
that start with a known setting name are read, so you can't break it by changing
the surrounding text. The value must be exactly `true` or `false` (lowercase).

**After changing a value:** rebuild (`npm run build`) and redeploy.

## Toggles

- PRELAUNCH: true
- SCREEN_PUBLISHED: false

---

### What each setting does

**PRELAUNCH**

- `true` → the site shows the **Coming Soon** page (email capture only). _Safe default._
- `false` → the site shows the **full website** (home, novel, about, writing, contact).

Leave this `true` until you're ready for the public launch flip.

**SCREEN_PUBLISHED**

- `false` → the private **/screen** industry page is **hidden** — not built, not in the sitemap. _Keep this._
- `true` → publishes **/screen**.

> ⚠️ Only set `SCREEN_PUBLISHED` to `true` **after** the US Copyright is filed (hard gate).

---

_Advanced: a build-time environment variable of the same name (e.g._
`PRELAUNCH=false npm run build`_) overrides this file for one-off / CI builds.
For everyday use, just edit the values above._
