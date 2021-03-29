if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (o[k] === searchElement) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}


var temp_date_arr = [];
var temp_cat_arr = [];
var sort_date_arr = []
var sort_cat_arr = [];
$(window).on('load', function(){
    $('.mcFilter').on('mouseleave', function(){
        $('.switch').removeClass('active');
        $(this).removeClass('vis');
    });

    $('.switch').on('click', function(){
        $(this).toggleClass('active');
        $(this).next('.mcFilter').toggleClass("vis");
    });

    $('.sortTable tbody tr').addClass('vis');
    // init
    $('.sortTable .date').each(function(){
        var temp = $(this).data('date');
        temp_date_arr.push(temp);
    });
    sort_date_arr = temp_date_arr.filter(function(x, i, self){
        return self.indexOf(x) === i;
    });
    for(var i =0; i < sort_date_arr.length; i++){
        $('.d_filter').append('<div class="mcFilter_Item year active" data-sortvalue="' + sort_date_arr[i] + '">' + sort_date_arr[i] +  '</div>')
    }

    $('.sortTable .cat').each(function(){
        var temp_cat = $(this).data('category');
        temp_cat_arr.push(temp_cat);
    });
    sort_cat_arr = temp_cat_arr.filter(function(x, i, self){
        return self.indexOf(x) === i;
    });
    for(var i =0; i < sort_cat_arr.length; i++){
        $('.c_filter').append('<div class="mcFilter_Item category active" data-sortvalue="' + sort_cat_arr[i] + '">' + sort_cat_arr[i] +  '</div>')
    }

    // Event
    $('.mcFilter_Item').not('.year_all, .category_all').on('click', function(){
        var activeFlg;
        // セレクトボックス部分
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            activeFlg = false;
        } else {
            $(this).addClass('active');
            activeFlg = true;
        }
        // 選択
        judgeAll();
        var myValue = $(this).data('sortvalue');
        if($(this).hasClass('year')) {
            $('.sortTable .date').each(function(){
                var setValue= $(this).data('date');
                if(setValue.indexOf(myValue) > -1) {
                    if(activeFlg == true){
                        $(this).parent('tr').removeClass("unvis");
                        $(this).parent('tr').addClass("vis");
                    }else {
                        $(this).parent('tr').removeClass("vis");
                        $(this).parent('tr').addClass("unvis");
                    }
                }
            });
            reCat();
        }else if($(this).hasClass('category')) {
            $('.sortTable .cat').each(function(){
                var setValue= $(this).data('category');
                if(setValue.indexOf(myValue) > -1) {
                    if(activeFlg == true){
                        $(this).parent('tr').removeClass("unvis");
                        $(this).parent('tr').addClass("vis");
                    }else {
                        $(this).parent('tr').removeClass("vis");
                        $(this).parent('tr').addClass("unvis");
                    }
                }
            });
            reYear();
        }
    })

    function reYear(){
        // year 表示判定
        temp_date_arr = [];
        sort_date_arr = [];
        $('.sortTable tr.vis .date').each(function(){
            var visObj = $(this).data('date');
            temp_date_arr.push(visObj);
        });
        sort_date_arr = temp_date_arr.filter(function(x, i, self){
            return self.indexOf(x) === i;
        });

    //       console.log(sort_date_arr);

        $('.d_filter .year').each(function(){
            var myValue = $(this).data('sortvalue');
            if(sort_date_arr.includes(myValue)) {
                $(this).addClass("active");
            }else {
                $(this).removeClass("active");
            }
        });
    }
    function reCat(){
        // category 表示判定
        temp_cat_arr = [];
        sort_cat_arr = [];
        $('.sortTable tr.vis .cat').each(function(){
            var visObj = $(this).data('category');
            temp_cat_arr.push(visObj);
        });
        sort_cat_arr = temp_cat_arr.filter(function(x, i, self){
            return self.indexOf(x) === i;
        });
        // フィルター用の配列完成
        //console.log(sort_cat_arr);

        $('.c_filter .category').each(function(){
          //  console.log('AAA+　' + $(this).data('sortvalue'));
            var myValue = $(this).data('sortvalue');
            if(sort_cat_arr.includes(myValue)) {
                $(this).addClass("active");
            }else {
                $(this).removeClass("active");
            }
        });
    }
    // すべて選択
    $('.year_all').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.year').removeClass('active');
            $('.sortTable tbody tr').removeClass('vis');
            $('.sortTable tbody tr').addClass('unvis');
        }else {
            $(this).addClass('active');
            $('.year').addClass('active');
            $('.category').addClass('active');
            $('.category_all').addClass('active');
            $('.sortTable tbody tr').removeClass('unvis');
            $('.sortTable tbody tr').addClass('vis');
        }
        Allreset();
    })

    $('.category_all').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.category').removeClass('active');
            $('.sortTable tbody tr').removeClass('vis');
            $('.sortTable tbody tr').addClass('unvis');
        }else {
            $(this).addClass('active');
            $('.category').addClass('active');
            $('.year').addClass('active');
            $('.year_all').addClass('active');
            $('.sortTable tbody tr').removeClass('unvis');
            $('.sortTable tbody tr').addClass('vis');
        }
        Allreset();
    })
});

function Allreset(){
    temp_date_arr = [];
    temp_cat_arr = [];
    sort_date_arr = []
    sort_cat_arr = [];
    $('.sortTable .date').each(function(){
        var temp = $(this).data('date');
        temp_date_arr.push(temp);
    });
    sort_date_arr = temp_date_arr.filter(function(x, i, self){
        return self.indexOf(x) === i;
    });
    $('.sortTable .cat').each(function(){
        var temp_cat = $(this).data('category');
        temp_cat_arr.push(temp_cat);
    });
    sort_cat_arr = temp_cat_arr.filter(function(x, i, self){
        return self.indexOf(x) === i;
    });
}

function judgeAll(){
    $('.year').each(function(){
        if(! $(this).hasClass('active')){
            $('.year_all').removeClass('active');
            $('.category_all').removeClass('active');
            return false;
        }else {
            $('.year_all').addClass('active');
        }
    });

    $('.category').each(function(){
        if(! $(this).hasClass('active')){
            $('.category_all').removeClass('active');
            $('.year_all').removeClass('active');
            return false;
        }else {
            $('.category_all').addClass('active');
        }
    });
}




