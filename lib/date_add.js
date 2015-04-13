//cf http://stackoverflow.com/questions/563406/add-days-to-datetime
//Quoi qu'il y paraisse, cette fonction marche même avec les fins de mois, d'année
//et les changement d'heure
var date_addDaysMonthsYears = function(oldDate, days, months, years) {
  var result = new Date(oldDate.getFullYear() + years, oldDate.getMonth() + months, oldDate.getDate() + days);
  return result;
};


//oldDate : date object ou "now" (toute chaine est en fait interprétée en tant que now())
//
//syntaxe stringWhatToAdd :
//"-25d"  ( moins 25 jours)
//"3m"  (plus 3 mois)
//"-2y" (moins 2 ans)
var date_add = function(_oldDate, stringWhatToAdd) {
  var oldDate;

  if (typeof(_oldDate) == "string") {
    oldDate = new Date();
  }
  else {
    oldDate = _oldDate;
  }


  var days = 0, months = 0, years = 0;
  //substr(start-index,length)

  if (!stringWhatToAdd)
    return oldDate;
  if (stringWhatToAdd.length < 2)
    return oldDate;

  var lastChar = stringWhatToAdd.charAt(stringWhatToAdd.length - 1);
  var stringStart = stringWhatToAdd.substr(0, stringWhatToAdd.length -1);

  var value = parseInt(stringStart);
  if (isNaN(value))
    return oldDate;

  if ( (lastChar == 'd') || (lastChar == 'D') ) {
      days = value;
  }
  if ( (lastChar == 'm') || (lastChar == 'M') ) {
      months = value;
  }
  if ( (lastChar == 'y') || (lastChar == 'Y') ) {
      years = value;
  }

  return date_addDaysMonthsYears(oldDate, days, months, years);
};

//cf http://stackoverflow.com/questions/2587345/javascript-date-parse
//Date.parse cannot be trusted...
// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

// Syntaxe / date_expression
// "now - 1d" / "now + 3m" / "now - 2y"
// "2012-04-02 + 5d"
// Spaces around " + " or " - " are important !
var relative_date_parse = function(date_expression) {

  plusIndex = date_expression.indexOf(" + ");
  minusIndex = date_expression.indexOf(" - ");

  var indexPlusMinus = -1;
  if ( (plusIndex >= 0) && (minusIndex >= 0) ) {
    if (minusIndex < plusIndex)
      indexPlusMinus = minusIndex;
    else
      indexPlusMinus = plusIndex;
  }
  else if (plusIndex >= 0)
    indexPlusMinus = plusIndex;
  else if (minusIndex >=0)
    indexPlusMinus = minusIndex;

  var dateExtract;
  var whatToAdd;
  if (indexPlusMinus >= 0) {
    dateExtract = date_expression.substr(0, indexPlusMinus);
    whatToAdd = date_expression.substr(indexPlusMinus, date_expression.length - indexPlusMinus);
  } else {
    dateExtract = date_expression;
    whatToAdd = "";
  }
  dateExtract = dateExtract.replace(new RegExp("\\s", "g"), "");
  whatToAdd = whatToAdd.replace(new RegExp("\\s", "g"), "");


  var dateObject;
  if ( (dateExtract.toLowerCase() == "now") || (dateExtract.toLowerCase() == "now()") )
    dateObject = new Date();
  else {
    dateObject = parseDate(dateExtract);
  }

  var result = date_add(dateObject, whatToAdd);
  return result;
};

/*
expr = "now + 1d";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now + 3D";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now - 4D";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now - 2m";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now + 1y";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now - 2y ";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "2014-06-45";
console.log(expr + "=>" + relative_date_parse(expr));


expr = "2014-02-27 + 4d";
console.log(expr + "=>" + relative_date_parse(expr));

expr = "now";
console.log(expr + "=>" + relative_date_parse(expr));

*/
