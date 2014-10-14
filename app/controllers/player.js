var args = arguments[0] || {};

$.playerName.text = args.name.first + " " + args.name.last;
if(args.keeperId) $.playerType.text = "Keeper";
if(args.formId) $.playerType.text = "Speler";

function reviews(e) {
  Alloy.createController("reviews", args).getView("reviews").open();
}