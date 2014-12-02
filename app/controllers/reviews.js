var args = arguments[0] || {};

$.playerName.text = args.name.first + " " + args.name.last;
$.playerImage.image = args.imageCollection.profileImage;
if(args.keeperId) $.playerType.text = "Keeper";
if(args.formId) $.playerType.text = "Speler";

var reviewsReq = Titanium.Network.createHTTPClient({
  onload: function(e) {
    var json = this.responseText;
    var items = [];
    reviews = JSON.parse(json);
    
    for(var i = 0; i < reviews.length; i++) {
      var avg = (
        reviews[i].personality.avg +
        reviews[i].technique.avg +
        reviews[i].tactics.avg +
        reviews[i].physical.avg
      ) / 4;
      
      avg = Math.floor(avg * 100) / 100;
      
      items.push({
        date: {text: reviews[i].parseDate},
        score: {text: avg}
      });
      if(i % 2 !== 0) items[i].template = "reviewsEven";
    };
    
    $.reviewList.sections[0].setItems(items);
  },
  onerror: function(e) {
    console.log(this.responseText);
  }
});

function previous(e) {
  Alloy.createController("player", args).getView("player").open();
};

function newReview(e) {
  Alloy.createController("createReview", args).getView("createReview").open();
};

function newSimpleReview(e) {
  Alloy.createController("simpleReview", args).getView("simpleReview").open();
}

reviewsReq.open("GET", Alloy.Globals.url + "/reviews/all/" + args._id);
reviewsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewsReq.send();