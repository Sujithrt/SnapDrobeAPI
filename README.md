# SnapDrobe

SnapDrobe is an AI-powered smart wardrobe assistant built for Snap Spectacles. It allows users to capture clothing items in the real world, build a digital wardrobe, and get intelligent outfit recommendations, all through natural voice interactions and the power of AR.

---

## Inspiration
Fashion can be fun, but for many people (including us), it's often stressful. SnapDrobe was born from the idea of combining the visual power of Snap Spectacles with AI to make fashion easier, more accessible, and more personalized for everyone.

---

## Features
- **Instant Wardrobe Capture**: Snap a picture of clothes you like simply by saying "Add to wardrobe."
- **AI-Powered Analysis**: Automatically generate detailed descriptions of captured items.
-  **Personal Wardrobe Collection**: Build and manage your wardrobe digitally.
- **Smart Outfit Recommendations**: Get full head-to-toe outfit suggestions based on weather, time of day, and event context.
- **Visual Outfit Previews**: See AI-generated images of complete outfits before deciding what to wear.
- **Hands-Free Interaction**: Fully voice-controlled experience using Snap Spectacles.

---

## Architecture
- **Snap Spectacles + Lens Studio**: Capture images, listen to voice commands, and display outfit previews.
- **Backend (Python + FetchAI UAgent)**: Handle communication, item storage, and AI processing.
- **Gemini API**: Analyze clothing images and generate outfit mockups.
- **Amazon DynamoDB**: Store structured wardrobe items in the cloud.
- **OpenWeather API**: Fetch real-time weather data to improve outfit suggestions.

---

## Tech Stack
- **Lens Studio** (AR development)
- **TypeScript** (frontend scripting)
- **Python** (backend services)
- **FetchAI UAgent Framework** (distributed agents)
- **Gemini API** (vision and language AI)
- **OpenAI API** (Text to Speech)
- **Amazon DynamoDB** (cloud database)
- **OpenWeather API** (real-time weather integration)

---

## How It Works

### 1. Adding to Wardrobe
- User wears Snap Spectacles.
- Sees an outfit or item they like.
- Says **"Add to wardrobe"**.
- SnapDrobe captures the image, uses AI to describe it, and stores the item.

### 2. Requesting Outfit Suggestions
- User says **"Hey Snap, I'm going to a [event]". Suggestions, please!**.
- SnapDrobe analyzes:
  - User wardrobe
  - Weather at their location
  - Time of day
  - Event type
- SnapDrobe suggests a complete outfit and shows a mockup image.

---

## Challenges
- Learning and building quickly with **Snap Spectacles** and **Lens Studio** for the first time.
- Managing **reliable voice triggers** inside a live AR environment.
- Ensuring **real-time responses** while communicating with cloud-based AI models.
- Creating a **seamless user experience** that feels natural and responsive.

---

## What's Next
- **AR try-on previews** directly through Snap Spectacles.
- **User profiles** for deeper personalization.
- **Friend wardrobe sharing** and collaborative outfit planning.
- **Offline caching** for wardrobe access without network delays.
