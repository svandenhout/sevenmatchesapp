var teams = {};
// reset access token when false (after login)
var teamsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    teams = JSON.parse(json);
    var items = _.map(teams, function(team) {
      return {
        name: {text: team.gender + " " + team.ageClass + " " + team.teamNumber},
        players: {text: "spelers: " + team.players.length},
        keepers: {text: "keepers: " + team.keepers.length}
      };
    });
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
  
  teamsReq.open("GET","http://sevenmatchestest.herokuapp.com/api/teams/owner");
  teamsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  teamsReq.send();
}