'use strict'

// paths
var libRoot = "./node_modules/";
var paths = {
    srcRoot: './src',
    srcHtmlFiles: './src/**/*.html',
    srcLessFiles: './src/css/*.less',
    srcTSFiles: './src/**/*.ts',
    testRoot: './tests/',
    testTSFiles: './tests/**/*.ts',
    destRoot: './dest/',
    destJSRoot: './dest/js/',
    destJSFiles: './dest/js/*.js',
    destCSSRoot: './dest/css/',
    destCSSFiles: './dest/css/*.css',
    lib : [
        libRoot+'angular/angular.min.js',
        libRoot+'angular/angular.min.js.map',
        libRoot+'angular-route/angular-route.min.js',
        libRoot+'angular-route/angular-route.min.js.map',
        libRoot+'angular-animate/angular-animate.min.js',
        libRoot+'angular-animate/angular-animate.min.js.map',
        libRoot+'jquery/dist/jquery.min.js',
        libRoot+'jquery/dist/jquery.min.js.map'

    ]
};

var gulp = require('gulp'),
    browserify = require("browserify"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    tslint = require("gulp-tslint"),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    runSequence = require("run-sequence");

//create ts project
var tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json");

// Copy html files 
gulp.task("copy-html", function(done) {
     gulp.src(paths.srcHtmlFiles)
        .pipe(gulp.dest(paths.destRoot));
        done();
});

// Less configuration
gulp.task('less', function(done) {
   gulp.src(paths.srcLessFiles)
        .pipe(less())
        .pipe(gulp.dest(paths.destCSSRoot));
        done();
});

// Copy js lib files 
gulp.task('copy-js', function(done) {
     gulp.src(paths.lib)
        .pipe(gulp.dest(paths.destJSRoot+'lib/'));
        done();
});

// TS Lint Configuration
gulp.task("lint", function(done) {
    gulp.src([
        paths.srcTSFiles,
        paths.testTSFiles
    ]).pipe(tslint({
        formatter: "prose"
    })).pipe(tslint.report());
    done();

});

// TS configuration
gulp.task("ts",['lint'], function() {
    return tsProject.src(paths.srcTSFiles)
    .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.destJSRoot)); 
});

// watching ts changes 
gulp.task('watch',['copy-html','copy-js',,'lint','ts'], function() {
    var watcher = gulp.watch([paths.srcHtmlFiles,paths.srcLessFiles,paths.srcTSFiles],
    ['copy-html','copy-js',,'lint','ts']);  
        watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type);
        });
});

gulp.task('serve',['ts'], function() {
    process.stdout.write('Starting browserSync and superstatic...\n');
    browserSync({
        port: 3000,
        files: ['index.html', paths.destCSSFiles, paths.destJSFiles],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: 'arvatofrontend',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: paths.destRoot,
            middleware: superstatic({ debug: false })
        }
    });
});

gulp.task('default', ["copy-html", "less","copy-js", "lint", "ts","serve"]);