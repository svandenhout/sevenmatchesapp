var teams = [];
// reset access token when false (after login)
var teamsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    teams = JSON.parse(json);
    var items = _.map(teams, function(team) {
      return {
        ageClass: {text: team.ageClass},
        teamNumber: {text: team.teamNumber}
      };
    });
    $.teamList.sections[0].appendItems(items);
  },
  onerror: function(e) {
    var json = this.responseText;
    console.log(json);
    var response = JSON.parse(json);
    if(response.email) alert(response.email);
    if(response.password) alert(response.password);
  }
});

function showTeamDetail(e) {
  // console.log(teams[e.itemIndex]);
  console.log(Alloy.createController("team", teams[e.itemIndex]).getView("team"));
  Alloy.createController("team", teams[e.itemIndex]).getView("team").open();
}

// these requests are needed for detail view
// var playersReq = Titanium.Network.createHTTPClient({
   // onload: function(e) {
//      
   // },
   // onerror: function(e) {
//      
   // }
// });
// 
// var keepersReq = Titanium.Network.createHTTPClient({
   // onload: function(e) {
//      
   // },
   // onerror: function(e) {
//      
   // }
// });

if(Alloy.Globals.token === "false") {
  Alloy.createController("login").getView("login").open();
}else {
  $.index.open();
  
  teamsReq.open("GET","http://sevenmatchestest.herokuapp.com/api/teams/owner");
  teamsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  teamsReq.send();
}