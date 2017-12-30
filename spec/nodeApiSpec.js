const shell = require('shelljs')
const tool = require('../src/index.js')

describe('command line', () => {
  it('command line simple 1', () => {
    shell.rm('-rf', './spec/assets/example/*.js')
    shell.rm('-rf', './spec/assets/example/data1.ts')

    tool({input: './spec/assets/example/**/*.json'})

    expect(
      shell.exec(
        'node node_modules/typescript/bin/tsc ./spec/assets/example/*.ts'
      ).code
    ).toBe(0)
    let p = shell.exec('node ./spec/assets/example/index.js')
    expect(p.code).toBe(0)
    expect(p.stdout.toString()).toContain('value1')
  })
})
