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
if(Titanium.Platform.model === "Simulator") {
  Alloy.Globals.url = "http://localhost:3000";
}else {
  Alloy.Globals.url = "http://sevenmatchestest.herokuapp.com";
}

if(Alloy.Globals.token !== "false") {
  Alloy.Globals.authHeader = "Bearer " + Alloy.Globals.token;
}