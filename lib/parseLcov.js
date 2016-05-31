'use babel'

function parseLcov (lcov) {
  const lines = lcov.split('\n')
  const data = { }
  let _current
  function record (line, count) {
    if (line && !isNaN(count)) {
      const lineArray = _current[+line] || (_current[+line] = [ ])
      lineArray.push(+count)
    }
  }
  for (const lineUntrimmed of lines) {
    const line = lineUntrimmed.trim()
    if (line.substr(0, 3) === 'SF:') {
      data[line.substr(3)] = _current = { }
    } else if (_current && line.substr(0, 3) === 'DA:') {
      const fields = line.substr(3).split(',')
      record(+fields[0], +fields[1])
    } else if (_current && line.substr(0, 5) === 'BRDA:') {
      const fields = line.substr(5).split(',')
      record(+fields[0], +(fields[3] === '-' ? 0 : fields[3]))
    }
  }
  return data
}

export default parseLcov
