# Campus Connect v1.0

## Overview

Campus Connect is a student-focused mobile app designed to help college students connect through course-based communities. The app addresses the problem of students not having one central place to ask questions, find classmates, join study groups, share notes, and review professors.

Campus Connect allows students to interact through a community feed, filter posts by class and category, comment on discussions, reply to comments, and view professor ratings before registration.

## Notable features to mention

**1. Course-based community feed**
Students can browse posts connected to specific classes and communities, instead of everything being dumped into one general feed.

**2. Search and filtering system**
The feed can be filtered by community, class, post type, and sorting. You can explain that this helps students quickly find course-specific questions, notes, study groups, or events.

**3. Heart/like animation**
When a user likes a post, the heart changes visually and animates, which makes the interaction feel more polished and similar to real social apps.

**4. Comments and replies**
Users can comment under posts, and other students can reply directly to comments. This shows deeper discussion instead of only one-level comments.

**5. Realistic seeded activity**
The app already looks active with sample student posts, comments, replies, likes, and course discussions. This helps demonstrate how the app would feel with actual users.

**6. Create post flow**
Students can create posts for different purposes like questions, notes, events, and study groups. That shows the app supports multiple student needs, not just random posting.

**7. Professor ratings section**
Students can view professor ratings by class, including overall rating, difficulty, workload, and “would take again” percentage.

**8. Rating bubbles instead of typing numbers**
For professor reviews, users pick ratings from bubbles instead of typing numbers manually. This is more mobile-friendly and reduces input mistakes.

**9. Missing-field validation**
If a user tries to submit a professor review without required information like semester or comment, the app alerts them. That shows form validation and error handling.

**10. Course search with class names**
Classes show as full labels like `CSCI 260 - Data Structures`, which is clearer than only showing course codes.

**11. Community/class logic**
The feed handles course filtering intelligently. For example, selecting “All Communities” plus one class should still show that class, because class filtering works independently from community filtering.

**12. Login and account demo flow**
The app supports a create-account and login flow for the prototype. You can also log in as a friend/demo user to show different user perspectives.

**13. Tab navigation**
The app has separate tabs for Feed, Create, Ratings, and Profile, which makes the structure easy to understand and realistic for a mobile app.

**14. Firebase/database planning**
Even if the live demo uses local prototype data, the repo includes Firebase/Firestore database documentation and sample data files showing how users, posts, comments, and professor reviews would be stored.

**15. README and setup documentation**
The project includes setup instructions, technology stack, testing strategy, user guide, database documentation, and contributor roles. That shows the repo is organized like a real software project.

I tried to go beyond just making screens. I added real app behavior like form validation, interactive likes, comments with replies, filtering logic, professor rating calculations, and realistic sample activity so the prototype feels like something students could actually use.”


## Main Features

- Student login/sign-in flow
- Course-based community feed
- Search and filter by community, class, post type, and keyword
- Create posts for questions, notes, events, and study groups
- Like button with interactive heart behavior
- Comments and replies on feed posts
- Professor ratings section
- Professor overview cards with rating, difficulty, would-take-again percentage, and review count
- Add professor reviews using rating bubbles and workload options
- Profile screen
- Firebase integration for authentication and database planning

## Technology Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Firebase Authentication
- Firebase Firestore
- React Native Picker
- Ionicons
- GitHub

## Hardware and Software Requirements

To run the project, you need:

- macOS, Windows, or Linux computer
- Node.js
- npm
- Expo Go mobile app
- iPhone or Android phone
- Internet connection
- Firebase project

Supported platforms:

- iOS through Expo Go
- Android through Expo Go
- Android Emulator
- iOS Simulator on macOS

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shercule5/Campus-connect.git
cd Campus-connect
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Expo Development Server

```bash
npx expo start
```

### 4. Open the App

Install Expo Go on your phone.

Then scan the QR code shown in the terminal or Expo browser page.

The app can also be opened using an Android Emulator or iOS Simulator if those tools are installed.

## Firebase Setup

Campus Connect uses Firebase instead of a traditional SQL database.

Firebase is used because it works well with React Native and Expo, and it allows the project to support authentication and cloud database storage without needing a separate backend server.

To configure Firebase:

1. Go to Firebase Console.
2. Create a new Firebase project.
3. Enable Firebase Authentication.
4. Enable Firestore Database.
5. Add the Firebase web app configuration to `firebaseConfig.ts`.
6. Make sure the Firestore collections match the structure described in the `database/` folder.

## Database Setup

This project uses Firebase Firestore, so there are no SQL `CREATE TABLE` scripts.

Instead, the database structure is documented in:

```text
database/firestore-collections.md
```

Sample data is provided in:

```text
database/sample-data.json
```

These files explain the Firestore collections used by the project and show sample records for users, posts, comments, and professor reviews.

## User Guide

