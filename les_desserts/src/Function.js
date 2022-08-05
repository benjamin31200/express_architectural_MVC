export const baseText = (ppTexte) => {
  const getSmallText = ppTexte.split(" ");
  const arrayText = [];
  for (let i = 0; i < 19; i++) {
    arrayText.push(getSmallText[i]);
  }
  const newText = arrayText.join(" ") + "...";
  return newText;
};