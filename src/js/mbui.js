/**
 * JS组件公用方法
 */
var common = {

  // 初始化
  init: function () {
    common.setColorTheme();
    common.initInputClear();
  },

  // 输入框一键清空
  initInputClear: function () {
    $('.mbui-text').on('focus input', function () {
      if ($(this).val()) {
        $('.mbui-icon-input-clear').addClass('show')
      } else {
        $('.mbui-icon-input-clear').removeClass('show')
      }
    })

    $('.mbui-text').on('blur', function () {
      $('.mbui-icon-input-clear').removeClass('show')
    })
  },

  // 透明头部滚动渐显渐隐
  initHeaderTransparent: function () {
    var _scrollTop = 0,
      _opacity = 0;

    $(window).scroll(function () {
      _scrollTop = $(this).scrollTop();
      if (_scrollTop > 0) {
        $('.mbui-header--transparent').addClass('mbui-header--scroll');
      } else {
        $('.mbui-header--transparent').removeClass('mbui-header--scroll');
      }
      _opacity = (_scrollTop / 150 > 1) ? 1 : _scrollTop / 100;
      $(".mbui-header--transparent").css({ 'background': 'rgba' + '(' + '255,' + '255,' + '255,' + _opacity + ')' });
    })
  },

  // 颜色主题设置
  setColorTheme: function () {
    if (localStorage.getItem('theme')) {
      $('body').addClass(localStorage.getItem('theme'));
    }
  },

  // 页面跳转
  goPage: function (pageUrl) {
    location.href = pageUrl;
  },

  // 禁用滚动
  closeScroll: function () {
    $('html').addClass('mbui-ovh');
    $('body').addClass('mbui-ovh').css('height', '100%');

  },

  // 启用滚动
  openScroll: function () {
    $('html').removeClass('mbui-ovh');
    $('body').removeClass('mbui-ovh').css('height', 'auto');;
  },

  // 打开Action sheet
  openActionsheet: function (id, zIndex) {
    $('#' + id).find('.mbui-overlay').css('zIndex', zIndex);
    $('#' + id).find('.mbui-bottom-panel').css('zIndex', zIndex + 10);
    $('#' + id).addClass('active');
    common.closeScroll();
  },

  // 关闭Action sheet
  closeActionsheet: function (id) {
    $('#' + id).removeClass('active');
    common.openScroll();
  },

  // 打开Slide page
  openSlidePage: function (id, slideType) {
    $('#' + id).addClass('active');
    if (slideType) {
      if ($('[data-slide-overlay]')[0]) {
        $('[data-slide-overlay]').fadeIn(200);
      } else {
        $('body').append('<div style="z-index: 5000;" class="mbui-overlay active" data-slide-overlay>');
      }

      $(document).find('[data-slide-overlay]').on('click', function () {
        common.closeSlidePage(id);
      })
    }
    common.closeScroll();
  },

  // 关闭Slide page
  closeSlidePage: function (id) {
    $('#' + id).removeClass('active');
    if ($('[data-slide-overlay]')[0]) {
      $('[data-slide-overlay]').fadeOut(200);
    }
    common.openScroll();
  },

  // 打开dialog
  openDialog: function (id) {
    $('#' + id).addClass('active');
    this.closeScroll();
  },

  // 关闭dialog
  closeDialog: function (id) {
    $('#' + id).removeClass('active');
    common.openScroll();
  },

  // 打开侧滑菜单
  openOfcanvas: function () {
    $('body').addClass('mbui-ovh has-ofcanvas ofcanvas-active');
    $('body').append('<div class="mbui-overlay active" style="background: rgba(0,0,0,.4);" id="ofcanvas-overlay" onclick="javascript:common.closeOfcanvas();"></div>');
  },

  // 关闭侧滑菜单
  closeOfcanvas: function () {
    $('body').removeClass('mbui-ovh ofcanvas-active');
    $('body').find('#ofcanvas-overlay').remove();
  },

  // 折叠面板
  initCollapse: function () {
    $('.mbui-collapse').on('click', '.mbui-collapse-item__tle', function () {
      // 判断是否支持手风琴效果，即最多只能展开一个面板
      if (typeof ($(this).parents('.mbui-collapse').attr('accordion')) == 'undefined') {  // 不支持
        $(this).parent().toggleClass('mbui-collapse-item--expanded');
      } else {  // 支持
        $(this).parent().toggleClass('mbui-collapse-item--expanded');
        $(this).parent().siblings().removeClass('mbui-collapse-item--expanded');
      }
    })
  },

  // 弹出菜单
  initPopover: function () {
    $('.js-popover').on('click', function (e) {
      e.stopPropagation();
      $('[data-popover]').toggleClass('mbui-hide').toggleClass('animated');
    });

    $(document).on('click', function () {
      $('[data-popover]').addClass('mbui-hide').removeClass('animated');
    });
  },

  // 收藏
  initFav: function () {
    $('.js-fav').on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('span').html('收藏');
        new Toast({ content: '取消收藏', duration: 2000 });
      } else {
        $(this).addClass('active');
        $(this).find('span').html('已收藏');
        new Toast({ type: 'success', content: '收藏成功', duration: 2000 });
      }
    })
  },

  /* 
   * 函数说明：
   * 参数1: 时间的标准格式 2018-09-01 12:50:10 [严格遵守系统会进行校验]
   * 参数2: domId
   * 参数3: 展示类型
   *        1. xx天xx时xx分xx秒
   *        2. xx时xx分xx秒
   *        3. xx:xx:xx
   *        4. xx:xx [xx分:xx秒]
   */
  initCountdown: function (timer, domId, showType) {
    if (!showType) { showType = 1; }
    common.countdownBase(timer, domId, showType);
    setInterval(function () { common.countdownBase(timer, domId, showType); }, 1000);
  },

  countdownBase: function (timer, domId, showType) {
    var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    var res = timer.match(reg);
    if (res == null) { console.log('时间格式错误'); return false; }
    var year = parseInt(res[1]);
    if (year < 1000) { console.log('时间格式错误'); return false; }
    var month = parseInt(res[2]);
    var day = parseInt(res[3]);
    var h = parseInt(res[4]);
    if (h < 0 || h > 24) { console.log('时间格式错误'); return false; }
    var i = parseInt(res[5]);
    if (i < 0 || i > 60) { console.log('时间格式错误'); return false; }
    var s = parseInt(res[6]);
    if (s < 0 || s > 60) { console.log('时间格式错误'); return false; }
    var leftTime = (new Date(year, month - 1, day, h, i, s)) - new Date();
    if (leftTime > 0) {
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
      if (showType == 2 || showType == 3) {
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) + (days * 24);
      } else {
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
      }
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
      var seconds = parseInt(leftTime / 1000 % 60, 10);
    } else {
      var days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;
    }
    var html = '';
    var daysStr = days.toString(),
      daysHtml = '';
    if (daysStr.length < 2) {
      daysHtml += '<span>0</span><span>' + daysStr + '</span>';
    } else {
      for (var i = 0; i < daysStr.length; i++) { daysHtml += '<span>' + daysStr[i] + '</span>'; }
    }
    var hoursStr = hours.toString(),
      hoursHtml = '';
    if (hoursStr.length < 2) {
      hoursHtml += '<span>0</span><span>' + hoursStr + '</span>';
    } else {
      for (var i = 0; i < hoursStr.length; i++) { hoursHtml += '<span>' + hoursStr[i] + '</span>'; }
    }
    var minutesStr = minutes.toString(),
      minutesHtml = '';
    if (minutesStr.length < 2) {
      minutesHtml += '<span>0</span><span>' + minutesStr + '</span>';
    } else {
      for (var i = 0; i < minutesStr.length; i++) { minutesHtml += '<span>' + minutesStr[i] + '</span>'; }
    }
    var secondsStr = seconds.toString(),
      secondsHtml = '';
    if (secondsStr.length < 2) {
      secondsHtml += '<span>0</span><span>' + secondsStr + '</span>';
    } else {
      for (var i = 0; i < secondsStr.length; i++) { secondsHtml += '<span>' + secondsStr[i] + '</span>'; }
    }
    switch (showType) {
      case 1:
        html += daysHtml + '天' + hoursHtml + '时' + minutesHtml + '分' + secondsHtml + '秒';
        break;
      case 2:
        html += hoursHtml + '时' + minutesHtml + '分' + secondsHtml + '秒';
        break;
      case 3:
        html += hoursHtml + ':' + minutesHtml + ':' + secondsHtml;
        break;
      case 4:
        html += minutesHtml + ':' + secondsHtml;
        break;
      default:
        html += daysHtml + '天' + hoursHtml + '时' + minutesHtml + '分' + secondsHtml + '秒';
    }
    var domShow = $(domId);
    domShow.addClass('mbui-countdown');
    $(domId).html(html);
  },

  // 星级评分
  initStarRating: function () {
    $('.js-star').on('click', '.mbui-star-rating__item', function () {
      $(this).parent().find('.mbui-star-rating__item').removeClass('mbui-star-rating__item--active');
      $(this).parent().find('.mbui-star-rating__item:lt(' + ($(this).data('val')) + ')').addClass('mbui-star-rating__item--active');
      $(this).parent().find('input:hidden').val($(this).data('rating'));
      $(this).parent().siblings('.mbui-star-rating__val').html($(this).data('rating'));
    });
  },

  // 概要
  initSummary: function () {
    $('.js-summary').on('click', '.mbui-summary__toggle', function () {
      var parent = $(this).parent(),
        that = $(this);
      if (parent.hasClass('mbui-summary--open')) {
        parent.removeClass('mbui-summary--open');
        that.find('.mbui-summary__toggle-txt').html('查看全部')
      } else {
        parent.addClass('mbui-summary--open');
        that.find('.mbui-summary__toggle-txt').html('收起')
      }
    })
  }
}

