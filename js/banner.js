/**
 * Created by Tarena on 2017/10/16.
 */
//获取banner中的相关元素（小圆点和图片）
var imglist = document.querySelectorAll("div.banner>ul.image>li");
var pointlist = document.querySelectorAll("div.banner>ul.point>li>em");
bannerChange(imglist, "img-change", "img-clear");
bannerChange(pointlist, "point-change", "point-clear");
//为图片和小圆点设置定时切换
var timer = "";
Timer();
//为小圆点设置点击事件
for (let i = 0; i < pointlist.length; i++) {
  pointlist[i].onclick = function () {
    for (var t = 0; t < pointlist.length; t++) {
      pointlist[t].className = "point-clear";
      imglist[t].className = "img-clear";
    }
    this.className = "point-change";
    imglist[i].className = "img-change";
    clearInterval(timer);
    setTimeout(function () {
      Timer();
    }, 1);
  };
}
//图片和小圆点的定时器函数
function Timer() {
  timer = setInterval(function () {
    bannerChange(imglist, "img-change", "img-clear");
    bannerChange(pointlist, "point-change", "point-clear");
  }, 3000);
}
//list元素的切换函数（change为变换后的class样式，clear为变换前的class样式）
function bannerChange(list, change, clear, n = 1) {
  var i = 0;
  for (var t = 0; t < list.length; t++) {
    if (list[t].className == change) {
      i = t + n;
    }
    list[t].className = clear;
  }
  if (i >= list.length) {
    i = 0;
  } else if (i < 0) {
    i = 3;
  }
  list[i].className = change;
}
//为两侧的按钮做点击事件
var a_prev = document.querySelector("div.banner>a.ck-prev");
var a_next = document.querySelector("div.banner>a.ck-next");
a_prev.onclick = () => {
  next(-1);
};
a_next.onclick = () => {
  next(1);
};
function next(n) {
  bannerChange(imglist, "img-change", "img-clear", n);
  bannerChange(pointlist, "point-change", "point-clear", n);
}
//鼠标移入移出事件
var div_banner = document.querySelector("div.banner");
div_banner.onmouseenter = function () {
  clearInterval(timer);
  //移入时已清除定时器无需在清除
};
div_banner.onmouseleave = function () {
  setTimeout(function () {
    Timer();
  }, 1);
};
