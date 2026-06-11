document.addEventListener("DOMContentLoaded", function () {

    function showCustomPopup() {
        document.getElementById("browserCheckPopup").style.display = "block";
    }

    const browser = (function () {
        const ua = navigator.userAgent;
        let tem;
        let M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge|yabrowser|opr(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident|msie/i.test(ua)) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: "IE", version: tem[1] || "" };
        }

        if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edg|YaBrowser)\/(\d+)/);
            if (tem) {
                return {
                    name: tem[1] === "OPR" ? "Opera" :
                          tem[1] === "Edg" ? "Edge" :
                          "Yandex",
                    version: tem[2]
                };
            }
        }

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M[2] = tem[1];
        }

        return { name: M[1], version: M[2] };
    })();

    const name = browser.name?.charAt(0).toUpperCase() + browser.name.slice(1).toLowerCase();
    const version = parseInt(browser.version, 10);

    if (
        name === "IE" ||
        name === "Yandex" ||
        !["Chrome", "Firefox", "Edge", "Safari"].includes(name) ||
        (name === "Chrome" && version < 120) ||
        (name === "Firefox" && version < 120) ||
        (name === "Edge" && version < 120) ||
        (name === "Safari" && version < 14)
    ) {
        showCustomPopup();
    }

});
