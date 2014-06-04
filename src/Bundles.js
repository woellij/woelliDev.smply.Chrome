///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\bundles\ViewModelsBundle.js
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\AllViewModel.js
/// <reference path="BaseFeedViewModel.js"/>
var AllViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    self.loadItems = function (parameters, callback) {
        Ting.Pins.getAll(parameters, function (res) {
            callback(res);
        });
    };

    this.init = function (parameters) {
        self.title("Everything");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\BaseFeedViewModel.js
/// <reference path="../../src/ViewModels/BaseViewModel.js"/>
/// <reference path="../../res/js/jquery-2.1.0.js"/>
/// <reference path="~/public/res/js/knockout-3.1.0.debug.js" />
/// <reference path="~/res/js/knockout-3.1.0.debug.js" />

/// <reference path="../../res/js/VigLinks.js"/>

BaseFeedViewModel = function (title) {
    var self = this;
    BaseViewModel.call(self);
    self.title(title);
    self.items = ko.observableArray();

    var hasMoreItems = true;
    var loading = false;

    var onLayoutChanged = function () {
        var width = $('#grid .item').first().width();
        self.columnWidth(width);
        var body = $('body');
        console.log("layoutChanged", body.height());
        $('body').height("100%");
    };
    var options;
    var handler = "#grid .item";

    self.onscroll = function (sender, ev) {
        console.log(ev);
        var el = ev.target;
        var remaining = el.scrollHeight - el.scrollTop;

        var closeToBottom = (el.clientHeight - remaining) > -200;
        console.log("scroll to top", remaining, el.clientHeight, closeToBottom);
        if (closeToBottom) {
            self.pullData();
        }
    };

    self.pullData = function (callback) {
        var count = (window.innerWidth / 250) * 3;
        var params = {
            from: self.items().length,
            count: count | 0
        };
        console.log("PULLING params", params, loading, hasMoreItems);

        if (!loading && hasMoreItems) {
            console.log("Fetching Items with params", params);
            loading = true;
            self.loadItems(params, function (newItems) {
                hasMoreItems = newItems.length >= params.count;
                self.addRange(newItems);
                loading = false;
                if (callback)
                    callback();
            });
        }
    };

    self.pinRendered = function (item, ev) {
        console.log("pinRendered item ev", item, ev);
    };

    self.columnWidth = ko.observable(250);

    self.addRange = function (newItems) {
        for (var i = 0; i < newItems.length; i++) {
            var item = newItems[i];
            item.height = ko.computed(function (param) {
                //console.log("computed param", item);
                var height = self.columnWidth() / item.aspectratio;
                //console.log("computed height", self.columnWidth(), item.aspectratio, height);
                return height;
            }, item);
            item.liked = ko.observable();
            item.isreTinged = ko.observable();
            self.items.push(item);
        }
        
        applyLayout();
    };
    var initiatedGrid = false;
    var applyLayout = function () {
        if (!options) {
            options = {
                itemWidth: 270, // Optional min width of a grid item
                autoResize: true, // This will auto-update the layout when the browser window is resized.
                container: $('#grid'),
                onLayoutChanged: onLayoutChanged,
                offset: 15, // Optional, the distance between grid items
                outerOffset: 1, // Optional the distance from grid to parent
                flexibleWidth: 500 // Optional, the maximum width of a grid item
                ,
                resizeDelay: 150
            };
        }

        var $handler = $(handler);
        console.log("applying layout");
        if ($handler.wookmarkInstance)
            $handler.wookmarkInstance.clear();
        $handler.wookmark(options);
        $handler.imagesLoaded(function () {
            if ($handler.wookmarkInstance) {
                $handler.wookmarkInstance.clear();
            }
            $handler.wookmark(options);
        });
    };
};
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\BaseViewModel.js
BaseViewModel = function (title) {
    var self = this;

    self.isLoading = ko.observable();
    self.title = ko.observable(title);

    self.likePin = function (data) {
        console.log("like pin clicked", data);
        var isliked = data.liked();
        data.liked(!isliked);
    };

    self.reTing = function (data) {
        console.log("re-ting", data);
        var isreTinged = data.isreTinged();
        data.isreTinged(!isreTinged);
        Navigation.goTo("boardSelection");
    };

    self.setupPin = function (pin, sitesInfo) {
        console.log("Setting up pin", pin);
        if (!pin.relatedSites) {
            pin.relatedSites = [];
        }
        if (sitesInfo)
            pin.relatedSites.unshift(sitesInfo);
        return pin;
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\BoardSelectionViewModel.js
BoardSelectionViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Select a Board");
    self.boards = ko.observableArray();

    var pin;
    self.boardSelected = function (board) {
        console.log("SelectedBoard", board);
        parameter.board = board;
        Navigation.goTo("editPin", parameter);
    };

    var userID;
    var parameter;

    this.init = function (parameters) {
        if (!parameters.pin) {
            parameter = { pin: parameters }
        } else {
            parameter = parameters;
        }
        Ting.Boards.getUserBoards(function (res) {
            self.isLoading(false);
            console.log("User Boards", res);
            self.boards(res);
        }, userID);
        return self;
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\BoardsViewModel.js
BoardsViewModel = function () {
    var self = this;
    BaseViewModel.call(self);
    self.boards = ko.observableArray();

    
    var userID;
    this.init = function (parameters) {
        if(parameters !== undefined)
        {
            userID = parameters.userID;
        }

        console.log("BoardsViewModel Init");

        Ting.Boards.getUserBoards(function (res) {
            self.isLoading(false);
            console.log("User Boards", res);

            //for (var i = 0; i < res.length; i++) {
            //    var board = res[i];
            //    res.url = ko.
            //}
            self.boards(res);
        }, userID);
    };

    self.clear = function () {
        boards = ko.observableArray();
    };
};
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\BoardViewModel.js
/*global BaseFeedViewModel:false, Ting:false */
var BoardViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    this.init = function (parameters) {
        self.isLoading(true);
        self.board = parameters.board;

        pinId = self.board.id;

        self.title(self.board.name);

        self.pullData(function () {
            self.isLoading(false);
        });

        //Ting.Pins.getPinsForBoard({
        //    id: parameters.id,
        //    from: 0,
        //    count: 20
        //},
        //    function (pins) {
        //        self.addRange(pins);
        //        self.initGrid();
        //        self.isLoading(false);
        //    });
    };

    self.loadItems = function (parameters, callback) {
        parameters.id = pinId;
        Ting.Pins.getPinsForBoard(parameters, callback);
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\CategoryFeedViewModel.js
/// <reference path="BaseFeedViewModel.js"/>
CategoryFeedViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);
    var category;

    self.loadItems = function (parameters, callback) {
        parameters.category = category;
        Ting.Pins.getPinsForCategory(parameters, function (pins) {            
            console.log("CategoryFeed pins fetched", pins);
            callback(pins);
        });
    };

    this.init = function (parameters) {
        var categoryShort = parameters.short;
        category = Ting.Categories.getForShort(categoryShort);
        
        self.title(category.category_name);
       
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\ControlsViewModel.js
ControlsViewModel = function () {
    var self = this;
    self.categories = ko.observableArray();

    self.init = function () {
        Ting.Categories.getAll(function (res) {
            for (var i = 0; i < res.length; i++) {
                var cat = res[i];
                cat.url = function () {
                    return "#/category/" + cat.short;
                };
                console.log(cat);
                self.categories.push(cat);
            }
            //self.categories(res);
        });
    };
};
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\CreateBoardViewModel.js
CreateBoardViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Create a new Board");
    self.categories = ko.observableArray();
    self.selectedCategory = ko.observable();
    self.name = ko.observable();
    self.description = ko.observable();
    self.categoryHint = "Select a category for your board";

    self.createBoardCommand = function () {
        self.isLoading(true);
        Ting.Boards.createBoard(ko.toJS(self), function (res) {
            self.isLoading(false);
        });
    };

    this.init = function () {
        Ting.Categories.getAll(function (cats) {
            self.categories(cats);
        });
    };
};


///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\EditPinViewModel.js
/// <reference path="woelliDev.smply.Web/public/src/UrlHelper.js" />
/// <reference path="woelliDev.smply.Web/public/src/Ting/TingB.js" />
/// <reference path="~/src/Ting/Ting.js" />
/// <reference path="~/src/Ting/Pins.js" />
/// <reference path="~/res/js/knockout-3.1.0.debug.js" />
/// <reference path="~/src/ViewModels/NotificationsViewModel.js" />
EditPinViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Edit your Pin");
    self.board = ko.observable();
    self.pin = ko.observable();

    this.onFinish = function () {
        self.isLoading(true);
        var pin = self.pin();
        var site = ko.toJS(pin.selectedSite);
        pin.title = site.title;
        pin.description = site.description;
        pin.url = site.url;

        console.log("OnEditFinish", site, pin, self.board());
        Ting.Pins.create(pin, self.board(), function (res) {
            self.isLoading(false);
            NotificationsViewModel.show(new Notification("Pin Created!", {
                type: "success",
                content: "The pin was added to your board " + self.board().name
            }));
        });
    };

    this.init = function (parameters) {
        if (typeof parameters !== typeof undefined) {
            var p = parameters.pin;
            if (!p.relatedSites)
                p.relatedSites = [];

            var site;
            if (p.relatedSites.length > 0) {
                console.log("Setting up selected Site from related sites");
                setupSites(p.relatedSites);
                site = ko.observable(p.relatedSites[0]);
            } else {
                console.log("Setting up empty Selected Site");
                site = {
                    title: "",
                    description: "",
                    url: ""
                };
            }
            self.pin(p);
            self.pin().selectedSite = site;
            self.board(parameters.board);
        }
    };

    var setupSites = function (relatedSites) {
        for (var i = 0; i < relatedSites.length; i++) {
            var site = relatedSites[i];
            if (site) {
                var url = window.UrlHelper.resolveRealUrl(site.url);
                if (!site.title) {
                    site.title = window.UrlHelper.shortenURL(url, 35, true);
                }
                if (!site.description) {
                    site.description = "";
                }
                site.url = url;
                console.log("Overhauled site", site);
            }
        }
    };
};



///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\FeedViewModel.js
/*global BaseFeedViewModel:false, Ting:false */
var FeedViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self, "Feed");

    this.init = function (parameters) {
        console.log("FEEDVIEWMODEL INIT");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };

    self.loadItems = function (parameters, callback) {
        Ting.Feed.getUserFeed(parameters, function (res) {
            callback(res);
        });
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\LoginViewModel.js
/// <reference path="../Ting/Ting.js"/>
/// <reference path="../Ting/User.js"/>
/// <reference path="~/res/js/jquery-2.1.0.js" />
var LoginViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Login");
    self.username = ko.observable();
    self.password = ko.observable();

    self.loginCommand = function () {
        self.isLoading(true);
        Ting.User.login(this.username(), this.password());
    };

    var requestedBy;
    this.init = function (parameters) {
        $(Ting.User).on("loggedin", onLogin);
        $(Ting.User).on("loginError", onLoginError);
        console.log("Loginviewmodel init", parameters);
        requestedBy = parameters.requestedBy;
    };

    this.dispose = function () {
        $(Ting.User).off("loggedin", onLogin);
        $(Ting.User).off("loginError", onLoginError);
    };

    var onLoginError = function (evt, error, user) {
        self.isLoading(false);
        console.log("onLoginError", error);
        NotificationsViewModel.show(new Notification("Error", {
            type: "error",
            content: error.message
        }));
    };

    var onLogin = function (evt, res) {
        self.isLoading(false);
        if (requestedBy) {
            if (requestedBy.indexOf("all") > -1) {
                Navigation.goTo("feed");
            } else {
                Navigation.goTo(requestedBy);
            }
        }
        return;
    };
};
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\PinViewModel.js
var PinViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Select a pin");
    self.images = ko.observableArray();
    self.capture = ko.observable();

    self.pinSelected = function (clicked) {
        showBoardSelection(self.setupPin(clicked, tabInfos));
    };

    self.captureSelected = function (vm, event) {
        var pin = self.setupPin(self.capture(), tabInfos);
        pin.isFile = true;
        showBoardSelection(pin);
    };

    self.captureCommand = function () {
        console.log("CaptureCommand");
        Tabs.captureScreen(function (res) {
            console.log("Captured Screenshot", res);
            self.capture({
                src: res.image,
                ratio: res.ratio
            });
        });
    };

    var showBoardSelection = function (pin) {
        Navigation.goTo("boardSelection", { pin: pin });
    };
    +6
    var tabInfos = {};

    this.init = function () {
        self.isLoading(true);
        self.captureCommand();
        Tabs.getImages({ minWidth: 100, minHeight: 100 }, function (data) {
            console.log("getImages Callback", data);
            for (var i = 0; i < data.images.length; i++) {
                var imageData = data.images[i];
                self.images.push(imageData);
            }
            for (var prop in data) {
                if (prop !== "images") {
                    tabInfos[prop] = data[prop];
                }
            }
            console.log("TabInfos", tabInfos);
            self.isLoading(false);
        });
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\PopularViewModel.js
/*global BaseFeedViewModel:false, Ting:false */
var PopularViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    this.init = function (parameters) {
        console.log("Popular INIT");
        self.title("Popular");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };

    self.loadItems = function (parameters, callback) {
        Ting.Pins.getPopular(parameters, function (res) {
            callback(res);
        });
    };
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\RegisterViewModel.js
/// <reference path="../Navigation.js"/>
/// <reference path="../Ting/Ting.js"/>
/// <reference path="../Ting/User.js"/>
/// <reference path="~/src/ViewModels/BaseViewModel.js" />
/// <reference path="~/res/js/knockout-3.1.0.debug.js" />
/// <reference path="~/res/js/jquery-2.1.0.js" />
RegisterViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Register");
    self.email = ko.observable();
    self.username = ko.observable();
    self.password = ko.observable();
    self.gender = ko.observable();
    self.genders = ko.observableArray();
    self.genderHint = "Please select a gender";

    self.sendCommand = function (event, param) {
        Ting.User.register(ko.toJS(self));
    };

    self.loginStored = function (fail) {
        Ting.user.loginStored(onLogin);
    };

    var Gender = function (id, name) {
        this.id = id;
        this.name = name;
    };

    var requestedBy;
    this.init = function (parameters) {
        requestedBy = parameters.requestedBy;
        $(Ting.User).on("loggedin", onLogin);
        $(Ting.User).on("loginError", onLoginError);
        self.genders.push(new Gender("7uUFa5pgwW", "Female"));
        self.genders.push(new Gender("vUjCdGSa2k", "Male"));
        self.genders.push(new Gender("4aA196ySIV", "Transgender"));
        self.genders.push(new Gender("Bo7XTvW4ap", "I'd rather not say"));
    };

    this.dispose = function () {
        $(Ting.User).off("loggedin", onLogin);
        $(Ting.User).off("loginError", onLoginError);
    };

    var onLoginError = function (evt, error, user) {
        self.isLoading(false);
        console.log("onLoginError", error);
        NotificationsViewModel.show(new Notification("Error", {
            type: "error",
            content: error.message
        }));
    };

    var onLogin = function (evt, res) {
        console.log("LoginResult", res);
        self.isLoading(false);
        if (requestedBy !== undefined) {
            if (requestedBy.indexOf("all") > -1)
                Navigation.goTo("feed");
            else
                Navigation.goTo(requestedBy);
        }
    };
};


///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\UserViewModel.js
UserViewModel = (function () {
    var that = {
        username: "",
        isLoggedIn: ko.observable(false),
        isLoggingIn: ko.observable(false),
        registerCommand: function () {
            Navigation.goTo("register");
        },
        logoutCommand: function (sender, event) {
            Ting.User.logout();
        },
        loginCommand: function () {
            Navigation.goTo("login");
        },

        uploadPinCommand: function () {
            console.log("upload pin command");
            $("#uploadPinInput").trigger(typeof (click));
        },

        boardSelected: function (board, ev) {
            console.log("BoardsViewModel selected board", board);
            Navigation.goTo(that.username + "/" + board.name, { board: board });
        },

        createBoardCommand: function (sender, ev) {
            var parent = $(ev.currentTarget).parents(".f-dropdown");
            parent.removeClass('open');
            parent.hide();
            Navigation.goTo("createBoard");
        },
        boardsViewModel: ko.observable(),
        isApp: ko.observable()
    },

        init = function (isApp) {
            console.log("UserViewModel init", isApp);
            that.isApp(isApp);
            $(Ting.User).on('loggedin', onLogin);
            $(Ting.User).on('loggedout', onLogout);

            if (!isApp)
                $("#uploadPinInput").change(function (evt) {
                    $(that).trigger("filePinUpload", evt);
                });
            $(Navigation).on('navigated', function (event, target) {
                that.isLoggingIn(target == 'register' || target == 'login');
            });
            Ting.User.isLoggedIn();
            return that;
        },

        onLogout = function (event) {
            console.log("onlogout");
            that.isLoggedIn(false);
            that.boardsViewModel.clear();
        },

        onLogin = function (evt, loginRes) {
            that.isLoggingIn(false);
            that.isLoggedIn(true);
            initBoards(loginRes);
        },

        initBoards = function (user) {
            Presenter.ViewModelLoader.load('boards', function (vm) {
                vm.init({
                    userID: user.id
                });
                that.boardsViewModel(vm);
                that.username = user.name;
                console.log();
            });
        };


    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ViewModels\NotificationsViewModel.js
NotificationsViewModel = (function () {
    var that = {
        notifications: ko.observableArray()
    },
        init = function () {
            return that;
        },

        show = function (notification) {
            /// <param name="notification" type="Notification">Description</param>
            var closeCallback = notification.options.onclose;
            var timeout = notification.options.timeout || 3000;
            setTimeout(function () {
                notification.close();
            }, timeout);

            notification.options.onclose = function () {
                if (closeCallback) {
                    closeCallback();
                }
                setTimeout(function () {
                    var index = that.notifications.indexOf(notification);
                    that.notifications.splice(index, 1);
                    console.log("closing notification", that.notifications());
                }, 2000);
            };
            console.log("adding notification", notification);
            that.notifications.push(notification);
        };
    that.show = show;
    that.init = init;
    return that;
}());

Notification = function (title, options) {
    this.title = title;
    this.content = options.content;
    this.options = options;

    this.close = function () {
        if (options && options.onclose) {
            options.onclose();
        }
    };
}

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\bundles\TingBundle.js
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\Ting.js
Ting = (function () {
    var that = {},

        init = function (context) {
            console.log("Ting init", Ting);

            Parse.initialize("rnklQPqG2yqcKwmXfYqMSqQ2CoF6lGB56sofWiHt",
                "YKZ49dzwWLXGsOMFcaTFqnUVz34auB7fVoWEuM4t");
            console.log("TingUser", Ting.User);
            that.user = Ting.User.init();
            that.feed = Ting.Feed.init();
            console.log(Ting);
            that.categories = Ting.Categories.init();
            that.pins = Ting.Pins.init();
            that.boards = Ting.Boards.init(that.user);
            return that;
        };

    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\Pins.js
/* global Ting: false, Parse: false*/
/// <reference path="../../res/js/parse.min.js"/>
/// <reference path="~/src/Ting/Ting.js" />
/// <reference path="~/src/Ting/Boards.js" />
/// <reference path="~/src/Ting/Ting.Categories.js" />
Ting.Pins = (function () {
    var that = {},
        Pin,

        init = function () {
            Pin = Parse.Object.extend("pin");
            return that;
        },

        createPinsArray = function (collection) {
            var pins = [];
            for (var i = 0; i < collection.length; i++) {
                var pin = collection[i];
                var p = pin.attributes;
                p.pinclicked = function (ev) { console.log("Pin clicked", ev); }
                p.id = pin.id;
                p.url = p.url ? p.url : "http://ting.parseapp.com";
                p.description = p.description ? p.description : "";
                p.title = p.title ? p.title : "";
                pins.push(p);
            }
            console.log("PINS", pins);
            return pins;
        },

        getAll = function (parameters, callback) {
            var q = new Parse.Query(Pin);
            q.descending('createdAt');
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.find({
                success: function (result) {
                    callback(createPinsArray(result));
                },
                error: function (error) {
                    alert("GetAllPinsError", error);
                }
            });
        },

        getPinsForCategory = function (parameters, callback) {
            var categoryID;
            if (typeof parameters.category !== typeof undefined) {
                categoryID = parameters.category.id;
            } else if (typeof parameters.categoryID !== typeof undefined) {
                categoryID = parameters.categoryID;
            } else {
                throw new EvalError("category undefined");
            }

            var Cat = Parse.Object.extend("category");
            var c = new Cat();
            c.set('id', categoryID);

            var q = new Parse.Query(Pin);

            q.descending("createdAt");
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.equalTo("category", c);

            q.find({
                success: function (results) {
                    callback(createPinsArray(results));
                },
                error: function (error) {
                    console.error("NO PINS FOR CATEGORY", parameters.category, error);
                }
            });
        },

        getPinsForBoard = function (parameters, callback) {
            if (typeof parameters.board === typeof undefined) {
                if (typeof parameters.id === typeof undefined) {
                    throw new EvalError("board undefined");
                } else {
                    var b = Ting.Boards.fromLocal(parameters);
                    parameters.board = b;
                }
            }

            var q = new Parse.Query(Pin);
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.equalTo("board", parameters.board);

            q.descending("createdAt");
            q.find({
                success: function (res) {
                    console.log("got pins for", res);
                    callback(createPinsArray(res));
                },
                error: function (res) {
                    console.error("NO PINS FOR BOARD", parameters.board, error);
                }
            });
        },

        create = function (pin, b, finishedCallback) {
            var board = Ting.Boards.fromLocal(b);
            var category = Ting.Categories.fromLocal(b.category);

            console.log("Creating Pin for board", pin, board, category);

            if (pin.isFile) {
                var name = pin.id || "capture";
                var file = new Parse.File(name, { base64: pin.src });
                console.log("Saving file", name, file);
                file.save().then(function () {
                    console.log("File saved", file);
                    createPin(pin, board, category, finishedCallback, file);
                }, function (error) {
                    console.log("Error saving file", error);
                });
            } else {
                createPin(pin, board, category, finishedCallback);
            }
        },

        createPin = function (localPin, board, category, callback, file) {
            var image;
            if (file) {
                image = file.url();
            } else {
                image = localPin.src;
            }
            var pin = new Pin({
                aspectratio: localPin.ratio,
                image: image,
                title: localPin.title,
                description: localPin.description,
                board: board,
                category: category,
                url: localPin.url
            });
            console.log("Creating Pin", pin);
            pin.save({
                success: function (pin) {
                    console.log("CREATED PIN", pin);
                    callback(pin);
                },
                error: function (model, result, options) {
                    console.log("Error creating PIN", model, result, options);
                    callback(result);
                }
            });
        }

    getPopular = function (parameters, callback) {
        getAll(parameters, callback);
    };

    that.getPopular = getPopular;
    that.createPinsArray = createPinsArray;
    that.getAll = getAll;
    that.getPinsForBoard = getPinsForBoard;
    that.getPinsForCategory = getPinsForCategory;
    that.create = create;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\Boards.js
Ting.Boards = (function () {
    var that = {},
        Board,
        user,

    init = function (usr) {
        user = usr;
        console.log("Boards init");
        Board = Parse.Object.extend("board");
        return that;
    },
    createBoard = function (boardSettings, callback) {
        var board = new Board();
        board.set('name', boardSettings.name);
        board.set('description', boardSettings.description);
        board.set('category', Ting.Categories.getParseObjectForId(boardSettings.selectedCategory.id));
        board.set('owner', Ting.User.getCurrentUser());
        console.log("CreateBoard", board);

        board.save(null, {
            success: function (gameScore) {
                // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + gameScore.id);
            },
            error: function (gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });
    },

    createBoards = function (collection) {
        var boards = [];
        for (var i = 0; i < collection.length; i++) {
            var board = collection[i].attributes;
            board.id = collection[i].id;
            board.description = board.description == undefined ? "" : board.description;
            board.url = function () {
                return board.owner.id + "/" + board.name;
            };
            boards.push(board);
        }
        return boards;
    },


    getUserBoards = function (callback, userID) {
        userID = typeof userID === typeof undefined ? Ting.User.getCurrentUser().id : userID;

        var q = new Parse.Query(Board);
        var user = new Parse.User();
        user.id = userID;

        q.equalTo('owner', user);

        q.find({
            success: function (results) {
                callback(createBoards(results));
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };
    var fromLocal = function (localBoard) {
        var board = new Board();
        board.set("id", localBoard.id);
        return board;
    };

    that.fromLocal = fromLocal;
    that.getUserBoards = getUserBoards;
    that.createBoard = createBoard;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\Ting.Categories.js
Ting.Categories = (function () {
    var that = {},
        categoriesByID = [],
        categoriesByShort = [],
        categories = [],
        Category,


        init = function () {
            console.log("Categories init");
            Category = Parse.Object.extend('category');
            return that;
        },

        getAll = function (callback) {
            if (categories.length > 1) {
                callback(categories);
                return;
            }

            var CategoryCollection = Parse.Collection.extend({
                model: Category
            });
            var collection = new CategoryCollection();
            collection.comparator = function (object) {
                return object.get("category_name");
            };
            collection.fetch({
                success: function (res) {
                    res.each(function (obj) {
                        var c = obj.attributes;
                        c.id = obj.id;
                        categoriesByID[c.id] = c;
                        categoriesByShort[c.short] = c;
                        categories.push(c);
                    });
                    callback(categories);
                },
                error: function (error) {
                    console.log("Categories", error);
                }
            });
        },

        getParseObjectForId = function (id) {
            return new Category({ id: id });
        },

        getForShort = function (short) {
            return categoriesByShort[short];
        },
        fromLocal = function (local) {
            var category = new Category();
            category.set('id', local.objectId);
            return category;
        };
    that.getParseObjectForId = getParseObjectForId;
    that.getForShort = getForShort;
    that.getAll = getAll;
    that.init = init;
    that.fromLocal = fromLocal;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\Ting.Feed.js
/*global Ting:false, Parse:false */

Ting.Feed = (function () {
    var that = {},

	init = function () {

	    return that;
	},

	getUserFeed = function (parameters, callback) {
	    console.log("GetFeed Parameters ", parameters);
	    Parse.Cloud.run("getFeed", parameters, {
	        success: function (result) {
	            console.log("Getting User Feed");
	            var pins = Ting.Pins.createPinsArray(result);
	            callback(pins);
	        },
	        error: function (error) {
	            console.log(error);
	        }
	    });
	};

    that.getUserFeed = getUserFeed;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Ting\User.js
Ting.User = (function () {
    var that = {},
        name,
        currentUserId,

        init = function () {
            console.log("UserInit");
            return that;
        },

        register = function (u) {
            var user = new Parse.User();
            user.set("username", u.username);
            user.set("password", u.password);
            user.set("email", u.email);
            if (u.gender) {
                var gender = new Parse.Object('gender');
                gender.set('id', u.gender.id);
                user.set("gender", gender);
            }

            user.signUp(null, {
                success: function (usr) {
                    console.log("User created", user);
                    onLogin(usr);
                },
                error: function (usr, error) {
                    // Show the error message somewhere and let the user try again.
                    $(that).trigger("loginError", error, usr);
                }
            });
        },

        login = function (username, password) {
            Parse.User.logIn(username, password, {
                success: function (user) {
                    onLogin(user);
                },
                error: function (user, error) {
                    $(that).trigger("loginError", error, user);
                }
            });
        },

        logout = function () {
            Parse.User.logOut();
            $(that).trigger('loggedout');
        },

        isLoggedIn = function () {
            var user = Parse.User.current();
            if (user) {
                onLogin(user);
            }
        },

        onLogin = function (user) {
            currentUserId = user.id;
            var res = createUserObject(user);
            $(that).trigger('loggedin', res);
        },

        getCurrentUser = function () {
            return new Parse.User({ id: currentUserId });
        },

        createUserObject = function (loginRes) {
            return {
                name: loginRes.get("username"),
                id: loginRes.id
            };
        };

    that.getCurrentUser = getCurrentUser;
    that.login = login;
    that.logout = logout;
    that.isLoggedIn = isLoggedIn;
    that.register = register;
    that.init = init;
    return that;
}());

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\bundles\PresentationBundle.js
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Navigation.js
/// <reference path="../res/js/jquery.history.min.js"/>
var Navigation = (function () {
    var that = {},
        rootDir,
        startPage,
        historyEnabled,

        init = function (options) {
            console.log("Navigation Init", options);
            rootDir = typeof options.rootDir === typeof undefined ? "" : options.rootDir;
            rootDir = rootDir === "/" ? "" : rootDir;
            //modalViews['login'] = true;
            //modalViews['register'] = true;
            var modalViews = new Array();

            var $modal = $("#modal");
            $(document).on('closed', '[data-reveal]', function () {
                console.log("Modal closed");
                goBack();
            });
            var header = "<div class='row header' id='header'><h1 id='backbutton'><a><i class='icon-arrow-left-3 fg-darker'></i></a></h1><h1 data-bind='text: title'></h1></div>";

            var presenter = Presenter.init(options.fileDir, modalViews, $modal, header);
            $(presenter).on('viewChanged', onViewChanged);

            Routing.init(presenter, rootDir);
            startPage = options.start;

            if (options.allowWindowNavigation) {
                historyEnabled = options.allowWindowNavigation;
            }
            return that;
        },

        onViewChanged = function (event, target, parameters) {
            toggleBackButton();
            $(that).trigger('navigated', target);

            console.log("OnViewChange", target, parameters);
        },

        goBack = function (event) {
            var isNotHistorified = !History;
            console.log("GoingBack", !isNotHistorified, JSON.stringify(History));
            History.back();
        },

        navigateTo = function (target, parameters) {
            if (target == "start")
                target = startPage;

            target = rootDir + "/" + target;
            console.log("navigating chaging history", target, parameters);
            History.pushState(parameters, null, target);
        },

        toggleBackButton = function () {
            var $backButton = $("#backbutton");
            $backButton.on('click', goBack);
            //if (History.getCurrentIndex() <= 1) {
            //$backButton.hide();
            //} else {
            $backButton.show();
            //}
        };

    that.goTo = navigateTo;
    that.goBack = goBack;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Presenter.js
/// <reference path="../res/js/jquery-2.1.0.js"/>
/// <reference path="woelliDev.smply.Web/public/res/js/knockout-3.1.0.js" />
/// <reference path="~/res/js/foundation.min.js" />
Presenter = (function () {
    var that = {},
        rootDir,
        viewLoader,
        viewModelLoader,
        frame,
        modalViews,
        $modal,
        $header,

        init = function (rootD, modlViews, $modl, hdr) {
            $header = $(hdr);
            console.log($header);
            rootDir = rootD;
            modalViews = modlViews;
            $modal = $modl;
            frame = document.getElementById("navigation-div");
            viewLoader = Presenter.ViewLoader.init(rootDir);
            viewModelLoader = Presenter.ViewModelLoader.init(rootDir);
            return that;
        },

        view,
        viewModel,
        currentViewModel,
        showView = function (target, parameters) {
            var content = frame.firstChild;
            if (content && content.classList) {
                content.classList.add("invis");
            }

            if (currentViewModel && currentViewModel.dispose) {
                console.log("disposing", viewModel);
                currentViewModel.dispose();
            }

            viewLoader.load(target, function (v) {
                view = v;
                setTimeout(function () { tryRender(target, parameters); }, 1);
            });

            viewModelLoader.load(target, function (vm) {
                viewModel = vm;
                viewModel.init(parameters);
                console.log(target + "ViewModel init", parameters);
                setTimeout(function () { tryRender(target, parameters); }, 1);
            });
        },

        tryRender = function (target, parameters) {
            if (!view || !viewModel) {
                console.log("view or viewmodel undefined", view, viewModel);
                return;
            }

            if (modalViews[target] != undefined)
                renderModal(view, target, parameters);
            else {
                render(view);
            }

            $(view).prepend($header);
            document.title = "Ting - " + viewModel.title();
            var main = document.getElementById("main");
            window.ko.cleanNode(main);
            window.ko.applyBindings(viewModel, main);

            $('.f-dropdown').foundation('dropdown', 'close', $('.f-dropdown'));
            $(that).trigger('viewChanged', target, viewModel, parameters);
            view = undefined;
            currentViewModel = viewModel;
            viewModel = undefined;
        },

        render = function () {
            $(frame).html(view);
        },

        renderModal = function (view, target, parameters) {
            $modal.html(view);
            $modal.foundation('reveal', 'open');
        };

    that.showView = showView;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Presenter.ViewLoader.js
/// <reference path="../res/js/jquery-2.1.0.js"/>

Presenter.ViewLoader = (function () {
    var that = {},
        rootDir,
        viewBluePrints = [],

        init = function (rtDir) {
            rootDir = rtDir;
            return that;
        },

        load = function (target, callback) {
            var el = $("<div class='content'></div>");

            var lowerTarget = target.toLowerCase();
            var isFeedView = lowerTarget.indexOf("feed") > -1 || lowerTarget.indexOf("all") > -1 || lowerTarget.indexOf("popular") > -1;
            if (isFeedView) {
                target = "feed";
            }
            console.log("Getting View for", target);

            if (viewBluePrints[target] != undefined) {
                var viewHtml = viewBluePrints[target];
                console.log("Found stored view", target);
                el.html($(viewHtml));
                if (callback)
                    callback(el);
            } else {
                console.log("Loading View for ", target);
                var filename = rootDir + "/src/Views/" + target + "View" + viewFileExtension;
                //filename = filename.replace("//", "/");
                console.log("loading view", filename);
                console.log("jquery", $);
                $.get(filename)
                    .done(function (html) {
                        console.log("view load success", html);
                        el.html(html);
                        viewBluePrints[target] = html;
                        if (callback)
                            callback(el);
                    })
                    .fail(function (xhr, options, r) {
                        console.error("failed to load view", xhr, options, r);
                        if (target !== "404")
                            load("404", callback);
                    });
            }
        };

    that.load = load;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Presenter.ViewModelLoader.js
/// <reference path="../res/js/jquery-2.1.0.js"/>

Presenter.ViewModelLoader = (function () {
    var that = {},
        rootDir,

        init = function (rtDir) {
            rootDir = rtDir;
            return that;
        },

		load = function (target, callback) {
		    var vmName = capitaliseFirstLetter(target) + "ViewModel";

		    if (window[vmName]) {
		        if (callback)
		            callback(new window[vmName]);
		    } else {
		        var vmFile = rootDir + "/src/ViewModels/" + vmName + ".js";
		        console.log("Loading VM", vmFile);

		        $.getScript(vmFile)
                    .done(function (res) {
                        console.log("Loading VM Success", res);
                        if (window[vmName]) {
                            if (callback)
                                callback(new window[vmName]);
                        } else load(target, callback);
                    }).fail(function (jqxhr, settings, exception) {
                        console.log("Failed to load VM", jqxhr, settings, exception);
                    });
		    }
		},

        capitaliseFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

    that.load = load;
    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Routing.js
/// <reference path="../res/js/jquery.history.min.js"/>
/*global History:false, crossroads:false*/

var Routing = (function () {
    var that = {},
        presenter,
        rootDir,
        parameter,
        previousHash,

        init = function (prsntr, rootDr) {
            presenter = prsntr;
            rootDir = rootDr;

            History.options.disableSuid = true;
            History.Adapter.bind(window, 'statechange', function () {
                var State = History.getState();
                console.log("History STATE", State);
                parameter = State.data;
                if (State.hash) {
                    var hash = State.hash.replace(".", "");
                    hash = hash.replace("//", "/");
                    hash = hash.replace("#", "");

                    parameter.requestedBy = removeFirstSlash(previousHash);
                    previousHash = hash;
                    parse(hash);
                } else {
                    console.error("History state has no hash");
                }

            });

            registerRoute(rootDir + "/category/{short}", function (short) {
                presenter.showView('categoryFeed', { short: short });
            });

            registerRoute(rootDir + '/user/{id}', function (id) {
                presenter.showView("user", { userID: id });
            });

            registerRoute(rootDir + '/{username}/{boardname}', function (username, boardname) {
                presenter.showView("board", parameter);
                console.log("Routing to user board", username, boardname, parameter.id);
            });
            registerRoute(rootDir + '/{section}', function (section) {
                presenter.showView(section, parameter);
            });
            return that;
        },

        removeFirstSlash = function (string) {
            /// <param name="string" type="String">Description</param>

            if (string && string.charAt(0) == '/')
                string = string.substring(1, string.length);
            return string;
        },

        parse = function (url) {
            console.log("RouteParsing", url);
            crossroads.parse(url);
        },

        log = function (param) {
            console.log("ROUTING res", param);
        },

        registerRoute = function (path, callback) {
            console.log("Adding Route", path);
            var route = crossroads.addRoute(path, callback);
        };

    that.registerRoute = registerRoute;
    that.parse = parse;
    that.init = init;
    return that;
}());

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\bundles\HelpersBundle.js
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\UrlHelper.js
var UrlHelper = (function () {
    var that = {},

        parseURL = function (url) {
            /// <param name="url" type="String">Url String</param>
            var a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function () {
                    var ret = {},
                        seg = a.search.replace(/^\?/, '').split('&'),
                        len = seg.length, i = 0, s;
                    for (; i < len; i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        },
        shortenURL = function (url, remainingCharCount, ellipse) {
            /// <param name="url" type="String">Url String</param>
            if (url) {
                url = url.replace("https://", "");
                url = url.replace("http://", "");
                var slashIndex = url.indexOf("/");
                url = url.substr(0, remainingCharCount);
                if (ellipse)
                    url += "...";
            }
            return url;
        },
        decodeURL = function (url) {
            /// <param name="url" type="String">Url String</param>
            return decodeURIComponent(url);
        },

        trimFileEnding = function (url) {
            /// <param name="url" type="String">Description</param>
            if (url) {
                var lastSlash = url.lastIndexOf("/");
                url = url.substring(0, lastSlash);
            }
            return url;
        },

        resolveRealUrl = function (url) {
            /// <param name="url" type="String">Url string</param>
            var URL = parseURL(url);
            if (URL) {
                var u = URL.params['u'];
                if (u) {
                    url = decodeURIComponent(u);
                }
            }
            return url;
        };

    that.trimFileEnding = trimFileEnding;
    that.resolveRealUrl = resolveRealUrl;
    that.parseURL = parseURL;
    that.shortenURL = shortenURL;
    that.decodeURL = decodeURL;
    return that;
})();
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Spinner.js
ko.bindingHandlers.spinner = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).hide();
        var options = {};
        $.extend(options, ko.bindingHandlers.spinner.defaultOptions, ko.utils.unwrapObservable(allBindingsAccessor().spinnerOptions));

        //create the spinner with the appropriate options
        var spinner = new Spinner(options);

        //could do this in the update function, but this gives us easy access to the spinner object (through the closure) without having to store it with the element
        ko.dependentObservable(function () {
            var value = ko.utils.unwrapObservable(valueAccessor());  //this ensures that it depends on the observable value

            if (value) {
                $(element).show();
                spinner.spin(element);
            } else if (spinner.el) {   //don't stop first time
                spinner.stop();
                $(element).hide();
            }
        });
    },
    defaultOptions: {
        lines: 17,
        length: 22,
        width: 2,
        radius: 18,
        color: '#000',
        speed: 1,
        trail: 60,
        rotate: 60
    }
};
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\ImageHelper.js
ImageHelper = function () {
    var self = this;
    self.createPin = function (base64, name) {
        var pin = {
            src: base64,
            id: name,
            isFile: true
        }
        return pin;
    }
    self.open = function (file, callback) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            callback(self.createPin(evt.target.result, file.name));
        };
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    };
    return self;
};

///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\Controls.js
Controls = (function () {
    var that = {},
        init = function () {
            var controlsBar = document.getElementById('controls');
            var controlsVm = new ControlsViewModel();
            controlsVm.init();
            ko.applyBindings(controlsVm, controlsBar);
            return that;
        };

    that.init = init;
    return that;
}());
///#source 1 1 C:\Users\woelli\Documents\Visual Studio 2013\Projects\ting\woelliDev.smply.Html\src\App.js
/// <reference path="../src/UrlHelper.js" />
/// <reference path="../res/js/jquery-2.1.0.js" />
/// <reference path="woelliDev.smply.Web/public/res/js/jquery-2.1.0.min.js" />
/// <reference path="woelliDev.smply.Web/public/src/Navigation.js" />
/// <reference path="woelliDev.smply.Web/public/src/ViewModels/ViewModels.js" />
/// <reference path="~/src/ViewModels/UserViewModel.js" />
/// <reference path="~/src/ImageHelper.js" />
/// <reference path="~/src/Navigation.js" />
/// <reference path="~/src/ViewModels/NotificationsViewModel.js" />
/// <reference path="~/res/js/knockout-3.1.0.debug.js" />
/// <reference path="ViewModels/ControlsViewModel.js"/>
/// <reference path="Controls.js"/>
/// <reference path="~/src/Ting/Ting.js" />
var App = (function () {
    var that = {};
    var bodyReady = false;

    var onFilePinUpload = function (evt, fileEvent) {
        /// <param name="fileEvent" type="Event">Description</param>
        if (fileEvent.currentTarget.files.length != 1)
            return;
        var image = fileEvent.currentTarget.files[0];
        var imgHelper = new ImageHelper();
        imgHelper.open(image, function (pin) {
            Navigation.goTo("boardSelection", pin);
        });
    };

    var init = function (context, parameters) {
        parameters.fileDir = parameters.fileDir ? parameters.fileDir : "";
        parameters.isApp = parameters.isApp || false;
        if (!bodyReady) {
            loadBody(parameters.fileDir, function () {
                bodyReady = true;
                init(context, parameters);
            });
            return that;
        };
        console.log("Site init context", context);
        $(document).foundation(
        {
            offcanvas:
            {
                open_method: 'overlap', // Sets method in which offcanvas opens, can also be 'overlap'
                close_on_click: true
            },
            abide: 'events'
        });
        //$(document).foundation('abide', 'events');

        var ting = Ting.init();

        initNavigation(parameters);
        initUser(parameters);
        initNotifications();

        Controls.init();


        $(that).trigger("initialized");
        return that;
    };

    var initNotifications = function () {
        var notifVm = NotificationsViewModel.init();
        ko.applyBindings(notifVm, document.getElementById('notifications'));
    };

    var initUser = function (parameters) {
        var userVm = window.UserViewModel.init(parameters.isApp);
        console.log("USER VIEW MODEL", userVm);
        if (!parameters.isApp)
            $(userVm).bind("filePinUpload", onFilePinUpload);
        ko.applyBindings(userVm, document.getElementById("usercontrols"));
        ko.applyBindings(userVm, document.getElementById("usersettings"));
        if (userVm.isLoggedIn()) {
            Navigation.goTo(parameters.isLoggedInStart);
        } else Navigation.goTo(parameters.isNotLoggedInStart);
    };

    var loadBody = function (fileDir, callback) {
        var $body = $("#body");
        if ($body.children().length > 0) {
            callback();
        } else {
            $body.load(fileDir + "/body.html", function (body) {
                callback();
            });
        }
    };

    var initNavigation = function (parameters) {
        console.log(parameters);
        var hash = parameters.hash;
        if (hash)
            hash = parameters.hash.replace("#", "");

        var navigation = Navigation.init({
            allowWindowNavigation: true,
            start: "",
            rootDir: "",
            fileDir: parameters.fileDir
        });
    };

    that.init = init;
    return that;
}());;
