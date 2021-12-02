"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rigger = require("gulp-include");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const concat = require("concat");
const concatCss = require("gulp-concat-css");
const del = require("del");
const browsersync = require("browser-sync").create();
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const webp = require('gulp-webp');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const uglifyes = require('gulp-uglify-es').default;
const rsync = require('gulp-rsync')
/* Paths */
var path = {
    build: {
        html: "../blog/blog/",
        js: "../blog/blog/assets/js/",
        css: "../blog/blog/assets/css/",
        csslibs: "../blog/blog/assets/css/",
        images: "../blog/blog/assets/img/",
        fonts: "../blog/blog/assets/fonts/"
    },
    src: {
        html: "src/html/*.html",
        js: "src/assets/js/*.js",
        csslibs: "src/assets/sass/libs/**/*.css",
        css: "src/assets/sass/style.sass",
        images: "src/assets/img/**/*",
        fonts: "src/assets/fonts/**/*"
    },
    watch: {
        html: "src/html/*.html",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.sass",
        csslibs: "src/assets/sass/libs/**/*.css",
        images: "src/assets/img/**/*",
        fonts: "src/assets/fonts/**/*"
    },
}




/* Tasks */
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./blog/_site"
        },
        port: 3000
    });
}
function browserSyncReload() {
    browsersync.reload();
}

function deploy(){
    let conn = ftp.create({
        host:      '31.131.26.120',
        user:      'mcshell',
        password:  'yCs@qBV4QTF^k',
        parallel:  21,
        maxConnections: 1,
        log: gutil.log
    });
    let globs = [
        '../blog/blog/**/*',
    ];
    return gulp.src(globs, {buffer: true})
        .pipe(conn.newer('/var/www/blog'))
        .pipe(conn.dest('/var/www/blog'));
}
function rsyncto(){
    return gulp.src('../blog/blog/**')
        .pipe(rsync({
            root: '/',
            hostname: 'mcshell@31.131.26.120',
            destination: '/var/www/blog/',
            // include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
}

function html() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.html))
        .pipe(browsersync.reload({ stream: true }));
}
function htacces() {
    return src(
        [
            'src/.htaccess',
            'src/*.json'
        ])
        .pipe(dest('../blog/blog/'))
        .pipe(browsersync.reload({ stream: true }));
}
function css() {
    return src(path.src.css, { base: "src/assets/sass/" })
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssbeautify())
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))
        .pipe(browsersync.reload({ stream: true }));

}
function csslibs() {
    return src(path.src.csslibs)
        .pipe(concatCss('libs.css'))
        .pipe(plumber())
        .pipe(dest(path.build.csslibs))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.csslibs))
        .pipe(browsersync.reload({ stream: true }));
}
function fonts() {
    return src([
        path.src.fonts,
        'node_modules/simple-line-icons/fonts/**'
    ])
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.reload({ stream: true }));
}
function js() {
    return src(path.src.js, {base: './src/assets/js/'})
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglifyes())
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.js))
        .pipe(browsersync.reload({ stream: true }));
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images))
        .pipe(webp())
        .pipe(dest(path.build.images))
        .pipe(browsersync.reload({ stream: true }));
}

// function clean() {
//     return del(path.clean);
// }



// for jekyll
// function productionFiles(){
//     return src(
//         [
//             'src/html/*.html',
//             'src/.htaccess',
//             'src/*.json'
//         ])
//         .pipe(dest('./_site/'))
//         .pipe(browsersync.reload({ stream: true }));
// }
function productionLayout (){
    return src(
        [
            'src/pages/_layouts/**/*.html'
        ])
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest('../blog/blog/_layouts/'))
        .pipe(browsersync.reload({ stream: true }));
}
function productionIncludes (){
    return src(
        [
            'src/pages/_includes/**/*.html'
        ])
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest('../blog/blog/_includes/'))
        .pipe(browsersync.reload({ stream: true }));

}

// for jekyll
function cleanProduction() {
    return del(
        [
            '_layouts/',
            '_includes/',
            'assets',
            'assets/js',
            '*.html',
            '*.htaccess',
            'particlesjs-config.json',
        ]
    );
}
// for jekyll




function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.csslibs], csslibs);
    gulp.watch([path.watch.fonts], fonts);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch(['src'], htacces);
    gulp.watch(['src/pages/_layouts/**/*.html'], productionLayout);
    gulp.watch(['src/pages/_includes/**/*.html'], productionIncludes);
}
const productions = gulp.series(cleanProduction,productionLayout,productionIncludes);
const build = gulp.series(cleanProduction, gulp.parallel(browserSyncReload, htacces, html, productions, css, js, images, csslibs, fonts));

const watch = gulp.parallel(build, browserSyncReload, watchFiles, browserSync);

// for jekyll



/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.csslibs = csslibs;
exports.fonts = fonts;
exports.js = js;
exports.htacces = htacces;
exports.images = images;
// exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.deploy = deploy;
exports.rsyncto = rsyncto;

// for jekyll
exports.productions = productions;

