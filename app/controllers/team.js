var args = arguments[0] || {};

var players = [];
var keepers = [];

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var teamId = args._id;

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = [];
    
    players = JSON.parse(json);
    for(var i = 0; i < players.length; i++) {
      var item = {};
      item.name = {text: players[i].name.first + " " + players[i].name.last};
      item.playerType = {text: "Speler"};
      if(players[i].imageCollection.profile) 
          item.image = players[i].imageCollection.profile;
      items.push(item);
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
      var item = {};
      item.name = {text: keepers[i].name.first + " " + keepers[i].name.last};
      item.playerType = {text: "Keeper"};
      if(keepers[i].imageCollection.profile) item.image = keepers[i].imageCollection.profile;
      items.push(item);
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
  player.teamId = teamId;
  keeper.teamId = teamId;
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

playerReq.open("GET", Alloy.Globals.url + "/users?users=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
playerReq.send();

keeperReq.open("GET", Alloy.Globals.url + "/users?users=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
keeperReq.send();