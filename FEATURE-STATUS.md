# Helping Hands feature status — November 17, 2026

## Interactive demo available

- Grocery planner: independent, guided-list, or family-helper starting point; simple typed items. Phone keyboard dictation can be used; no app audio recording or live representative.
- Preferred and backup stores, with validation that they differ.
- Sample replacement approval, decline, or ask-first choice; example totals respond to the choice.
- Example scheduling windows and preset accessibility/delivery instructions.
- Itemized example grocery costs, service charge, tax assumption, other fees, total, and explicit confirmation.
- Practice requests with manually advanced delivery statuses; sample receipt, request history, repeat-list action, and a saved list.
- Sample customer profile, family authorization choice, and sample pharmacy information/readiness.
- Public management demo showing practice requests, helper assignment, and status controls tied to the same browser-page request state.
- Existing sample ID/FSA/payment card flow and topic-based practice chat remain available.

Planner lists, orders, and family choices exist only in page memory and clear on refresh. They are not shared between devices. All prices and people are illustrative. The real contact number has been removed from current files; the inactive example is 555-555-5555. Earlier public Git history still contains the previous number.

## Required before real operation

Secure backend/database and authenticated customer, caregiver, helper, and administrator roles; verified caregiver consent and permissions; real availability and service boundaries; payment provider and applicable FSA acceptance rules; secure prescription-data handling and pharmacy authorization; identity provider/scanning integration and retention policy; live representative messaging, notifications, order persistence and real delivery updates. No real identity, card, medical, address, or payment data should be entered in this static demo.

Production pricing, taxes, fees, substitutions, fulfillment, pharmacy procedures, and any pet assistance must be confirmed with Latricia. The illustrated dog scene is not confirmation of an offered service.

## Checkout and placement update

The request journey now shows the cost review before a simulated Square/card, Apple Pay, or Google Pay selection. These are presentation simulations, not SDK or provider integrations. No wallet opens, no payment credentials are collected, and no charge is created. Method and amount appear in the sample receipt. Cards/ID moved out of the homepage into My account; sample identification and FSA remain separate from checkout. Management preview moved to a footer disclosure. Real Square onboarding, retailer purchasing/payment arrangements, and FSA acceptance remain unresolved production work.

## Location search preview

The store step accepts a city or ZIP and displays the same four illustrative store suggestions with example distances. It is not geocoding, live nearby search, service-area validation, or an AI integration. Selecting a suggestion updates preferred or backup store. The typed value stays in page memory only; no device location is requested and no search is sent to a provider. A production version needs verified locations and coverage through a places/maps provider.