/**
 * 第三方JS组件: 数字键盘/密码输入框公用方法
 */
var numberKeypad = {

  // 数字键盘
  initNumberKeyboard: function (obj, options, callback) {
    if (options) {
      obj.on('click', function () {
        obj.NumberKeypad({
          random: (options.random ? options.random : false),
          zIndex: (options.zIndex ? options.zIndex : 1000),
          ciphertext: (options.ciphertext == false ? options.ciphertext : true),
          dot: (options.dot == false ? options.dot : true),
          currency: (options.currency ? options.currency : false),
          max: (options.max ? options.max : false),
          digits: (options.digits ? options.digits : 2),
          type: (options.type == 'number' ? options.type : 'password'),
          callback: callback
        });
      });
    }
  },

  // 密码输入框
  initPasswordInput: function (obj, zIndex, callback) {
    obj.on('click', function () {
      obj.NumberKeypad({
        random: true,
        zIndex: zIndex,
        callback: callback
      });
    })
  }

}

/**
 * 第三方JS组件: Swiper公用方法
 */
var swiper = {

  // banner
  initSwiperBanner: function () {
    new Swiper('[data-swiper-banner]', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      loop: true
    })
  },

  // notice
  initSwiperNotice: function () {
    new Swiper('[data-swiper-notice]', {
      direction: 'vertical',
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      loop: true
    })
  },

  // tab
  initSwiperTab: function (tabView, tabTle, tabCon, tleSlide) {
    var _tleSlide = true;

    if (tleSlide === false) {
      _tleSlide = false;
    }
    
    var _tleSwiper = new Swiper(tabTle, {  //标题
      slidesPerView: tabView,
      observer: true,
      observeParents: true
    });

    var _conSwiper = new Swiper(tabCon, {  //内容
      autoHeight: true,
      observer: true,
      observeParents: true,
      on: {
        slideChangeTransitionEnd: function () {
          tabTle.find('li').removeClass('active');
          tabTle.find('li:eq(' + this.activeIndex + ')').addClass('active');

          if (_tleSlide) {
            _tleSwiper.slideTo(this.activeIndex, 500, false);
          }
        }
      }
    });

    tabTle.find('li').on('click', function () {  //点击切换
      $(this).addClass('active').siblings().removeClass('active');
      _conSwiper.slideTo($(this).index(), 500, false);
    });

    return _conSwiper;
  },

  initTabSticky: function () {
    var ticking = false, // rAF 触发锁
      tabStickyTop = 0,
      headerHeight = 0,
      tabTleTop = 0,
      tabTleFixedStop = 0,
      tabStickyStop = 0;

    // 页面是否有头部
    if ($('.mbui-header')[0]) {
      headerHeight = $('.mbui-header').outerHeight();
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(realFunc);
        ticking = true;
      }
    }

    function realFunc() {
      var scrollTop = $(window).scrollTop();

      // 顶部菜单自动固定
      if ($('[data-tab-sticky]')[0]) {
        $('[data-tab-sticky]').each(function () {
          tabStickyTop = $(this).offset().top,
            tabStickyStop = tabStickyTop + $(this).outerHeight() - $(this).find('.mbui-swiper-tab-tle').outerHeight() - headerHeight;

          if (scrollTop + headerHeight >= tabStickyTop) {
            $(this).find('.mbui-swiper-tab-tle').addClass('mbui-swiper-tab-tle--fixed').css('top', headerHeight);
          } else {
            $(this).find('.mbui-swiper-tab-tle').removeClass('mbui-swiper-tab-tle--fixed').removeAttr('style');
          }

          if (scrollTop >= tabStickyStop) {
            $('[data-tab-sticky]').find('.mbui-swiper-tab-tle').removeClass('mbui-swiper-tab-tle--fixed').css({
              top: 'auto',
              bottom: 0
            });
          }
        });
      }

      ticking = false;
    }

    // 滚动事件监听
    window.addEventListener('scroll', onScroll, false);
  }

}

