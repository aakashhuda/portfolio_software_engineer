---
title: "Why I Built My Portfolio With Vanilla Astro"
description: "No React, no Tailwind, no extra packages — and the build is better for it."
date: 2026-07-20
tags: ["Astro", "Vanilla JS", "Performance", "Static Sites"]
draft: false
---

## The default answer would have been a framework

A portfolio site is the kind of project where the tempting move is to pull
in React or Vue, a component library, and a CSS framework — not because the
site needs it, but because that's the default muscle memory.

I deliberately didn't. This site is Astro with static output, plain CSS, and
vanilla JavaScript. No UI framework, no utility classes, no npm packages
beyond what Astro needs to build.

## What the constraints bought me

The first win is performance. Every page is pre-rendered HTML, so there's no
client-side framework runtime to download and no hydration step. A portfolio
that a recruiter opens on a phone over flaky data should load instantly, and
it does.

The second win is simpler than I expected: *less code to maintain*. Without
a framework's abstractions, the components are just small, focused pieces.
I can read any one of them in a few seconds.

The third win is honesty. A portfolio is a statement about how I like to
work. Building it with restraint is itself the argument.

## Content collections do the heavy lifting

The projects and blog are Markdown files read through Astro Content
Collections. Adding a new case study is dropping a `.md` file in a folder —
no code changes. That's the exact property I wanted: the content is the
work, and it should be trivial to extend.

## What I'd reach for a framework for

None of this is an argument against frameworks. It's an argument for picking
the simplest tool that meets the need. This site's need is "static pages of
text and images with a bit of styling." Astro's static output covers that
completely.

The constraint that felt like a limitation turned out to be the feature. The
site is fast because it has nothing to be slow about.
