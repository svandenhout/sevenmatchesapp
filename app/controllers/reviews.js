var args = arguments[0] || {};

var reviewsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    reviews = JSON.parse(json);
    
    var items = _.map(reviews, function(review) {
      var avg = (
        review.personality.avg +
        review.technique.avg +
        review.tactics.avg +
        review.physical.avg
      ) / 4;
      
      avg = Math.floor(avg * 100) / 100;
      
      return {
        "date": {text: review.parseDate},
        "score": {text: avg}
      };
    });
    
    $.reviewList.sections[0].setItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function newReview(e) {
  Alloy.createController("createReview", args).getView("createReview").open();
};

reviewsReq.open("GET", Alloy.Globals.url + "/api//reviews/all/" + args._id);
reviewsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewsReq.send();