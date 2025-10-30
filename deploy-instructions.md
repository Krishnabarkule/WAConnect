# Deployment Instructions for WAConnect

## Overview

- Frontend → Vercel
- Backend → Render (Web Service)
- Database → MongoDB Atlas (free tier)
- Email → Gmail + App Password (or SendGrid)

## 1) Setup MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user and whitelist your IP (or 0.0.0.0/0 for testing)
   mongodb+srv://krishna:krisnna@whatsapp.uogv4t8.mongodb.net/?appName=whatsapp
3. Copy the connection string and set `MONGODB_URI` in Render's environment variables.

## 2) Deploy Backend to Render

1. Create a new Web Service on Render.
2. Connect your repository or choose manual deploy (zip upload).
3. Build command: `npm install`
4. Start command: `npm run start` (server uses `PORT` env variable)
5. Set environment variables (use values from `.env.example`).
6. Deploy.

Notes:

- This skeleton uses a "send stub" — it simulates message sending so it works on free hosts.
- To use real WhatsApp sending (whatsapp-web.js), you will need a host that supports headless Chrome and persistent filesystem (a small VPS or a paid Render instance).

## 3) Deploy Frontend to Vercel

1. Create a Vercel account and import the `client` folder as a project (or deploy from repo root).
2. Build command: `npm run build`
3. Output directory: `build`
4. Set `NEXT_PUBLIC_API_URL` or appropriate env var in Vercel to point to your Render backend.

## 4) Gmail App Password

1. Enable 2-Step Verification on your Gmail account.
2. Create an App Password and use it as `EMAIL_PASS`. Set `EMAIL_USER` as your Gmail address.

## 5) Local testing

- Backend: `cd server && npm install && npm run dev`
- Frontend: `cd client && npm install && npm run dev`
- Use the `.env.example` values locally (copy to `.env`)

## 6) Switching to Real WhatsApp Sending (optional)

- Replace `server/utils/sendStub.js` with a `whatsappService.js` using `whatsapp-web.js` or Twilio.
- For `whatsapp-web.js` you'll need Puppeteer/Chromium and a host that supports it.
