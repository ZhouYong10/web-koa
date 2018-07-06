/**
 * Created by Administrator on 2018/7/5 0005.
 */
var path = require('path');
var fs = require('fs');

// 日志根目录
var rootLogPath = path.resolve(__dirname, '../public/logs');

// 错误日志目录
var errorDirPath = '/error';
// 错误日志文件名
var errorFileName = 'error';
// 错误日志完整路径
var errorLogPath = rootLogPath + errorDirPath + '/' + errorFileName;

// 响应日志目录
var responseDirPath = '/response';
// 响应日志文件名
var responseFileName = 'response';
// 响应日志完整路径
var responseLogPath = rootLogPath + responseDirPath + '/' + responseFileName;

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 创建error日志目录
mkdirsSync(rootLogPath + errorDirPath);
// 创建response日志目录
mkdirsSync(rootLogPath + responseDirPath);

module.exports = {
  appenders: {
    consoleLogger: {
      type: 'stdout',
      layout: {
        type: 'coloured'
      }
    },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      compress: true,
      daysToKeep: 3,
      layout: {type: 'messagePassThrough'}
    },
    resLogger: {
      type: 'dateFile',
      filename: responseLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      compress: true,
      daysToKeep: 3,
      layout: {type: 'messagePassThrough'}
    }
  },
  categories: {
    default: {
      appenders: ['consoleLogger'],
      level: 'all'
    },
    response: {
      appenders: ['resLogger'],
      level: 'info'
    },
    error: {
      appenders: ['errorLogger'],
      level: 'error'
    }
  }
};

