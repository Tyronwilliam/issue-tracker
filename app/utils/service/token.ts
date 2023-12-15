import { v4 as uuidv4 } from "uuid";
export function generateUniqueToken() {
  // Générer un UUID (Universally Unique Identifier)
  const uniqueToken = uuidv4();
  return uniqueToken;
}
export function calculateExpirationDate(durationInSeconds: any) {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + durationInSeconds * 1000
  );
  return expirationDate;
}

// Exemple d'utilisation avec une durée de 1 heure (3600 secondes)
