'use babel'
/* global describe, it, expect */
import parseLcov from '../lib/parseLcov'

describe('parseLcov', () => {
  it('parses the lcov data', () => {
    const data = parseLcov(text(`
      SF:/a.js
      DA:1,0
      DA:2,1
      DA:3,0
      BRDA:1,1.1,1,1
      BRDA:1,1.1,1,0
      SF:/b.js
      DA:1,0
      DA:2,2
      DA:3,2
      BRDA:2,1.1,1,1
      BRDA:3,1.1,1,0
    `))
    expect(data['/a.js']).toEqual({
      1: [ 0, 1, 0 ],
      2: [ 1 ],
      3: [ 0 ]
    })
    expect(data['/b.js']).toEqual({
      1: [ 0 ],
      2: [ 2, 1 ],
      3: [ 2, 0 ]
    })
  })
})

function text (input) {
  return input.split(/\n/).map(line => line.trim()).filter(line => line).join('\n')
}
