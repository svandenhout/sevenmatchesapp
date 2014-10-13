var teams = {};
// reset access token when false (after login)
var teamsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    teams = JSON.parse(json);
    var items = [];
    
    for(var i = 0; i < teams.length; i++) {
      items.push({
        name: {
          text: teams[i].gender + " " + 
          teams[i].ageClass + " " 
          + teams[i].teamNumber
        },
        players: {text: "spelers: " + teams[i].players.length},
        keepers: {text: "keepers: " + teams[i].keepers.length},
      });
      if(i & 1 !== 0) items[i].template = "teamItemOdd";
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
  teamsReq.open("GET", Alloy.Globals.url + "/api/teams/owner");
  teamsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  teamsReq.send();
}