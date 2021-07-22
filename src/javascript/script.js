$(function(){

    $('.header__burger').click(function(){
        $('.header__burger, .menu__list').toggleClass('active')
        $('body').toggleClass('lock')
    })

    function widthHeader() {
        if ($('body').innerWidth() <= 600) {
            $('.enter__item--basket')
            $('.menu__list').append($('.header__left, .header__right'))
            $('.header__phone').append($('.enter__item--basket'))
            
        } else {
            $('.header__bottom').prepend($('.header__left'))
            $('.header__bottom').append($('.header__right'))
            $('.header__right').append($('.enter__item--basket'))
        }        
    }
    $(window).on('resize', function(){
        widthHeader()
    }) 
    widthHeader()

    $('.menu-sidebar__item').on('click', function(event){
        event.preventDefault()
        let href = $(this).children('a').attr('href')

        $('.menu-sidebar__item').not(this).children('a').children('img').removeClass('active')
        $(this).children('a').children('img').toggleClass('active')

        if(href == '#'){
            $('.menu-sidebar__cart,.cart-sidebar__block').removeClass('active')
        }else {
            $('.cart-sidebar__block').not(href).removeClass('active')
            $(href).toggleClass('active')
            if ($('.cart-sidebar__block').hasClass('active')){
                $('.menu-sidebar__cart').addClass('active')
            }else {
                $('.menu-sidebar__cart').removeClass('active')
            }              
        }
        
    })

    function widthSidebar() {
        if ($('body').innerWidth() <= 992) {
            $('.cart-sidebar__block').each(function(){
                let $this = $(this)
                let id = '#' + $this.attr('id')
                $('.menu-sidebar__item').children('a').each(function(){
                    if($(this).attr('href') == id) {
                        $(this).parent().append($($this))
                    }
                })                
            })
            $('.products').append($('.news,.reviews'))
            // $('.filter').addClass('filter__hidden')
            $('.filter__body').css('display', 'none')
            $('.filter__block--first').removeClass('active')
        } else {
            $('.cart-sidebar').append($('.cart-sidebar__block'))
            $('.sidebar').append($('.news,.reviews'))
            // $('.filter').removeClass('filter__hidden')
            $('.filter__body').css('display', 'block')
        }
    }
    
    $(window).on('resize', function () {
        widthSidebar()
    })
    widthSidebar()


    $('.menu-sidebar__block').on('click', function(){
        $('.menu-sidebar__burger').toggleClass('active')
        $('.menu-sidebar__list').slideToggle()
        if (!$('.menu-sidebar__burger').hasClass('active')) {
            $('.menu-sidebar__cart,.cart-sidebar__block').removeClass('active')
        }        
    })

    $('.search__element').on('click', function(){
        $('.products__list').slideToggle()
        $('.search__img2').toggleClass('active')
        $('.search__text,.search__span').fadeToggle(0.1)
    })
    let text = $('.search__text').text()
    $('.products__menu li').on('click', function(){
        $(this).toggleClass('active')
        let length = $('.products__menu li.active').length
        $('.search__span').html('Выбрано: ' + length)
        if ($('.search__span').text() != 'Выбрано: 0') {
            $('.search__text').text($('.search__span').text())
        }else {
            $('.search__text').text(text)
        }
    })


    if ('.products__slider .owl-carousel') {
        $('.products__slider .owl-carousel').owlCarousel({
            loop: true,
            margin: 1,
            nav: false,
            responsive: {
                0: {
                    items: 1
                }
            },
        })

        let cloned = document.querySelectorAll('.owl-item')
        let dots = document.querySelectorAll('.owl-dot')
        let i = 0
        for (let index = 0; index < cloned.length; index++) {
            const clone = cloned[index];
            if(!clone.classList.contains('cloned')) {   
                let image = clone.querySelector(`.slider__bg img`)              
                let imageAdres = image.getAttribute('src')
                let dot = dots[i]
                dot.style.backgroundImage = `url(../${imageAdres})` 
                i++                
            }
        }         
    }

    if ('.item-product__slider.owl-carousel') {
        $('.item-product__slider.owl-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            info: true,
            responsive: {
                0: {
                    items: 1
                }
            },
            onDragged: funcNum
        })
        $('.owl-prev').addClass('icon-arrow-left')
        $('.owl-next').addClass('icon-arrow-right')
        let blockAllNum = $('.item-product__slider').find('.owl-item').not('.cloned').length
        $('.item-product__slider').find('.owl-nav .owl-prev').after(`<div class="owl-text"><span>1</span>/ ${blockAllNum}</div>`)
        function funcNum(event) {
            let blockNum = $('.item-product__slider').find('.owl-item.active .item-product__block').attr('data-num')
            $('.owl-text span').text(blockNum)
        }
        $('.owl-prev, .owl-next').on('click', funcNum)
    }
    if ('.brands__slider.owl-carousel') {
        $('.brands__slider.owl-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                600: {
                    items: 3
                },
                800: {
                    items: 4
                },
                992: {
                    items: 5
                }
            },
        })
        $('.owl-prev').addClass('icon-arrow-left')
        $('.owl-next').addClass('icon-arrow-right')
    }
    if ($('.price__slider').length) {
        var slider = document.getElementById('nouislider');
        
        noUiSlider.create(slider, {
            start: [0, 200000],
            tooltips: [
                wNumb({ decimals: 0 }), 
                wNumb({ decimals: 0 })
            ],
            connect: true,
            range: {
                'min': 0,
                'max': 200000
            }
        });

        var inputStart = document.getElementById('start');
        var inputFinish = document.getElementById('finish');

        inputStart.addEventListener('change', priceValue) 
        inputFinish.addEventListener('change', priceValue)

        function priceValue() {
            let priceStartValue;
            let priceEndValue;
            if(inputStart.value != '') {
                priceStartValue = inputStart.value
            }
            if(inputFinish.value != '') {
                priceEndValue = inputFinish.value
            }
            slider.noUiSlider.set([priceStartValue, priceEndValue]);
        }        
    }

    $('.filter__wrap').on('click', function(){
        $(this).next().not('.price,.contrast,.checkbox--last').slideToggle()
        $(this).find('.filter__img').toggleClass('filter__active')
    })

    $('.filter__container').on('click', function(){
        if ($('body').innerWidth() <= 992) {
            $('.filter__body').slideToggle()
            $('.filter__block--first').toggleClass('active')
            $(this).find('.filter__img').toggleClass('filter__active')
        }
    })        

    $.each($('.checkbox__item'), function () {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('active')
        }
    })
    $(document).on('click', '.checkbox__item', function () {
        if ($(this).hasClass('active')) {
            $(this).find('input').prop('checked', false)
        } else {
            $(this).find('input').prop('checked', true)
        }
        $(this).toggleClass('active')
    })
    if ('.card__top.owl-carousel') {
        $('.card__top.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                }
            },
            URLhashListener: true,
            autoplayHoverPause: true,
            startPosition: 'URLHash'
        })
    }
    if ('.card__bottom.owl-carousel') {
        $('.card__bottom.owl-carousel').owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                }
            },
        })
    }
    $('.card__pic').on('click', function(){
        $('.card__pic').removeClass('card__active')
        $(this).addClass('card__active')
    })

    $('.counter').on('click', function(event) {
        if($(event.target).hasClass('icon-arrow-left')){
            $(this).find('.counter__input').attr('value', function (ind, val) {
                if (parseInt(val) > 1) {
                    return val = parseInt(val) - 1
                }
            })            
        }
        if ($(event.target).hasClass('icon-arrow-right')){
            $(this).find('.counter__input').attr('value', function (ind, val) {
                return val = parseInt(val) + 1
            })            
        }
    })
    $('.info-card__button').on('click', function(event){
        event.preventDefault()
        $('.info-card__button').removeClass('info-card__active')
        $(this).addClass('info-card__active')
        $('.info-card__body').children().css('display', 'none')
        let href = $(this).attr('href')
        $(href).css('display', 'block')                  
    })
    $('.checkout-card__button').on('click', function(event){
        event.preventDefault()
        $('.checkout-card__button').removeClass('checkout-card__active')
        $(this).addClass('checkout-card__active')
        $('.checkout-card__body').children().removeClass('active')
        let href = $(this).attr('href')
        $(href).addClass('active')                  
    })
})