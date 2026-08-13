# Managing Your Website — A Complete Guide

Hi Maria! This guide shows you how to update every part of your website yourself,
using only your web browser. **You do not need to install anything, and you do not
need to know how to code.** Take it one step at a time — you can't break anything
permanently.

---

## 1. The big picture (please read this once)

- Your website is just a collection of **simple text files**.
- You edit those files right in your web browser on **GitHub** (a website that stores the files).
- When you save a change, the website **rebuilds itself automatically** and updates in about a minute.
- Every change is saved forever with a full history, so **anything can be undone**. If a change
  has a mistake, the live website simply keeps showing the previous good version until it's fixed —
  the site never goes down.

**Two web addresses to bookmark:**

| What | Address |
|------|---------|
| Your live website (what the world sees) | `https://mariakomugabe.com` |
| Where you edit it (sign in with your GitHub account) | `https://github.com/<your-repo>` *(Richard will give you this exact link)* |

---

## 2. The three golden rules

1. **Only change the words.** In these files, change the text *between the quotation marks* or after
   the dashes. Never delete the surrounding symbols — the quotes `"`, dashes `-`, colons `:`, or the
   `---` lines. They're the scaffolding that holds the page together.
2. **Always check for the green checkmark.** After you save, GitHub runs an automatic build. A
   **green ✓** means your change worked and is going live. A **red ✗** means something needs a small
   fix (see [Section 8: If something looks wrong](#8-if-something-looks-wrong)).
3. **Never edit a file whose name ends in `.astro`, `.ts`, `.mjs`, or `.json`.** Those are the
   design and machinery. Everything you'll ever need to change lives in the files listed below.

---

## 3. How to change existing text (the basic move)

This is the core skill. Everything else is a variation of it.

1. Go to your repository on GitHub and sign in.
2. Click through the folders to the file you want (use the **map in Section 4**).
3. Click the file to open it, then click the **pencil icon ✏️** near the top right ("Edit this file").
4. Make your change — type over the words you want to replace.
5. Scroll to the bottom and click the green **"Commit changes"** button. A box pops up — just click
   the green **"Commit changes"** again. (You can leave the message box as-is, or type a short note
   like "updated bio".)
6. Wait about a minute. Check the **Actions** tab shows a green ✓, then refresh your website.

> 💡 **"Commit" just means "save."** That's all. Whenever you see it, think "save."

---

## 4. The map — where everything lives

Everything you edit is inside the **`site/src/`** area (plus photos in `assets/`). Here's what
controls what:

| To change… | Edit this file / folder |
|------------|--------------------------|
| **Blog posts** ("Writings") | `site/src/content/blog/` — one file per post |
| **News items** (homepage + News page) | `site/src/content/news/` — one file per item |
| **Publications** | `site/src/content/publications/` — one file per paper |
| **Research threads** | `site/src/content/research/` — one file per thread |
| **Supervised research** (students you advised) | `site/src/data/supervised.yaml` |
| **About page — the bio paragraphs** | `site/src/content/pages/about-bio.md` |
| **About page — lists** (appointments, education, honors, gallery) | `site/src/data/about.yaml` |
| **Teaching page — philosophy paragraph** | `site/src/content/pages/teaching-philosophy.md` |
| **Teaching page — courses, evaluations, mentorship** | `site/src/data/teaching.yaml` |
| **CV page** (all sections) | `site/src/data/cv.yaml` |
| **Photos** | `assets/photos/web/` — upload images here |

> There are two kinds of files you'll edit:
> - **`.md` files** (Markdown) — for writing paragraphs of text. Simple: just type.
> - **`.yaml` files** — for lists (courses, honors, students…). A little fussier: keep the
>   indentation (the spaces at the start of lines) and the dashes exactly as they are.

---

## 5. Add a new blog post ("Writings") — with a photo

This is the most common thing you'll do. Two parts: **the photo**, then **the post**.

### Part A — Upload your photo first (if the post has one)

1. **Prepare the image on your computer.** Make it a reasonable size for the web — about **1600
   pixels wide** is perfect. On a Mac: open the photo in **Preview** → menu **Tools → Adjust Size**
   → set Width to `1600` → **File → Export** → save as JPEG.
   *(Big phone photos are 4–6× too large and make the page slow, so this step matters.)*
2. **Name it simply:** lowercase, words joined by dashes, ending in `.jpg` — e.g.
   `2026-nairobi-conference.jpg`. No spaces, no capital letters.
3. In GitHub, open the **`assets/photos/web/`** folder. Click **"Add file" → "Upload files"**, drag
   your image in, and click **"Commit changes."**

> 🔒 **A privacy note:** photos taken on a phone can contain the GPS location where they were taken.
> The resize-and-export step above usually drops it, but if a photo is sensitive, ask Richard to
> confirm it's stripped before uploading.

### Part B — Write the post

1. Open the **`site/src/content/blog/`** folder.
2. Click **"Add file" → "Create new file."**
3. For the file name, type a short lowercase name ending in `.md` — for example
   `notes-from-nairobi.md`. **This name becomes the web address** of the post
   (`mariakomugabe.com/writings/notes-from-nairobi/`), so keep it tidy.
4. Paste this template into the big text box and edit it:

   ```markdown
   ---
   title: Notes from the Nairobi Conference
   description: A short one-sentence summary that shows up in the list and previews.
   pubDate: 2026-08-15
   draft: false
   tags:
     - fieldwork
     - conferences
   ---

   Write your post here. This is normal writing — just type paragraphs.

   Leave a blank line between paragraphs to start a new one.

   You can make text **bold** by wrapping it in two stars, or add a
   [link like this](https://example.com).

   To add the photo you uploaded, put this on its own line:

   ![A short description of the photo](/photos/2026-nairobi-conference.jpg)
   ```

5. Click **"Commit changes."** Done! After the green ✓, your post is live.

**The settings at the top (between the `---` lines) explained:**

| Setting | What to put |
|---------|-------------|
| `title` | The headline of the post. |
| `description` | One sentence shown on the Writings list. **Required.** |
| `pubDate` | The date, always as `YEAR-MONTH-DAY` (e.g. `2026-08-15`). **Required.** |
| `draft` | `false` = published. Change to `true` to hide it while you work on it. |
| `tags` | Optional keywords, each on its own line after a dash. |

> ⚠️ `title`, `description`, and `pubDate` **must** be filled in, or the build will show a red ✗.

---

## 6. Other things you'll add (all the same idea)

### Add a news item
Open `site/src/content/news/`, **Create new file**, name it like `2026-08-new-grant.md`, and paste:
```markdown
---
title: Awarded a new research grant from the XYZ Foundation
date: 2026-08-10
link: https://example.com/announcement
---
```
`link` is optional — it makes the item clickable. (News items are just the heading; no body needed.)

### Add a research thread
Open `site/src/content/research/`, **Create new file**, name it like `05-new-topic.md`, and paste:
```markdown
---
order: 5
eyebrow: New area
title: Your Research Thread Title
links:
  - text: A related paper →
    href: /publications/some-paper-slug/
---

Write a paragraph or two describing this research thread here, just like normal writing.
```
`order` controls where it appears (1, 2, 3…). You can also add `image: /photos/name.jpg`,
`imageAlt:`, `imageCaption:`, and an `impact:` line — copy those from an existing thread file to
see the pattern.

### Add a supervised student
Open `site/src/data/supervised.yaml`. Find the right group (Doctoral, Master's, or Undergraduate),
copy one existing block, and change the three lines. **Keep the dashes and indentation exactly:**
```yaml
    - name: Student Full Name
      when: "2026"
      topic: "Title of their research project"
```

### Add a publication
Open `site/src/content/publications/`. The easiest way: open an existing paper file, click the pencil,
copy everything, then **Create new file** and paste it in, changing the details. Fill in the fields
you know (`title`, `authors`, `year`, `venue`, `doi`, `abstract`). Set `featured: true` on a paper to
show it on the homepage.

### Edit the About bio or Teaching philosophy (paragraphs)
These are the two files where you edit longer writing:
`site/src/content/pages/about-bio.md` and `site/src/content/pages/teaching-philosophy.md`.
Just click the pencil and rewrite the paragraphs. (Ignore the `--- / title / ---` lines at the very
top — leave those alone.)

### Update a course, appointment, honor, or interest (lists)
These live in the `.yaml` files (`about.yaml`, `cv.yaml`, `teaching.yaml`). To add an item, copy an
existing line or block and change the words between the quotes. Keep the leading spaces and the dash.

---

## 7. Working with photos — the rules

- **Where they go:** always upload to **`assets/photos/web/`**.
- **How to refer to one:** write the path as **`/photos/` + the file name** — for example
  `/photos/2026-nairobi-conference.jpg`. (Even though the folder is `assets/photos/web/`, on the
  website it becomes `/photos/…`. The site handles that for you.)
  - In a blog post: `![description](/photos/your-file.jpg)`
  - In the About gallery (`about.yaml`): just the file name, like `2026-nairobi.jpg`.
- **Size:** aim for ~1600px wide (see Section 5, Part A). Smaller is fine; giant phone photos are not.
- **Names:** lowercase, dashes instead of spaces, ending in `.jpg` or `.png`.

---

## 8. If something looks wrong

**After every change, glance at the "Actions" tab** at the top of your repository:

- 🟡 **Yellow dot** = still building. Wait a minute.
- ✅ **Green check** = success. Your change is live (refresh the site; on a Mac press **Cmd+Shift+R**
  to force it).
- ❌ **Red X** = the build didn't finish, so **the website kept the previous version** (nothing is
  broken for visitors). It almost always means a small typo — usually a missing quote `"`, a wrong
  date format, or a broken indent in a `.yaml` file.

**To fix a red X — the easy undo:**

1. Go to the file you just changed and click the pencil ✏️.
2. Compare it to a working file (or the template in this guide) and fix the obvious typo — often a
   missing `"` or a line that lost its indentation.
3. Commit again and watch for the green ✓.

**Or undo completely:** on the repository's main page, click **"Commits"** (or the clock/history
icon), find your change, and use GitHub's **"Revert"** option to roll it back. When in doubt, this
always returns things to how they were — and you can always ask Richard.

> You genuinely cannot break the live site. The worst case is that it doesn't update until a typo is
> fixed. Experiment freely.

---

## 9. Quick answers

- **How long until my change appears?** About 1–2 minutes after the green ✓. Force-refresh if needed.
- **Can I do this on my phone or iPad?** Yes — `github.com` works in any browser.
- **What does "commit" mean?** Just "save."
- **What is `main`?** The one and only version of your site. Always commit to `main` (it's the default —
  don't change it).
- **I see files ending in `.astro` / `.ts` / `.mjs`.** Ignore them completely. Never edit them.
- **Do I need to touch anything in the `Documents/` or `design/` folders?** No.

---

## 10. Mini-glossary (plain English)

| Word | Means |
|------|-------|
| **Repository** (repo) | The folder that holds your whole website on GitHub. |
| **Commit** | Save a change. |
| **Markdown** (`.md`) | A simple way to write text with paragraphs, **bold**, and links. |
| **YAML** (`.yaml`) | The format of the "list" files. Spaces at the start of lines matter. |
| **Frontmatter** | The settings at the top of a `.md` file, between the two `---` lines. |
| **Build / Actions** | The automatic process that turns your files into the live website. |
| **Draft** | A post marked `draft: true` is saved but hidden from the site until you're ready. |

---

*Questions or something not covered here? Ask Richard — and this guide can always be expanded.*
