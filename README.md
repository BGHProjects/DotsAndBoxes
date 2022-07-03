# DotsAndBoxes
A dots and boxes mobile game made with React Native and Expo <br/><br/>
<img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/MainMenu.jpg" width="300" height="533">

- Based on the [dots and boxes](https://en.wikipedia.org/wiki/Dots_and_Boxes) pen and paper game
- Facilitates multiplayer through an API that uses [Socket.io](https://socket.io/) that has been deployed to [Heroku](https://www.heroku.com/)
- Two players can play against each other in real-time through the lobbying system enabled by the aforementioned API
- Also allows users to play against an AI computer that uses the [Minimax algorithm](https://en.wikipedia.org/wiki/Minimax), that searches one layer deep

## Gameplay
- Each takes a turn to draw a line
- If you connect four nodes through four lines to form a box, you claim that box and score a point
- Player with the most points once all possible lines are drawn wins
- Grid sizes available for selection range from 3x3 up to 7x7

### Lobby Config <br/><br>
<img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/CreateLobby.jpg" width="300" height="533">

### List of Lobbies <br/><br>
<img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/ListOfLobbies.jpg" width="300" height="533">

### Computer Config <br/><br>
<img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/ComputerConfig.jpg" width="300" height="533">

### Gameplay <br/><br>
<img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/GameplayStart.jpg" width="300" height="533"> <img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/GameplayMiddle.jpg" width="300" height="533"> <img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/GameplayEndTie.jpg" width="300" height="533"> <img src="https://github.com/BGHProjects/DotsAndBoxes/mobile/assets/screenshots/GameplayEndWin.jpg" width="300" height="533">

<br/><br/>
Navigate to /assets/screenshots/ for other in-game images