1. Open the app through Expo Go.
2. Sign in or create an account.
3. Use the Feed tab to view student posts.
4. Use the search bar to search by class, community, post type, or keyword.
5. Open filters to narrow posts by community, class, post type, or sorting.
6. Tap the heart icon to like a post.
7. Tap the comment icon to open discussions.
8. Add a comment or reply to another student's comment.
9. Use the Create tab to add a new post.
10. Use the Professors tab to view professor ratings.
11. Select a professor to view rating, difficulty, and take-again percentage.
12. Add a new professor review by selecting rating bubbles, workload, and writing a comment.
13. Use the Profile tab to view user profile information.

## Testing Strategy

Testing was completed manually using Expo Go on a mobile phone. The main goal was to confirm that the app navigation, feed interactions, filtering, comments, replies, and professor ratings worked correctly.

### Sample Test Cases

| Test Case                | Steps                            | Expected Result                    | Result |
| ------------------------ | -------------------------------- | ---------------------------------- | ------ |
| Login screen loads       | Open app                         | Login screen appears               | Passed |
| Feed screen loads        | Sign in and open Feed            | Feed posts appear                  | Passed |
| Search works             | Type a course or keyword         | Matching posts appear              | Passed |
| Filters work             | Select community or class filter | Feed updates correctly             | Passed |
| Like button works        | Tap heart icon                   | Like state changes visually        | Passed |
| Comments open            | Tap comment icon                 | Discussion section opens           | Passed |
| Add comment              | Type comment and submit          | Comment appears under post         | Passed |
| Reply to comment         | Tap Reply and submit text        | Reply appears under comment        | Passed |
| Professor tab opens      | Tap Professors tab               | Professor ratings page appears     | Passed |
| Professor overview works | Tap professor card               | Professor and class ratings update | Passed |
| Add professor review     | Fill form and submit             | New review appears                 | Passed |

## APIs and Third-Party Packages

### Firebase Authentication

Firebase Authentication is used for the app's login and user authentication flow.

### Firebase Firestore

Firestore is used as the planned cloud database for storing users, posts, comments, and professor reviews.

### Expo Router

Expo Router handles navigation using file-based routes, including login screens and tab screens.

### Ionicons

Ionicons provides the app's tab icons and interface icons.

### React Native Picker

React Native Picker is used for dropdown filtering in the feed.

## Project Structure

```text
app/
  index.tsx
  login.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    create.tsx
    profile.tsx
    professors.tsx

context/
  PostsContext.tsx

data/
  courses.ts

database/
  firestore-collections.md
  sample-data.json

firebaseConfig.ts
package.json
README.md
```

## Important Files

### `app/index.tsx`

Handles the initial redirect into the app flow.

### `app/login.tsx`

Contains the login/sign-in screen.

### `app/(tabs)/index.tsx`

Contains the main community feed with filtering, likes, comments, and replies.

### `app/(tabs)/create.tsx`

Contains the create post screen.

### `app/(tabs)/professors.tsx`

Contains the professor rating feature, professor overview cards, and review submission form.

### `app/(tabs)/profile.tsx`

Contains the user profile screen.

### `context/PostsContext.tsx`

Stores and manages post-related app data.

### `data/courses.ts`

Stores course list data used for filtering and course selection.

### `database/firestore-collections.md`

Explains the Firestore database structure.

### `database/sample-data.json`

Provides sample data for users, posts, comments, and professor reviews.

## Design Decisions

Campus Connect uses a tab-based mobile layout because the app is designed for quick student access to major features. The Feed tab acts as the main community hub, while the Create, Professors, and Profile tabs separate major user actions.

The professor rating section uses rating bubbles instead of typed number inputs to make the form easier and more mobile-friendly. The feed supports comments and replies to make discussions feel more realistic and useful for students.

Firebase was selected because it supports mobile authentication and cloud database storage without requiring a separate custom backend server.

## Contributors

* Schyler Hercules: Implemented the Campus Connect mobile app, feed UI, filtering system, comments and replies, professor ratings feature, Firebase planning, and GitHub project organization.
* [Group Member Name]: [Add role and contribution]
* [Group Member Name]: [Add role and contribution]

## Project Status

Campus Connect v1.0 is a functional prototype built for a software engineering course project. The current version demonstrates the core user experience, including student feed interaction, course filtering, comments, replies, and professor review functionality.

```
```




How to Run and Test the App 

To run Campus Connect on your computer, first install the project dependencies:

npm install

Then start the Expo development server:

npx expo start

Once the server starts, Expo will show a QR code and a few options for opening the app.

Testing on a phone

The easiest way to test the app is with Expo Go.

Download Expo Go on your iPhone or Android.
Make sure your phone and computer are on the same Wi-Fi network.
Run:
npx expo start

Scan the QR code with your phone.
The app should open in Expo Go.
Testing on a simulator

You can also test the app on a simulator.

Press i in the terminal for the iOS simulator on Mac

Press a for the Android emulator

Important note

If the app uses a backend server, that server must also be running for features like chatbots, database calls, to work. sorry.

Start the frontend with:

npx expo start

And start the backend separately with:

node server.js

