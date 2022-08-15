$(document).ready(function() {
    $('.mCauseList ul li.moreMenu > span').click(function() {
        $(this).parent('.moreMenu').find('ul').toggle(500);
        return false;
    });
    checkMenuMoreOpt();
    $('body').on('click', 'header .menuBtn', function() {
        $(this).toggleClass('open');
        $('header nav').slideToggle();
    });
    if($('.faqsWrap').length > 0) {
        $('.faqsWrap .faqCat ul li').eq(0).addClass('active');
        $('.faqsWrap .content .faqWrap').eq(0).addClass('active')
        
        $('.faqWrap h4').click(function() {
            $(this).parent('.qa').toggleClass('open');
        });
        $('.faqCat ul li').click(function() {
            var index = $(this).index();
            if($(this).hasClass('active') == false) {
                $('.faqCat ul li').removeClass('active');
                $('.faqsWrap .content .faqWrap').removeClass('active');
                $('.faqCat ul li').eq(index).addClass('active');
                $('.faqsWrap .content .faqWrap').eq(index).addClass('active');
            }
        });
    }
    $('.iBanner.sl ul').bxSlider({
        auto: true,
        controls: false,
        pager: true
    });
    
    
    if($('.hBanner').length > 0) {
        $('.thumbSlide').html($('.hBanner .bigSlide').html());
        $('.hBanner .bigSlide ul li').eq(0).addClass('active');
        $('.hBanner .thumbSlide ul li').eq(0).addClass('active');
        /*$('.hBanner .thumbSlide ul li').mouseover(function() {
            var index = $(this).index();
            $('.hBanner .bigSlide ul li').removeClass('active');
            $('.hBanner .thumbSlide ul li').removeClass('active');
            $('.hBanner .bigSlide ul li').eq(index).addClass('active');
            $('.hBanner .thumbSlide ul li').eq(index).addClass('active');
        })*/
    }
    if($('section.FormSection').length > 0) {
        $('section.FormSection').each(function() {
            var formIndex = $(this).index();
            $(this).attr('formId', formIndex);
            var url = $(this).attr('url');
            $.get(url, function(data) {
                $('section.FormSection[formId='+formIndex+']').html(data);
            });
        })
    }
    var minOPS = 5; var maxOPS = 5;
    if($(window).width() < 980) {var minOPS = 4; var maxOPS = 4;}
    if($(window).width() < 768) {var minOPS = 3; var maxOPS = 3;}
    if($(window).width() < 580) {var minOPS = 2; var maxOPS = 2;}
    $('.ourPartners ul').bxSlider({
        minSlides: minOPS,
        maxSlides: maxOPS,
        slideWidth: 400,
        slideMargin: 10,
        auto: true,
        controls: false,
        pager: false
    });
    $(".choosen").chosen();
    if($('.tabbingWrap').length > 0) {
        $('.tabbingWrap .tabs ul li').eq(0).addClass('active');
        $('.tabbingWrap .tabContent .tContent').eq(0).addClass('active');
        $('.tabbingWrap .tabs ul li').click(function() {
            if($(this).hasClass('active') == false) {
                var index = $(this).index();
                $('.tabbingWrap .tabs ul li').removeClass('active');
                $('.tabbingWrap .tabContent .tContent').removeClass('active');
                $(this).addClass('active');
                $('.tabbingWrap .tabContent .tContent').eq(index).addClass('active');
            }
        })
    }
    if($('.tabbing').length > 0) {
        $('.tabbing .tabs ul li').eq(0).addClass('active');
        $('.tabbing .tabContent .tContent').eq(0).addClass('active');
        $('.tabbing .tabs ul li').click(function() {
            if($(this).hasClass('active') == false) {
                var index = $(this).index();
                $('.tabbing .tabs ul li').removeClass('active');
                $('.tabbing .tabContent .tContent').removeClass('active');
                $(this).addClass('active');
                $('.tabbing .tabContent .tContent').eq(index).addClass('active');
            }
        })
    }
    $('.donaAmt span').click(function() {
        $('.donaAmt span').removeClass('active');
        $(this).addClass('active');
    });
    if($('.notifier').length > 0) {
        $('.notifier ul li').eq(0).addClass('active');
        $('.notifier .notifierContent .box').eq(0).addClass('active');
        var preInterval = null;
        var currentNo = 1;
        updateNotifier(currentNo);
    }
    if($('.hBanner').length > 0) {
        $('.hBanner .bigSlide ul li').eq(0).addClass('active');
        $('.hBanner .thumbSlide ul li').eq(0).addClass('active');
        var preIntervalBan = null;
        var currentNo = 1;
        updateHBanner(preIntervalBan, currentNo);
    }
    $('body').on('submit', '.genForm', function(e) {
        var id = $(this).attr('id');
        if($(this).find('.formMess').hasClass('processing') == false) {
            $('html, body').animate({ scrollTop: ($(this).offset().top - 100) }, 500);
            $('#'+id+' .formMess').removeClass('success').removeClass('error').addClass('processing').text('Processing...');
            var url = $(this).attr('action');
            e.preventDefault();    
            var formData = new FormData(this);
            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                enctype: 'multipart/form-data',
                async: true,
                success: function (response) {
                    var result = JSON.parse(response);
                    console.log(result);
                    if(result['status'] == 'success') {
                        $('#'+id+' .formMess').removeClass('processing').removeClass('error').addClass('success').text(result['message']);
                        $('form[id='+id+'] input[type=text]').val('');
                        $('form[id='+id+'] input[type=email]').val('');
                        $('form[id='+id+'] textarea').val('');
                        $('form[id='+id+'] select').val('0');
                    }
                    else {
                        $('#'+id+' .formMess').removeClass('processing').addClass('error').text('').text(result['message']);
                    }
                },
                error: function (error) {
                    $('#'+id+' .formMess').removeClass('processing').addClass('error').text('').text('Ooops! Some error occured. Try again later.');
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }
        return false;
    });
    $('body').on('click', '.PopW .PopI .close', function() {
        $('.PopW').remove();
    })
    $('body').on('click', '.popWrap .popI .close', function() {
        $('.popWrap').remove();
    })
    $('body').on('click', '.team .boxes .box', function() {
        var ProHtml = $(this).html();
        $('body').append(`<div class="popWrap">
        <div class="popI">
            <span class="close">X</span>
            <div class="info">
                `+ProHtml+`
            </div>
        </div>
        </div>`);
    });
    
    /*For share button*/
    var Title = $('title').text();
    var Banner = '/clients/thweb/'+$('.hBanner img').eq(0).attr('src');
    $('.waShare').attr('href', 'https://api.whatsapp.com/send?text='+encodeURI(window.location.href));
    $('.fbShare').click(function() {
        var url = 'https://www.facebook.com/sharer.php?t'+Title+'=&u='+encodeURI(window.location.href);
        window.open(url, "", "width=600,height=300");
        return false;
    });
    $('.twShare').click(function() {
        var url = 'https://twitter.com/intent/tweet?text='+Title+'&url='+encodeURI(window.location.href);
        window.open(url, "", "width=600,height=300");
        return false;
    });
    /*$('.piShare').click(function() {
        var url = 'http://pinterest.com/pin/create/button/?url='+encodeURI(window.location.href)+'&media='+encodeURI(Banner);
        window.open(url, "", "width=600,height=300");
        return false;
    });*/
    $('.ldShare').click(function() {
        var url = 'https://www.linkedin.com/shareArticle?url='+encodeURI(window.location.href)+'&title='+Title;
        window.open(url, "", "width=600,height=300");
        return false;
    });
});
function alertPop(Message) {
    $('.PopW').remove();
    $('body').append(`<div class="PopW"><div class="PopI"><span class="close">X</span><div class="message">`+Message+`</div></div></div>`);
    setTimeout(function() {
        $('.alertSucc, .alertErr').remove();
    }, 5000);
}
function updateNotifier(currentNo) {
    var index = currentNo;
    var totalEle = $('.notifier ul li').length;
    preInterval = setInterval(function() {
        $('.notifier ul li').removeClass('active');
        $('.notifier .notifierContent .box').removeClass('active');
        $('.notifier ul li').eq(index).addClass('active');
        $('.notifier .notifierContent .box').eq(index).addClass('active');
        index++;
        if(index >= totalEle) {
            index = 0;
        }
    }, 8000);
}
function updateHBanner(preIntervalBan, currentNo) {
    var index = currentNo;
    var totalEle = $('.hBanner .bigSlide ul li').length;
    preIntervalBan = setInterval(function() {
        //console.log(index);
        //var index = $(this).index();
        $('.hBanner .bigSlide ul li').removeClass('active');
        $('.hBanner .thumbSlide ul li').removeClass('active');
        $('.hBanner .bigSlide ul li').eq(index).addClass('active');
        $('.hBanner .thumbSlide ul li').eq(index).addClass('active');
        index++;
        if(index >= totalEle) {
            index = 0;
        }
    }, 3000);
}
function convertToINRFormat(x) {

    x=x.toString();

    var lastThree = x.substring(x.length-3);

    var otherNumbers = x.substring(0,x.length-3);

    if(otherNumbers != '')

        lastThree = ',' + lastThree;

    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;

}
function checkMenuMoreOpt() {
    if($(window).width() <= 980) {
        $('.mCauseList ul li').each(function() {
            $(this).insertBefore('.mCauseList ul li.moreMenu');
        })
        var NoOfMenu = $('.mCauseList ul li').length - 1 - 1;
        var maxMH = 38;
        for(var i = NoOfMenu; i >= 0; i--) {
            if($('.mCauseList ul').height() > maxMH) {
                $('.mCauseList ul li').eq(i).insertAfter('#addMoreMenus');
            }
        }
    }
}
