import del from 'del';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';

const PATHS = {
	html: ['./index.html'],
	less: ['./less/**/*.less', './node_modules/bootstrap/less/bootstrap.less'],
	build: 'build',
};

function clean() {
	return del(PATHS.build);
}

function html() {
	return gulp
		.src(PATHS.html)
		.pipe(gulp.dest(PATHS.build));
}

function styles() {
	return gulp
		.src(PATHS.less)
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest(`${PATHS.build}/css`));
}

function minifyCSS() {
	return gulp
		.src(`${PATHS.build}/css/*.css`)
		.pipe(cleanCSS())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(PATHS.build));
}

// function build(done) {
// 	return gulp.series(clean, html, styles, minifyCSS);
// }

gulp.task('default', gulp.series(clean, html, styles, minifyCSS));