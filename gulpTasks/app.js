const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');


function appHtml(){

  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
}

function appCss(){

  return gulp.src('src/assets/sass/index.scss')
    .pipe(sass().on('error', sass.logError)) // mostrar erro quando houver
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('app.min.css'))// criando o arquivo
    .pipe(gulp.dest('build/assets/css'))
}

function appJs(){
  return gulp.src('src/assets/js/**/*.js')
    .pipe(babel({presets: ['ENV']})) 
    .pipe(uglify())
    .pipe(concat('app.min.js'))// criando o arquivo
    .pipe(gulp.dest('build/assets/js'))


}

function appImg(){

  return gulp.src('src/assets/imgs/**/*.*') // pega todas a imagens e joga para pasta de destino
     .pipe(gulp.dest('build/assets/imgs')) // tudo que for de imagens ele vai salvar  no build
    
}

gulp.task('appHtml', appHtml)
gulp.task('appCss', appCss)
gulp.task('appJs', appJs)
gulp.task('appImg', appImg)


module.exports = {
  appHtml,
  appCss,
  appJs,
  appImg
}