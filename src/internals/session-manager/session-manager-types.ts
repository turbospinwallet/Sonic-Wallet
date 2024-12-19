export interface UserCredential {
  refreshToken: string;
  token: string;
}

export interface SavedUserCredential extends UserCredential {
  address: string;
}
