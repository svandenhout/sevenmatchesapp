var args = arguments[0] || {};

var players = [];
var keepers = [];

console.log(args.players);

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    players = JSON.parse(json);
    $.playerList.sections[0].appendItems(players);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

var keeperReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    keepers = JSON.parse(json);
    $.playerList.sections[1].appendItems(keepers);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

playerReq.open("GET", "http://localhost:3000/api/players/getbyids?players=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// playerReq.setRequestheader("Content-Type", "application/javascript");
playerReq.send();

keeperReq.open("GET", "http://localhost:3000/api/players/getbyids?players=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// keeperReq.setRequestheader("Content-Type", "application/javascript");
keeperReq.send();