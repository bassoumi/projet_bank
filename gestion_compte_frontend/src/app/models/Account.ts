export interface Account {
  _id: string; // Identifiant unique du compte
  name: string; // Nom du compte ou utilisateur
  accountType: string; // Type de compte (ex: "checking", "savings", etc.)
  balance: number; // Solde du compte
  email: string; // Adresse e-mail de l'utilisateur
  phone: string; // Numéro de téléphone de l'utilisateur
  address: {
    street: string; // Adresse, rue
    city: string; // Ville
    zip: string; // Code postal
  }; 
  dob: string; // Date de naissance, au format "YYYY-MM-DD"
  status: string; // Statut actuel du compte (actif, inactif, fermé, etc.)
  notifications?: { 
    email?: boolean; // Notification par e-mail activée/désactivée
    sms?: boolean; // Notification par SMS activée/désactivée
  }; 
  createdAt: string;
  updatedAt:string // Date et heure de création, au format ISO 8601 (ex: "2024-12-18T15:30:00Z")
}
