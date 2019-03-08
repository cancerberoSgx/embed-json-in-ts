const shell = require('shelljs')
const tool = require('../src/index.js').tool

describe('js api', () => {

  it('simple cal', () => {
    shell.rm('-rf', './spec/assets/example/*.js')
    shell.rm('-rf', './spec/assets/example/data1.ts')
    tool({ input: './spec/assets/example/**/*.json' })
    expect(shell.exec('npx tsc ./spec/assets/example/*.ts').code).toBe(0)
    let p = shell.exec('node ./spec/assets/example/index.js')
    expect(p.code).toBe(0)
    expect(p.stdout.toString()).toContain('value1')
  })

  it('mode: string, outputFile and preserveExtension', () => {
    shell.rm('-rf', './spec/assets/example/*.js')
    shell.rm('-rf', './spec/assets/example/string-mode-and-outputFile-test.ts')
    tool({
      input: 'spec/assets/project-watch-handlebars-test1/package.json',
      outputFile: './spec/assets/example/string-mode-and-outputFile-test.ts',
      mode: 'string',
      preserveExtension: true
    })
    expect(shell.test('-f', './spec/assets/example/string-mode-and-outputFile-test.ts')).toBe(true)
    const content = shell.cat('-f', './spec/assets/example/string-mode-and-outputFile-test.ts').toString()
    expect(content).toContain(`export const package_json: string = "{\\n  \\"name\\": \\"project-watch-handlebars-test1\\"`)
    expect(shell.exec('npx tsc ./spec/assets/example/string-mode-and-outputFile-test.ts').code).toBe(0)
    const p  =shell.exec(`node -e "console.log(JSON.parse(require('./spec/assets/example/string-mode-and-outputFile-test.js').package_json).name)"`)
    expect(p.code).toBe(0)
    expect(p.stdout.trim()).toBe('project-watch-handlebars-test1')
  })
})
