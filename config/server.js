/**
 * [httpServerPort http 服务端口]
 * @type {String}
 */
const httpServerPort = "21001";
/**
 * [httpsServerPort https 服务端口]
 * @type {String}
 */
const httpsServerPort = "21002";
/**
 * [serverPort 对外统一端口]
 * @type {String}
 */
const serverPort = "21003";
/**
 * [log4jsBasePath 日志文件根目录]
 * @type {[type]}
 */
const log4jsBasePath = process.cwd() + "/logs/";
/**
 * [opensslOptions HTTPS 私密证书]
 * HTTPS 非对称加密算法 是一个优化点 [http://op.baidu.com/2015/04/https-s01a01/]
 * 
 * @type {Object}
 */
const opensslOptions = {
    key: './ssl/server.key',
    cert: './ssl/server.crt'
};

export { httpServerPort, httpsServerPort, serverPort, log4jsBasePath, opensslOptions}
