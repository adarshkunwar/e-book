export const Capitalize = (input: string) => {
  const split = input.split(' ');
  const capitalisingEachWord = split.map((word) => { return word.charAt(0).toUpperCase() + word.slice(1) });
  const returnable = capitalisingEachWord.join(' ');
  return returnable;
};

export const RemoveSpecialCharacters = (input: string) => {
  const returnable = input.replace(/[^\w\s]/gi, '');
  return returnable
}

export const RemoveMultipleSpaces = (input: string) => {
  const returnable = input.replace(/\s+/g, ' ');
  return returnable
}
