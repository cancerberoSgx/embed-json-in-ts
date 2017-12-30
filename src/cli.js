#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2))
const tool = require('./index')

function main () {
  if (!args.input) {
    console.log('Incorrect call, aborting. ')
    process.exit(1)
  }

  let config = { input: args.input, debug: args.debug }

  tool(config)
}

main()
