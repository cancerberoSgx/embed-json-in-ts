const args = require('yargs-parser')(process.argv.slice(2))
const shell = require('shelljs')
const path = require('path')
const glob = require('glob').sync
const json2ts = require('json2ts')
const tool = require('./index')

function main () {
  if (!args.input) {
    console.log('Incorrect call, aborting. ')
    process.exit(1)
  }

  let config = { input: args.input }
  tool(config)
}
main ()