# README
- This app is the frontend and user interface for anki_sound_backend (https://github.com/bretfunk/anki_sound_backend).  AnkiSound allows users to download audio files in one of 20+ languages to use in Space Repetition Systems (SRS) like Anki. The frontend works by itself to download audio files.  To save phrases to a user profile, the backend applciation is needed.  The frontend is written in React.js and Javascript and the backend is written in Ruby and Rails.  Stying is done with bootstrap. 
- You can see a live version of this program at: https://bretfunk.github.io/anki_sound_frontend/

https://github.com/bretfunk/anki_sound_frontend/blob/master/public/favicon.ico

## React version
* anki_sound_frontend uses the latest version of create-react-app (https://github.com/facebookincubator/create-react-app)

## Deployment instructions

1. Clone down the repo using the command below in your terminal:
- $ git clone https://github.com/bretfunk/anki_sound_frontend

2. Change directory into the anki_sound_backend directory
- $ cd anki_sound_frontend

3. Run npm install to install dependencies
- $ npm install

4. To run locally, run npm start
- $ npm start

5. This app is currently hardcoded to work with the static heroku URI that is live.  To change, change the .url.js file.  You will also need to add the new address to the backend's cors.rb initialize file if using anywhere other than localhost:3000.

## Accessiblity
1. This application was built with accessiblity in mind.
2. Contrasting colors and reliance on buttons were used to make this application accessiable.  
3. A future accessiblity feature will be the ability to listen to files without downloading them, providing the audio in a lot fewer steps.
4. If there is a feature you would like to request, email the application creator at bret.e.funk@gmail.com

## Bugs
If you notice any bugs please add a PR or email the application creator directly at bret.e.funk@gmail.com

## Troubleshooting
Reread the instructions to make sure you didn't miss anything.  Most of the issues revolve around CORS so troubleshoot using the inspector on your browser of choice.  If you are recieving CORS issues, double check that the backend application has your frontend URI on the list of acceptable origins.  

If you are having issues logging in then the user might not be in the database.  Check inspector tools to ensure the request coming back from the server is acceptable.  

If the file you wish to download cases the application to crash, this is a download bug that is currently being investigated.  We are in the process of changing how our backend downloads files to make it more reliable. 

## Upcoming Features
-User is able to delete saved phrases
-Once a user is created they are automatically logged-in
-A more reliable file downloading system
-User can play files and not just download them

To request a feature, email the application creator directly at bret.e.funk@gmail.com
