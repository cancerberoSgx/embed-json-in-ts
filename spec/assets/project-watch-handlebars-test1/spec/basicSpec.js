const shell = require('shelljs')
describe('basic', () => {
  it('devtools', () => {
    shell.rm('-rf', 'output')

    shell.rm(
      '-rf',
      'src/templates/templates.json src/templates/templates.ts src/templates/*.js src/*.js'
    )
    expect(shell.exec('node compile').code).toBe(0)
    let p = shell.exec('node output/index.js')
    expect(p.code).toBe(0)
    expect(p.stdout).toContain('<h1>seba is the best</h1>')
  })
})
