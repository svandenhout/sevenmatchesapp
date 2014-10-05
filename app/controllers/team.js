var args = arguments[0] || {};

var players = [];
var keepers = [];

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = _.map(JSON.parse(json), function(player) {
      return {
        "name.full": {text: player.name.full}
      };
    });
    $.playerList.sections[0].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

var keeperReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = _.map(JSON.parse(json), function(player) {
      return {
        "name.full": {text: player.name.full}
      };
    });
    $.playerList.sections[1].appendItems(items);
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