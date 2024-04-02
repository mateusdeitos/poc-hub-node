export class Auth {
  constructor(
    private token: string,
    private refreshToken: string,
    private expiresIn: number,
  ) {}

  getToken() {
    return this.token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  getExpiresIn() {
    return this.expiresIn;
  }

  isExpired() {
    if (!this.token) {
      return true;
    }

    if (!this.refreshToken) {
      return true;
    }

    return this.expiresIn < Date.now() + 5 * 60 * 1000;
  }
}
