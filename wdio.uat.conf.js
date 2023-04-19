//merge parent conf object + add new changes in uat conf(baseUrl, connectionTimeOut) files
const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

exports.config = merge(wdioConf.config, {
    baseUrl: 'http://www.rahulshettyacademy.com',
    waitforTimeout: 5000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        grep:'Sanity'
    },
})