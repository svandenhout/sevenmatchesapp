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
    
    var personality = mapReviewForm(reviewForm.personality, "personality");
    var technique = mapReviewForm(reviewForm.technique, "technique");
    var tactics = mapReviewForm(reviewForm.tactics, "tactics");
    var physical = mapReviewForm(reviewForm.physical, "physical");
    
    $.reviewItemList.sections[0].appendItems(personalityTitle);
    $.reviewItemList.sections[1].appendItems(personality);
    
    $.reviewItemList.sections[2].appendItems(techniqueTitle);
    $.reviewItemList.sections[3].appendItems(technique);
    
    $.reviewItemList.sections[4].appendItems(tacticsTitle);
    $.reviewItemList.sections[5].appendItems(tactics);
    
    $.reviewItemList.sections[6].appendItems(physicalTitle);
    $.reviewItemList.sections[7].appendItems(physical);
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
      itemTitle: {
        text: reviewFormSection[i]
      }
    });
    if(i % 2 === 0) section[i].template = "reviewItemOdd";
  };

  return section;
}

// this needs to change the number after the score
function changeScore(e) {
  console.log(this);
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

reviewFormReq.open("GET", Alloy.Globals.url + "/api/review/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();