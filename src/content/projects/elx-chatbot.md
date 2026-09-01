---
title: "ELX ChatBot"
description: "AI chatbot for ecommerce that automates support and boosts sales across Shopify, Adobe Commerce, WooCommerce, and BigCommerce."
date: 2023-08-01
tags: ["AI", "Chatbot", "Next.js", "NLP", "Ecommerce", "Shopify"]
role: "Software Engineer"
status: "completed"
featured: true
liveUrl: "https://www.elxchatbot.ai/"
---

## Overview

ELX ChatBot is an AI assistant built for ecommerce stores. It learns a
store's product catalogue and FAQs, then handles the repetitive slice of
support — sizing, delivery, returns, availability, order status — while
guiding shoppers toward a purchase. It plugs into Shopify, Adobe Commerce,
WooCommerce, and BigCommerce, which makes platform integration a first-class
concern rather than an afterthought.

## What I worked on

I worked on the product as part of the EchoLogyx engineering team,
contributing to the customer-facing experience and the integrations that
connect the chatbot to a store's live data.

## Approach and challenges

The interesting problems were integration and grounding. A chatbot is only
as useful as the data it can reach, so syncing product catalogues, FAQs, and
order status across four very different ecommerce platforms meant building a
consistent abstraction over inconsistent APIs. Each platform has its own
notion of products, inventory, and orders, and the chatbot had to present one
coherent view to the shopper.

Conversational accuracy was the other axis. Recommending a product or
reporting an order status that's subtly wrong is worse than not answering at
all. That pushed toward deterministic, data-backed answers wherever possible,
with the language model layered on top rather than left to improvise from
memory.

## Stack and takeaways

A Next.js front-end (the marketing site and dashboard are React-based), with
AI/NLP for understanding and platform integrations for Shopify, Adobe
Commerce, WooCommerce, and BigCommerce. The lasting lesson: the hard part of
an AI product isn't the model — it's giving the model trustworthy, current
data to reason over.
