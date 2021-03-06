'use strict';

let gulp = require('gulp');
let ts = require('gulp-typescript');
var webpack = require('webpack-stream');
var merge = require('merge-stream');

let clientTsProject = ts.createProject('client/tsconfig.json');
let serverTsProject = ts.createProject('server/tsconfig.json');

// These tasks will be run when you just type "gulp"
gulp.task('default', ['clientscripts', 'serverscripts']);

// This task can be run alone with "gulp clientscripts"
gulp.task('clientscripts', () => {
  return clientTsProject.src()
    .pipe(clientTsProject())
    .js
    .pipe(webpack(require('./client/webpack.config.js')))
    .pipe(gulp.dest('dist/client'));
});

// This task can be run alone with "gulp serverscripts"
gulp.task('serverscripts', () => {
  var server = serverTsProject.src()
    .pipe(serverTsProject())
    .js
    .pipe(gulp.dest('dist/server'));
  var config = gulp.src('server/src/config/*')
    .pipe(gulp.dest('dist/server/config'))
  return merge(server, config)
});

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
  gulp.watch('client/src/**/*.ts', ['clientscripts']);
  gulp.watch('server/src/**/*.ts', ['serverscripts']);
});