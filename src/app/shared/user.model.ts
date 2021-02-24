export class User {
  public constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public passwordConfirmation: string,
  ){}
}
