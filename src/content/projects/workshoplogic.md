---
title: "WorkshopLogic"
description: "Workshop management SaaS — license-plate ordering, time tracking, invoicing, and automated customer follow-ups."
date: 2024-03-01
tags: ["Python", "Django", "Vue", "SaaS", "PostgreSQL"]
role: "Software Engineer"
status: "in-progress"
featured: true
liveUrl: "https://www.workshoplogic.com/"
---

## Overview

WorkshopLogic is management software for automotive repair workshops. It
replaces the admin sprawl of running a shop — parts ordering, mechanic time
tracking, job booking, invoicing, and customer follow-up — with a single
system. The product's differentiators are grounded in real shop workflows:
order parts from a vehicle's license plate, clock mechanics on and off jobs
by scanning the plate, and scan barcodes straight onto an invoice so no
charge is forgotten.

## What I work on

I'm a software engineer on the platform, working across the stack from the
Django backend to the Vue front-end. The work spans core product features,
integrations with suppliers and accounting systems like Xero, and the
operational details that make a workshop actually adopt the tool day to day.

## Approach and challenges

The domain is what makes it interesting. A workshop is a fast, chaotic
environment — mechanics don't sit at desks, and anything that adds friction
gets abandoned. That changes how you design: time tracking has to be
scan-a-plate simple, job booking has to be a handful of clicks, and cash
sales need to clear in three steps.

Data accuracy is the business-critical constraint. License-plate lookups that
pull vehicle details, OCR on supplier invoices, and barcode scanning all feed
the same ledger of what was sold and what it cost. Getting those inputs wrong
quietly erodes a shop's margins, so the integrations and the invoicing model
had to be built for correctness first.

## Stack and takeaways

Python and Django on the backend, Vue on the front-end, with PostgreSQL for
relational data and integrations into Xero, Repco, and other supplier
systems. The lesson I keep coming back to: in vertical SaaS, the hardest
problems are workflow problems, not technical ones. The software has to
disappear into the way a mechanic already works.
