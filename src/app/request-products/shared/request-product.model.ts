export class RequestProduct {
  constructor(
    public id: number,
    public quantity: number,
    public unit_price: string,
    public product_id: number,
    public total_price?: string,
    public observation?: string,
    public name?: string,
    public unit_price_br?: string,
    public calc_total_price_br?: string
  ){}
}
