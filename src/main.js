const args = require('yargs-parser')(process.argv.slice(2))
const tool = require('./index')
const fs2json = require('fs-to-json')

function main () {
  if (!args.input) {
    console.log('Incorrect call, aborting. ')
    process.exit(1)
  }

  let config = { input: args.input, 
    debug: args.debug, 
    output: args.output, 
    transformFileName: file=>file.replace(/[^\w]/gi, '_') 
    }

  if (args.mode=== 'fs2json') {

    fs2json(config)
      .then(() => {
        config.input = config.output
        delete config.output
        tool(config)
        process.exit(0)
      })
      .catch(ex => {
        console.log('ERROR', ex)
        process.exit(1)
      })
  } else {
    tool(config)
  }
}

module.exports = main