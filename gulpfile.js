var gulp = require('gulp'),
	gutil = require('gulp-util')
	coffee = require('gulp-coffee')
	concat = require('gulp-concat');

var coffeeSoucres = ['components/coffee/tagline.coffee'];
var jsSoucres = ['components/scripts/rclick.js',
				'components/scripts/tagline.js',
				'components/scripts/pixgrid.js',
				'components/scripts/template.js'];

gulp.task('coffee',function(){
	gulp.src(coffeeSoucres)
		.pipe(coffee({bare:true})).on('error',gutil.log)
		.pipe(gulp.dest('components/scripts'));
});

gulp.task('concat',function(){
	gulp.src(jsSoucres)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('bulid/development/js'));
});