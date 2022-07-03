export enum Screens {
  MainMenu = "MainMenu",
  Lobby = "Lobby",
  Gameplay = "Gameplay",
  GameConfig = "GameConfig",
  TicTacToe = "TicTacToe",
  CreateLobby = "CreateLobby",
  AllLobbies = "AllLobbies",
  WaitingInLobby = "WaitingInLobby",
  GridTesting = "GridTesting",
  VersusComputer = "VersusComputer",
  ComputerConfig = "ComputerConfig",
}

export enum Line {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}

// Point to backend deployed on Heroku
export const IPAdd = "https://dotsandboxesbackend.herokuapp.com/";

export type Lobby = {
  gridSelection: number;
  lobbyName: string;
  lobbyKey: string;
};

export enum AnimatedShapeColour {
  Red = "red",
  Orange = "darkorange",
  Blue = "dodgerblue",
  Green = "limegreen",
  Aqua = "aqua",
  Gold = "gold",
}
