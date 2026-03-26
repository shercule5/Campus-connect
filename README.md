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
