const decideWinner = (player1Score: number, player2Score: number) => {
  if (player1Score > player2Score) return 1;
  if (player2Score > player1Score) return 2;
  return -1;
};

export default decideWinner;
