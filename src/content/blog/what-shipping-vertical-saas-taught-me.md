---
title: "What Shipping a Vertical SaaS Product Taught Me"
description: "Lessons from building software for auto-repair workshops, where the user is a mechanic, not a developer."
date: 2026-06-10
tags: ["SaaS", "Django", "Vue", "Product Engineering"]
draft: false
---

## Your user is not you

The most humbling thing about building vertical SaaS is how fast your
assumptions about the user collapse. A mechanic doesn't sit at a desk, isn't
interested in your navigation, and will abandon anything that adds friction
to a busy day.

So the design bar inverts. "Simple" isn't a nice-to-have; it's the whole
product. Time tracking has to be scan-a-license-plate simple. Booking a job
has to be a handful of clicks. If a feature makes a mechanic's day slower,
it doesn't matter how elegant the code is.

## Correctness is a revenue problem

In a workshop system, the ledger of what was sold and what it cost is the
business. License-plate lookups, OCR'd supplier invoices, and barcode scans
all feed that same ledger. If those inputs are subtly wrong, the shop's
margins erode and nobody notices until month-end.

That changed my instinct from "make it work" to "make it correct, then make
it work." Quiet data errors are the worst kind of bug because they're
plausible — they don't crash, they just lie.

## Integrations are where the real value hides

The product isn't valuable because it has a dashboard. It's valuable because
it plugs into the supplier and accounting systems the shop already uses.
Integration work isn't glamorous, but it's the difference between a tool
that fits into a workflow and one that sits beside it.

The lesson I keep coming back to: the hard problems in vertical SaaS are
workflow problems, not technical ones. The software wins when it disappears
into how the user already works.