/**
 * 第三方JS组件: Mobiscroll公用方法
 */
var mobiscroll = {
  // 选项
  initSelect: function (className, inputClass, placeholder) {
    $('.' + className).mobiscroll().select({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      minWidth: 200,
      inputClass: inputClass,
      placeholder: placeholder
      // onSet: handler
    });
  },

  // 地区
  initArea: function (id, inputClass, placeholder, setHandler) {
    if (!placeholder) {
      placeholder = "请点击选择地区";
    }
    $('#' + id).mobiscroll().treelist({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      width: [160, 160, 160],
      placeholder: placeholder,
      inputClass: inputClass,
      onSet: setHandler
    });
  },

  // 日期范围
  initDateRange: function (className, handler) {
    $('.' + className).mobiscroll().range({
      theme: 'mobiscroll',
      lang: 'zh',
      display: 'bottom',
      dateFormat: 'yy.mm.dd',
      onSet: handler
    });
  },

  // 日期
  initDate: function (className) {
    var now = new Date();
    $('.' + className).mobiscroll().date({
      theme: 'ios',  //主题
      lang: 'zh',  //语言
      display: 'bottom', //显示方式
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      dateFormat: 'yy-mm-dd', // 日期格式
      setText: '确定', //确认按钮名称
      cancelText: '取消'//取消按钮名称
    });
  },

  // 生日
  initBirthdayDate: function (dateform, className) {
    var now = new Date(dateform);
    $('.' + className).mobiscroll().date({
      theme: 'ios',  //主题
      lang: 'zh',  //语言
      display: 'bottom', //显示方式
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      dateFormat: 'yy-mm-dd', // 日期格式
      setText: '确定', //确认按钮名称
      cancelText: '取消'//取消按钮名称
    });
  },

  // 时间选择
  initTime: function (className, handler) {
    var now = new Date();
    $('.' + className).mobiscroll().time({
      theme: 'ios',  //主题
      lang: 'zh',  //语言
      display: 'bottom', //显示方式
      headerText: false,
      maxWidth: 90,
      timeFormat: 'HH:ii',
      timeWheels: 'HHii',
      setText: '确定', //确认按钮名称
      cancelText: '取消',//取消按钮名称
      // onSet: function (event,inst) {
      //   console.log(event.valueText);
      // }
      onSet: handler
    });
  },

  // 日期时间
  initDateTime: function (className) {
    var now = new Date();
    $('.' + className).mobiscroll().datetime({
      theme: 'ios',  //主题
      lang: 'zh',  //语言
      display: 'bottom', //显示方式
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      dateFormat: 'yy-mm-dd', // 日期格式
      setText: '确定', //确认按钮名称
      cancelText: '取消',//取消按钮名称
      timeWheels: 'HHii'
    });
  }
}

