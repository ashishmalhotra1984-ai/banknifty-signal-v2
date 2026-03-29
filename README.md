# BankNifty Signal V2 — An AI-First Decision Support Tool

> Built by a Product Manager, for a Product Manager — to remove emotion from high-stakes decisions.

-----

## The Problem

Options trading is a domain where **cognitive biases destroy outcomes**.

- You override your own rules when you’re losing (“it’ll recover”)
- You re-enter trades after booking profit out of FOMO
- You ignore macro signals because your gut says otherwise
- You take revenge trades after a bad day

I was doing all of this. I had rules in my head but no system to enforce them.

-----

## The PM Insight

As a Product Manager, I think about **decision systems** — how to remove subjectivity from processes that matter. I applied the same thinking to my own trading.

The question wasn’t *“how do I predict the market better?”*  
The question was *“how do I make better decisions with the information I already have?”*

That reframing changed everything.

-----

## What I Built

A **multi-signal decision engine** built in React, co-developed iteratively with Claude (Anthropic).

It takes structured inputs across 6 dimensions and outputs a clear directional signal — BUY CALL, BUY PUT, or STAY OUT — with signal strength, reasoning, and trade levels.

### Signal Inputs

|Input                      |What it captures                    |
|---------------------------|------------------------------------|
|Current Price vs VWAP      |Intraday trend bias                 |
|Price vs Prev Day High/Low |Breakout / breakdown confirmation   |
|Put-Call Ratio (OI)        |Market sentiment, support/resistance|
|IV Change (Call vs Put)    |Options activity direction          |
|GIFT BankNifty % Change    |Overnight global sentiment          |
|NASDAQ % Change            |US market influence on India open   |
|News Events (Oil/War/Crash)|Macro override flags                |

-----

## How It Evolved — 3 Iterations

### V1 — Basic Signal

Price + OI + IV. Clean but incomplete. Missed macro context entirely.

### V2 — Added News Intelligence

Added GIFT Nifty and NASDAQ as structured inputs after realising that global overnight sentiment was the single biggest driver on gap-up/gap-down days. Also added checkboxes for Oil Shock, War events, and Global Crash — because the Iran war (March 2026) made these non-negotiable inputs.

### V2.1 — Added Trade Discipline Layer *(the most important update)*

This is where PM thinking about **user psychology** came in.

The tool now asks: *“Have you already traded today?”*

Based on the answer, it applies a behavioural override:

```
If traded today + profit ≥ ₹3,000 + signal strength < 90%
  → STAY OUT (protect your gains)

If traded today + profit ≥ ₹3,000 + signal strength ≥ 90%
  → PROCEED WITH CAUTION (tighter stop loss)

If traded today + profit < ₹3,000
  → PROCEED (treat as fresh trade)

If traded today + LOSS (any amount)
  → STAY OUT — REVENGE TRADE WARNING (hard block)
```

This single feature has been the most impactful. It’s not about market prediction — it’s about **behavioural guardrails** built into the decision flow itself.

-----

## The AI Collaboration

This was built entirely through conversational iteration with Claude.

The process looked like this:

1. Describe the problem in plain language
1. Get a working prototype
1. Use it in real trading sessions
1. Identify gaps from actual usage
1. Return with specific improvement requests
1. Repeat

No traditional dev environment. No PRD. No sprint. Just a PM with a problem, an AI collaborator, and a feedback loop driven by real outcomes.

This is what **AI-first product development** looks like at the individual level.

-----

## Results

Used live across multiple trading sessions in March 2026 during one of the most volatile market periods in recent history (US-Israel-Iran war, oil shock, global market selloff).

- Signal correctly identified bullish setup on war de-escalation day (+GIFT Nifty 7.2%)
- Signal correctly identified bearish setup on NASDAQ -2.38% + oil shock day
- Trade discipline layer prevented re-entry after profit was already booked

-----

## What This Demonstrates

For PMs thinking about AI:

1. **AI is a collaborator, not a tool** — the quality of output depends on the quality of your problem framing
1. **Domain expertise still matters** — I had to know what signals mattered before I could ask for them to be built
1. **Iteration beats perfection** — V1 was live in 20 minutes. V2.1 took 3 weeks of real usage to arrive at
1. **Behavioural design is underrated** — the most impactful feature wasn’t a smarter algorithm, it was a guardrail against human bias

-----

## Tech Stack

- React (functional components + hooks)
- Tailwind CSS
- Claude (Anthropic) — AI pair programmer
- Deployed via Claude Artifacts

-----

## Try It

[Live Demo →](https://claude.ai/public/artifacts/e1217534-48f4-4dcb-a465-976b19bd1b19)

-----

*Built by Ashish | Product Manager | Fintech*
