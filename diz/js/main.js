$(window).on('load', function () {
  var buttonSwitch = document.querySelectorAll('.js-button-switch');

  if (buttonSwitch) {
    buttonSwitch.forEach(function (item) {
      item.addEventListener('click', function (e) {
        var containerButton = item.closest('.js-switch-container').querySelectorAll('.js-button-switch');
        containerButton.forEach(function (item) {
          item.classList.remove('active');
        });
        item.classList.add('active');
      });
    });
  }

  var selectCustom = $('.js-select');
  var selectCustomLabel = $(".js-select-width-label");

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    var baseUrl = "/img/img/product/icon";
    var $state = $('<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>');
    return $state;
  }

  ;
  selectCustomLabel.select2({
    templateResult: formatState,
    templateSelection: formatState,
    width: '100%',
    containerCssClass: 'select2-label'
  });
  selectCustom.select2({
    width: '100%',
    containerCssClass: 'select2-custom'
  });
  var datepicker = $('.js-input-datepicker');

  if (datepicker.length) {
    datepicker.daterangepicker({
      showCustomRangeLabel: true,
      singleDatePicker: false,
      locale: {
        format: 'DD.MM.YYYY',
        "applyLabel": "Применить",
        "cancelLabel": "Отмена",
        "fromLabel": "От",
        "toLabel": "До",
        "customRangeLabel": "Произвольный",
        "daysOfWeek": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        "monthNames": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        firstDay: 1
      }
    });
  }

  ;
  var $datePicker = $('.js-input-datepicker-month');

  if ($datePicker.length) {
    var today = new Date();
    $.fn.datepicker.dates['ru'] = {
      days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
      months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
      monthsShort: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
    };
    $datePicker.datepicker({
      format: "mm yyyy",
      startView: "months",
      minViewMode: "months",
      language: 'ru',
      locale: 'ru',
      forceUpdate: true
    }).on('change', function (e) {
      var value = $(this).val();

      if (value.substr(0, 2) === '01') {
        $(this).val('Январь' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '02') {
        $(this).val('Февраль' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '03') {
        $(this).val('Март' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '04') {
        $(this).val('Апрель' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '05') {
        $(this).val('Май' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '06') {
        $(this).val('Июнь' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '07') {
        $(this).val('Июль' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '08') {
        $(this).val('Август' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '09') {
        $(this).val('Сентябрь' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '10') {
        $(this).val('Октябрь' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '11') {
        $(this).val('Ноябрь' + "".concat(value.substr(2)));
      } else if (value.substr(0, 2) === '12') {
        $(this).val('Декабрь' + "".concat(value.substr(2)));
      }
    }).datepicker('update', today);
  }

  var ctx = document.getElementById('myChart');

  if (ctx) {
    var ctxContext = ctx.getContext('2d');
    var myChart = new Chart(ctxContext, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ;
  var scrollBox = document.querySelector('.js-scroll-button');

  if (scrollBox) {
    if ($(window).width() > 1024) {
      var scrollItem = document.querySelectorAll('.scroll__box-button');
      scrollItem.forEach(function (item) {
        var textWidth = item.clientWidth;
        item.closest('.scroll__box-item').style.width = textWidth + 50 + 'px';
      });
      var swiperScroll = new swiper__WEBPACK_IMPORTED_MODULE_7__["default"](scrollBox, {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        slideToClickedSlide: true
      });
    }
  }

  ;
  var $selectButton = $('.js-button-select');

  if ($selectButton) {
    $selectButton.select2({
      minimumResultsForSearch: -1,
      width: '100%'
    });
  }

  var $tabsWrap = $('.js-tab-button-wrap');

  if ($tabsWrap) {
    var $tabs = $('.js-tab-button');
    $tabs.on('click', function () {
      $tabs.removeClass('active');
      $(this).addClass('active');
    });
  }

  var $buttonShow = $('.js-button-show');

  if ($buttonShow) {
    $buttonShow.on('click', function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).addClass('close');
        $(this).prev('.js-text-action').addClass('full');
      } else {
        $(this).addClass('open');
        $(this).removeClass('close');
        $(this).prev('.js-text-action').removeClass('full');
      }
    });
  }

  $("[data-modal='item-change']").on('click', function () {
    $(this).closest('.js-modal-wrap').find("[data-open='item-change']").toggleClass('active');
  });
  var $openModal = $('.js-open-modal');

  if ($openModal) {
    $openModal.on('click', function () {
      var data = $(this).data('modal');
      $("[data-open='".concat(data, "']")).addClass('active');
    });
  }

  var $closeModal = $('.js-close-modal');

  if ($closeModal) {
    $closeModal.on('click', function () {
      $(this).closest('.js-modal').removeClass('active');
    });
  }

  var $generateButton = $('.js-generate');

  if ($generateButton) {
    var rnd = function rnd(x, y, z) {
      var num;

      do {
        num = parseInt(Math.random() * z);
        if (num >= x && num <= y) break;
      } while (true);

      return num;
    };

    var gen_pass = function gen_pass() {
      var pass = '';

      for (var i = 0; i < 20; i++) {
        pass += chr[rnd(0, 61, 100)];
      }

      $('.js-input-pass').val(pass);
    };

    var chr = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    $generateButton.on('click', function (e) {
      e.preventDefault();
      gen_pass();
    });
  }

  ;
  var $textContent = document.querySelectorAll('.js-text-action-content');
  var $buttonShowContent = $('.js-button-show-content');

  if ($textContent) {
    $textContent.forEach(function (item) {
      var height = item.offsetHeight;

      if (height > 88) {
        item.classList.add('hidden');
        console.log(item, item.nextElementSibling);
        item.nextElementSibling.classList.add('show');
      }

      ;
    });
    $buttonShowContent.on('click', function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).addClass('close');
        $(this).prev('.js-text-action-content').removeClass('hidden');
      } else {
        $(this).addClass('open');
        $(this).removeClass('close');
        $(this).prev('.js-text-action-content').addClass('hidden');
      }
    });
  }

  ;
  var $tabsSection = $('.js-tab-wrap');

  if ($tabsSection) {
    var _$tabs = $tabsSection.find('.js-tab');

    _$tabs.on('click', function () {
      _$tabs.removeClass('active');

      $(this).addClass('active');
      var data = $(this).data('action');
      $('.js-tab-section').removeClass('active');
      $("[data-section=".concat(data, "]")).addClass('active');
    });
  }

  var $buttonMenu = $('.js-open-menu');
  var $menu = $('.js-menu');

  if ($menu) {
    $menu.on('click', function (e) {
      var $target = $(e.target);

      if ($target.closest(".menu__inner").length == 0) {
        $(this).removeClass("active");
      }

      ;
    });
  }

  if ($buttonMenu) {
    $buttonMenu.on('click', function () {
      $menu.addClass('active');
    });
  }

  ;
  var $filterElem = $('.js-filter-item');

  if ($filterElem) {
    var _$filterButton = $('.js-filter-button');

    if ($(window).width() > 1200) {
      _$filterButton.on('click', function (e) {
        e.preventDefault();
        $('.js-filter-button.active').not($(this)).removeClass('active');
        $('.js-filter-modal.active').not($(this)).removeClass('active');
        var typeAction = $(this).data('action');

        if (typeAction === "modal") {
          if (!$(this).hasClass('active')) {
            $(this).closest('.js-filter-item').find('.js-filter-modal').addClass('active');
            $(this).addClass('active');
          } else {
            $(this).closest('.js-filter-item').find('.js-filter-modal').removeClass('active');
            $(this).removeClass('active');
          }
        } else {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).closest('.js-filter-item').find('.js-select-filter').select2('close');
          } else {
            $(this).addClass('active');
            $(this).closest('.js-filter-item').find('.js-select-filter').select2('open');
          }
        }
      });
    }
  }

  var $buttonFilterReset = $('.js-reset-filter');

  if ($buttonFilterReset) {
    $buttonFilterReset.on('click', function (e) {
      var $filterForm = $(this).closest('.js-filter');
      var $filterItem = $filterForm.find('.js-filter-param');
      $filterItem.each(function () {
        var dataType = $(this).data('type');

        if (dataType === 'checkbox') {
          $(this).prop('checked', false);
        } else if (dataType === 'button') {
          $(this).closest('.js-switch-container').find('[data-action="all"]').addClass('active');
          $(this).removeClass('active');
        } else if (dataType === 'input') {
          $(this).val(0);
        } else if (dataType === 'select') {
          console.log($filterSelect.val());
          $filterSelect.val(null).trigger('change');
        }
      });
    });
  }

  var $showButton = $('.js-show-filter');

  if ($showButton) {
    $showButton.on('click', function () {
      var dataType = $(this).data('action');
      $("[data-show='".concat(dataType, "']")).addClass('active');
    });
  }

  ;
  var $closeFilter = $('.js-close-filter');

  if ($closeFilter) {
    $closeFilter.on('click', function (e) {
      e.preventDefault();
      $(this).closest('[data-show]').removeClass('active');
    });
  }

  ;
  var $resetSort = $('.js-reset-sort');

  if ($resetSort) {
    var $sortItem = $('.js-sort-item');

    if ($sortItem) {
      $sortItem.on('change', function () {
        $(this).closest('.js-sort-box').find('.js-reset-sort').prop('disabled', false);
      });
    }

    ;
    $resetSort.on('click', function (e) {
      e.preventDefault();
      $(this).prop('disabled', true);
      $(this).closest('.js-sort-box').find('.js-sort-item').prop('checked', false);
    });
  }

  ;
  var $chartItem = document.querySelectorAll('.js-chart');

  if ($chartItem) {
    var DATA_COUNT = 7;
    var NUMBER_CFG = {
      count: DATA_COUNT,
      min: -100,
      max: 100
    };
    var dataPlan = {
      labels: ['1.02', '7.02', '14.02', '21.02', '28.02'],
      datasets: [{
        label: 'Факт',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#A0D911',
        fill: false,
        backgroundColor: '#A0D911',
        yAxisID: 'y'
      }, {
        label: 'План',
        data: [2, 40, 6, 10, 30, 100],
        borderColor: '#436FFD',
        fill: true,
        backgroundColor: 'rgba(67, 111, 253, 0.62)',
        yAxisID: 'y1'
      }]
    };
    var dataPlanBar = {
      labels: ['1.02'],
      datasets: [{
        label: 'Факт',
        data: [35],
        borderColor: '#A0D911',
        fill: false,
        backgroundColor: '#A0D911'
      }, {
        label: 'План',
        data: [100],
        borderColor: '#436FFD',
        fill: true,
        backgroundColor: 'rgba(67, 111, 253, 0.62)'
      }]
    };
    var dataPrice = {
      labels: ['1.02', '7.02', '14.02', '21.02', '28.02'],
      datasets: [{
        legend: false,
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#436FFD',
        fill: true,
        backgroundColor: 'rgba(67, 111, 253, 0.62)',
        yAxisID: 'y'
      }]
    };
    var dataSales = {
      labels: ['1.02', '7.02', '14.02', '21.02', '28.02'],
      datasets: [{
        legend: false,
        data: [0, 50, 40, 250, 100, 300, 153],
        borderColor: '#436FFD',
        fill: true,
        backgroundColor: 'rgba(67, 111, 253, 0.62)',
        yAxisID: 'y'
      }]
    };
    var dataReport = {
      labels: ['11.02', '12.02', '13.02', '14.02', '15.02', '16.02', '17.02', '18.02', '19.02', '20.02', '21.02', '23.02', '24.02'],
      datasets: [{
        data: [250, 200, 220, 270, 250, 220, 170, 160, 150, 220, 230, 280, 270, 275],
        borderColor: '#85A5FF',
        backgroundColor: '#85A5FF'
      }, {
        data: [230, 180, 200, 250, 230, 200, 150, 140, 130, 210, 210, 250, 220, 235],
        borderColor: '#95DE64',
        backgroundColor: '#95DE64'
      }]
    };
    $chartItem.forEach(function (item) {
      var ctx = item.getContext('2d');
      var dataType = item.dataset.type;

      if (dataType === 'plan') {
        var сhartPlan = new Chart(ctx, {
          type: 'line',
          data: dataPlan,
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false
            },
            stacked: false,
            plugins: {
              title: {
                display: false
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left'
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false
                }
              }
            }
          }
        });
      } else if (dataType === 'price') {
        var сhartPrice = new Chart(ctx, {
          type: 'line',
          data: dataPrice,
          legend: {
            display: false
          },
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false
            },
            stacked: false,
            plugins: {
              title: {
                display: false
              },
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left'
              }
            }
          }
        });
      } else if (dataType === 'sales') {
        var сhartSales = new Chart(ctx, {
          type: 'line',
          data: dataSales,
          legend: {
            display: false
          },
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false
            },
            stacked: false,
            plugins: {
              title: {
                display: false
              },
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left'
              }
            }
          }
        });
      } else if (dataType === 'report') {
        var _сhartPlan = new Chart(ctx, {
          type: 'bar',
          data: dataReport,
          options: {
            indexAxis: 'x',
            responsive: true,
            plugins: {
              title: {
                display: false
              },
              legend: {
                display: false
              }
            }
          }
        });
      } else if (dataType === 'plan-bar') {
        var сhartPlanBar = new Chart(ctx, {
          type: 'bar',
          data: dataPlanBar,
          options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
              title: {
                display: false
              }
            }
          }
        });
      }
    });

    const $productBox = $('.js-product-box');

    if ($productBox) {
      const API_INDEX = 'http://client.na100.pro/api.php?page=index';
      const $pageSize = $('.js-pagination');

      const hangleGetIndex = (url) => $.ajax({
        url: url,
        type: 'GET',
        data: {
          method: 'list',
        },
        success: (response) => {
          const _clientName = response.client.client_name;
          const _clientImage = response.client.client_image;
          const _complex = response.complex;
          let type = new URLSearchParams(window.location.search).get("type");

          function template(data) {
            var html = '<div class="product__box">' + data.map(item => {
              if (!type || type === item.complex_status) {
                return `
                      <div class="product__item">
                        <a href="/index.php?page=flats&amp;complex=${item.complex_id}" class="product__link">
                            <div class="product__img">
                                <img src="${item.complex_image}" alt="${item.complex_name}">
                            </div>
                            <div class="product__inner">
                                <div class="product__desc-top">
                                    <div class="product__desc" >
                                        <div class="product__desc-header">
                                            <span>Москва, Волоколамское ш., 81</span>
                                        </div>
                                        <span class="product__desc-text">
                                          ${item.complex_name}
                                        </span>
                                    </div>
                                </div>
                                <div class="product__row">
                                    <div class="product__desc">
                                        <div class="product__desc-header">
                                            <span>Квартир в продаже</span>
                                        </div>
                                        <span class="product__desc-text product__desc-text--bold">
                                            ${item.flats_count}
                                        </span>
                                    </div>
                                </div>
                                <div class="product__info">
                                    <div class="product__info-icon">
                                        <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <use class="reload" xlink:href="/diz/img/sprites/sprite.svg#reload"></use>
                                        </svg>
                                    </div>
                                    <span class="product__info-text">
                                        Обновлено: ${item.updated}
                                    </span>
                                </div>
                            </div>
                            <div class="product__status ${item.complex_status}">
                            </div>
                        </a>
                    </div>
                      `
              }
            }).join('') + '</div>'
            return html;
          }

          function log(content) {
            window.console && console.log(content);
          }

          $(function () {
            var container = $('#pagination-bar');


            container.pagination({
              dataSource: function (done) {
                let result = [];
                if (type === 'active' && type) {
                  _complex.forEach(item => {
                    if (item.complex_status === 'active') {
                      result.push(item);
                    }
                  })
                } else if (type === 'nonactive' && type) {
                  _complex.forEach(item => {
                    if (item.complex_status === 'nonactive') {
                      result.push(item);
                    }
                  })
                } else {
                  result = _complex
                }
                done(result);
              },
              pageSize: $pageSize.val(),
              autoHidePrevious: true,
              autoHideNext: true,
              callback: function (data, pagination) {
                var html = template(data, type);
                $('.js-product-box').html(`<div class="product__block"><div class="product__header">
                <div class="product__icon">
                    <img src="${_clientImage}" width="48" height="48" alt="${_clientName}">
                </div>
                <span class="product__name">
                    ${_clientName}
                </span>
            </div>` + html + `</div>`);
              }
            });

          })
        }
      });

      hangleGetIndex(API_INDEX);
      $pageSize.on("change", function (e) {
        hangleGetIndex(API_INDEX);
      });
    }

    const $apartment = $('.js-apartment');

    if ($apartment) {
      const API_APARTAMENT = 'http://client.na100.pro/api.php?page=ffilter';

      var $filterSelect = $('.js-select-filter');

      const handleApartment = (url) => $.ajax({
        url: url,
        type: 'GET',
        data: {
          method: 'list',
        },
        success: (response) => {
          let complex = response.complex;
          complex.unshift({id: 'all', text: 'Все ЖК', "selected": true});
          const _complex = $.map(response.complex, function (obj) {
            obj.text = obj.text || obj.name;
            return obj;
          });
          const _building = response.building;
          const _section = response.sections;
          var _maxFloor = response.max_levels;

          $filterSelect.select2({
            closeOnSelect: false,
            containerCssClass: "filter__select",
            dropdownCssClass: "filter__dropdown",
            width: '100%',
            data: _complex,
          }).one('select2:open', function (e) {
            $('.filter__dropdown .select2-search__field').attr('placeholder', 'Поиск по ЖК');
          });

          $('.js-filter-modal').each(function() {
            if ($(this).data('filter') === 'corps') {
              $(this).find('.checkbox__form').html(`
                ${
                  _building.map(item => {
                    return `<div class="checkbox__wrap-item checkbox__wrap-item--filter">
                    <label class="checkbox__custom-container">
                        <input type="checkbox" class="checkbox__custom--hidden js-filter-param" data-type="checkbox" name="${item}">
                        <span class="checkbox__custom">
                        </span>
                        <span class="checkbox__custom-text">${item}</span>
                    </label>
                </div>`
                  }).join('')
                }
              `)
            } else if ($(this).data('filter') === 'section') {
              $(this).find('.checkbox__form').html(`
                ${
                  _section.map(item => {
                    return `<div class="checkbox__wrap-item checkbox__wrap-item--filter">
                    <label class="checkbox__custom-container">
                        <input type="checkbox" class="checkbox__custom--hidden js-filter-param" data-type="checkbox" name="${item}">
                        <span class="checkbox__custom">
                        </span>
                        <span class="checkbox__custom-text">${item}</span>
                    </label>
                </div>`
                  }).join('')
                }
              `)
            } else if ($(this).data('filter') === 'floor') {
              $(this).find(`[data-range = 'from']`).attr('max', _maxFloor);
              $(this).find(`[data-range = 'to']`).attr('max', _maxFloor);
              $(this).find(`[data-range = 'to']`).val(_maxFloor);
            }
          })
        }
      });

      handleApartment(API_APARTAMENT);


      $('.js-filter').on('submit', function(e) {
        e.preventDefault();
        const serializeHandler = $(this).serialize();
        console.log(serializeHandler)
        $.ajax({
          url: 'http://client.na100.pro/api.php',
          type: 'GET',
          data: serializeHandler,
          dataType: 'json',
          success: function(response) {
          },
          error: function(response) {
            alert('Ошибка в запросе')
          }
        });
      });

      const resetFilterButton = $('.js-reset-filter');

      resetFilterButton.on('click', function(e) {
        e.preventDefault();
        const form = $(this).closest('.js-filter');
        form.find('.js-select-filter').val('all').trigger('change');
        const max = form.find(`[data-range = 'from']`).attr('max');
        form.find(`[data-range = 'from']`).attr('max', max)
        form.find(`[data-range = 'to']`).attr('max', max);
        form.find(`[data-range = 'from']`).val(1);
        form.find(`[data-range = 'to']`).val(max);
      })
    }
  }
});