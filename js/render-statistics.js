'use strict';

(function () {
  var WINDOW_X = 100;
  var WINDOW_Y = 10;
  var WINDOW_HEIGHT = 270;
  var WINDOW_WIDTH = 420;
  var WINDOW_COLOR = 'rgb(255, 255, 255)';

  var WINDOW_SHADOW_OFFSET = 10;
  var WINDOW_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var WINDOW_HEADER_OFFSET_X = 20;
  var WINDOW_HEADER_OFFSET_Y = 20;
  var WINDOW_HEADER_TITLE = 'Ура вы победили!';
  var WINDOW_HEADER_SUBLINE = 'Список результатов:';

  var TEXT_FONT = '16px PT Mono';
  var TEXT_COLOR = 'rgb(0, 0, 0, 0.7)';
  var TEXT_LINE_HEIGHT = 20;
  var TEXT_BOTTOM_MARGIN = 5;

  var CHART_OFFSET_X = 20;
  var CHART_OFFSET_Y = 100;
  var CHART_BAR_LIMIT = 150;
  var CHART_BAR_WIDTH = 40;
  var CHART_BAR_INDENT = 50;
  var CHART_BAR_HSL_HUE = 235;
  var CHART_BAR_HSL_LIGHTNESS = 50;
  var CHART_USER_ID = 'Вы';
  var CHART_USER_COLOR = 'rgb(255, 0, 0, 1)';

  window.renderStatistics = function (ctx, names, times) {
    ctx.fillStyle = WINDOW_SHADOW_COLOR;
    ctx.fillRect(
        WINDOW_X + WINDOW_SHADOW_OFFSET,
        WINDOW_Y + WINDOW_SHADOW_OFFSET,
        WINDOW_WIDTH,
        WINDOW_HEIGHT
    );

    ctx.fillStyle = WINDOW_COLOR;
    ctx.fillRect(
        WINDOW_X,
        WINDOW_Y,
        WINDOW_WIDTH,
        WINDOW_HEIGHT
    );

    ctx.font = TEXT_FONT;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
        WINDOW_HEADER_TITLE,
        WINDOW_X + WINDOW_HEADER_OFFSET_X,
        WINDOW_Y + WINDOW_HEADER_OFFSET_Y + TEXT_LINE_HEIGHT - TEXT_BOTTOM_MARGIN
    );
    ctx.fillText(
        WINDOW_HEADER_SUBLINE,
        WINDOW_X + WINDOW_HEADER_OFFSET_X,
        WINDOW_Y + WINDOW_HEADER_OFFSET_Y + TEXT_LINE_HEIGHT * 2 - TEXT_BOTTOM_MARGIN
    );

    var bars = [];
    var record = 0;
    for (var i = 0; i < names.length; i++) {
      var barValues = {
        name: names[i],
        time: Math.round(times[i]),
      };

      if (names[i] === CHART_USER_ID) {
        barValues.color = CHART_USER_COLOR;
        bars[0] = barValues;
      } else {
        barValues.color = 'hsl(' + CHART_BAR_HSL_HUE + ', ' + Math.round(Math.random() * 100) + '%, ' + CHART_BAR_HSL_LIGHTNESS + '%)';
        if (i === 0) {
          bars[0] = { };
        }
        bars.push(barValues);
      }

      if (times[i] > record) {
        record = times[i];
      }
    }

    var heightScale = CHART_BAR_LIMIT / record;
    for (i = 0; i < bars.length; i++) {
      bars[i].height = Math.round(bars[i].time * heightScale);
      bars[i].positionX = WINDOW_X + CHART_OFFSET_X + i * CHART_BAR_WIDTH + i * CHART_BAR_INDENT;
      bars[i].positionY = CHART_OFFSET_Y + CHART_BAR_LIMIT - bars[i].height;

      ctx.fillStyle = bars[i].color;
      ctx.fillRect(
          bars[i].positionX,
          bars[i].positionY,
          CHART_BAR_WIDTH,
          bars[i].height
      );

      ctx.font = TEXT_FONT;
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(
          bars[i].time,
          bars[i].positionX,
          bars[i].positionY - TEXT_BOTTOM_MARGIN
      );
      ctx.fillText(
          bars[i].name,
          bars[i].positionX,
          bars[i].positionY + bars[i].height + TEXT_LINE_HEIGHT - TEXT_BOTTOM_MARGIN
      );
    }
  };

})();
