var args = arguments[0] || {};
var personality = [];
var technique = [];
var tactics = [];
var physical = [];
var review = {
  reviewForm: args.formId,
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
  },
};

var reviewFormReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var reviewForm = JSON.parse(json);
    
    var personalityTitle = [{
      title: {text: "1/4 Persoonlijkheid"},
      template: "reviewListHeader",
      backgroundColor: "#FFF"
    }];
    
    var techniqueTitle = [{
      title: {text: "2/4 Techniek"},
      template: "reviewListHeader",
      backgroundColor: "#FFF"
    }];
    
    var tacticsTitle = [{
      title: {text: "3/4 Taktiek"}, 
      template: "reviewListHeader",
      backgroundColor: "#FFF"
    }];
    
    var physicalTitle = [{
      title: {text: "4/4 Fysiek"},
      template: "reviewListHeader",
      backgroundColor: "#FFF"
    }];
    
    personality = mapReviewForm(reviewForm.personality, "personality");
    technique = mapReviewForm(reviewForm.technique, "technique");
    tactics = mapReviewForm(reviewForm.tactics, "tactics");
    physical = mapReviewForm(reviewForm.physical, "physical");
    
    $.reviewItemList.sections[0].setItems(personalityTitle);
    $.reviewItemList.sections[1].setItems(personality);
    
    $.reviewItemList.sections[2].setItems(techniqueTitle);
    $.reviewItemList.sections[3].setItems(technique);
    
    $.reviewItemList.sections[4].setItems(tacticsTitle);
    $.reviewItemList.sections[5].setItems(tactics);
    
    $.reviewItemList.sections[6].setItems(physicalTitle);
    $.reviewItemList.sections[7].setItems(physical);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

// sectionname is neccecairy for making the actual 
// reviewscore map correctly
function mapReviewForm(reviewFormSection, sectionName) {
  var section = [];
  for(var i = 0; i < reviewFormSection.length; i++) {
    review[sectionName].scores.push(0);
    section.push({
      itemTitle: {text: reviewFormSection[i]}
    });
    if(i % 2 === 0) section[i].template = "reviewItemOdd";
  };
  
  return section;
}

// this needs to change the number after the score
function changeScore(e) {
  // var item = $.reviewItemList.sections[e.sectionIndex].items[e.itemIndex];
  // item.score.text = Math.round(this.getValue());
  // $.reviewItemList.sections[e.sectionIndex].updateItemAt(e.itemIndex, item);
  if(e.sectionIndex === 1) {
    review.personality.scores[e.itemIndex] =
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 3) {
    review.technique.scores[e.itemIndex] =
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 5) {
    review.tactics.scores[e.itemIndex] =
        Math.round(this.getValue());
  }
  
  if(e.sectionIndex === 7) {
    review.physical.scores[e.itemIndex] =
        Math.round(this.getValue());
  }
}

function createReview(e) {
  review.personality.avg = average(review.personality.scores);
  review.tactics.avg = average(review.tactics.scores);
  review.technique.avg = average(review.technique.scores);
  review.physical.avg = average(review.physical.scores);
  review.simple = false;
  review.back = args;
  
  
  Alloy.createController("sendReview", review).getView("sendReview").open();
}

function average(numbers) {
  var sum = 0;
  var count = 0;
  for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] < 1) {
      continue;
    }else {
      sum += numbers[i];
      count++;
    }
  }
  var avg = Math.round((sum / count) * 100) /100;
  return avg;
}

function previous(e) {
  Alloy.createController("reviews", args).getView("reviews").open();
};

reviewFormReq.open("GET", Alloy.Globals.url + "/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();