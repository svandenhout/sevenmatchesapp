var token = Ti.App.Properties.getString("access_token", "false");

if(token === "false") {
  console.log($.login);
}else {
  $.index.open();
}