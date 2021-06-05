const relativeDate = (function (undefined) {
  const SECOND = 1000,
    MINUTE = 60 * SECOND,
    HOUR = 60 * MINUTE,
    DAY = 24 * HOUR,
    WEEK = 7 * DAY,
    YEAR = DAY * 365,
    MONTH = YEAR / 12;

  function evening(datum) {
    const d = new Date(datum);
    d.setHours(17, 0, 0, 0);
    return datum - d.getTime();
  }
  function noon(datum) {
    const d = new Date(datum);
    d.setHours(12, 0, 0, 0);
    return datum - d.getTime();
  }
  function morning(datum) {
    const d = new Date(datum);
    d.setHours(5, 0, 0, 0);
    return datum - d.getTime();
  }
  function night(datum) {
    const d = new Date(datum);
    d.setHours(-2, 0, 0, 0);
    return datum - d.getTime();
  }
  function yesterday(datum) {
    const d = new Date(datum);
    d.setHours(-19, 0, 0, 0);
    return datum - d.getTime();
  }

  const formats = [
    [0.7 * MINUTE, "just now"],
    [1.5 * MINUTE, "a minute ago"],
    [60 * MINUTE, "minutes ago", MINUTE],
    [1.5 * HOUR, "an hour ago"],
    [4 * HOUR, "hours ago", HOUR],
    [evening, "this evening"],
    [noon, "this afternoon"],
    [morning, "this morning"],
    [night, "last night"],
    [yesterday, "yesterday"],
    [7 * DAY, "days ago", DAY],
    [1.5 * WEEK, "a week ago"],
    [MONTH, "weeks ago", WEEK],
    [1.5 * MONTH, "a month ago"],
    [YEAR, "months ago", MONTH],
    [1.5 * YEAR, "a year ago"],
    [Number.MAX_VALUE, "years ago", YEAR],
  ];

  function relativeDate(instant, datum) { // uses args in millis, but converts from Date
    if (!datum) {
      datum = new Date().getTime();
    } else if (datum instanceof Date) {
      datum = datum.getTime();
    }

    if (instant instanceof Date) {
      instant = instant.getTime();
    }

    const interval = datum - instant;
    for (const [delta, label, scale] of formats) {
      if (interval < (delta instanceof Function ? delta(datum) : delta)) {
        if (scale) {
          return `${Math.round(interval / scale)} ${label}`;
        }

        return label;
      }
    }
  }

  return relativeDate;
})();

if (typeof module != "undefined" && module.exports) {
  module.exports = relativeDate;
}
