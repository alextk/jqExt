jQuery.ext.Extender.addUtilityMethods({

  /**
   * @namespace System information object parsed from browser navigator.userAgent property
   * @memberOf $
   */
  systemInfo: function() {

    var ua = navigator.userAgent.toLowerCase();

    /** @ignore */
    var check = function(r) {
      return r.test(ua);
    };


    var info = {
      browser: { },
      os: {}
    };

    info.browser.isStrict = document.compatMode == "CSS1Compat";
    info.browser.isSecure = /^https/i.test(window.location.protocol);

    info.browser.isOpera = check(/opera/);
    info.browser.isChrome = check(/\bchrome\b/);
    info.browser.isWebKit = check(/webkit/);
    info.browser.isSafari = !info.browser.isChrome && check(/safari/);
    info.browser.isSafari2 = info.browser.isSafari && check(/applewebkit\/4/); // unique to Safari 2
    info.browser.isSafari3 = info.browser.isSafari && check(/version\/3/);
    info.browser.isSafari4 = info.browser.isSafari && check(/version\/4/);
    info.browser.isIE = !info.browser.isOpera && check(/msie/);
    info.browser.isIE7 = info.browser.isIE && check(/msie 7/);
    info.browser.isIE8 = info.browser.isIE && check(/msie 8/);
    info.browser.isIE6 = info.browser.isIE && !info.browser.isIE7 && !info.browser.isIE8;
    info.browser.isGecko = !info.browser.isWebKit && check(/gecko/);
    info.browser.isGecko2 = info.browser.isGecko && check(/rv:1\.8/);
    info.browser.isGecko3 = info.browser.isGecko && check(/rv:1\.9/);
    info.browser.isBorderBox = info.browser.isIE && !info.browser.isStrict;

    info.os.isWindows = check(/windows|win32/);
    info.os.isMac = check(/macintosh|mac os x/);
    info.os.isAir = check(/adobeair/);
    info.os.isLinux = check(/linux/);

    return info;

  }()

}, true);