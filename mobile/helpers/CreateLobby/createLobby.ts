import { Screens } from "../../consts/types";

const createLobby = (socket: any, navigation: any, lobbyOptions: any) => {
  // Used to generate a random key, to differentiate between lobbies with the same name and grid selection
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const completePayload = {
    gridSelection: lobbyOptions.gridSelection,
    lobbyName: lobbyOptions.lobbyName,
    lobbyKey: result,
  };

  socket?.current?.emit("CreateLobby", completePayload);
  navigation.navigate(Screens.WaitingInLobby, completePayload);
};

export default createLobby;
