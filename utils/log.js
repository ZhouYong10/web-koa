/**
 * Created by Administrator on 2018/7/5 0005.
 */
var log4js = require('log4js');
var moment = require('moment');
var log_config = require('../config/log');

// 加载配置文件
log4js.configure(log_config);

var logUtil = {};

var consoleLogger = log4js.getLogger();
var reqLogger = log4js.getLogger('response');
var resLogger = log4js.getLogger('response');
var errorLogger = log4js.getLogger('error');

// 封装请求日志
logUtil.logreq = function(ctx) {
  if(ctx) {
    var req = ctx.request;
    var logText = '\n-->[' + req.requestStartTime + ']' + req.method + '' +
      req.originalUrl + ' ' + ctx.status + ' ' + req.ip + '\n';
    reqLogger.info(logText);
  }
};

// 封装响应日志
logUtil.logRes = function(ctx, resTime) {
  if(ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

// 封装错误日志
logUtil.logError = function(ctx, error, resTime) {
  if(ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

// 格式化响应日志
var formatRes = function(ctx, resTime) {
  var req = ctx.request;
  var method = req.method;
  var logText = new String();

  logText += '\n<--' + method + ' ' + req.originalUrl + ' ' + ctx.status + ' ' + resTime + 'ms\n';

  if(method === 'GET') {
    logText += '  query: ' + JSON.stringify(req.query);
  }else {
    logText += '  body: ' + JSON.stringify(req.body);
  }

  return logText + '\n';
};

// 格式化错误日志
var formatError = function(ctx, error, resTime) {
  var logText = formatRes(ctx, resTime);

  logText += error.name + '\n';
  logText += error.message + '\n';
  logText += error.stack + '\n';

  return logText;
};


module.exports = {
  log4js: log4js,
  logger: async function(ctx, next) {
    // 响应开始时间
    var start = new Date();
    ctx.request.requestStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
    logUtil.logreq(ctx);
    // 响应间隔时间
    var ms;
    try{
      await next();
      ms = new Date() - start;
      // 记录响应日志
      logUtil.logRes(ctx, ms);
    }catch (e){
      ms = new Date() - start;
      logUtil.logError(ctx, e, ms);
    }
  }
}
