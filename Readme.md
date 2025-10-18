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
├── utils/        # MMKV storage, theming, helpers
└── types/        # TypeScript definitions
```

## Trade-offs & Considerations

<!-- - **Password Caching**:

  - Online: Could call /auth/login with username + password, but username would need to be cached

  - Offline: No way to validate credentials without cached data
  - For biometric password fallback to work offline, user credentials are cached during login. Password validation occurs against cached data when offline
  **Production Consideration:** In a real-world scenario, this would be replaced with:

    - Secure app-level PIN code system
    - Proper token refresh mechanisms
    - Biometric-key encrypted storage

- **Testing**: Basic test setup implemented with Jest and React Testing Library. With more time, comprehensive test coverage would be added. -->

## If I Had More Time

- Enhanced error handling with retry mechanisms

- Better password security implementation with Secure Storage

- Comprehensive test coverage

- Performance optimization and monitoring

### Notes

All required technologies (React Native, TypeScript, React Navigation, React Query, MMKV, Redux Toolkit) were used as specified. Additional added libraries:

- **`@react-native-community/netinfo`** - Required for offline indicator
- **`expo-local-authentication`** - Required for biometric features  
- **`react-native-toast-message`** - Enhanced error UI (nice-to-have)
- **`@expo/vector-icons`** - Clean UI icons
- **`axios`** - Robust HTTP client

All additions are lightweight and directly address challenge requirements.
