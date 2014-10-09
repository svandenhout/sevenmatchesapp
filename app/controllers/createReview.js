var args = arguments[0] || {};

var review = {
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
  },
};

var reviewFormReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var reviewForm = JSON.parse(json);
    
    var personality = _.map(reviewForm.personality, function(reviewItem) {
      review.personality.scores.push(null);
      return {
        "itemScore": {id: reviewItem},
        "itemTitle": {text: reviewItem}
      };
    });
    
    $.reviewItemList.sections[0].setItems(personality);
    
    var technique = _.map(reviewForm.technique, function(reviewItem) {
     review.technique.scores.push(null);
     return {
        "itemScore": {id: reviewItem},
    "itemTitle": {text: reviewItem}
     };
    });
    
    $.reviewItemList.sections[1].setItems(technique);
    
    var tactics = _.map(reviewForm.tactics, function(reviewItem) {
      review.tactics.scores.push(null);
      return {
        "itemScore": {id: reviewItem},
        "itemTitle": {text: reviewItem}
      };
    });
    
    $.reviewItemList.sections[2].setItems(tactics);
    
    var physical = _.map(reviewForm.physical, function(reviewItem) {
      review.physical.scores.push(null); 
      return {
        "itemScore": {id: reviewItem},
        "itemTitle": {text: reviewItem}
      };
    });
    
    $.reviewItemList.sections[3].setItems(physical);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

// this needs to change the number after the score
function changeScore(e) {
  if(e.sectionIndex === 0) {
    review.personality.scores[e.itemIndex] = 
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 1) {
    review.technique.scores[e.itemIndex] = 
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 2) {
    review.tactics.scores[e.itemIndex] = 
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 3) {
    review.physical.scores[e.itemIndex] = 
        Math.round(this.getValue());
  }
}

function createReview(e) {
  review.personality.avg = average(review.personality.scores);
  review.tactics.avg = average(review.tactics.scores);
  review.technique.avg = average(review.technique.scores);
  review.physical.avg = average(review.physical.scores);  
  console.log(review);
}

function average(numbers) {
  var sum = 0;
  var count = 0;
  for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] !== "<null>") {
      sum += numbers[i];
      count++;
    }
  }
  var avg = sum / i;
  return avg;
}

reviewFormReq.open("GET", "http://sevenmatchestest.herokuapp.com/api/review/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();