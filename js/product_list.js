//引入头部
show_header();
//加载产品
show_product();
function show_product(pno = 1, kw = "") {
  $.ajax({
    url: "data/product/list.php",
    data: { pno: pno, kw: location.search.split("=")[1] },
    success: function (pager) {
      //console.log(pager);
      var data = pager.data;
      //console.log(data);
      var html = "";
      if (data.length == 0) {
        html = `<h3>还没有你想要的商品，<a href="02_product_list.html">换个试试</a></h3>`;
        $("#choose_product").html(html);
      } else {
        for (i = 0; i < data.length; i++) {
          html += ` 
            <li> 
           <a href="03_product_details.html?lid=${
             data[i].lid
           }"class="image"><img src="${data[i].pic}" alt=""></a>       
           <p class="price">￥${data[i].price}</p>

           <a href="javascript:;"  class="title">
			   <span>${data[i].title.split(/\d*.\d*英寸/)[0]}
		        </span>${data[i].title.match(/\d*.\d*英寸/)[0]}
		        <span>${
              data[i].title.split(/\d*.\d*英寸/)[1].split(/笔记本/)[0]
            }笔记本</span>
			   ${data[i].title.split(/笔记本/)[1]}
			   </a>       
           <p  class="btn">
           <button class="fav">关注</button>
           <button class="addcart">加入购物车</button></p>
            <p class="hot">热评: 
           <a href="javascript:;" ><span>${data[i].sold_count}</span></a>条</p>
           </li>

       `;
        }
        $("#choose_product>ul").html(html);
      }

      //加载分页效果
      var pages = `<a class=${pager.pno == 1 ? "disabled" : ""}>上一页</a>`;
      for (var i = 1; i <= pager.pageCount; i++) {
        pages += ` <a data-page="${i}" class=${
          pager.pno == i ? "active" : ""
        } >${i}</a> `;
      }
      pages += `<a class=${
        pager.pno == pager.pageCount ? "disabled" : ""
      }>下一页</a>`;
      $("#product_page").html(pages);
      $("#product_page>a:not(:last-child):not(:first-child)").click(function (
        e
      ) {
        e.preventDefault();
        // console.log(1321);
        $(this).siblings("a").removeClass("active");
        $(this).addClass("active");
        show_product($(this).attr("data-page"), "");
      });
      $("#product_page>a:first-child").click(function (e) {
        e.preventDefault();
        if (pager.pno != 1) {
          show_product(pager.pno - 1, "");
        }
      });
      $("#product_page>a:last-child").click(function (e) {
        e.preventDefault();
        if (pager.pno != pager.pageCount) {
          show_product(pager.pno + 1, "");
        }
      });
      /**************************************
//购物车的飞入效果
**************************************/
      $("div.choose_product ul>li .addcart").click(function (e) {
        var $img = $(this).parents("li").find("img");
        var $imgClone = $(this).parents("li").find("img").clone();
        $("body").append($imgClone);
        //起始位置
        var $top_start = $img.offset().top - $(window).scrollTop() + 100;
        var $right_start = $(window).width() - $img.offset().left - 100;
        $imgClone.css({
          width: "100px",
          height: "100px",
          position: "fixed",
          top: $top_start + "px",
          right: $right_start + "px",
        });
        var $top_end =
          $("div.aside_right li>a.cart").offset().top - $(window).scrollTop();
        var $cart_span = $("div.aside_right li>a.cart span");
        setTimeout(() => {
          $imgClone.css(
            {
              width: "20px",
              height: "20px",
              position: "fixed",
              top: $top_end + "px",
              right: "0px",
              transition:
                "all " + $right_start / $(window).width() + "s  linear",
            },
            10
          );
          setTimeout(() => {
            $imgClone.remove();
            $cart_span.html(parseInt($cart_span.html()) + 1);
          }, ($right_start / $(window).width()) * 1000 + 10);
        });
      });
    },
  });
}
/**
 **高级选择中的弹出显示移入移出显示
 */
var $choosea = $("div.choose_more>dl>dd:last-child a");
var $showa = $choosea;
var $choose_lastinfo = $("div.choose_more>div.last_info");
$choosea.mouseenter(function () {
  $showa = $(this);
  $showa.css({
    border: "1px solid #666",
    "border-bottom": 0,
    "z-index": 2,
  });
  $showa.find("img").css({
    transform: "rotate(180deg)",
    transition: "transform 0.3s linear",
  });
  // console.log($showa.attr("data-info"));
  $choose_lastinfo.find("div").css("display", "none");
  $choose_lastinfo.find("." + $showa.attr("data-info")).css("display", "block");
  $choose_lastinfo.css("display", "block");
});
$showa.mouseleave(function () {
  $(this).css({
    border: "1px solid #ddd",
    "z-index": 0,
  });
  $showa.find("img").css({
    transform: "rotate(0deg)",
    transition: "transform 0.3s linear",
  });
  $choose_lastinfo.css("display", "none");
});
$choose_lastinfo.mouseenter(function () {
  $showa.css({
    border: "1px solid #666",
    "border-bottom": 0,
    "z-index": 2,
  });
  $showa.find("img").css({
    transform: "rotate(180deg)",
  });
  $(this).css("display", "block");
});
$choose_lastinfo.mouseleave(function () {
  $showa.css({
    border: "1px solid #ddd",
    "z-index": 0,
  });
  $showa.find("img").css({
    transform: "rotate(0deg)",
  });
  $(this).css("display", "none");
});

/***************************
 *.choose_order中的排序鼠标事件
 *******************************/
var $order_a = $("div.product_choose_list div.choose_order>a");
var $order_span = $("div.product_choose_list div.choose_order>a span");
$order_a.click(function (e) {
  e.preventDefault();
  $order_a.removeClass("choose_order_active");
  $(this).addClass("choose_order_active");
  $order_span.css(
    "background",
    "url(img/product_list/logo/sprite-arrow.png) no-repeat 0 -97px"
  );
  $(this)
    .find("span")
    .css(
      "background",
      "url(img/product_list/logo/sprite-arrow.png) no-repeat 0 -115px"
    );
  // $(this).css("background","#E4393c");
  if ($(this).attr("data-order") == "down") {
    $(this).attr("data-order", "up");
    $(this).find("span").css("transform", "rotate(180deg)");
  } else {
    $(this).attr("data-order", "down");
    $(this).find("span").css("transform", "rotate(0deg)");
  }
});

//鼠标移入边栏中的li时显示文字信息
$("div.aside_right>ul>li").mouseenter(function () {
  $(this).css("background", "#E4393c");
  $(this).children("span").css({
    background: "#E4393c",
    right: "40px",
    display: "block",
  });
});
$("div.aside_right>ul>li").mouseleave(function () {
  $(this).css("background", "#7A6E6E");
  $(this).children("span").css({
    background: "none",
    right: "-100px",
    display: "none",
  });
});
