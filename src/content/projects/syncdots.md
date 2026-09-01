---
title: "SyncDots"
description: "AI-powered WhatsApp tool for campaigns, auto-replies, and customer engagement."
date: 2021-08-01
tags: ["Python", "WhatsApp API", "AI", "Automation", "CRM"]
role: "Software Engineer"
status: "completed"
featured: false
liveUrl: "https://syncdots.id/"
---

## Overview

SyncDots builds digital products for Indonesian businesses, with its core
offering being an AI-powered WhatsApp tool for campaigns, auto-replies, and
customer engagement. WhatsApp is the default communication channel in the
Indonesian market, so the product had to meet users where they already were
rather than asking them to adopt yet another app.

## What I worked on

I contributed to the messaging automation layer that sits between a
business's WhatsApp account and its customers. That meant building reliable
message delivery, campaign scheduling, and auto-reply logic that had to stay
responsive even under bursty campaign traffic.

## Approach and challenges

The interesting problem was reliability. WhatsApp's Business API is
asynchronous and webhook-driven — a message can be accepted, queued, and only
later confirm delivery or fail. Designing for that meant making every send
idempotent and observable, so a retry never produced a duplicate message and
support could always see what actually reached a customer.

Campaign volume was the other constraint. A broadcast to thousands of
recipients can't be treated as a single loop; it has to fan out without
overwhelming rate limits or the underlying API. I learned to think of
delivery as a queue problem with back-pressure rather than a simple
"send now" operation.

## Stack and takeaways

Python on the backend, WhatsApp's messaging APIs, and a CRM-style data model
for contacts, campaigns, and conversation history. The lasting lesson was
that integration work is mostly about modeling failure states honestly — the
happy path is easy; the retries, timeouts, and partial failures are where the
product actually gets built.
