var loginLoad = function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if(response.token) {
      Ti.App.Properties.setString("access_token", response.token);
      // set authorisation globals after login
      Alloy.Globals.token = response.token;
      Alloy.Globals.authHeader = Alloy.Globals.token;
      
      Alloy.createController("index").getView("index").open();
    }else {
      alert("No access token");
    }
    this.abort();
};

var loginError = function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if(response.email) alert(response.email);
    if(response.password) alert(response.password);
    this.abort();
};

function login(e) {
  if($.emailInput.value != "" && $.passwordInput.value != "") {
    loginReq = Titanium.Network.createHTTPClient();
    loginReq.onload = loginLoad;
    loginReq.onerror = loginError;
    loginReq.open("POST", Alloy.Globals.url + "/user/token");
    loginReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var params = {
      grant_type: "password",
      client_id: "sevenmatches-android",
      client_secret: "S3v3nm4tch3s8774!",
      username: $.emailInput.getValue(),
      password: $.passwordInput.getValue()
    };
    
    loginReq.send(params);
  }else {
    alert("Email/Wachtwoord moeten ingevuld zijn");
  }
}