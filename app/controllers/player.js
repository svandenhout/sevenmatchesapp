var args = arguments[0] || {};

$.firstName.text = args.name.first;
$.lastName.text = args.name.last;

function reviews(e) {
  Alloy.createController("reviews", args).getView("reviews").open();
}