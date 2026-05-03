🚨 Women Safety App (Expo Go Setup)
📌 Overview

The Women Safety App is a mobile application that helps users stay safe by sending instant SOS alerts and sharing real-time location with emergency contacts.

This project uses:

Expo Go (React Native) for frontend
Node.js (Express) for backend
Ngrok to connect mobile app with local backend
⚙️ Features
🚨 One-tap SOS alert
📍 Live location tracking
📡 Real-time backend communication
📱 Works directly on your phone using Expo Go
📦 Prerequisites

Make sure you have:

Git
Node.js (v14+)
npm or yarn
Expo Go app (installed on your phone)
Ngrok
🚀 Setup Instructions
1️⃣ Clone Repository
git clone <repository-url>
cd <project-folder>
📱 Frontend Setup (Expo Go)
Install dependencies:
npm install
Start Expo:
npx expo start

👉 This will open Expo Dev Tools in your browser.

▶️ Run on your phone (IMPORTANT)
Install Expo Go from Play Store/App Store
Make sure your phone and laptop are on the same WiFi
Scan the QR code shown in terminal/browser

📌 Your app will open instantly in Expo Go

🖥️ Backend Setup
Open new terminal:
cd panic-backend
npm install
node server.js

👉 Backend runs on:

http://localhost:3000
🌐 Connect Backend using Ngrok
Start Ngrok:
ngrok http 3000

👉 You’ll get:

https://random-id.ngrok.io
🔗 Update API URL (VERY IMPORTANT)

In your frontend code, replace:

http://localhost:3000

with:

https://your-ngrok-url.ngrok.io

❗ Without this, Expo Go won’t connect to backend

▶️ Run Everything Together

You need 3 terminals:

Terminal	Command
Frontend	npx expo start
Backend	node server.js
Ngrok	ngrok http 3000
📲 How to Use
Open app in Expo Go
Allow permissions (Location, etc.)
Press SOS button
App will:
Send alert
Share location
⚠️ Common Issues (Important)
❌ App works on Expo but API not working

👉 Fix: Update Ngrok URL

❌ QR not scanning

👉 Use:

npx expo start --tunnel
❌ Network error

👉 Check:

Backend running
Ngrok running
Correct URL used
💡 Tips
Always restart Ngrok → URL changes every time
Use real device (location won’t work properly on emulator)
Keep all terminals running
🤝 Contributing

Pull requests are welcome!
You can also open issues for bugs or suggestions.
