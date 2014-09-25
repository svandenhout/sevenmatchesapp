var args = arguments[0] || {};
var loginReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if(response.access_token) {
      console.log(response);
      Ti.App.Properties.setString("access_token", response.access_token);
      $.index.open();
    }else {
      alert("No access token");
    }
  },
  onerror: function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    console.log(response);
    Ti.API.debug(e.error);
    alert('error');
  },
});

function login(e) {
  if($.email.value != "" && $.password.value != "") {
    loginReq.open("POST","http://sevenmatchestest.herokuapp.com/api/oauth/token");

    var params = {
      grant_type: "password",
      client_id: "sevenmatches-android",
      client_secret: "S3v3nm4tch3s8774!",
      username: $.email.value,
      password: $.password.value
    };
    
    loginReq.send(params);
  }else {
    alert("Email/Wachtwoord moeten ingevuld zijn");
  }
}