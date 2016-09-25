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

function compileLESS() {
	return gulp
		.src(PATHS.less)
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest(`${PATHS.build}/css`));
}

function minifyStyles() {
	return gulp
		.src(`${PATHS.build}/css/*.css`)
		.pipe(cleanCSS())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(PATHS.build));
}

const styles = gulp.series(compileLESS, minifyStyles);
const build = gulp.series(clean, gulp.parallel(html, styles));

// FIXME: See https://github.com/sindresorhus/del/issues/45
// function build() {
// 	return gulp.series(clean, gulp.parallel(html, styles));
// }

function watch() {
	gulp.watch(PATHS.html, html)
	gulp.watch(PATHS.less, styles);
}

gulp.task('default', build);
gulp.task('watch', gulp.series(build, watch));