# EmoCheck

**A daily emotional check-in and support-finder web app for Rwandan youth.**

**Live app:** https://emocheck-app.vercel.app/
**Demo video:** **Demo video:** Link will be added after recording
**SRS document:** https://docs.google.com/document/d/1i_eqcGlmxm60Uz0FFudfIDXG8E3zhQrJO4PQ0rMwAIc/edit?usp=sharing

## About

Many young people in Rwanda struggle to understand and talk about their emotions, and do not know where to find help. EmoCheck lets a young person check in with their feelings in under a minute, look back at how they have been doing, and find local support when they need it. It needs no name, email or sign-up: each device gets an anonymous ID, and all data stays on that device. The interface is available in English and Kinyarwanda.

## Actors

- **Youth User:** goes through onboarding, does check-ins, views history, finds and saves support resources, and can delete all of their data.
- **Administrator:** logs in and manages the support resources that Youth Users see.

## Features

| Feature | Who | Page |
|---|---|---|
| Short onboarding (4 screens) with language choice | Youth User | First visit |
| English and Kinyarwanda interface (EN/RW switch) | Youth User | Menu bar |
| Home page with quick actions and a daily self-care tip | Youth User | Home |
| Anonymous device ID (no sign-up) | Youth User | Created automatically |
| Daily check-in: mood rating (1-5), emotion tags, reflection prompt (one check-in per day) | Youth User | Check-In |
| Mood-based recommendations, with crisis resources when distress is detected | Youth User | Check-In and Find Support |
| Check-in history with average mood and delete option | Youth User | History |
| Find local support: search, category filter, crisis banner, tap-to-call numbers | Youth User | Find Support |
| Save and remove favourite resources | Youth User | Saved |
| Delete all personal data, with confirmation | Youth User | My Data |
| Add, edit and delete support resources, restore defaults | Administrator | Admin |

## Tech stack

- React with Vite
- React Router for page navigation
- Browser localStorage for data (no backend or database)
- Deployed on Vercel

## Run it locally

### 1. Install the tools

- **Node.js** 20.19 or newer (developed with v24): https://nodejs.org
- **Git**: https://git-scm.com

Check them:

```
node -v
npm -v
git --version
```

### 2. Get the code

```
git clone https://github.com/Isuwafa/EMOCHECK-APP.git
cd EMOCHECK-APP
```

### 3. Install the dependencies

```
npm install
```

### 4. Start the app

```
npm run dev
```

Open http://localhost:5173/ in your browser.

### 5. Build for production (optional)

```
npm run build
npm run preview
```

No environment variables or API keys are needed.

## How to use it

1. **First visit:** go through the four welcome screens and pick English or Kinyarwanda. You can change the language any time with the EN/RW buttons in the menu bar.
2. **Home:** read the daily tip, then start a check-in or find support.
3. **Check-In:** pick a mood, choose emotion tags, write a reflection and save. A low mood shows crisis resources, and a middle mood shows counselling and community resources.
4. **History:** see your past check-ins and delete any of them.
5. **Find Support:** search or filter resources, tap a phone number to call, and press Save to bookmark one.
6. **Saved:** see your bookmarked resources.
7. **My Data:** delete all your data from the device.
8. **Admin:** log in with the passcode `admin123` to add, edit or delete resources. They appear on the Find Support page straight away.

To see onboarding again, open the app in a private window.

## Project structure

```
src/
  components/   Navbar, Onboarding, Recommendations
  pages/        Home, CheckIn, History, Support, Bookmarks, Settings, Admin
  data/         Default support resources and onboarding text
  i18n/         English and Kinyarwanda translations and language switch
  utils/        Local storage helpers and recommendation logic
  App.jsx       Routes and first-visit onboarding
  main.jsx      App entry point
vercel.json     Makes page refreshes work on Vercel
```

## Limitations

- Data is stored in each browser's localStorage, so it does not sync between devices and is lost if browser data is cleared.
- The administrator passcode is a prototype-level check. A full version would use real authentication and a database.
- The Administrator page and the descriptions of the support resources are in English only. Translating them is future work.
- Support phone numbers come from published Rwanda Biomedical Centre and Rwanda Investigation Bureau pages. Please confirm them before relying on them.

## Safety note

EmoCheck is not a medical service and does not replace professional care. If you or someone else is in immediate danger, call 912 for an ambulance or 114 (toll free) and go to the nearest hospital.

## Author

Iradukunda Suwafa, African Leadership University
