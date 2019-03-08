#!/usr/bin/env node

import {main} from './main'
import { Config } from '.';
const config = require('yargs-parser')(process.argv.slice(2)) as Config

if (!config.input) {
  console.log('Incorrect call, aborting. ')
  process.exit(1)
}

main(config)
