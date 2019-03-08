
import {tool, Config} from './index'
const fs2json = require('fs-to-json')
// import  fs2json from 'fs-to-json'

export function main ( config: Config) {
  

  config.transformFileName= file=>file.replace(/[^\w]/gi, '_') 

  if (config.mode=== 'fs2json') {

    fs2json(config)
      .then(() => {
        config.input = config.output
        delete config.output
        tool(config)
        process.exit(0)
      })
      .catch((ex:any) => {
        console.log('ERROR', ex)
        process.exit(1)
      })
  } else {
    tool(config)
  }
}
