export class TableUtils {

  public iconClassForInOut(fieldName: string){
    return {
      "glyphicon-arrow-down text-success": fieldName == "in",
      "glyphicon-arrow-up text-danger": fieldName == "out",
      "glyphicon-refresh text-warning": fieldName == "devolution"
    }
  }

  public colorClassForStatus(fieldName: string){
    return {
      "success": fieldName == "success",
      "warning": fieldName == "warning",
      "danger": fieldName == "danger",
      "info": fieldName == "info"
    }
  }
}
