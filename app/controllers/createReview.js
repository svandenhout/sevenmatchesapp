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
      review.personality.scores.push(0);
      return {
        "itemScore": {id: reviewItem},
        "itemTitle": {text: reviewItem}
      };
    });
    
    $.reviewItemList.sections[0].setItems(personality);
    
    var technique = _.map(reviewForm.technique, function(reviewItem) {
     review.technique.scores.push(0);
     return {
        "itemScore": {id: reviewItem},
    "itemTitle": {text: reviewItem}
     };
    });
    
    $.reviewItemList.sections[1].setItems(technique);
    
    var tactics = _.map(reviewForm.tactics, function(reviewItem) {
      review.tactics.scores.push(0);
      return {
        "itemScore": {id: reviewItem},
        "itemTitle": {text: reviewItem}
      };
    });
    
    $.reviewItemList.sections[2].setItems(tactics);
    
    var physical = _.map(reviewForm.physical, function(reviewItem) {
      review.physical.scores.push(0); 
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
  console.log(review);
}

reviewFormReq.open("GET", "http://sevenmatchestest.herokuapp.com/api/review/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();