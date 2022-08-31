export default interface Ilogin{
  login(data: { email: string; password: string }): Promise<string | void>
}
