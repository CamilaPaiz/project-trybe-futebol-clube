export default function calculateEfficiency(totalPoints:number, totalGames:number) {
  const statistic = (totalPoints / (totalGames * 3)) * 100;
  return statistic.toFixed(2);
}
