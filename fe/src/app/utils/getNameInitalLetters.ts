export function getNameInitialLetters(name: string) {
  const trimmedName = name.trim(); // Remover espaços em branco extras
  return trimmedName.slice(0, 2).toUpperCase();
}
