# Rock🪨, Paper📃, Scissors✂️

The "Rock, Paper, Scissors" application is an implementation of the classic game in which a player competes against the game machine by selecting from three options: rock, paper or scissors. The application provides an intuitive user interface that allows the player to make their choice and then displays the outcome of the game as determined by the traditional rules.

## Main Functionalities

 - **Move selection:** The player can choose between rock, paper or scissors.
 - **Result determination:** The application determines the outcome of the game by comparing the player's choice with the machine's random choice.
 - **Attractive user interface:** The user interface offers an attractive and easy to use game experience for the player.
 - **Reset option:** After each game (best of 3), the user has the option to play again against the game machine.

## Technologies

 - **Frontend:** The frontend application is developed using *React.js*.
 - **Backend:** The backend of the application is implemented in *C#* using *ASP.NET Core* and *.NET 8.0* to create a web API that handles game requests. 
 - **Deployment:** The application is deployed in *Azure* through *Visual Studio*.

## Technical documentation

### Frontend (React.js)

The game logic is implemented in the main component of the application (`App.js`), where user interactions are handled and requests are made to the backend. HTTP requests are made using the `fetch()` function to communicate with the backend and get the result of the game.

### Backend (C# / ASP.NET Core / **.NET 8.0**)

A web API is implemented using *ASP.NET Core*, which handles the game requests and calculates the result. The main file (`Program.cs`) handles the POST requests for the game and determines the outcome based on the player's choice and the computer's random choice.

The application exposes two main endpoints:
- `/api/game`: this endpoint receives the player's choice, the outcome is calculated and a JSON response is returned with the details of the game, including the accumulated points.
- `/api/reset`: This endpoint resets the player's and the opponent's win counters, and a JSON response is returned with the reset counters.
