// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.token = Ti.App.Properties.getString("access_token", "false");
Alloy.Globals.logOut = function(e) {
  Ti.App.Properties.removeProperty("access_token");
  Alloy.createController("login").getView("login").open();
};

if(Titanium.Platform.model === "Simulator1") {
  Alloy.Globals.url = "http://localhost:4000";
}else {
  Alloy.Globals.url = "https://api.sevenmatches.com";
}

if(Alloy.Globals.token !== "false") {
  Alloy.Globals.authHeader = "Bearer " + Alloy.Globals.token;
}