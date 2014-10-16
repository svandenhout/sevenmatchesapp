var args = arguments[0] || {};

var review = {
  playerId: args._id,
  personality: {
    scores: []
  },
  technique: {
    scores: []
  },
  tactics: {
    scores: []
  },
  physical: {
    scores: []
  }
};

var reviewFormReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var reviewForm = JSON.parse(json);
    var simple = [
      {
        itemTitle: {text: reviewForm.simple[0]},
        template: "reviewItemOdd"
      }, {
        itemTitle: {text: reviewForm.simple[1]},
      }, {
        itemTitle: {text: reviewForm.simple[2]},
        template: "reviewItemOdd"
      }, {
        itemTitle: {text: reviewForm.simple[3]}
      }
    ];
    
    review.personality.scores.push(0);
    review.technique.scores.push(0);
    review.tactics.scores.push(0);
    review.physical.scores.push(0);
    
    $.reviewItemList.sections[0].appendItems(simple);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

// this needs to change the number after the score
function changeScore(e) {
  // var item = $.reviewItemList.sections[0].items[e.itemIndex];
  // item.score.text = Math.round(this.getValue()); // Math.round(this.getValue() * 100) / 100;
  // $.reviewItemList.sections[0].updateItemAt(e.itemIndex, item);
  
  if(e.itemIndex === 0) review.personality.scores[0] = 
      Math.round(this.getValue());
      
  if(e.itemIndex === 1) review.technique.scores[0] = 
      Math.round(this.getValue());
  
  if(e.itemIndex === 2) review.tactics.scores[0] = 
      Math.round(this.getValue());
  
  if(e.itemIndex === 3) review.physical.scores[0] = 
      Math.round(this.getValue());
}

function createReview(e) {
  review.personality.avg = review.personality.scores[0];
  review.tactics.avg = review.tactics.scores[0];
  review.technique.avg = review.technique.scores[0];
  review.physical.avg = review.physical.scores[0];
  
  Alloy.createController("sendReview", review).getView("sendReview").open();
}

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
  var avg = Math.round((sum / count) * 100) /100;
  return avg;
}

reviewFormReq.open("GET", Alloy.Globals.url + "/api/review/form/simple");
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();