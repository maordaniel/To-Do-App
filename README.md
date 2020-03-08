# To-Do-App
React-Native App(ES6)

First run in terminal:
  npm install. 
  
  and then npm start.
 
For Debug app:

  For IOS:
  
    In a terminal:
    
      cd ios

      Pod install

      Remove the build folder with: rm -r build
      
      Run again: react-native run-ios
      
        Alternatively, you could open Finder, navigate to YOUR_PROJECT/ios and delete the build folder.
        
        Then run again: react-native run-ios
        
  For ANDROID:
  
    In a terminal:
    
      cd android/app
      
      Remove the build folder with: rm -r build
      
      Run again: react-native run-android
      
        Alternatively, you could open Finder, navigate to YOUR_PROJECT/android/app and delete the build folder.
        
        Then run again: react-native run-android
        
For apk:

  In a terminal:
  
    react-native run-android --variant=release
