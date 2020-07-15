#!/bin/bash
touch ./android/app/src/main/assets/index.android.bundle
echo "bundle"
./node_modules/.bin/react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/
echo "assembleDebug"
cd android && ./gradlew assembleDebug && cd ..

