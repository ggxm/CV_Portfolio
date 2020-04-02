// Variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

// Process de développement------------------------------
// ---Méthode watch dans une tâche-----------------------
//-------------------------------------------------------
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML ou JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
// OU //
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
  callback
  )
});

// Process d'optimisation pour le site en production-----
// ---Tâche pour créer le site en production-------------
//-------------------------------------------------------
gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'autoprefixer', 'js', ['useref', 'images', 'fonts'], callback)
});

// Tâche pour créer un server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

// Tâche pour compiler Sass en CSS
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Tâche pour minifier le js et le css et passer les fichier utile dans /dist
gulp.task('useref', function(){
  //return gulp.src('app/*.html')
  return gulp.src(['app/*.html','app/favicon.ico','app/.htaccess','app/robots.txt','app/browserconfig.xml','app/site.webmanifest','app/humans.txt','app/LICENSE.txt'])
    .pipe(useref())
    .pipe(gulpif('app/js/*.js', uglify())) // pour minifier les fichiers JavaScript
    .pipe(gulpif('app/css/*.css', minifyCSS())) // pour minifier les fichiers CSS
    .pipe(gulp.dest('dist'))
});

// Tâche pour copier les bibliothèque js vers dist
gulp.task('js', function () {
    return gulp.src('app/js/vendor/*.min.js')
        .pipe(gulp.dest('dist/js/vendor'))
});

// Tâche pour optimiser les images
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|mp4)')
    // Met en cache les images passées par imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
});

// Tâche pour copier les font vers dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Autoprefixer css
gulp.task('autoprefixer', function () {
    return gulp.src('app/css/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
});

// Tâche pour supprimer les fichiers inutiles
gulp.task('clean', function() {
  return del.sync('dist');
})

// Tâche pour tout supprimer sauf les images
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});
