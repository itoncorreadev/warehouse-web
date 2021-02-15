export class RequestProduct {
  constructor(
    public id: number,
    public quantity: number,
    public unit_price: string,
    public total_price: string,
    public observation: string,
    public name: string
  ){}
}