/**
 * 滑动单元格，基于touch.js
 */
var cellSwipe = {
  // 初始化
  init: function () {
    touch.on('.mbui-line-list--swipe .mbui-line-item .item-tt', 'drag', function (ev) {
      console.log($(this).siblings('.mbui-swipe-btn-group').html());
      var swipeWidth = $(this).siblings('.mbui-swipe-btn-group').outerWidth();

      if (ev.distanceX < 0) {

        $(this).css({
          '-webkit-transform': 'translate3d(-' + swipeWidth + 'px,0,0)',
          'transform': 'translate3d(-' + swipeWidth + 'px,0,0)'
        });

        $(this).parent().removeClass('no-swipe').addClass('is-swipe');

        $(this).parent().siblings().find('.item-tt').removeAttr('style');

        $(this).parent().siblings().removeClass('is-swipe').addClass('no-swipe');

      } else {

        $(this).removeAttr('style');

        $(this).parent().removeClass('is-swipe').addClass('no-swipe');

      }
    })
  }
}

/**
 * 第三方JS组件：Smart Photo公用方法
 */
var smartPhoto = {
  init: function (options) {
    if (options) {
      $(".js-img-viwer").SmartPhoto({
        arrows: (options.arrows == false ? options.arrows : true),
        nav: (options.nav == false ? options.nav : true),
        useOrientationApi: (options.useOrientationApi == false ? options.useOrientationApi : true),
        resizeStyle: (options.resizeStyle == 'fit' ? options.resizeStyle : 'fill'),
        animationSpeed: (options.animationSpeed ? options.animationSpeed : 300),
        forceInterval: (options.forceInterval ? options.forceInterval : 10)
      });
    } else {
      $(".js-img-viwer").SmartPhoto();
    }
  }
}

