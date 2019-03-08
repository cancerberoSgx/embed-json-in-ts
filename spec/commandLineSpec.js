const shell = require('shelljs')

describe('command line', () => {

  it('command line simple 1', () => {
    shell.rm('-rf', './spec/assets/example/*.js')
    shell.rm('-rf', './spec/assets/example/data1.ts')

    expect(shell.exec('node src/cli --input ./spec/assets/example/**/*.json').code).toBe(0)
    expect(shell.exec('npx tsc ./spec/assets/example/*.ts').code).toBe(0)
    let p = shell.exec('node ./spec/assets/example/index.js')
    expect(p.code).toBe(0)
    expect(p.stdout.toString()).toContain('value1')
  })

  it('fs2json mode', () => {
    let outputPath = './spec/assets/example1.json'

    shell.rm('-rf', outputPath + ' ./spec/assets/example1.ts')

    expect(shell.exec(`node src/cli --mode fs2json --input "./spec/assets/example/**/*" --output "${outputPath}" --debug`).code).toBe(0)

    const data = JSON.parse(shell.cat(outputPath))
    expect(data.__spec_assets_example_index_ts.content.length > 0).toBe(true)
    expect(shell.cat('./spec/assets/example1.ts').toString()).toContain('example1: example1_definition = {"__spec_')

    shell.rm('-rf', outputPath)
    shell.rm('-rf', './spec/assets/example1.ts')
  })

})
