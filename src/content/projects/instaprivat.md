---
title: "InstaPrivat"
description: "Home tutoring service across Jabodetabek — private tutors for every level, booked through WhatsApp and managed by an Admin Panel"
date: 2021-11-01
tags: ["Django", "DRF", "Vuejs", "SendGrid", "Flip", "Telegram Bot"]
role: "Software Engineer"
status: "completed"
featured: true
liveUrl: "https://instaprivat.com/"
---

## Overview

InstaPrivat matches students with private tutors who come to their home,
serving the greater Jakarta area (Jabodetabek). The catalogue spans early
childhood (TK/PAUD) through SMA, plus exam prep, foreign languages, Quran
study, and shadow teachers. It's a lead-generation and booking business
where conversion speed matters more than a heavy checkout flow.

## What I worked on

I worked on the web presence and the inquiry path. The service deliberately
routes registration through WhatsApp rather than a traditional form, because
parents in this market want a quick human conversation about tutor
availability before committing. My job was to make that handoff as
low-friction as possible while still capturing enough context for the team
to follow up intelligently.

## Approach and challenges

The design constraint was that a tutoring inquiry is high-context: the
student's level, subject, location, and schedule all matter. A plain "contact
us" button loses that. Deep-linking each program into WhatsApp with a
pre-filled message preserved the context, so a parent lands in chat already
describing what they need.

The programme catalogue also needed to read clearly on mobile, since a large
share of parents browse on their phone in the evening. Keeping the many
programmes (SD, SMP, SMA, SBMPTN, Olympiad, languages, mengaji) scannable
without turning the page into an endless list was a real information-design
problem.

## Stack and takeaways

Plain web front-end with WhatsApp deep links as the conversion layer, no
server-side booking complexity needed. The lesson: for a service business,
the goal isn't always a checkout — sometimes it's a well-formed conversation.
Optimizing the handoff, not the form, was the highest-leverage work.
