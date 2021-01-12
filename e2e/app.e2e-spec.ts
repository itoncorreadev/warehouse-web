import { WarehouseWeb } from './app.po';

describe('warehouse-web App', () => {
  let page: WarehouseWebPage;

  beforeEach(() => {
    page = new WarehouseWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
