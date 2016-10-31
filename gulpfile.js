'use strict'

// paths
var paths = {
    srcRoot: './src',
    srcHtmlFiles: './src/**/*.html',
    srcLessFiles: './src/**/*.less',
    srcTSFiles: './src/**/*.ts',
    testRoot: './tests/',
    testTSFiles: './tests/**/*.ts',
    destRoot: './dest/',
    destJSRoot: './dest/js/',
    destJSFiles: './dest/js/*.js',
    destCSSRoot: './dest/css/',
    destCSSFiles: './dest/css/*.css'
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
gulp.task("copy-html", function() {
    return gulp.src(paths.srcHtmlFiles)
        .pipe(gulp.dest(paths.destRoot));
});

// Less configuration
gulp.task('less',['copy-html'], function() {
    gulp.src(paths.srcLessFiles)
        .pipe(less())
        .pipe(gulp.dest(paths.destCSSRoot));
});

// TS Lint Configuration
gulp.task("lint", function() {
    return gulp.src([
        paths.srcTSFiles,
        paths.testTSFiles
    ]).pipe(tslint({
        formatter: "prose"
    })).pipe(tslint.report())
});

// TS configuration
gulp.task("ts",['lint'], function() {
    return tsProject.src(paths.srcTSFiles)
    .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.destJSRoot));
});

// watching ts changes 
gulp.task('watch',['copy-html','lint','ts'], function() {
    gulp.watch([paths.srcHtmlFiles,paths.srcLessFiles,paths.srcTSFiles, paths.testTSFiles], ['copy-html','less','lint','ts']);
    gulp.watch(paths.destJSFiles).on('change', browserSync.reload);
});

gulp.task('serve', function() {
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

gulp.task('default', ["copy-html", "less", "lint", "ts",'serve']);