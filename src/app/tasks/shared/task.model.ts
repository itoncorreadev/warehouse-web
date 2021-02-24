export class Task{
  constructor(
    public id: number,
    public title: string,
    public description?: string,
    public done?: boolean,
    public deadline?: string,
    public done_description?: string,
    public name?: string,
    public user_id?: number
  ){}
}
