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
        "firstName": {text: player.name.first},
        "lastName": {text: player.name.last}
      };
    });
    $.playerList.sections[0].setItems(items);
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
        "firstName": {text: player.name.first},
        "lastName": {text: player.name.last}
      };
    });
    $.playerList.sections[1].setItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function showPlayerDetail(e) {
  Alloy.createController("player", players[e.itemIndex]).getView("player").open();
};

function showKeeperDetail(e) {
  Alloy.createController("keeper", keepers[e.itemIndex]).getView("keeper").open();
};

playerReq.open("GET", "http://localhost:3000/api/players/getbyids?players=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// playerReq.setRequestheader("Content-Type", "application/javascript");
playerReq.send();

keeperReq.open("GET", "http://localhost:3000/api/players/getbyids?players=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
// keeperReq.setRequestheader("Content-Type", "application/javascript");
keeperReq.send();