// import log4js from 'koa-log4'
import pageRoutes from './page-router'
import path from 'path'
import render from 'koa-swig'
import convert from 'koa-convert'
import serve from 'koa-static'

export default class router {
    constructor(app) {
        // app.use(log4js.koaLogger(log4js.getLogger('router'), { level: 'auto' }));
        /**
         * [render 设置swig模板]
         * @type {[type]}
         */
        app.context.render = render({
            root: path.join(__dirname + "/../", 'src'),
            autoescape: true,
            cache: 'memory', // disable, set to false 
            ext: 'html',
            // locals: locals,
            // filters: filters,
            // tags: tags,
            // extensions: extensions
        });
        /**
         * 设置静态文件路由
         */
        app.use(convert(serve(__dirname + '/../src')));

        new pageRoutes(app);
    }
}
