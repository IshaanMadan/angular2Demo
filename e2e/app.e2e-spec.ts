import { Angular2DemoPage } from './app.po';

describe('angular2-demo App', () => {
  let page: Angular2DemoPage;

  beforeEach(() => {
    page = new Angular2DemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
