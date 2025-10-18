## Setup & Run

1.**Clone the repository**:

```
git clone https://github.com/Mona-Haleem/PorductDisplay.git
cd productsDisplay
```

2.**Install dependencies**:

```
npm install
```

3.**Prebuild the native project**:

```
npx expo prebuild
```

4. **Run the app on Android**:

```
npm run android
```

5.**Start the development server**:

```
npm run dev
```

## Authentication Details:

##### Superadmin Credentials

```
Username: emilys
Password: emilyspass
```

Biometric Support: Automatically detects available device biometrics (fingerprint, Face ID, etc.) with password fallback.

## Choosen Categories:

Tap any category button in the categories list to view filtered products. The app supports all categories from the DummyJSON API.

## Technical Implementation

### Architecture

- **State Management**: Redux Toolkit for auth state and UI modals

- **Navigation**: React Navigation with bottom tabs (Products/Logout) and stack navigation (Products/ CategoryProducts).

- **Data Fetching**: React Query with MMKV persistence for offline cache

- **Security**: Expo Local Authentication with auto-lock on 10s inactivity/background

### Key Features Delivered

- Session persistence with biometric unlock on app launch
- Auto-lock security overlay that obscures content
- Superadmin product deletion (simulated DELETE)
- Instant cache hydration from MMKV on cold start
- Pull-to-refresh and offline
- Dark and Light mode with Theme toggel
- TypeScript throughout with clean component structure

### Project Structure

```
src/
├── api/          # Axios API services
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── navigation/   # React Navigation setup
├── screens/      # Login, Products, Category screens
├── store/        # Redux slices (auth, ui)
├── Theme/        # Theme Context , objects
├── utils/        # MMKV storage, constants, helpers
└── types/        # TypeScript definitions
```

## Trade-offs & Considerations:


1.**Biometric Authentication Fallback**:

  - **Implementation**: User credentials cached during login for offline password validation
  - **Trade-off**: Security best practices vs. meeting offline biometric requirement
  - **Favoured Solution**:
        - Biometric-key encrypted storage
        - Proper token refresh mechanisms

2.**Auto-lock Timer Reset**
    - **Implementation**: Gesture handler for press detection combined with Redux state tracking navigation changes.

    - **Trade-off**: Comprehensive coverage (screen touches + navigation) vs. potential missed interactions (typing, scrolling)

    - **Favoured Solution**:
        - Implement PanResponder for comprehensive gesture detection
        - Keyboard and scroll event listeners
        - Sophisticated activity monitoring library
    

## If I Had More Time

- Enhanced error handling with retry mechanisms

- Better password security implementation with Secure Storage

- Comprehensive test coverage

### Notes

All required technologies (React Native, TypeScript, React Navigation, React Query, MMKV, Redux Toolkit) were used as specified. Additional added libraries:

- **`@react-native-community/netinfo`** - Required for offline indicator
- **`expo-local-authentication`** - Required for biometric features
- **`react-native-toast-message`** - Enhanced error UI (nice-to-have)
- **`@expo/vector-icons`** - Clean UI icons
- **`react-native-gesture-handler`** – Gesture handling for autiLock timer reset.
- **`axios`** - Robust HTTP client

All additions are lightweight and directly address challenge requirements.
