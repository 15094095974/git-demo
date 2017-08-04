/**
 * Created by Administrator on 2017/8/2.
 * 1、less编译、压缩、合并
 * 2、js合并、压缩、混淆
 * 3、img复制
 * 4、html压缩
 */

//在gulpfile.js里面引入gulp包，因为里面提供了一些api
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");

//1、less编译、压缩、合并,合并一般没有必要，因为css预处理文件都可以导包
gulp.task("style",function(){
    //这里时执行style任务执行的
    gulp.src(["src/styles/*.less","!src/styles/_*.less"])    //!叹号是不匹配的意思
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest("dist/styles/"))
    .pipe(browserSync.reload({
        stream:true
    }));
});

//2、js合并、压缩、混淆
gulp.task("script",function(){
    gulp.src("src/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts/"))
    .pipe(browserSync.reload({
        stream:true
    }));
});

//3、img复制
gulp.task("image",function(){
    gulp.src("src/images/*.*")
    .pipe(gulp.dest("dist/img/"))
    .pipe(browserSync.reload({
        stream:true
    }));
});

//4、html压缩
gulp.task("html",function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src("src/*.html")
        .pipe(htmlmin(options))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.reload({
            stream:true
        }));
});

var browserSync = require("browser-sync");
gulp.task("serve",function(){
    browserSync({
        server: {
            baseDir:["dist/"]
        }
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch("src/styles/*.less",["style"]);

    gulp.watch("src/scripts/*.js",["script"]);
    gulp.watch("src/images/*.*",["image"]);
    gulp.watch("src/*.html",["html"]);
});