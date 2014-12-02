var args = arguments[0] || {};

var players = [];
var keepers = [];

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = [];
    
    players = JSON.parse(json);
    for(var i = 0; i < players.length; i++) {
      items.push({
        name: {text: players[i].name.first + " " + players[i].name.last},
        playerImage: {image: players[i].imageCollection.profileImage},
        playerType: {text: "Speler"}
      });
      if(i % 2 === 0) items[i].template = "playerItemEven";
    }
    
    $.playerList.sections[0].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

var keeperReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = [];
    
    keepers = JSON.parse(json);
    for(var i = 0; i < keepers.length; i++) {
      items.push({
        name: {text: keepers[i].name.first + " " + keepers[i].name.last},
        playerImage: {image: keepers[i].imageCollection.profileImage},
        playerType: {text: "Keeper"}
      });
      if(i % 2 === 0) items[i].template = "playerItemEven";
    }
    $.playerList.sections[1].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function showPlayerDetail(e) {
  var player = players[e.itemIndex];
  var keeper = keepers[e.itemIndex];
  // set the correct review form on a player
  
  // sectionIndex 0 is playersection of list
  if(e.sectionIndex === 0) {
    player.formId = args.playerForm;
    player.back = args;
    Alloy.createController("player", player).getView("player").open();
  }
  
  // sectionIndex 1 is keepersection of list
  if(e.sectionIndex === 1) {
    keeper.formId = args.keeperForm;
    keeper.back = args;
    Alloy.createController("player", keeper).getView("player").open();
  }
};

function previous(e) {
  Alloy.createController("index").getView("index").open();
};

playerReq.open("GET", Alloy.Globals.url + "/players/getbyids?players=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
playerReq.send();

keeperReq.open("GET", Alloy.Globals.url + "/players/getbyids?players=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
keeperReq.send();