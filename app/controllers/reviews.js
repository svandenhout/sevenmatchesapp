var args = arguments[0] || {};

$.playerName.text = args.name.first + " " + args.name.last;
$.playerImage.image = args.imageCollection.profile;
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
      var date = new Date(reviews[i].date);
      var formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      items.push({
        date: {text:formattedDate},
        score: {text: Number(avg).toFixed(1)}
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

reviewsReq.open("GET", Alloy.Globals.url + "/reviews/user/" + args._id);
reviewsReq.setRequestHeader("Authorization", Alloy.Globals.authHeader);
reviewsReq.send();