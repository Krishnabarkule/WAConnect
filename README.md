
# WAConnect

WAConnect — WhatsApp-style bulk messaging web app skeleton (demo-ready).

This repository contains a minimal, ready-to-deploy skeleton for:
- React frontend (Vercel-friendly)
- Node.js + Express backend (Render-friendly)
- MongoDB (Atlas) integration (configure via environment variables)
- Simulated WhatsApp sending engine (`sendMessageStub`) so it runs on free hosts
- Features included: auth (user/admin), template management, scheduling (Agenda), message logs, reports (CSV/PDF), multi-language support (i18next), email notifications (Nodemailer)

> NOTE: For real WhatsApp sending you can later replace the stub with `whatsapp-web.js` (requires headless Chrome) or integrate Twilio's WhatsApp API.

## Contents
- `server/` — backend (Express)
- `client/` — frontend (React + Tailwind)
- `.env.example` — required env vars
- `deploy-instructions.md` — step-by-step deployment guide

