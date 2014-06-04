var ChromeApp = function () {
    window.viewFileExtension = ".min.html";
    console.log("ChromeApp");
    var context = window.chrome.extension.getBackgroundPage();
    console.log(context);
    Tabs = context.Tabs.init();
    Bookmarks = context.Bookmarks.init();
    var parameters = {
        isLoggedInStart: "pin",
        isNotLoggedInStart: "login",
        isApp: false
    };
    $(document).ready(function () {
        App.init(window, parameters);
    });

}();