# Instagram Clone 

## Overview 
This instagram clone is built on MERN stack and consist of basic features of instagram like creating post, like, unlike, comment, follow, unfollow, profile page, upload profile pic, remove profile pic, and many other feature will be available in upcoming days.

## Repository links
[Hosted Instagram](https://drab-cyan-bee-tam.cyclic.app/) : [Hosted Instagram Repo](https://github.com/itsnitishkumar/instaclone-hosted)<br><br>
You can download the backend and frontend from the below given repositories:<br>
[Backend Code](https://github.com/itsnitishkumar/instaclone-nodeBackend)<br>
[Frontend Code](https://github.com/itsnitishkumar/instaclone-nodeBackend)<br>

### Steps to make the frontend and backend work on your localmachine
Downlaod frontend and backend code from above repo link and open it in vscode or any code editor. Get inside the frontend and backend folder individually and download the node modules using below command and run the code
```
#to download node_modules
npm i   

#to run the code
nodemon app
```
In the above case your backend will run on port 5001 and your frontend will run on port 3000

### OR

You can even download the hosted instagram code from the above given link and run the same commands to install the node modules and run it. But in this case you can see your fronend and backend on same port i.e, http://localhost:5001 as we have configured it in that way.


## Features: 

**Authentication** : User need to signup first if they don't have account, after that user can signin with the same credentials. <br>
**Home** : Once SignedIn user will be naviagted to the home page where, he can view the post of the all the users signed in who had posted somehing. Signed in user can interact with the existing post by liking it or commenting it. You can even have a look at users profile by clikcing on their name which will redirect you to the profile of that user where you can follow or unfollow the user and would be able to veiw their post.
Create Post : You can create a post with a caption and post it, when then will be accessible to all the user on home page.
My Following : On this page you can see the post of only those user whom you follow.
Profile: This page will show the no of followers, following and post of the user.
Change Profile Pic : Signed in user can change their profile picture from the profile section.

