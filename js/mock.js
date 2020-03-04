'use strict';

(function () {
  var offerTitles = [
    'First Cabin Kyobashi ',
    'Residential stage Higashi Shinjuku 1204',
    'Hotel Resol Ueno',
    'Smart Stay SHIZUKU Ueno Ekimae',
    'Tokyo Joystay Inn',
    'Shinagawa Prince Hotel East Tower',
    'Capsule Hotel Transit Shinjuku',
    'do-c Ebisu',
  ];

  var offerRoomTypes = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  var offercheckinTimes = [
    '12:00',
    '13:00',
    '14:00',
  ];

  var offercheckoutTimes = [
    '12:00',
    '13:00',
    '14:00',
  ];

  var offerFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var offerDescriptions = [
    'Situated within 300 m of Edo Taito Traditional Crafts Center and 300 m of Asakusa ROX Shopping Center, nine hours Asakusa features rooms with air conditioning and a shared bathroom in Tokyo.',
    'Nestled in the middle of the Kabukicho area in Shinjuku, Booth Netcafe & Capsule offers accommodation in Tokyo. The property is situated a 5-minute walk from JR Shinjuku Station.',
    'Located a 8-minute walk from JR Shinbashi Station, a 6-minute walk from Shinbashi Station on the Ginza Line, Tokyo Ginza Bay Hotel offers capsule rooms with free WiFi access.',
    'Only a 2-minute walk from JR Shin Okubo Train Station, Hanabi Hotel offers Japanese-style accommodations with a private kitchen.',
    'Shin-Okubo City Hotel is a about 20 minutes by train from the Meiji Jinja Shrine and Yoyogi Park. It just a few steps from shops and restaurants.',
    'Capsule Hotel Hatagoya (Male Only) offers capsule rooms for male guests in Tokyo.',
  ];

  var offerPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  window.offerData = {
    title: offerTitles,
    roomType: offerRoomTypes,
    checkInTime: offercheckinTimes,
    checkOutTime: offercheckoutTimes,
    features: offerFeatures,
    description: offerDescriptions,
    photo: offerPhotos,
  };
})();
