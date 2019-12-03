const chalk = require('chalk');
const isAliEnv = require('is-ali-env');

function useBigfish(type, pkg) {
  if (process.env.MONITOR === 'none') return;
  isAliEnv().then(val => {
    if (val) {
      let stopMsg = pkg.name === 'roadhog'
        ? `${pkg.name} 已于 2019.3.1 停止维护`
        : `${pkg.name} 已停止维护`;
      console.log(`
---
💥💥💥 ${chalk.bold.red(`${stopMsg}，为了更好对您进行服务，推荐使用 bigfish。`)}

钉钉群：Bigfish 金牌服务群 （群号21761376）
官网：https://bigfish.alipay.com/
${pkg.name === 'roadhog' ? `升级文档：https://bigfish.alipay.com/doc/dgmrg0\n` : `升级文档：https://bigfish.alipay.com/doc/tnyo3y\n`}
---
`);
    }
  });
}

const messages = {
  buildComplete: {
    roadhog: [useBigfish],
    'atool-build': [useBigfish],
  },
  devStart: {
    dora: [useBigfish],
  },
  devComplete: {
    roadhog: [useBigfish],
    'atool-build': [useBigfish],
  },
};

function run(type, pkg, opts) {
  try {
    messages[type][pkg.name].forEach(message => {
      if (typeof message === 'string') {
        console.log(message);
      } else if (typeof message === 'function') {
        message(type, pkg, opts);
      }
    })
  } catch (e) {
  }
}

exports.onBuildStart = function (pkg, opts) {
  run('buildStart', pkg, opts);
}

exports.onBuildComplete = function (pkg, opts) {
  run('buildComplete', pkg, opts);
}

exports.onDevStart = function (pkg, opts) {
  run('devStart', pkg, opts);
}

exports.onDevComplete = function (pkg, opts) {
  run('devComplete', pkg, opts);
}
