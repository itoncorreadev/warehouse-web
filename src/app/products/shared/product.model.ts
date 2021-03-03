export class Product {
  constructor(
    public id: number,
    public name: string,
    public description?: string,
    public code?: string,
    public product_type?: boolean,
    public measure?: string,
    public min?: number,
    public med?: number,
    public max?: number,
    public location?: string,
    public status?: boolean,
    public quantity_in?: number,
    public quantity_out?: number,
    public quantity_inventory?: number,
    public quantity_measure?: string,
    public quantity_description?: string
  ){}
}
