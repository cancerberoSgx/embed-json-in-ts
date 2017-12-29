const shell = require('shelljs')

describe('command line', () => {
  it('command line simple 1', () => {
    shell.rm('-rf', './spec/assets/example/*.js')
    shell.rm('-rf', './spec/assets/example/data1.ts')

    expect(
      shell.exec('node src/cli --input ./spec/assets/example/**/*.json').code
    ).toBe(0)

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
