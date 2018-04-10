/**
 * 使用babel垫片
 */
// import "babel-polyfill"
/**
 * 加载系统配置文件
 */
import { httpServerPort, httpsServerPort, serverPort, log4jsBasePath, opensslOptions } from './config/server'

import net from 'net'
import http from 'http'
import https from 'https'
import fs from 'fs'
import koa from 'koa'
import router from './router/router'
// import log4js from 'log4js'

/**
 * 设置日志输出
 * @type {String}
 */
// log4js.configure('./config/log4js_configuration.json', { cwd: log4jsBasePath });

// let logger = log4js.getLogger("server")

/**
 * 初始化KOA
 * @type {koa}
 */
const pepsi = new koa()

/**
 * 构建路由控制
 */
new router(pepsi)
/**
 * 创建HTTP服务
 * @type {[type]}
 */

let httpServer = http.createServer(pepsi.callback()).listen(httpServerPort);

/**
 * 创建HTTPS服务
 * @type {[type]}
 */
let httpsServer = https.createServer({
    key: fs.readFileSync(opensslOptions.key),
    cert: fs.readFileSync(opensslOptions.cert)
}, pepsi.callback()).listen(httpsServerPort);

/**
 * @param  {创建基本的net服务用来做请求转发}
 * @return {[type]}
 */
net.createServer((socket) => {
    socket.once('data', (buf) => {
        //https数据流的第一位是十六进制“16”，转换成十进制就是22
        let address = buf[0] === 22 ? httpsServerPort : httpServerPort;
        //创建一个指向https或http服务器的链接
        let proxy = net.createConnection(address, () => {
            proxy.write(buf);
            //反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
            socket.pipe(proxy).pipe(socket);
        });
        proxy.on('error', (err) => {
            // logger.error(err);
        });
    });
    socket.on('error', (err) => {
        // logger.error(err);
    });
}).listen(serverPort);
