# 🚨 Women Safety App  
### Project User Manual  


## 1. Introduction  

### 1.1 About the Application  
The **Women Safety App** is a mobile-based safety solution designed to provide **instant emergency assistance**. It allows users to quickly send **SOS alerts** along with their **real-time location** to predefined emergency contacts.

The application is built using **Expo (React Native)** for the frontend and **Node.js (Express)** for the backend, ensuring fast and reliable communication.


### 1.2 Key Features  

- 🚨 **SOS Alert System**  
  Trigger emergency alerts instantly with a single action  

- 📍 **Real-Time Location Sharing**  
  Share live location with emergency contacts  

- 📡 **Backend Communication**  
  Handles alert requests and data transmission  

- 📱 **Expo Go Support**  
  Run the application directly on a mobile device  


## 2. System Requirements & Setup  

### 2.1 Prerequisites  

Ensure the following software is installed:

| Requirement | Details |
|------------|--------|
| Node.js | Version 14 or above |
| npm / yarn | Package manager |
| Git | For cloning repository |
| Expo Go | Mobile application |


### 2.2 Installation Steps  

#### Step 1: Clone the Repository  

```bash
git clone <(https://github.com/ShubhangiSingh7/WomenSafetyApp.git)>
```

#### Step 2: Install Frontend Dependencies 

```bash
npm install
```
#### Step 3: Start Expo Server 

```bash
npx expo start
```

#### Step 4: Run Backend Server
```bash
cd panic-backend
node server.js
```

## 3. Running the Application

To run the complete system, ensure the following are active:

| Service | Command |
|------------|--------|
| Frontend | npx expo start |
| Backend | node server.js |

## 4. 🔑 API Keys Configuration  

This project requires the following API keys to function properly:

| API Key | Purpose |
|--------|--------|
| `EXPO_PUBLIC_SUPABASE_KEY` | Used for authentication and database (Supabase) |
| `QUICK_SMS_KEY` | Used for sending emergency SMS alerts |
| `GROQ_API_KEY` | Used for AI-based processing (if implemented) |


### 📁 Step: Create Environment File  

Create a `.env` file in the root directory of your project:

```env
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_key_here
```
Create a `.env` file in the panic-backend folder of the project:
```env
QUICK_SMS_KEY=your_quick_sms_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## 4. Using the Application
**4.1 Launching the App**
1. Open Expo Go on your mobile device
2. Scan the QR code displayed in terminal/browser
3. The application will load automatically

**4.2 Sending an SOS Alert**
1. Open the application
2. Grant required permissions (Location)
3. Press the SOS button

**4.3 System Response**

Once triggered, the system will:

1. Send emergency alert
2. Share real-time location
3. Notify emergency contacts

## 5. Future Enhancements
1. SMS and call integration
2. AI-based safety detection
3. Safe/unsafe zone alerts
4. Push notifications

## 6. Conclusion

The Women Safety App provides a simple, fast, and reliable solution for emergency situations. By combining real-time communication with mobile accessibility, it ensures user safety with minimal effort.
