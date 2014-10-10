var args = arguments[0] || {};

var players = [];
var keepers = [];

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    players = JSON.parse(json);
    var items = _.map(players, function(player) {
      return {
        "name": {text: player.name.first + " " + player.name.last},
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
    keepers = JSON.parse(json);
    var items = _.map(keepers, function(player) {
      return {
        "name": {text: player.name.first + " " + player.name.last},
      };
    });
    $.playerList.sections[1].setItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function showPlayerDetail(e) {
  var player = players[e.itemIndex];
  
  // set the correct review form on a player
  
  // sectionIndex 0 is playersection of list
  if(e.sectionIndex === 0) {
    player.formId = args.playerForm;
  }
  
  // sectionIndex 1 is keepersection of list
  if(e.sectionIndex === 1) {
    player.formId = args.keeperForm;
  }
  
  Alloy.createController("player", players[e.itemIndex]).getView("player").open();
  
};

playerReq.open("GET", Alloy.Globals.url + "/api/players/getbyids?players=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
playerReq.send();

keeperReq.open("GET", Alloy.Globals.url + "/api/players/getbyids?players=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
keeperReq.send();