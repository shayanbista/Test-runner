export interface LoginData {
  validUser: {
    username: string;
    password: string;
  };
  invalidUser: {
    username: string;
    password: string;
  };
  emptyUser: {
    username: string;
    password: string;
  };
  partialUser: {
    username: string;
    password: string;
  };
}
