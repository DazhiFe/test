$(function () {
  init();

  // 充值
  $('.js-chongzhi').on('click', '.mod-equal__item', function () {
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).data('rel') === 'other') {
      $('#other').removeClass('mbui-hide');
    } else {
      $('#other').addClass('mbui-hide');
    }
  })
})

function init() {
  if (typeof Swiper != 'undefined') {
    // swiper banner 初始化
    swiper.initSwiperBanner();
  }
}