var src = './src',
    dist = './dist';

module.exports = {
  html: {
    all: src + '/**/*.html',
    src: src + '/*.html',
    dist: dist,
    exclude: '!' + src + '/tpl/*.html'
  },

  sass: {
  	all: src + '/sass/**/*.scss',  // 所有scss
  	src: src + '/sass/*.scss',     // 需要编译的scss
    dev: src + '/css',           // 开发 输出目录
  	dist: dist + '/css',           // 线上 输出目录
  	settings: {                    // 编译过程中需要的配置，可以为空
      outputStyle: 'compressed'       // 编译输出方式：nested expanded compact compressed
  	}
  },

  css: {
    src: src + '/css/**/*',
    dist: dist + '/css'
  },

  images: {
  	src: src + '/images/**/*',
  	dist: dist + '/images'
  },

  js: {
  	src: src + '/js/**/*',
  	dist: dist + '/js'
  },

  clean: {
  	src: dist
  },

  bootstrap: {
    src: src + '/bootstrap/**/*',
    dist: dist + '/bootstrap'
  },

  usemin: {
    src: dist + '/**/*.html',
    dist: dist
  },

  rev: {
    revJson: dist + '/rev/**/*.json',
    revCss: dist + '/rev/css',
    src: '*.html',
    dist: ''
  }
}