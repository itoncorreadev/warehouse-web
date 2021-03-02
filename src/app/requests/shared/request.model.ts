export class Request {
  constructor(
    public id: number,
    public date: string,
    public request_type: string,
    public description: string,
    public document_type?: string,
    public document_code?: string,
    public status?: boolean,
    public name?: string,
    public status_description?: string,
  ){}
}
