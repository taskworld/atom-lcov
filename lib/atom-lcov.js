'use babel'
/* global atom */
import $ from 'jquery'
import fs from 'fs'
import Rx from 'rx'
import { CompositeDisposable } from 'atom'
import parseLcov from './parseLcov'

function lcovData川FromLcovFile川 (lcovFile川) {
  return (lcovFile川
    .flatMapLatest((path) => Rx.Observable.create((observer) => {
      refresh()
      fs.watchFile(path, { interval: 1024 }, refresh)
      return close
      function refresh () {
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) {
            observer.onNext('')
            throw err
          } else {
            observer.onNext(data)
            return data
          }
        })
      }
      function close () {
        fs.unwatchFile(path, refresh)
      }
    }))
  )
}

function getClass (counts) {
  const l = counts.length
  let covered = 0
  for (let i = 0; i < l; i++) {
    if (counts[i] > 0) covered++
  }
  if (covered === l) return 'lcov-covered'
  if (covered) return 'lcov-partially-covered'
  return 'lcov-missed'
}

function MarkerManager (textEditor) {
  const markers = { }
  function handleFileCoverage (fileCoverage) {
    for (const key of Object.keys(markers)) {
      markers[key].destroy()
      delete markers[key]
    }
    for (const lineNumber of Object.keys(fileCoverage)) {
      markers[lineNumber] = textEditor.markBufferPosition([ lineNumber - 1, 0 ])
      textEditor.decorateMarker(markers[lineNumber], {
        type: 'line-number',
        class: getClass(fileCoverage[lineNumber])
      })
    }
  }
  return { handleFileCoverage }
}

export default {
  activate (state) {
    this.lcovFile川 = new Rx.Subject()

    // An observable representing the latest coverage.
    const coverage川 = lcovData川FromLcovFile川(this.lcovFile川).map(parseLcov).shareReplay(1)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-lcov:select': (e) => this.selectFile(e)
    }))

    // Work with each text editor
    this.subscriptions.add(atom.workspace.observeTextEditors(textEditor => {
      const markerManager = new MarkerManager(textEditor)
      const subscription = coverage川.subscribe(coverage => {
        const fileCoverage = coverage[textEditor.getPath()]
        if (fileCoverage) markerManager.handleFileCoverage(fileCoverage)
      })
      this.subscriptions.add(subscription)
      this.subscriptions.add(textEditor.onDidDestroy(() => {
        subscription.dispose()
      }))
    }))
  },

  selectFile (e) {
    const path = $(e.target).closest('.file').find('.name').attr('data-path')
    this.lcovFile川.onNext(path)
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return { }
  }
}
