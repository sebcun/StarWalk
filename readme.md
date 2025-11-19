# SkyBuddy

SkyBuddy is an iOS app built with React Native and expo that lets you view all sorts of space information, such as NASA Pic of the day, stars, satellites, rocket launches, etc.

## Demo

- [Demo 1](https://hc-cdn.hel1.your-objectstorage.com/s/v3/425c852293896b3639e4d08684217c240a3a0349_screenrecording_11-19-2025_18-17-11_1.mp4)

## Installation

1. Ensure you have **Node.js** and **npm** installed.
2. Install Expo CLI globally:
   ```bash
   npm install -g @expo/cli
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/sebcun/StarWalk.git
   cd StarWalk
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## Setup

1. This requires API keys from both NASA and N2YO. These are both free to get. For NASA visit https://api.nasa.gov/?ref=swiftbeta and you will get an email, and for NY2O head to https://www.n2yo.com/api/ and sign up. Once created, create a `.env` file with the following:

```
NASA_API_KEY=
N2YO_API_KEY=
```

## Usage

1. Start the Expo development server:
   ```bash
   npm start
   ```
2. Use the **Expo Go** app on your mobile device to scan the QR code and run the app.
