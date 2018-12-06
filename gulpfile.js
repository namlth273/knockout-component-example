var gulp = require("gulp");
var ts = require("gulp-typescript");
var sass = require("gulp-sass");
var magicImporter = require("node-sass-magic-importer");
var browserSync = require("browser-sync").create();
var del = require("del");
var runSequence = require("run-sequence");
var paths = {
    pages: ["src/**/*.html"],
    scss: ["src/contents/scss/**/*.scss"],
    scripts: "src/scripts/**/*.ts",
    buildpages: ["build/*.html"],
    buildcss: "build/contents/css",
    buildcssvendors: "build/contents/css/vendors",
    buildscripts: "build/scripts",
    tsconfig: "./src/tsconfig.json",
    vendors: "build/scripts/vendors",
};

var copytasks = [
    {
        name: 'html',
        src: paths.pages,
        dest: "build"
    },
    {
        name: 'requirejs',
        src: "node_modules/requirejs/require.js",
        dest: paths.vendors + "/requirejs"
    },
    {
        name: 'text',
        src: "node_modules/text/text.js",
        dest: paths.vendors + "/text"
    },
    {
        name: 'bootstrapjs',
        src: "node_modules/bootstrap/dist/js/bootstrap.min.js",
        dest: paths.vendors + "/bootstrap"
    },
    {
        name: 'knockoutjs',
        src: "node_modules/knockout/build/output/knockout-latest.js",
        dest: paths.vendors + "/knockout"
    },
    {
        name: 'jquery',
        src: "node_modules/jquery/dist/jquery.min.js",
        dest: paths.vendors + "/jquery"
    },
    {
        name: 'animatecss',
        src: "node_modules/animate.css/animate.min.css",
        dest: paths.buildcssvendors + "/animate"
    },
];

var copytasknames = [];

copytasks.forEach(function (task) {
    gulp.task("copy-" + task.name, function () {
        return gulp.src(task.src)
            .pipe(gulp.dest(task.dest));
    })

    copytasknames.push("copy-" + task.name);
});

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "build"
        },
    })
})

gulp.task("sass", function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            importer: magicImporter()
        }).on("error", sass.logError))
        .pipe(gulp.dest(paths.buildcss))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("scripts", function () {
    var tsconfig = require(paths.tsconfig);
    var filesGLob = tsconfig.filesGlob;
    return gulp.src(filesGLob)
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest(paths.buildscripts))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", ["browserSync", "sass", "scripts", "copy-html"], function () {
    gulp.watch(paths.scss, ["sass"]);
    gulp.watch(paths.scripts, ["scripts"]);
    gulp.watch(paths.pages, ["copy-html"]);
    gulp.watch(paths.buildpages, browserSync.reload);
})

gulp.task("clean:build", function () {
    return del.sync("build");
})

gulp.task("cache:clear", function (callback) {
    return cache.clearAll(callback)
})

gulp.task("build", function (callback) {
    runSequence("clean:build",
        ["sass"], ["scripts"], copytasknames,
        callback
    )
})

gulp.task("default", function (callback) {
    runSequence(["sass", "browserSync"], "watch",
        callback
    )
})