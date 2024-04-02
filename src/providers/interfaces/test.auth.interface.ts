export interface TestAuthInterface {
  run(authData: unknown): Promise<void>;
}
