const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

//Image
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
 
    src('src/scss/**/*.scss') //Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) //Compilar
    .pipe(dest('build/css')); //Almacenar en el disco duro
    

    done(); //Finaliza la tarea//
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

function versionAvif(done) {

    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (versionWebp, versionAvif, dev);