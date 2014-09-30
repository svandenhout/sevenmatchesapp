var loginReq = Titanium.Network.createHTTPClient({
  onLoad: function(e) {
    var json = this.responseText;
    var response = JSON.parse(json);
    if (response) {
      alert("Token = " + response);
    }else {
      alert("AWFULL");
    }
  }
});

function login(e) {
  if($.email.value != '' && $.password.value != '') {
    loginReq.open(
      "POST",
      "http://sevenmatchestest.herokuapp.com/api/oauth/token"
    );

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

$.index.open();