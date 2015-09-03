var teams = {};
// reset access token when false (after login)
var teamsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    teams = JSON.parse(json);
    var items = [];
    for(var i = 0; i < teams.length; i++) {
      var numPlayers = (teams[i].players) ? teams[i].players.length : 0;
      var numKeepers = (teams[i].keepers) ? teams[i].keepers.length : 0;
      items.push({
        name: {
          text: teams[i].gender + " " + 
          teams[i].ageClass + " " 
          + teams[i].teamNumber
        },
        players: {text: "spelers: " + numPlayers},
        keepers: {text: "keepers: " + numKeepers},
      });
      if(i % 2 === 0) items[i].template = "teamItemOdd";
    };
    
    $.teamList.sections[0].appendItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function showTeamDetail(e) {
  Alloy.createController("team", teams[e.itemIndex]).getView("team").open();
}

if(Alloy.Globals.token === "false") {
  Alloy.createController("login").getView("login").open();
}else {
  $.index.open();
  teamsReq.open("GET", Alloy.Globals.url + "/teams/trainer");
  teamsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  teamsReq.send();
}