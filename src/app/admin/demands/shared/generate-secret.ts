export function generateSecret() {
  const randomNumber = (max: number) => Math.floor(Math.random() * max);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alpha = alphabet[randomNumber(alphabet.length)];
  const digits = Array.from({ length: 4 }, () => randomNumber(10));
  return `${alpha}${digits.join('')}`;
}
