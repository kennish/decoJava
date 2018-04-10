import Router from 'koa-router'
import Boom from 'boom'

export default class apiRoutes {
    constructor(app) {
        this.app = app;
        this.page = new Router()

        this.page.get('/index.html', function*() {
            yield this.render('index');
        })
        this.page.get('*.html', function*() {
            this.redirect('/index.html');
        })
        this.setting()
    }
    setting() {
        this.app.use(this.page.routes()).use(this.page.allowedMethods({
            throw: true,
            notImplemented: () => new Boom.notImplemented(),
            methodNotAllowed: () => new Boom.methodNotAllowed()
        }));
    }
}