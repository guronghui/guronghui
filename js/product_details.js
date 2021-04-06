//引入头部
show_header();
//头部的收索功能
$.ajax({
  url: "data/product/details.php",
  data: "lid=" + location.search.split("=")[1],
  success: function (result) {
    //console.log(result.details.picList);
    var img = result.details.picList;
    var html = "";
    html += `<div id="md-images" class="md-images">`;

    for (i = 0; i < img.length; i++) {
      html += ` 
    <div id="" class="md-image">
            <img src="${img[i].md}">
    </div>`;
    }
    html += `
	</div>
		<div id="" class="md-mouse-move"></div>
		<div id="" class="md-mouse-over"></div>
		<div id="" class="sm-image-box">
		  <div id="" class="sm-image-prev">
		  </div>
			<div id="" class="sm-image-next"> 
		  </div>
		 <div id="" class="sm-images">
	`;
    for (i = 0; i < img.length; i++) {
      html += ` 
    <div id="" class="sm-image">
           <img src="${img[i].sm}">
    </div> `;
    }

    html += ` 
	</div>  
    </div>
   <div class="product_lg_lgbox">
	`;
    for (i = 0; i < img.length; i++) {
      html += ` 
    <div id="" class="lg-image">
            <img src="${img[i].lg}">
    </div>`;
    }
    html += `
	   </div>
    <div  class="product_info_box">
        <div id="" class="product_name">          
          <p>戴尔DELL灵越燃7000 II R1605S 14.0英寸轻薄窄边框笔记本电脑(i5-8250U 8G 256GSSD IPS Win10)银</p>
        </div>
      <div id="" class="product_title">          
      <p>【时尚轻薄窄边框】三边全景7mm微边框、77% 超高屏占比、金属材质，八代CPU，全高清IPS显示屏</p>
      </div>
       <div id="" class="product_price"> 
       <span class=""> 价 格 <span></span></span>
        <p>￥：<span class="">5299.00</span></p>
       </div>
        <div id="" class="product_sales">
          <span class="">促 销 <span></span></span>
               <p>
                 <span class="product_sales_name">限制</span><span>此价格不与套装优惠同时享受 <br></span>
                 <span class="product_sales_name">换购</span><span>购买1件可优惠换购热销商品 立即换购 >><br></span>
                 <span class="product_sales_name">满送</span><span>满1000元另加99元即赠热销商品，赠完即止，请在购物车点击领取 详情 >><br></span>
              </p>  
        </div>
        <div id="" class="product_service">          
        <span>增值业务<span></span></span> 
             <p class="product_recycle"><img src="">以旧换新，闲置回收 </p>
        <br>
        <span class=""> 配 送 至<span></span></span>
              <p class="send">
                  <span class="sp">西安 </span> 
                  <span class="s1">请选择 <img src="img/product_detail/logo/arr-close.png"></span>
                 
                  <span class="s2">有货</span>
                  <span class="s3">货到付款</span>
                  <span class="s4">顺丰速递</span>
                  <br>
                <span class="s5">由 <span class="s6">顺丰</span> 发货, 并提供售后服务. 23:00前下单,预计
                        <span class="s7">明天（11月18日）</span>送达 
                 </span>
              </p>
        <br>  
        <span class="">重 量<span></span></span><p>21.4kg</p>    
        </div>
        <div id="" class="product_choose_size">          
           <span class="">选择尺寸<span></span></span>
            <ul >
   `;
    for (i = 0; i < 7; i++) {
      html += ` 
            <li>
			 <img src="img/product_detail/product_detail/sm/59f056c4Ncae61937.jpg" width="40" height="40" border="0" alt="">
                  23.5英寸/京东专供曲面/好评过万
			</li>`;
    }
    html += `
	 </ul>
        </div>
        <hr>
       <div id="" class="product_choose_color">          
           <span class="">选择颜色<span></span></span>
      <ul >
	 `;
    for (i = 0; i < 4; i++) {
      html += ` 
           <li>
			 <img src="img/product_detail/product_detail/sm/59f056c4Ncae61937.jpg" width="40" height="40" border="0" alt="">
                  23.5英寸/京东专供曲面/好评过万
		   </li>`;
    }
    html += `	
	 </ul>
        </div>
       <div id="" class="product_shoping">
       <span class="">数量:<span></span></span>
       <input type="text" value=1>
       <p><span class="plus "> + </span> <span class="minus disabled"> - </span> </p>
       <a href="payment.html" class="buy_now">立即购买</a>
       <a href="cart.html" class="add_cart"><img src="img/product_detail/logo/shopping-cart.png">加入购物车</a>
       <a href="" class="my_favorite"><img src="img/product_detail/logo/my_favorite.png"><br>收藏</a>  
       </div>
    </div> 
    `;

    $("#product_detail_box").html(html);

    /**功能部分**/
    //点击小图时大图和中图切换
    var $sm = $("div.sm-images>div.sm-image");
    var $md = $("div.product_detail_box div.md-image");
    var $lg = $("div.product_lg_lgbox>div.lg-image");
    for (let n = 1; n <= $sm.length; n++) {
      $("div.sm-images>div.sm-image:nth-child(" + n + ")").click(function () {
        $sm.css("border", "2px solid white");
        $(this).css("border", "2px solid red");
        $md.css("z-index", 0);
        $("div.product_detail_box div.md-image:nth-child(" + n + ")").css(
          "z-index",
          5
        );
        $lg.css("z-index", 0);
        $("div.product_lg_lgbox>div.lg-image:nth-child(" + n + ")").css(
          "z-index",
          5
        );
      });
    }
    //小图两侧按钮点击时移动效果
    var $sm_images = $("section div.sm-image-box>div.sm-images");
    var $sms = $("section div.sm-image-box>div.sm-images>div.sm-image");
    $("div.sm-image-box div.sm-image-prev").click(function () {
      var prevl = -($sms.length - 5) * 78 + 30;
      var ml = parseInt($sm_images.css("margin-left"));
      ml <= prevl ? "" : $sm_images.css("margin-left", ml - 78);
    });
    $("div.sm-image-box div.sm-image-next").click(function () {
      var ml = parseInt($sm_images.css("margin-left"));
      ml >= 30 ? "" : $sm_images.css("margin-left", ml + 78);
    });
    //鼠标移入中图，大图显示相应的位置
    var $move = $("div.md-mouse-move");
    $move.mouseenter(function (e) {
      $("div.md-mouse-over").css("display", "block");
      $("div.product_lg_lgbox").css("display", "block");
    });
    $move.mousemove(function (e) {
      var x = 5,
        y = 5;
      x = e.offsetX - 128 + 5;
      y = e.offsetY - 149 + 5;
      x >= 199 ? (x = 199) : "";
      y >= 157 ? (y = 157) : "";
      x <= 5 ? (x = 5) : "";
      y <= 5 ? (y = 5) : "";
      $("div.md-mouse-over").css({
        left: x,
        top: y,
      });
      $("div.lg-image").css({
        left: (-(x - 5) * 800) / 450,
        top: (-(y - 5) * 800) / 450,
      });
    });
    $move.mouseleave(function () {
      $("div.md-mouse-over").css("display", "none");
      $("div.product_lg_lgbox").css("display", "none");
    });
  },
});
