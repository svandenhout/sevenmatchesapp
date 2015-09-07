var args = arguments[0] || {};
var avg = average([
  args.personality.avg,
  args.technique.avg,
  args.tactics.avg,
  args.physical.avg
]);

$.personalityAvg.text = args.personality.avg;
$.techniqueAvg.text = args.technique.avg;
$.tacticsAvg.text = args.tactics.avg;
$.physicalAvg.text = args.physical.avg;

$.avg.text = "Totaalscore " + avg;

var createReviewReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var data = JSON.parse(json);
    Alloy.createController("index").getView("index").open();
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function previous(e) {
  if(args.simple) {
    Alloy.createController("simpleReview", args.back).getView("simpleReview").open();
  }else {
    Alloy.createController("createReview", args.back).getView("createReview").open();
  }
}

function sendReview(e) {
  delete args.back;
  args.feedback = $.summary.getValue();
  args.avg = avg;
  
  var data = {json: JSON.stringify(args)};
  createReviewReq.open("POST", Alloy.Globals.url + "/review?teamId=" + args.teamId);
  createReviewReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  createReviewReq.send(data);
};

function average(numbers) {
  var sum = 0;
  var count = 0;
  for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] == 0) {
      continue;
    }else {
      sum += numbers[i];
      count++;
    }
  }
  var avg = Math.round((sum / count) * 100) /100 ;
  return avg;
};