# atom-lcov [![Build Status](https://travis-ci.org/taskworld/atom-lcov.svg?branch=master)](https://travis-ci.org/taskworld/atom-lcov)

This Atom package shows your code’s test coverage in the gutter.
It guides you towards more code coverage!
Inspired by [Wallaby.js](https://wallabyjs.com/).

![Screenshot](http://i.imgur.com/0s9XvbR.png)

Tested with:

- [Mocha](https://mochajs.org/) + [nyc](https://github.com/bcoe/nyc)
- [Karma](https://karma-runner.github.io/0.13/index.html) + [babel-plugin-\_\_coverage\_\_](https://github.com/dtinth/babel-plugin-__coverage__)


## Usage

### 1. Write your code and your tests

![Write your code and your tests](http://i.imgur.com/Wa8SsJY.png)

### 2. Set up your test tool to output lcov data

In this example, I use [nyc](https://github.com/bcoe/nyc) to capture the code coverage while running [Mocha](https://mochajs.org/) test.

![Set up your test tool to output lcov data](http://i.imgur.com/8v3TmsY.png)

### 3. Run your test once

Make sure the coverage data file is generated. It’s usually named `lcov.info`.

![Run your test](http://i.imgur.com/VXJUsYC.png)

### 4. Right click on your lcov file and select “watch for coverage”

![Watch for coverage](http://i.imgur.com/p0fhJi1.png)

### 5. Atom will begin watching the lcov file and show it in the gutter

![Gutter](http://i.imgur.com/n7kny1x.png)

### 6. Run your tests in watch mode

Here I use [onchange](https://www.npmjs.com/package/onchange) to monitor the `.js` files and re-run the tests.

![Watch mode](http://i.imgur.com/3IM1Kh5.png)

### 7. Add more tests and see the gutter turn green!!!!

![It turns green](http://i.imgur.com/aMBSxHf.png)
