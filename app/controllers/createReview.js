var args = arguments[0] || {};

var reviewFormReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var reviewForm = JSON.parse(json);
    console.log(reviewForm);
    
    var personality = _.map(reviewForm.personality, function(reviewItem) {
      return {
        "itemTitle": {text: reviewItem},
      };
    });
    
    $.reviewList.sections[0].setItems(personality);
    
     var technique = _.map(reviewForm.technique, function(reviewItem) {
      return {
        "itemTitle": {text: reviewItem},
      };
    });
    
    $.reviewList.sections[1].setItems(technique);
    
     var tactics = _.map(reviewForm.tactics, function(reviewItem) {
      return {
        "itemTitle": {text: reviewItem},
      };
    });
    
    $.reviewList.sections[2].setItems(tactics);
    
     var physical = _.map(reviewForm.physical, function(reviewItem) {
      return {
        "itemTitle": {text: reviewItem},
      };
    });
    
    $.reviewList.sections[3].setItems(physical);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

reviewFormReq.open("GET", "http://localhost:3000/api/review/form/" + args.formId);
reviewFormReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewFormReq.send();