import { CabinetPage } from './app.po';

describe('cabinet App', () => {
  let page: CabinetPage;

  beforeEach(() => {
    page = new CabinetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
