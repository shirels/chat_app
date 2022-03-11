---

## ********\_\_\_********CHAT APP************\_\_\_************

The app enable users to send messages and receive them.
It's based on REST commands.

1. In order to execute this project, use the cmd and run the following commands:
   $ npm init -y
   $ nodemon

==>this commands will start the server

2. For sending requests I used 'postman' software with the url= http://localhost:1000/api/
3. The structure of the request body is:
   GET: {
   "recipient": string_name
   }
   POST: {
            "sender": string_name,
            "recipient": string_name,
            "message: string
        }
4. I used an array of users, and there is initial values in it.
5. an example values for running the app:
   1. GET command with: {"recipient":"Jo"}
   2. POST command with: {
                            "sender":"Joe",
                            "recipient":Jo"
                            "message": "Hi Jo!"
                        }
   3. POST command with: {
                            "sender":"Joe",
                            "recipient":Jonna"
                            "message": "Hi Jonna!"
                        }
   4. POST command with: {
                            "sender":"Jo",
                            "recipient":Jonna"
                            "message": "Hi Jonna! It's me Jo"
                        }
