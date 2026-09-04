---
title: "ELX ChatBot"
description: "AI chatbot for ecommerce that automates support and boosts sales across Shopify, Adobe Commerce, WooCommerce, and BigCommerce."
date: 2023-08-01
tags: ["Django", "Tailwind", "Flowbite", "AI", "Chatbot"]
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

I worked on developing the Admin Panel for the Bot. Django was the primary backend and
frontend for the panel. From this panel we could handle the chat sessions, schedule the bot and
interfier conversations when necessary. It hold the company information and could control the UI
of the chatbot integrated with any eCommerce.
This project had three services running in a Microservice pattern. The other two parts are the
model hosting with the store based trained with prompts and the actual frontend chatbox.

- Custom updatable Cron Jobs from the Admin panel using Django Celery to schedule the ChatBot
- Company and store timezone management. Scheduling based on the company timezone
- Complete chat sessions management with interfiering and letting go
- Asynchronus socket based connections managemment
- Self closing chat sessions
- Training data location management of scripts for store based products and ecommerce technologies like WooCommerce, Shopify etc

## Approach and challenges

The Admin panel is the middle point of the conversation in a real case schenario. So
it was a challenge to maintain so the flow is never interupted by the admin panel as all
services communicated with each other. For admin panel frontend components used tailwind
css components from Flowbite.

## Team Members

- AI Engineer - Jahin Akif
- Frontend Chatbot Engineer - Ahnaf Tahmid
- DevOps Engineer - Zuhair Mehtab
- UI/UX Engineer - Nurul Amin

## Honourable Mentions

They gave their 200% to pull off the project within time. Without them this
wouldn't have been possible to finish

- Abir Islam
- MD. Zillur Rahman
- MD. Farhan Osman
