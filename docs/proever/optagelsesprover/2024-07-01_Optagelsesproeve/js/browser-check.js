document.addEventListener("DOMContentLoaded", function () {
    // Function to detect the browser and its version
    var browser = (function () {
        var ua = navigator.userAgent, // Get the user agent string
            tem,
            // Match user agent string for known browsers
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge|yabrowser|opr(?=\/))\/?\s*(\d+)/i) || [];

        // Handle Internet Explorer (trident)
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: "IE", version: tem[1] || "" };
        }

        // Handle Chrome and its derivatives (Opera, Edge, Yandex)
        if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edg|YaBrowser)\/(\d+)/);
            if (tem != null) {
                return {
                    name: tem[1].replace("OPR", "Opera").replace("Edg", "Edge").replace("YaBrowser", "Yandex"),
                    version: tem[2]
                };
            }
        }

        // Handle Yandex Browser specifically
        if (ua.indexOf("YaBrowser") > -1) {
            tem = ua.match(/YaBrowser\/(\d+)/);
            return { name: "Yandex", version: tem[1] };
        }

        // Fallback for other browsers
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

        // Handle version number for Safari and other browsers
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        return { name: M[0], version: M[1] };
    })();

    // Function to show the custom popup
    function showCustomPopup() {
        const popup = document.getElementById("browserCheckPopup");
        popup.style.display = "block";
    }

    // Log the detected browser and version for debugging
    console.log(browser);

    // List of supported browsers
    const supportedBrowsers = ["Chrome", "Firefox", "Edge", "Safari"];

    // Check if the browser is not supported or if it is a supported browser with an outdated version
    if (!supportedBrowsers.includes(browser.name) ||
        (browser.name === "Chrome" && parseInt(browser.version) < 123) ||
        (browser.name === "Firefox" && parseInt(browser.version) < 123) ||
        (browser.name === "Edge" && parseInt(browser.version) < 123) ||
        (browser.name === "Safari" && parseInt(browser.version) < 15) ||
        (browser.name === "Yandex")) {
        // Show the popup if the condition is met
        showCustomPopup();
    }
});
