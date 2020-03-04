'use strict';

(function () {
/**
 * @description
 *  Create similar ads
 *
 * @param {number} number - number similar ads
 * @return {array} - array similar ads
 */
  var createSimilarAds = function (number) {
    var numberSimilarAds = number || 8;

    var similarAds = [];

    for (var i = 0; i < numberSimilarAds; i++) {
      var ad = {};
      ad.author = {};
      ad.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

      ad.location = {};
      ad.location.x = window.random.getNumber(0, 1200);
      ad.location.y = window.random.getNumber(130, 630);

      ad.offer = {};
      ad.offer.title = window.random.getArrayValue(window.offerData.title);
      ad.offer.address = ad.location.x + ', ' + ad.location.y;
      ad.offer.price = window.random.getNumber(10000, 80000) + ' JPY';
      ad.offer.type = window.random.getArrayValue(window.offerData.roomType);
      ad.offer.rooms = window.random.getNumber(1, 10);
      ad.offer.guests = window.random.getNumber(1, 10);
      ad.offer.checkin = window.random.getArrayValue(window.offerData.checkInTime);
      ad.offer.checkout = window.random.getArrayValue(window.offerData.checkOutTime);
      ad.offer.features = window.random.getArrayLength(window.offerData.features);
      ad.offer.description = window.random.getArrayValue(window.offerData.description);
      ad.offer.photos = window.random.getArrayLength(window.offerData.photo);

      similarAds[i] = ad;
    }

    return similarAds;
  };

  var similarAds = createSimilarAds();

  window.data = {
    createSimilarAds: createSimilarAds,
    similarAds: similarAds,
  };
})();
