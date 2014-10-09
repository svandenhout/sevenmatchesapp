var args = arguments[0] || {};
console.log(args);

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

reviewsReq.open("GET", "http://sevenmatchestest.herokuapp.com/api//reviews/all/" + args._id);
reviewsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewsReq.send();