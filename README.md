# WELCOME TO DISCORDIA
Discordia is a Discord clone built using Postgres, Flask-SQLAlchemy, React, Redux.

The backend utilizes Flask-SocketIO while the frontend utilizes socket.io-client to set up its websocket connection.

Discordia (discord) is an instant messaging social platform. Users can chat live in servers or private messages.

![image](https://user-images.githubusercontent.com/60123981/197452743-b8948698-c7e6-4a39-abfe-5a43d3508e25.png)


Follow the link below to check it out!
https://discordia-cgh.herokuapp.com/


# NAVIGATING DISCORDIA
HOW TO LOGIN
Login by clicking on the 'Login' button located on the top right. You can also sign up by following the Login button then clicking the 'Register' link located near the bottom-left of the form. Alternatively, there is a sign up button located at the bottom of the home page. Fill out the form and you are now part of the Discordia community! If you're curious and want to check it out without any obligation, feel free to login as a demo user which can be accessed on the login page!
![image](https://user-images.githubusercontent.com/60123981/197449850-140ce60c-f75d-4858-96a2-a7c70c897336.png)


#### Logging in
![image](https://user-images.githubusercontent.com/60123981/197450031-fb8dacc7-6610-4f96-9e7e-0800612660e5.png)


#### Signing Up
![image](https://user-images.githubusercontent.com/60123981/197450084-3e7e3f8a-9534-4871-b5ad-2ac5540311c4.png)


#### After logging in or signing up, you will be at your home page where you can navigate to your open direct messages (DMs) and chat with friends.
![image](https://user-images.githubusercontent.com/60123981/197450313-b7d508c5-1b9a-48a5-bf7d-fcd03a4329d6.png)


#### You can navigate to channels by clicking on the servers located on the far left sidebar. From there, you can see each of the server's channels and chat with other users in the server!
![image](https://user-images.githubusercontent.com/60123981/197450354-21f83cfe-f6dd-4665-9a80-ed4be6914938.png)


#### You can also start DMs with other users in that same server! Just click on on a user on the right sidebar while you're viewing a server.
![image](https://user-images.githubusercontent.com/60123981/197452300-8e81a121-e93b-41ce-b025-3cc953e54210.png)

![image](https://user-images.githubusercontent.com/60123981/197452216-75b339f2-fa13-4aaa-83b7-c94d9e62ef0b.png)



#### You can also create your own server (and channels of course!) by clicking on the green + button below all the servers.
![image](https://user-images.githubusercontent.com/60123981/197450752-0e157210-d654-4fa1-b41a-83d468c9df4c.png)


### As a server owner, you can any of the following:

#### Edit a server by clicking on your server's name above the channels list and then clicking the server settings button
![image](https://user-images.githubusercontent.com/60123981/197450898-1d6135f1-1a57-4bd3-8041-35270bcec854.png)

![image](https://user-images.githubusercontent.com/60123981/197450918-ca1314bb-6005-4d28-b8ff-94c93277b985.png)


#### Delete your server (why would you want to though??)
![image](https://user-images.githubusercontent.com/60123981/197450944-af05479f-949f-45ac-8203-5a64aa5140d6.png)


#### Create a channel by clicking on the + button to the right of 'TEXT CHANNELS' located aboove all your channels
![image](https://user-images.githubusercontent.com/60123981/197451150-84d9c15c-941d-4d1e-8a6a-9bc474eea6e7.png)

![image](https://user-images.githubusercontent.com/60123981/197451032-6795d4b9-0e3a-45a8-9b81-f44d2350b0c5.png)


#### Edit a channel by clicking on the cogwheel to the right of your server's channel's name
![image](https://user-images.githubusercontent.com/60123981/197451112-d23dd9ff-bc02-4b06-9b59-a81c910158b5.png)

![image](https://user-images.githubusercontent.com/60123981/197451185-ffc45632-1639-40dd-8839-666cf401e663.png)


#### Delete a channel (again... why would you want to?)
![image](https://user-images.githubusercontent.com/60123981/197451259-b74d7d65-9f6f-4941-bfcf-4f786f6be7ed.png)


## Tech used

!Flask(https://camo.githubusercontent.com/ea92b069447aaf7b6ed27965700bc66cd0f7a450d0af50e0253e51a[%E2%80%A6]5266c6f676f3d466c61736b266c6f676f436f6c6f723d626c61636b)
!Python
!React
!Redux
!Ubuntu
!JavaScript
!NodeJS
!HTML
!CSS3
!Heroku
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## To dos

 - Group DMs
 - Invite feature
 - Friends

## How to set up

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:nachen98/Discord-Clone.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. From the root directory, cd into react-app, install your dependencies, run npm install, and WALA! You got your very own Discord clone.

   ```bash
   cd react-app
   ```

   ```bash
   npm install
   ```
   
   ```bash
   npm start
   ```
