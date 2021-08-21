const request = require('supertest')
const app = require('../index')
const fs = require('fs')
var md = require('markdown-it')({
  html: true
});

describe('Get valid endpoint', () => {
  test('Should return 200 status for valid route', async () => {
    await request(app)
      .get('/test/')
      .then((res) => {
        expect(res.statusCode).toEqual(200);
    })
  })
})
  
describe('Get invalid endpoint', () => {
  it('Should return 404 status for invalid route', async () => {
    const res = await request(app)
      .get('/test/notvalid');
    expect(res.statusCode).toEqual(404);
  })
})

describe('Get valid html', () => {
  it('Should return html', async () => {
    const res = await request(app)
      .get('/test/');
    const data = fs.readFileSync("./content/test/index.md", 'utf8')
    const rendered = md.render(data);
    expect(res.text).toMatch(rendered);
  })
})
