var args = arguments[0] || {};
console.log(args);

var players = [];
var keepers = [];

var getPlayers = JSON.stringify(args.players);
var getKeepers = JSON.stringify(args.keepers);

var playerReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = [];
    var title = [{
      title: {text: "Spelers"},
      template: "playerItemHeader"
    }];
    
    players = JSON.parse(json);
    for(var i = 0; i < players.length; i++) {
      items.push({
        name: {text: players[i].name.first + " " + players[i].name.last},
      });
      if(i % 2 === 0) items[i].template = "playerItemEven";
      console.log(i & 1);
    }
    
    $.playerList.sections[0].appendItems(title);
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
    var title = [{
      title: {text: "Keepers"},
      template: "playerItemHeader"
    }];
    
    keepers = JSON.parse(json);
    for(var i = 0; i < keepers.length; i++) {
      items.push({
        name: {text: keepers[i].name.first + " " + keepers[i].name.last},
      });
      if(i % 2 === 0) items[i].template = "playerItemEven";
    }
    $.playerList.sections[1].appendItems(title);
    $.playerList.sections[1].appendItems(items);
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
  
  Alloy.createController("player", players[e.itemIndex + 1]).getView("player").open();
  
};

playerReq.open("GET", Alloy.Globals.url + "/api/players/getbyids?players=" + getPlayers);
playerReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
playerReq.send();

keeperReq.open("GET", Alloy.Globals.url + "/api/players/getbyids?players=" + getKeepers);
keeperReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
keeperReq.send();