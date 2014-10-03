var loginReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if(response.access_token) {
      Ti.App.Properties.setString("access_token", response.access_token);
      
      // set authorisation globals after login
      Alloy.Globals.token = response.access_token;
      Alloy.Globals.authHeader = "Bearer " + Alloy.Globals.token;
      
      Alloy.createController("index").getView("index").open();
    }else {
      alert("No access token");
    }
  },
  onerror: function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if(response.email) alert(response.email);
    if(response.password) alert(response.password);
  },
});

function login(e) {
  if($.emailInput.value != "" && $.passwordInput.value != "") {
    loginReq.open("POST","http://localhost:3000/api/oauth/token");

    var params = {
      grant_type: "password",
      client_id: "sevenmatches-android",
      client_secret: "S3v3nm4tch3s8774!",
      username: $.emailInput.value,
      password: $.passwordInput.value
    };
    
    loginReq.send(params);
  }else {
    alert("Email/Wachtwoord moeten ingevuld zijn");
  }
}