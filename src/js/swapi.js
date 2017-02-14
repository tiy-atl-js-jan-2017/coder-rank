import $ from 'jquery';

var PI = 3.1415962;

function add (x, y) {
  return x + y;
}

var secret = "i love cookies. poop.";

var exports = {
  PI: PI,
  add: add
};

export default exports;
