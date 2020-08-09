const slider = (sliderSelector, slidesSelector, dotsSelector, activeClass) => {
  const headerSlider = document.querySelector(sliderSelector);
  const sliderItem = document.querySelectorAll(slidesSelector);
  const dotsBox = document.querySelectorAll(dotsSelector);

  let currentSlide = 0,
    interval;

  const dotPrev = (elem, index, activeClass) => {
    elem[index].classList.remove(activeClass)
  };

  const dotNext = (elem, index, activeClass) => {
    elem[index].classList.add(activeClass)
  };

  const prevSlide = (elem, index, classNone) => {
    elem[index].classList.add(classNone);
  };

  const nextSlide = (elem, index, classNone) => {
    elem[index].classList.remove(classNone);
  };

  const autoPlaySlide = () => {
    prevSlide(sliderItem, currentSlide, activeClass);
    dotPrev(dotsBox, currentSlide, activeClass);

    currentSlide++;

    if (currentSlide >= sliderItem.length) {
      currentSlide = 0;
    }

    nextSlide(sliderItem, currentSlide, activeClass);
    dotNext(dotsBox, currentSlide, activeClass);

  };

  headerSlider.addEventListener('click', event => {
    event.preventDefault();

    let target = event.target;

    prevSlide(sliderItem, currentSlide, activeClass);
    dotPrev(dotsBox, currentSlide, activeClass);

    if (target.closest('.slider-arrow__left')) {
      currentSlide--;
    } else if (target.closest('.slider-arrow__right') || target.closest('.slider-item__info-link')) {
      currentSlide++;
    } else if (target.closest('.slider-dots__circle') || target.closest('.dots-box')) {
      dotsBox.forEach((item, i) => {
        if (target === item) {
          currentSlide = i;
        }
      })
    }

    if (currentSlide < 0) {
      currentSlide = sliderItem.length - 1;
    }

    if (currentSlide >= sliderItem.length) {
      currentSlide = 0;
    }

    nextSlide(sliderItem, currentSlide, activeClass);
    dotNext(dotsBox, currentSlide, activeClass);
  });

  const startSlide = () => {
    interval = setInterval(autoPlaySlide, 8000);
  };

  // startSlide();
};

slider('.header__slider', '.slider-item', '.dots-box', 'none');
slider('.header__slider', '.slider-item', '.dots-box', 'dots-box--active');
slider('.surf-slider', '.surf-box__inner', '.slider-dots__circle', 'current-slide');



const showInfo = () => {
  const points = document.querySelectorAll('.slider-dots__circle');
  const mapBlock = document.querySelector('.slider-map')
  const sliderDotsContent = document.querySelectorAll('.slider-dots__content');

  function checkActiveClass() {
    sliderDotsContent.forEach(item => {
      if (item.classList.contains('slider-dots__content--active')) {
        item.classList.remove('slider-dots__content--active');
      }
    });
  };

  function showContent(index) {
    for (let i = 0; i < sliderDotsContent.length; i++) {
      if (index === i) {
        checkActiveClass(i)
        sliderDotsContent[i].classList.toggle('slider-dots__content--active');
      }
    }
  };

  mapBlock.addEventListener('click', event => {
    let target = event.target;
    console.log(target);
    if (target) {
      points.forEach((item, i) => {
        if (target === item) {
          showContent(i);
        }
      });
    }

    if (target.closest('.sliderDotsContent')) {
      sliderDotsContent.classList.remove('slider-dots__content--active')
    }
  });
};

showInfo();

// jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
// jQuery('.quantity').each(function() {
//   var spinner = jQuery(this),
//     input = spinner.find('input[type="number"]'),
//     btnUp = spinner.find('.quantity-up'),
//     btnDown = spinner.find('.quantity-down'),
//     min = input.attr('min'),
//     max = input.attr('max');

//   btnUp.click(function() {
//     var oldValue = parseFloat(input.val());
//     if (oldValue >= max) {
//       var newVal = oldValue;
//     } else {
//       var newVal = oldValue + 1;
//     }
//     spinner.find("input").val(newVal);
//     spinner.find("input").trigger("change");
//   });

//   btnDown.click(function() {
//     var oldValue = parseFloat(input.val());
//     if (oldValue <= min) {
//       var newVal = oldValue;
//     } else {
//       var newVal = oldValue - 1;
//     }
//     spinner.find("input").val(newVal);
//     spinner.find("input").trigger("change");
//   });

// });