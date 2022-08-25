export default interface ILogin {
  login(data: { email: string; password: string }): Promise<string | void>;
}
