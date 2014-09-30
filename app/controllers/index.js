var token = Ti.App.Properties.getString("access_token", "false");

if(token === "false") {
  Alloy.createController("login").getView("login").open();
}else {
  $.index.open();
}