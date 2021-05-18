
//防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。
$(document).ready(function(){
    //菜单栏滑出子菜单 用mousemove效果比较理想，避免了关闭搜索栏后立即弹开子菜单
    $('.head-nav').mousemove(function(){
        $('.head-nav-sub').slideDown(500);
    })
    //鼠标移开时隐藏子菜单
    $('.head-nav-sub').mouseleave(function(){
        $(this).hide();
    })

    //打开关闭搜索栏
    var searchHover = $(".search-hover-wrap");
    $(".head-search-btn").click(function(){
        searchHover.addClass("show");
    }).mouseenter(function(){
        $('.head-nav-sub').hide();
        //修复搜索框和子菜单可以同时存在的视觉影响
    })

    $(".btn-close-search").click(function(){
        searchHover.removeClass("show");
    })

    //大图背景变小

    var headScroll= false;
    
    function winScroll(){
        if(!headScroll){
            $(".comm-topact").css("height","360px");
            $(".topact-big-img").css("dispaly","none");
            $(".topact-small-img").css("display","block");
        }
        headScroll = true;
    }
    $(window).scroll(winScroll);


    //app 二维码
    // $(".head-app-normal").hover(function(){
    //     $(".head-app-hover").show();
    // },function(){
    //     console.log(123);
    //     $(".head-app-hover").hide();
    // })

    //--------------------有瑕疵的轮播图。。
    // var timer;
    // var index = 0;
    // var buttons = $(".bottons>li");
    // // console.log(buttons);

    // function animate(offset) {
    //     var newLeft = $(".slides").position().left - 820;
    //     $(".slides").animate({ left: newLeft + "px" }, 1500, function () {
    //         if (index == 5) {
    //             index = 0;
    //             $(".slides").css({ left: "-820px" })
    //         }
    //     })
    // }

    // function showBtn() {
    //     var _index = index
    //     if(index > 4)
    //     _index = 0
    //     $(".bottons>li").eq(_index).addClass("selected").siblings().removeClass("selected");
    // }

    // $(".bottons>li").mouseenter(function(){
    //     var offset = ($(this).index()-index)*-820;
    //     console.log(offset);
    //     index = $(this).index();
    //     showBtn();
    //     animate(offset);
    // })

    // function play(){
    //     var timer = setInterval(function(){   
    //         index++;      
    //         showBtn();
    //         animate();
            
    //     },2500)
    // }
    // play();

    // function stop(){
    //     clearInterval(timer);
    // }

    // $(".bottons").mouseenter = stop;
    // $(".bottons").mouseleave = play;

    window.Promo = {
        containerWidth:820,
        autoPlayDelay:3000,
        promoImgList:null,
        promoTitleLi:null,
        nowIndex: null,
        amount: 5,
        timeOut: null,
        init: function () {
            // var templist = $('#promoTitleList').append($('#promoImgList .title'));
            // this.promoImgList = $('#promoImgList');
            // this.promoTitleSpan = templist.children('span');
            // this.initControl();
            // this.promoImgList.find('.loading-tip').remove();
            var templist = $(".bottons");
            this.promoImgList = $('.slides');
            this.promoTitleLi = templist.children('li');
            this.initControl();
        },
        /**控制逻辑*/
        initControl: function () {
            //应用宽度
            this.promoImgList.css('width', this.containerWidth * (this.amount+2) + 'px');
            this.promoTitleLi.css('width', this.containerWidth / this.amount + 'px');
            //标题hover事件
            this.promoTitleLi.on('mouseover', function () {
                Promo.moveNext(+$(this).index());
            });
            //开始
            this.moveNext(0);
        },
        /**移动动画,传入了下标,则转到下标对应图;没有传递,则转到下一张*/
        moveNext: function (index) {
            var nextIndex;
            if (typeof(index) !== 'undefined') {
                nextIndex = index+1;
            } else {
                nextIndex = ++this.nowIndex;
                nextIndex >= this.amount && (nextIndex = 0);
            }

            //清理自动播放事件准备下一次自动播放
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(this.moveNext.bind(this), this.autoPlayDelay);

            //图片移动
            this.promoImgList.animate({
                'left': -nextIndex * 820 + 'px'
            }, {
                queue: false,
                duration: 200
            });
            this.promoTitleLi.removeClass('selected').eq(nextIndex-1).addClass('selected');

            //记录当前图片下标
            this.nowIndex = nextIndex;
        }
    };
    Promo.init(); //启动

    // ---------------------------------------------切换新闻
    // console.log($('.part-tab-title>li'));
    // console.log($('.new-tab-content>ul'));



    $('.news .part-tab-title>li').on('mouseenter',function(){
        var nowLix=$(this).index();

		$('.news .new-tab-content>ul').css("display","none"); 
        $('.news .new-tab-content>ul').eq(nowLix).css("display","block");

        $('.news .part-tab-title>li').removeClass("selected");
        $('.news .part-tab-title>li').eq(nowLix).addClass("selected");
        // $('.part-tab-title li:after').css("display","block");
        //jQuery只能获取到dom节点，伪元素只是在页面显示的时候起了作用，在构建dom树的时候它被忽略的
    
        // console.log(nowLix);
	});

    //     var color=$(this).first().css("color"); css()只是返回第一个子元素的样式
 

    //事件委托 绑定祖先元素再按选择器触发事件
    // getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。


    // list-item 根据前面span颜色改变字体颜色
    $('.list-item').each(function(){
        $(this).mouseenter(function(){
            var color = String($(this).children().eq(0).css("color"));
            $(this).children().eq(1).css("color",color);
        }).mouseleave(function(){
            $(this).children().eq(1).css("color","#424242");
        })
    })


    // hover播放视屏

    $('.new-skin').mouseenter(function(){
        $('video')[1].play();
        $('.m-more-skin').show();
    }).mouseleave(function(){
        $('video')[1].pause();
        $('.m-more-skin').hide();
    });

    // 选择英雄

    $('.g-wrap-championlist .part-tab-title>li').on("click",function(){
        var heroClass = String($(this).attr("data-sort"));
        $('.g-wrap-championlist .part-tab-title>li').removeClass("selected");
        $(this).addClass("selected");
        // console.log(heroClass);
        $('.champion-item').show();
        if(heroClass == "All"){
            return false;
        }
      
        //每次重置一次
        $('.champion-item').each(function(){
            //遍历对象，看每个对象的data-tags是否包含选中的属性值。indexOf() 如果不包含选中文本就返回 -1；
            if($(this).attr("data-tags").indexOf(heroClass) == -1){
                $(this).hide();
            }
        })
    })

    // var RightNavBar = {
    //     navBar: null,
    //     navtitle: null,
    //     window$: null,
    //     windowDocument: null,
    //     init: function () {
    //         this.windowDocument = $(window.document);
    //         this.window$ = $(window);
    //         this.navtitle = $('.rightnav-bar [data-scrollto]');
    //         this.navBar = $('.rightnav-bar');
    //         //处理屏幕缩放
    //         this.window$.on('resize', this.checkShow.bind(this));
    //         this.checkShow();
    //         //处理滚动
    //         this.windowDocument.on('scroll', this.handleScroll.bind(this));
    //         this.handleScroll();
    //         //绑定点击导航跳转
    //         var scrollEl = $('[data-scrollto]');
    //         scrollEl.on('click', function () {
    //             var tempThis = $(this);
    //             var aimEl = $(tempThis.attr('data-scrollto'));
    //             $('html,body').animate({scrollTop: aimEl.offset().top}, 200);
    //             RightNavBar.changeTitleClass(tempThis);
    //         });
    //         $('.rn-polo').on('click', function () {
    //             $('html,body').animate({scrollTop: 0});
    //         });
    //     },
    //     handleScroll: function () {
    //         var scrollTop = this.windowDocument.scrollTop();
    //         //判断是否可以显示回到顶部
    //         if (scrollTop > 250) {
    //             this.navBar.addClass('showTop');
    //         } else {
    //             this.navBar.removeClass('showTop');
    //         }
    //         //判断标题激活
    //         var needChangeEl;
    //         var tempTop;
    //         for (var i = 0, j = this.navtitle.length; i < j; ++i) {
    //             tempTop = $(this.navtitle.eq(i).attr('data-scrollto')).offset().top;
    //             if (scrollTop + this.window$.height() / 2 > tempTop) {
    //                 needChangeEl = this.navtitle.eq(i);
    //             }
    //         }
    //         if (needChangeEl) {
    //             this.changeTitleClass(needChangeEl);
    //         } else {
    //             this.changeTitleClass(null);
    //         }
    //     },
    //     changeTitleClass: function ($el) {
    //         this.navtitle.removeClass('selected');
    //         $el && $el.addClass('selected');
    //     },
    //     checkShow: function () {
    //         if (this.windowDocument.width() < 1428) {
    //             this.navBar.removeClass('show');
    //         } else {
    //             this.navBar.addClass('show');
    //         }
    //     }
    // };
    
    //rightnavbar根据窗口大小隐藏/
    $(window).resize(function() {     
        windowWidth = $(window).innerWidth();   
        var tempTop;
        // 窗口宽度
        // console.log(windowWidth);
        if (windowWidth < 1428) {  
             $(".rightnav-bar").css("right","-70px");
    
        } else{  
            $(".rightnav-bar").css("right","0px"); 
        }
    });

    $('.rightnav-bar-li').mouseenter(function(){
        $('.rightnav-bar-li').removeClass("selected");
        $(this).addClass("selected");
    }).mouseleave(function(){
        $(this).removeClass("selected");
    })       

    $('.rightnav-bar-li').on("click",function(){
        var idd = String($(this).attr("data-scrollto"));
        document.querySelector(idd).scrollIntoView();
        $('.rightnav-bar-li').removeClass("selected");
        $(this).addClass("selected");
    })



    $(window).scroll(function() {
        var windowHeight = $(window).innerHeight(); 
        var scrollTop = $(document).scrollTop();
        if ( $(this).scrollTop() >= 250 ) {
            $(".rightnav-bar").addClass("show-top");
        } else {
            $(".rightnav-bar").removeClass("show-top");
        }

        var needChangeEl;
        navtitle = $('.rightnav-bar [data-scrollto]');
        for (var i = 0, j = navtitle.length; i < j; ++i) {
            tempTop = $(navtitle.eq(i).attr('data-scrollto')).offset().top;
            if (scrollTop +windowHeight / 2 > tempTop) {
                needChangeEl = navtitle.eq(i);
            }
        }
        if(needChangeEl){
            changeTitleClass(needChangeEl);
        } else {
            changeTitleClass(null);
        }

        function changeTitleClass(el){
            navtitle.removeClass('selected');
            el && el.addClass('selected');
            // 用 和来判断如果 el不存在，后半语句则不执行；
            // false && true  === false
            // if(el){
            //     el.addClass('selected');
            // }
        }
    
        // $('.rightnav-bar [data-scrollto]').eq(nowIndex).siblings().removeClass("selected").addClass("selected");
        // for(var i=0; j = $('.rightnav-bar [data-scrollto]').length; i<j, ++i){
        //     var idd = String($('.rightnav-bar [data-scrollto]').eq(i).attr("data-scrollto"));
        //     var tempTop = $(idd).scrollTop();
        //     var tempHeight = $(idd).height();
        //         if (tempHeight + windowHeight / 2 > tempTop) {
        //             $(this).addClass("selected");
        //         }else{
        //             $(this).removeClass("selected");
        //         }
        // }   
    });
});




