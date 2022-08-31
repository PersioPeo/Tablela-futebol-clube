export type DATA = {
  email: string;
  password: string;
};

export default interface Ilogin {
  login(data: DATA): Promise<string | void>
}
