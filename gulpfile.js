//const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browsersync = require('browser-sync').create();
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const del = require('delete');

// const clean = (done) => {
//   console.log('clean');
//   done();
// }

// const build = (done) => {
//   console.log('build');
//   done();
// }

// const defaultTask = (done) => {
//   done();
// }

// const streamTask = (done) => {
//   return src('*.js')
//     .pipe(dest('output'));
// }

///////////////////////////////////////////////////
/**
 * Watch Sass File --> Compile Sass
 */
// Compile Sass
const compileSass = () => {
  return src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(dest('dist/css'));
}
// Compile Pug
const compilePug = () => {
  return src('src/pug/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('dist/html'));
}

// Watch Files
const watchFiles = () => {
  watch('src/sass/**/*.scss', compileSass);
  watch('src/pug/**/*.pug', compilePug);
}

// Execute
exports.default = watchFiles;
//exports.default = series(compileSass);
///////////////////////////////////////////////////////

// exports.build = build;
// exports.clean_build = series(clean, build);
// exports.streamTask = streamTask;
// exports.default = defaultTask; // npx gulp

// exports.default = function() {
//   return src('src/*.js')
//     .pipe(babel())
//     .pipe(src('vendor/*.js'))
//     .pipe(dest('output/'))
//     .pipe(uglify())
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(dest('output/'));
// };

// exports.default = function() {
//   watch('src/*.css', css);
//   watch('src/*.js', series(clean, javascript));
// };

// exports.watch = function() {
//   watch(['input/*.js', '!input/_*.js'], function(done) {
//     // body omitted
//     done();
//   });
// }

////////////////////////////////////
gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    '!src/**/*.scss'
  ])
  .pipe(gulp.dest('html'))
  .pipe(browsersync.stream());
});

gulp.task('cp', (done) => {
  gulp.src([
    'src/index.html',
    '!src/css/*.scss',
    'src/css/*.css',
    'src/js/scripts.js'
  ],{
    base: 'src' // 基準のディレクトリ
  })
  .pipe(gulp.dest('dist'));
  done();
});

gulp.task('watch', (done) => {
  browsersync.init({
    server: {
//      baseDir: "html"
      baseDir: "./"
    }
  });

  gulp.watch(['src/**/*.scss'], gulp.series('sass'));
  gulp.watch([
    'src/**/*',
    '!src/**/*.scss'
  ], gulp.series('copy'));
  done();
});

// 変更を監視
// 同期処理
// gulp.task('watch', (done) => {
//   gulp.watch(['src/**/*.scss'], gulp.series('sass'));
//   gulp.watch([
//     'src/**/*',
//     '!src/**/*.scss'
//   ], gulp.series('copy'));
//  gulp.watch(['src/**/*'], gulp.task('copy'));
  // done();
// });
// 非同期処理
// gulp.watch(['src/**/*'], gulp.parallel('aaa', 'bbb'));
// aaaとbbbは非同期、cccは同期
// gulp.watch(['src/**/*'],
//   gulp.seried(
//     gulp.parallel('aaa', 'bbb'),
//     'ccc'
//   ));

// プラグイン(gulp-sass)の利用 - scss --> css
// npm i gulp-sass -D
gulp.task('sass', (done) => {
  gulp.src(['src/**/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('css'))
  .pipe(browsersync.stream());
  done();
});
// reload
// gulp.task('js', (done) => {
//   gulp.src('src/**/*.js')
//   done();
// });

// gulp.task('js-watch', gulp.series('js'), browsersync.reload);
// gulp.watch("src/**/*.js",gulp.series('js-watch'));

//
gulp.task('default', gulp.series('copy', 'sass', 'watch', (done) => {
  done();
  console.log('Default all tasks done!');
}));

///////////////
// BrowserSync
///////////////
// サーバー起動
// gulp.task('build-server', (done) => {
//   browsersync.init({
//     server: {
//       baseDir: 'src'
//     }
//   });
//   done();
//   console.log('Server was launched');
// });

// 監視ファイル
// gulp.task('watch-files', (done) => {
//   gulp.watch("src/**/*.html", gulp.task('browser-reload'));
//   gulp.watch("src/**/*.css", gulp.task('browser-reload'));
//   gulp.watch("src/**/*.js", gulp.task('browser-reload'));
//   done();
//   console.log('gulp watch started');
// });

// ブラウザのリロード
// gulp.task('browser-reload', (done) => {
//   browsersync.reload();
//   done();
//   console.log('Browser reload completed');
// });

// タスクの実行
// gulp.task('default', gulp.series('build-server', 'watch-files', (done) => {
//   done();
//   console.log('Default all tasks done!');
// }));

////////////////
// 監視ファイル
////////////////
gulp.task('watch-files', (done) => {
  gulp.watch("../*/*.html", gulp.task('browser-reload'));
  gulp.watch("../*/*.css", gulp.task('browser-reload'));
  gulp.watch("../*/*.js", gulp.task('browser-reload'));

  gulp.watch("../*/*.scss",gulp.series('sass-compile'));

  done();
  console.log(('gulp watch started'));
});

// scss用のコンパイル作業
gulp.task('sass-compile', (done) => {
  gulp.src('../scss/*.scss') // scssがあるパスを指定
    .pipe(sass().on('error', sass.logError)) // scssコンパイル実行
    .pipe(gulp.dest('../css')); // 書き出し先
  done();
});

gulp.task('default', gulp.series('build-server', 'watch-files', 'sass-compile', (done) => {
  done();
  console.log('Default all task done!');
}));

/////////////////////
// gulp.taskは非推奨
/////////////////////
const { src, dest, watch, parallel } = require("gulp"),
 browsersync = require('browser-sync').create();

const taskServer = (done) => {
 browsersync.init({
  server: {
   baseDir: 'dist/',
   index: 'index.html'
  },
  port: 2000
 })
 done();
};
const taskReload = (done) => {
 browsersync.reload();
 done();
};

// Wacth
const taskWatch = (done) => {
 watch('dist/**/*', taskReload);
 done();
}

exports.default = parallel(taskServer, taskWatch);
