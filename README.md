---

## **\*\*\*\***\_\_\_**\*\*\*\***CHAT APP\***\*\*\*\*\*\*\***\_\_\_\***\*\*\*\*\*\*\***

The app enable users to send messages and receive them.
It's based on REST commands.
(requirments: node.js, npm, editor(vscode etc))

1. In order to execute this project, use the cmd/bash and run the following commands:
   $ npm init -y
   $ nodemon

==>This commands will start the server and would restart it due to changes

2. For sending requests I used 'postman' software with the url= http://localhost:1000/api/users

3. The structure of the request body is:

   GET: {
   "recipient": string_name
   }

   POST: {
   "sender": string_name,
   "recipient": string_name,
   "message": string
   }

4. For db (localy) I used an object of JS (called users), and it's keys are usernames. every entry of username has key called messages and it's value is an object of sendernames as keys and list of messages (str) as values.

users = {@username: { messages: {@sendername:[list of msg str]}}} ==> @changable

5. An example values for running the app:

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
   5. POST command with: {
      "sender":"Joe",
      "recipient":Jo"
      "message": "Hi Jo!"
      }
   6. GET command with: {
      {"recipient":"Jo"}
      }

6. I prepared some tests and wrote what I would test in a comment, but didn't actualize them, because I wasn't familier with it with this language and did't have the time to acomplish it. Hope for your understanding.

==>assumptions: 1. I assumed the user/sender/recipient names are unique. 2. For inspecting purposses (also for you) I printed errors and messages to console.
