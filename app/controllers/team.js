var args = arguments[0] || {};

var players = [];
var keepers = [];

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    console.log(this.responseText);
    players = JSON.parse(json);
    console.log(players);
    // $.playerList.sections["players"].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

var keeperReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    console.log(this.responseText);
    keepers = JSON.parse(json);
    console.log(keepers);
    // $.playerList.sections["keepers"].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

playerReq.open("POST", "http://localhost:3000/api/players/getbyid");
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// playerReq.setRequestheader("Content-Type", "application/javascript");
playerReq.send(args);

keeperReq.open("POST", "http://localhost:3000/api/keepers/getbyid");
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// keeperReq.setRequestheader("Content-Type", "application/javascript");
keeperReq.send(args);
