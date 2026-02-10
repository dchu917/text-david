# David

David is an AI assistant you can text over iMessage. Send a message to a phone number and get intelligent, conversational responses powered by Claude.

## How it works

1. **Sendblue** (iMessage API provider) receives your iMessage and sends a webhook to Convex
2. Convex webhook handler stores the message, fires a typing indicator (... bubble), and starts a 1s debounce to batch rapid messages
3. `handleInboundMessage` resolves the user, fetches conversation history, checks Google OAuth tokens, then calls the LLM
4. LLM agent loop (Vercel AI SDK + Claude via Bedrock) generates a response, with access to tools: `send_sms`, `send_dm`, Google Calendar/Gmail/Contacts, sandbox code execution (cmux), image generation, etc.
5. Reply goes back through Sendblue → iMessage to your phone

## Features

- **iMessage native** — talks to you in your normal texting app, no downloads needed
- **Group chats** — David can be added to iMessage groups, decides whether to respond or stay quiet
- **Google integration** — OAuth flow via SMS link, then David can read/create calendar events, search/send/draft emails, search contacts
- **Code execution** — sandboxed code execution via cmux for running code snippets
- **Image generation** — can generate images on request
- **Conversation memory** — maintains context across messages with debounced batching

## Tech stack

- **Frontend**: Next.js (landing page at [textdavid.com](https://textdavid.com))
- **Backend**: Convex (real-time database + serverless functions)
- **Messaging**: Sendblue (iMessage API)
- **AI**: Claude via AWS Bedrock + Vercel AI SDK
- **Integrations**: Google Calendar, Gmail, Contacts (OAuth 2.0)

## Development

```bash
bun install
bun dev
```

Dev server runs on port 7749.
