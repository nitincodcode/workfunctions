var gulp = require('gulp'),
	gutil = require('gulp-util')
	coffee = require('gulp-coffee')
	browserify = require('gulp-browserify')
	compass = require('gulp-compass')
	connect = require('gulp-connect')
	concat = require('gulp-concat');

var sassSources = ['components/sass/style.scss']
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/rclick.js',
				'components/scripts/tagline.js',
				'components/scripts/pixgrid.js',
				'components/scripts/template.js'];

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare:true})).on('error',gutil.log)
		.pipe(gulp.dest('components/scripts'));
});

gulp.task('concat',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('bulid/development/js'))
		.pipe(connect.reload());
});

gulp.task('connect',function(){
	connect.server({
		root:'bulid/development/',
		liveload:true
	})
	});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:'components/sass',
			image:'bulid/development/images',
			style:'expanded'
		}))
		.on('error',gutil.log)
		.pipe(gulp.dest('/bulid/development/css'))
		.pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch('coffeeSources',[coffee]);
	gulp.watch('jsSources',[concat]);
	gulp.watch('components/sass/*.scss',[compass])
})

gulp.task('default',['coffee','compass','concat','connect','watch']);