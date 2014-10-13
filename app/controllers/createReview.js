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
      title: {text: "Persoonlijkheid"}, 
      template: "reviewListHeader", 
      backgroundColor: "#FFF"
    }];
    
    var techniqueTitle = [{
      title: {text: "Techniek"}, 
      template: "reviewListHeader", 
      backgroundColor: "#FFF"
    }];
    
    var tacticsTitle = [{
      title: {text: "Taktiek"}, 
      template: "reviewListHeader", 
      backgroundColor: "#FFF"
    }];
    
    var physicalTitle = [{
      title: {text: "Fysiek"}, 
      template: "reviewListHeader", 
      backgroundColor: "#FFF"
    }];
    
    var personality = mapReviewForm(reviewForm.personality);
    
    var technique = mapReviewForm(reviewForm.technique);
    
    var tactics = mapReviewForm(reviewForm.tactics);
    
    var physical = mapReviewForm(reviewForm.physical);
    
    
    $.reviewItemList.sections[0].appendItems(personalityTitle);
    $.reviewItemList.sections[0].appendItems(personality);
    
    $.reviewItemList.sections[1].appendItems(techniqueTitle);
    $.reviewItemList.sections[1].appendItems(technique);
    
    
    $.reviewItemList.sections[2].appendItems(tacticsTitle);
    $.reviewItemList.sections[2].appendItems(tactics);
    
    
    $.reviewItemList.sections[3].appendItems(physicalTitle);
    $.reviewItemList.sections[3].appendItems(physical);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

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

// TODO: make for loop
function mapReviewForm(reviewFormSection) {
  var index = 0;
  var section = _.map(reviewFormSection, function(reviewItem) {
    review.personality.scores.push(0);
    index++;
    
    if(index % 2 !== 0) {
      return {
        "itemTitle": {
          text: reviewItem
        },
        template: "reviewItemOdd"
      };
    }else {
      return {
        "itemTitle": {
          text: reviewItem
        },
      };
    }
    
  });
  
  return section;
}

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
  
  var data = {json: JSON.stringify(review)};
  createReviewReq.open("POST", Alloy.Globals.url + "/api/review/create/");
  createReviewReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
  createReviewReq.send(data);
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
  var avg = sum / count;
  return avg;
}

reviewFormReq.open("GET", Alloy.Globals.url + "/api/review/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();