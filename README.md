Here is the same README as plain Markdown, ready to save as `README.md`:

````
# React Native Application

This is a [React Native](https://reactnative.dev) mobile application bootstrapped using the React Native Community CLI.

## Technology Stack

| Technology | Version |
|---|---|
| React Native | `0.87.1` |
| React | `19.2.3` |
| Node.js | `22.x LTS` |
| npm | `10.x+` |
| Java | `20` |
| Android SDK | `36` |
| Android Build Tools | `36.0.0` |
| Xcode | `16.4+` |
| Ruby | `3.3.x` |
| CocoaPods | `1.16.x` |

> **Important:** React Native native dependencies are sensitive to toolchain versions. Use the versions specified below rather than upgrading Java, Gradle, Android SDK, or Xcode independently unless the project's native configuration is updated accordingly.

## Requirements

### Android

- Windows 10/11, macOS, or Linux
- Node.js 22.x LTS
- npm 10.x or newer
- Java JDK 20
- Android Studio
- Android SDK 36
- Android SDK Build-Tools 36.0.0
- Android SDK Platform-Tools
- Android SDK Command-line Tools
- Android Emulator or physical Android device

### iOS

- macOS
- Node.js 22.x LTS
- npm 10.x or newer
- Ruby 3.3.x
- CocoaPods 1.16.x
- Xcode 16.4 or newer
- iOS Simulator or physical iOS device

---

# Project Dependencies

The application uses the following JavaScript dependencies:

| Package | Version |
|---|---|
| `@hookform/resolvers` | `^5.9.1` |
| `@react-native-async-storage/async-storage` | `^3.1.1` |
| `@react-native-firebase/app` | `^26.4.0` |
| `@react-native-firebase/auth` | `^26.4.0` |
| `@react-native-firebase/firestore` | `^26.4.0` |
| `@react-native/new-app-screen` | `0.87.1` |
| `@react-navigation/native` | `^7.4.1` |
| `@react-navigation/native-stack` | `^7.19.1` |
| `firebase` | `^12.19.0` |
| `react` | `19.2.3` |
| `react-hook-form` | `^7.88.0` |
| `react-native` | `0.87.1` |
| `react-native-biometrics` | `^3.0.1` |
| `react-native-linear-gradient` | `^2.8.3` |
| `react-native-safe-area-context` | `^5.5.2` |
| `react-native-screens` | `^4.28.0` |
| `zod` | `^4.6.5` |

The exact installed versions are determined by `package-lock.json`.

Do not delete or regenerate the lockfile unnecessarily.

---

# Installation

## 1. Clone the Repository

```sh
git clone git@github.com:BeratS/quipu-test.git
cd quipu-test
````

 ## 2\. Install Dependencies

 If `package-lock.json` is committed:

```
npm ci
```

 Otherwise:

```
npm install
```

---

 # Node.js

 The project is intended to run with Node.js 22 LTS.

 Check your installed version:

```
node --version
```

 Expected:

```
v22.x.x
```

 Check npm:

```
npm --version
```

 npm 10.x or newer is recommended.

 Using a version manager such as `nvm` is recommended.

---

 # Java

 Android development requires Java 20.

 Check:

```
java -version
```

 The output should contain version 20.

 Check `JAVA_HOME`:

```
echo $JAVA_HOME
```

 On macOS:

```
export JAVA_HOME=$(/usr/libexec/java_home -v 20)
```

 On Windows, configure `JAVA_HOME` to point to your JDK 20 installation.

---

 # Android Setup

 ## Android Studio

 Install Android Studio with:

 - Android SDK
- Android SDK Platform
- Android SDK Build-Tools
- Android Emulator
- Android SDK Platform-Tools
- Android SDK Command-line Tools

 ## Android SDK

 The application targets Android SDK 36.

 Install:

```
Android SDK Platform 36
Android SDK Build-Tools 36.0.0
Android SDK Platform-Tools
Android SDK Command-line Tools
```

 Verify Android Debug Bridge:

```
adb --version
```

 Run the React Native environment check:

```
npx react-native doctor
```

 ## Android Environment Variables

 ### macOS / Linux

 Add the following to `~/.zshrc` or `~/.bashrc`:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

 Reload the shell:

```
source ~/.zshrc
```

 The Android SDK location may differ depending on your operating system and installation.

 ### Windows

 Set:

```
ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
```

 Add the following directories to `PATH`:

```
%ANDROID_HOME%\emulator
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```

---

 # iOS Setup

 iOS development requires macOS.

 ## Xcode

 Install Xcode 16.4 or newer.

 Verify:

```
xcodebuild -version
```

 If necessary, select the correct Xcode installation:

```
sudo xcode-select --switch /Applications/Xcode.app
```

 Accept the Xcode license:

```
sudo xcodebuild -license
```

 ## Ruby

 Ruby 3.3.x is recommended.

 Check:

```
ruby --version
```

 Using `rbenv` or another Ruby version manager is recommended.

 ## CocoaPods

 Check:

```
pod --version
```

 CocoaPods 1.16.x is recommended.

 If the project contains a `Gemfile`, use Bundler:

```
bundle install
```

 Then install CocoaPods dependencies:

```
bundle exec pod install
```

 Run CocoaPods again whenever native iOS dependencies are changed.

---

 # Firebase Configuration

 The application uses:

 - Firebase App
- Firebase Authentication
- Cloud Firestore

 Dependencies:

```
@react-native-firebase/app       ^26.4.0
@react-native-firebase/auth      ^26.4.0
@react-native-firebase/firestore ^26.4.0
firebase                         ^12.19.0
```

 ## Android

 The Android Firebase configuration file is normally:

```
android/app/google-services.json
```

 Obtain the correct configuration file from the project's Firebase project and place it in the appropriate directory.

 ## iOS

 The iOS Firebase configuration file is normally:

```
ios/GoogleService-Info.plist
```

 Add the file to the iOS application target using Xcode.

 ## Firebase Services

 Make sure the Firebase project has the services required by the application enabled:

 - Firebase Authentication
- Cloud Firestore

 Authentication providers and Firestore security rules depend on the application's implementation.

 > Do not commit Firebase service-account credentials, private keys, or other secrets to the repository.

---

 # Start Metro

 From the project root:

```
npm start
```

 Or:

```
npx react-native start
```

 Keep Metro running while developing.

---

 # Android

 ## Start an Emulator

 Open Android Studio:

```
Device Manager → Start Emulator
```

 Or connect a physical Android device with USB debugging enabled.

 Verify the device:

```
adb devices
```

 ## Run the Application

 In another terminal:

```
npm run android
```

 Or:

```
npx react-native run-android
```

---

 # Android Commands

 ## Reset Metro Cache

```
npx react-native start --reset-cache
```

 ## Android Logs

```
npx react-native log-android
```

 ## React Native Doctor

```
npx react-native doctor
```

 ## Clean Android Build

 macOS/Linux:

```
cd android
./gradlew clean
cd ..
```

 Windows:

```
cd android
gradlew.bat clean
cd ..
```

 Then rebuild:

```
npm run android
```

---

 # iOS

 ## Install CocoaPods Dependencies

 From the project root:

```
bundle install
bundle exec pod install
```

 Or, without Bundler:

```
cd ios
pod install
cd ..
```

 ## Run the Application

 Start Metro:

```
npm start
```

 Then, in another terminal:

```
npm run ios
```

 Or:

```
npx react-native run-ios
```

 You can also open the iOS workspace directly:

```
ios/<ProjectName>.xcworkspace
```

 in Xcode.

 > When CocoaPods is used, open the `.xcworkspace` rather than the `.xcodeproj`.

---

 # Navigation

 The application uses React Navigation 7:

```
@react-navigation/native       ^7.4.1
@react-navigation/native-stack ^7.19.1
```

 Supporting native dependencies:

```
react-native-screens           ^4.28.0
react-native-safe-area-context ^5.5.2
```

---

 # Forms and Validation

 The application uses:

```
react-hook-form       ^7.88.0
@hookform/resolvers   ^5.9.1
zod                   ^4.6.5
```

 These libraries provide form state management, resolver integration, and schema validation.

---

 # Biometric Authentication

 The application uses:

```
react-native-biometrics ^3.0.1
```

 Biometric functionality requires appropriate configuration on the target device.

 For testing, use a physical device or an emulator/simulator configured with biometric authentication support.

 Behavior can differ between Android and iOS.

---

 # Linear Gradients

 The application uses:

```
react-native-linear-gradient ^2.8.3
```

 This is a native dependency. After installing or changing native dependencies, rebuild the application.

---

 # Async Storage

 The application uses:

```
@react-native-async-storage/async-storage ^3.1.1
```

 Async Storage provides persistent local key-value storage.

---

 # Fast Refresh

 React Native supports Fast Refresh during development.

 After modifying JavaScript or TypeScript files, changes should normally appear automatically.

 ## Android

 Press `R` twice.

 Or open the Dev Menu:

```
Ctrl + M
```

 on Windows/Linux, or:

```
Cmd + M
```

 on macOS.

 Then select **Reload**.

 ## iOS

 Press:

```
R
```

 in the iOS Simulator.

---

 # Troubleshooting

 ## Metro Cache

 If changes are not being reflected or Metro behaves unexpectedly:

```
npx react-native start --reset-cache
```

 ## Android Build Issues

 Clean the Android build:

```
cd android
./gradlew clean
cd ..
```

 Then:

```
npm run android
```

 Run:

```
npx react-native doctor
```

 to identify environment problems.

 ## iOS Build Issues

 Reinstall CocoaPods dependencies:

```
cd ios
rm -rf Pods
bundle exec pod install
cd ..
```

 If necessary, clear Xcode Derived Data and rebuild.

 ## Reinstall JavaScript Dependencies

 If `node_modules` becomes corrupted:

```
rm -rf node_modules
npm ci
```

 Then reinstall native dependencies as required.

---

 # Useful Commands

```
# Install dependencies
npm ci

# Start Metro
npm start

# Reset Metro cache
npx react-native start --reset-cache

# Run Android
npm run android

# Run iOS
npm run ios

# Android logs
npx react-native log-android

# Check React Native environment
npx react-native doctor
```

---

 # Version Summary

 For a reproducible development environment:

```
React Native      0.87.1
React             19.2.3
Node.js           22.x LTS
npm               10.x+
Java              20
Android SDK       36
Build Tools       36.0.0
Xcode             16.4+
Ruby              3.3.x
CocoaPods         1.16.x
```

 ## JavaScript Dependencies

```
@hookform/resolvers                    ^5.9.1
@react-native-async-storage/async-storage ^3.1.1
@react-native-firebase/app             ^26.4.0
@react-native-firebase/auth            ^26.4.0
@react-native-firebase/firestore       ^26.4.0
@react-native/new-app-screen            0.87.1
@react-navigation/native               ^7.4.1
@react-navigation/native-stack         ^7.19.1
firebase                               ^12.19.0
react                                  19.2.3
react-hook-form                        ^7.88.0
react-native                            0.87.1
react-native-biometrics                ^3.0.1
react-native-linear-gradient           ^2.8.3
react-native-safe-area-context         ^5.5.2
react-native-screens                   ^4.28.0
zod                                    ^4.6.5
```

---

 # Development Workflow

 A typical development session uses two terminals.

 ### Terminal 1 — Metro

```
npm start
```

 ### Terminal 2 — Android

```
npm run android
```

 Or Terminal 2 — iOS:

```
npm run ios
```

---

 # Learn More

 - React Native
- React Native Environment Setup
- React Native Troubleshooting
- React Navigation
- Firebase
- React Hook Form
- Zod
- CocoaPods

---

 # License

 Add the project's applicable license information here.

```

```