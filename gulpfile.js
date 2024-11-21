const gulp = require("gulp");
const clean = require("gulp-clean");
const copy = require("gulp-copy");
const { spawn } = require("child_process");

// 清空 miniprogram_dist 目录
gulp.task("clean", function () {
  return gulp
    .src("miniprogram_dist", { read: false, allowEmpty: true })
    .pipe(clean());
});

// 复制文件到 miniprogram_dist
gulp.task("copy", function () {
  return gulp.src(["src/components/**/*","src/index.js"]).pipe(copy("miniprogram_dist", { prefix: 1 }));
});

// 打包完成后打印日志
gulp.task("log", function (done) {
  console.log("打包完成");
  done();
});

// 执行 npm publish 并支持 OTP 输入
gulp.task("publish", function (done) {
  const publish = spawn("npm", ["publish"], { stdio: "inherit", shell: true });

  publish.on("close", (code) => {
    if (code === 0) {
      console.log("发布成功");
      done();
    } else {
      console.error(`发布失败，退出代码: ${code}`);
      done(new Error("发布失败"));
    }
  });
});

// 默认任务：清空 + 复制 + 打印日志 + 发布
gulp.task("default", gulp.series("clean", "copy", "log", "publish"));