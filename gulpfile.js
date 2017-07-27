// 引入 gulp及组件
var gulp    = require('gulp'),						//基础库
    // useref = require('gulp-useref'),
    // gulpif = require('gulp-if'),
    // usemin = require('gulp-usemin'),
    // htmlmin = require('gulp-htmlmin'),				//html压缩
    // imagemin = require('gulp-imagemin'),			//图片压缩
    sass = require('gulp-ruby-sass'),				//sass
    runSequence = require('run-sequence'),          //序列
    del = require('del'),                           //删除文件夹
    // minifyCss = require('gulp-minify-css'),   		//css压缩
    // autoprefixer = require('gulp-autoprefixer'),	//自动处理浏览器前缀
    // jshint = require('gulp-jshint'),				//js检查
    // eslint = require('gulp-eslint'),
    jsdoc = require("gulp-jsdoc");					//js文档生成
    // uglify  = require('gulp-uglify'),				//js压缩
    // rename = require('gulp-rename'),				//重命名
    // concat  = require('gulp-concat'),				//合并文件
    // clean = require('gulp-clean'),					//清空文件夹
    // tinylr = require('tiny-lr'),
    // server = tinylr(),
    // port = 35729,
    // livereload = require('gulp-livereload'),   		//livereload
    // rev = require('gulp-rev'),
    // revappend = require('gulp-rev-append'),			//版本控制
    // revCollector = require('gulp-rev-collector'),	//路径替换
    // through = require('through2'),
    // modify = require('modify-filename');

//删除文件夹
gulp.task('clean', function (done) {
    return del(['dist'], done);
});
//sass处理
gulp.task('sass', function () {
    /**
     * style有以下4种选择：
     * nested：嵌套缩进，它是默认值
     * expanded：每个属性占一行
     * compact：每条样式占一行
     * compressed：整个压缩成一行
     */
    sass('src/css/scss/**/*.scss',{'style':'compact'})
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/scss'));
});
// js处理
gulp.task('jsdoc', function () {
    gulp.src('src/custom/*.js')
        .pipe(jsdoc('dist/jsdoc/custom'));
});

//默认任务
gulp.task('default', function (done) {
    runSequence('clean', ['sass', 'jsdoc'], 'inject', one);
});