/**
 * 第三方JS组件: Masonry公用方法
 */
var masonry = {
  init: function () {
    $('.mbui-waterfall').masonry({
      // options
      itemSelector: '.mbui-waterfall__item'
    });
  }
}

$(function () {

  // 初始化
  common.init();

});
var Msgbox = (function ($) {

  var HTMLS = {
    alert: '<span class="ft-btn ft-btn--primary js-btn-alert">确定</span>',
    confirm: '<span class="ft-btn js-btn-cancel">取消</span><span class="ft-btn ft-btn--primary js-btn-confirm">确定</span>',
    prompt: '<span class="ft-btn js-btn-cancel">取消</span><span class="ft-btn ft-btn--primary js-btn-prompt">确定</span>'
  }
  
  var Msgbox = function () {
    this.cfg = {
      content: '',
      text4AlertBtn: '确定',
      text4Title: '提示',
      handler4AlertBtn: null,
      handler4ConfirmBtn:null,
      handler4CancelBtn:null,
      handler4PromptConfirmBtn:null
    };

    this.handlers = {

    };

    this.get = function (n) {
      return this.cfg[n];
    }

    this.set = function (n,v) {
      this.cfg[n] = v;
    }

    this.init();
  }

  Msgbox.prototype = {

    init: function () {

      this.createDom();
      //this.bindEvent();

    },

    on: function(type,handler){
      if (typeof this.handlers[type]=='undefined') {
        this.handlers[type]=[];
      }
      this.handlers[type].push(handler);
    },

    fire: function(type,data){
      if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        for(var i=0,len=handlers.length;i<len;i++){
          handlers[i](data);
        }
      };
    },

    createDom: function () {

      var body = $('body'),
          msgboxWrap = null,
          overlay = null,
          msgbox = null,
          msgboxBd = null,
          msgboxTle = null,
          bdTxt = null,
          prompt = null,
          msgboxFt = null;


      if ($('.mbui-msgbox-wrap').length == 0) {
        msgboxWrap = $('<section class="mbui-msgbox-wrap">'),
        overlay = $('<div class="mbui-overlay"></div>'),
        msgbox = $('<div class="mbui-msgbox">'),
        msgboxTle = $('<h4 class="mbui-msgbox-tle">'),
        msgboxBd = $('<div class="mbui-msgbox-bd">'),
        bdTxt = $('<p class="bd-txt">'),
        msgboxFt = $('<footer class="mbui-msgbox-ft">');
        msgboxWrap.appendTo(body);                
        overlay.appendTo(msgboxWrap);
        msgbox.appendTo(msgboxWrap);
        msgboxTle.appendTo(msgbox);
        msgboxBd.appendTo(msgbox);
        bdTxt.appendTo(msgboxBd);
        msgboxFt.appendTo(msgbox);
      }

      this.set('msgboxWrap',$('.mbui-msgbox-wrap'));

    },

    alert: function (cfg) {
      var CFG = $.extend(this.cfg,cfg),
          msgboxWrap = this.get("msgboxWrap"),
          _this = this;
      CFG.content = typeof CFG.content === 'string' ? CFG.content : CFG.content.toString();
      msgboxWrap.find('.mbui-msgbox-tle').html(CFG.text4Title);
      msgboxWrap.find('.bd-txt').html(CFG.content);
      if (typeof CFG.text4AlertBtn == "undefined") {
        msgboxWrap.find('.mbui-msgbox-ft').html(HTMLS.alert);
      } else {
        msgboxWrap.find('.mbui-msgbox-ft').html('<span class="ft-btn ft-btn--primary js-btn-alert">'+CFG.text4AlertBtn+'</span>');
      }
      msgboxWrap.addClass('active');
      var alertBtn = msgboxWrap.find('.js-btn-alert');
      alertBtn.on('click',function() {
        msgboxWrap.removeClass('active');
        _this.fire('alert');
        _this = null;
      });
      if (CFG.handler4AlertBtn) {
        this.on('alert',CFG.handler4AlertBtn);
      }
    },

    confirm: function (cfg) {
      var CFG = $.extend(this.cfg,cfg),
          msgboxWrap = this.get("msgboxWrap"),
          _this = this;
      CFG.content = typeof CFG.content === 'string' ? CFG.content : CFG.content.toString();
      msgboxWrap.find('.mbui-msgbox-tle').html(CFG.text4Title);
      msgboxWrap.find('.bd-txt').html(CFG.content);
      msgboxWrap.find('.mbui-msgbox-ft').html(HTMLS.confirm);
      msgboxWrap.addClass('active');
      var cancelBtn = msgboxWrap.find('.js-btn-cancel'),
          confirmBtn = msgboxWrap.find('.js-btn-confirm');
      cancelBtn.on('click', function () {
        msgboxWrap.removeClass('active');
        _this.fire('cancel');
        _this = null;
      });
      confirmBtn.on('click', function () {
        msgboxWrap.removeClass('active');
        _this.fire('confirm');
        _this = null;
      });
      msgboxWrap.find('.mbui-overlay').on('click', function () {
        msgboxWrap.removeClass('active');
        _this = null;
      });
      if (CFG.handler4CancelBtn) {
        this.on('cancel',CFG.handler4CancelBtn);
      }
      if (CFG.handler4ConfirmBtn) {
        this.on('confirm',CFG.handler4ConfirmBtn);
      }
    },

    prompt: function (cfg) {
      var CFG = $.extend(this.cfg,cfg),
          msgboxWrap = this.get("msgboxWrap"),
          _this = this;
      CFG.content = typeof CFG.content === 'string' ? CFG.content : CFG.content.toString();
      msgboxWrap.find('.mbui-msgbox-tle').html(CFG.text4Title);
      msgboxWrap.find('.mbui-msgbox-bd').html('<input class="prompt-input">');
      setTimeout(function () {
        msgboxWrap.find('.mbui-msgbox-bd').find('.prompt-input').focus();
      }, 200);
      msgboxWrap.find('.mbui-msgbox-ft').html(HTMLS.prompt);
      msgboxWrap.addClass('active');
      var cancelBtn = msgboxWrap.find('.js-btn-cancel'),
          confirmBtn = msgboxWrap.find('.js-btn-prompt');
      cancelBtn.on('click', function () {
        msgboxWrap.remove();
        _this.fire('cancel');
        _this = null;
      });
      confirmBtn.on('click', function () {
        if (!$('#promptInput')[0]){
          $('body').append('<input type="hidden" id="promptInput" value="'+$('.prompt-input').val()+'">');
        } else {
          $('#promptInput').val($('.prompt-input').val());
        }
        msgboxWrap.remove();
        _this.fire('prompt');
        _this = null;
      });
      msgboxWrap.find('.mbui-overlay').on('click', function () {
        msgboxWrap.remove();
        _this = null;
      });
      if (CFG.handler4CancelBtn) {
        this.on('cancel',CFG.handler4CancelBtn);
      }
      if (CFG.handler4ConfirmBtn) {
        this.on('prompt',CFG.handler4ConfirmBtn);
      }
    }

  };

  // var obj = new msgbox();
  // window.alert = function(content, cb, btnTxt) {
  //     obj.alert.call(obj, content, cb, btnTxt);
  // };
  // window.confirm = function(content, cb) {
  //     obj.confirm.call(obj, content, cb);
  // };

  //返回构造函数
  return Msgbox;

})($);
// 纯文字  带图标  加载中
var Toast = (function ($) {
  
  var Toast = function (cfg) {
    var cfg = cfg || {};

    this.get = function (n) {
      return cfg[n];
    }

    this.set = function (n,v) {
      cfg[n] = v;
    }

    this.init(cfg);
  }

  Toast.prototype = {

    init: function (cfg) {

      var type = cfg.type ? cfg.type : 'normal',
          duration = cfg.duration ? cfg.duration : undefined,
          html = cfg.html ? cfg.html : undefined;

      this.createDom(type,html,cfg.content);
      this.bindEvent(duration);

    },

    createDom: function (type,html,content) {

      var body = $('body');

      if ($('.mbui-toast-wrap').length == 0) {
        var toastWrap = $('<section class="mbui-toast-wrap">'),
            toast = $('<div class="mbui-toast">'),
            toastTxt = $('<p class="mbui-toast-txt">');
        toastTxt.html(content);
        toastWrap.appendTo('body');
        toast.appendTo(toastWrap);
        var icon = '';
        if (type == 'success') {
          icon = $('<svg class="mbui-icon" aria-hidden="true"><use xlink:href="#icon-success"></use></svg>');
        } else if (type == 'fail') {
          icon = $('<svg class="mbui-icon" aria-hidden="true"><use xlink:href="#icon-shanchu2"></use></svg>');
        } else if (type == 'loading') {
          icon = $('<i class="mbui-toast-icon icon-loading">');
        } else if (type == 'custom') {
          icon = $(html);
        }
        if(icon) {
          icon.appendTo(toast);
        }
        toastTxt.appendTo(toast);
      }

      this.set('toastWrap',$('.mbui-toast-wrap'));

    },

    hide: function () {
      var _this = this;
      var toastWrap = _this.get('toastWrap');
      toastWrap.remove();
      _this = null;
    },

    bindEvent: function (duration) {
      var _this = this;
      var toastWrap = _this.get('toastWrap');
          toastWrap.addClass('active');
      if (typeof duration != 'undefined') {
        setTimeout(function () {
          toastWrap.remove();
          _this = null;
        }, duration);
      }      
    }

  };

  //返回构造函数
  return Toast;

})($);