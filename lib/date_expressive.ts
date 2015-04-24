module DateExpressive {



//cf http://stackoverflow.com/questions/563406/add-days-to-datetime
//Quoi qu'il y paraisse, cette fonction marche même avec les fins de mois, d'année
//et les changement d'heure
  var date_addDaysMonthsYears = function (oldDate, days, months, years) {
    var result = new Date(oldDate.getFullYear() + years, oldDate.getMonth() + months, oldDate.getDate() + days);
    return result;
  };

//cf http://stackoverflow.com/questions/2587345/javascript-date-parse
//Date.parse cannot be trusted...
// parse a date in yyyy-mm-dd format
  function parseDate(input) {
    var parts = input.split('-');
    if (parts.length != 3)
      throw "parseDate error with " + input;
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }

  function today_00AM() {
    var now = new Date();
    var result = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return result;
  }

//input can be
//a date with format yyyy-mm-dd
//or
//   now or today
// | this_monday | this_tuesday | ... | this_sunday  (this_... is in the past or can be equal to today !)
// | next_monday | next_tuesday | ... | next_sunday (next_ ... will never be equal to today !)
// | this_month | this_month
// | this_year | next_year
  function parseDateOrExpression(input) {
    try {
      var d = parseDate(input);
      return d;
    } catch (e) {
    }

    input = input.toLowerCase();
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    var now = today_00AM();
    if ((input.indexOf("now") === 0) || (input.indexOf("today") === 0)) {
      return now;
    }

    var isThis = false, isNext = false;
    if (input.indexOf("this_") === 0) {
      isThis = true;
    }
    if (input.indexOf("next_") === 0) {
      isNext = true;
    }
    if ((!isThis) && (!isNext)) {
      throw "can't parseDateOrExpression " + input;
    }

    var increment = isThis ? -1 : 1;

    var inputEnd = input.substring(5);
    inputEnd = inputEnd.replace(new RegExp("\\s", "g"), "");

    var resultDay = today_00AM();
    //Test days
    var whichday = -1;
    for (var i = 0; i < 7; i++) {
      if (inputEnd == days[i])
        whichday = i;
    }
    if (whichday >= 0) {
      if (isNext)
        resultDay = date_addDaysMonthsYears(resultDay, 1, 0, 0);
      while (resultDay.getDay() != whichday) {
        resultDay = date_addDaysMonthsYears(resultDay, increment, 0, 0);
      }
      return resultDay;
    }

    if (inputEnd == "month") {
      if (isNext)
        resultDay = date_addDaysMonthsYears(resultDay, 1, 0, 0);
      while (resultDay.getDate() != 1) {
        resultDay = date_addDaysMonthsYears(resultDay, increment, 0, 0);
      }
      return resultDay;
    }

    if (inputEnd == "year") {
      if (isNext)
        resultDay = date_addDaysMonthsYears(resultDay, 1, 0, 0);
      while ((resultDay.getDate() != 1) || (resultDay.getMonth() !== 0)) {
        resultDay = date_addDaysMonthsYears(resultDay, increment, 0, 0);
      }
      return resultDay;
    }

    throw "can't parseDateOrExpression " + input;
  }


//syntaxe stringWhatToAdd :
//"-25d"  ( moins 25 jours)
//"3m"  (plus 3 mois)
//"-2y" (moins 2 ans)
  var date_add = function (_oldDate, stringWhatToAdd) {
    var oldDate;

    if (typeof(_oldDate) == "string") {
      oldDate = parseDateOrExpression(_oldDate);
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
    var stringStart = stringWhatToAdd.substr(0, stringWhatToAdd.length - 1);

    var value = parseInt(stringStart);
    if (isNaN(value))
      return oldDate;

    if ((lastChar == 'd') || (lastChar == 'D')) {
      days = value;
    }
    if ((lastChar == 'm') || (lastChar == 'M')) {
      months = value;
    }
    if ((lastChar == 'y') || (lastChar == 'Y')) {
      years = value;
    }

    return date_addDaysMonthsYears(oldDate, days, months, years);
  };


// Syntaxe / date_expression
// "now - 1d" / "now + 3m" / "now - 2y"
// "2012-04-02 + 5d"
//  "this_monday" "next_monday"
//  "this_tuesday + 1m" "last_wednesday + 1y"
//  "last_year - 2d"
//  "this_month" / "next_month"
// Spaces around " + " or " - " are important !
  export function date_expressive(date_expression) {

    var plusIndex = date_expression.indexOf(" + ");
    var minusIndex = date_expression.indexOf(" - ");

    var indexPlusMinus = -1;
    if ((plusIndex >= 0) && (minusIndex >= 0)) {
      if (minusIndex < plusIndex)
        indexPlusMinus = minusIndex;
      else
        indexPlusMinus = plusIndex;
    }
    else if (plusIndex >= 0)
      indexPlusMinus = plusIndex;
    else if (minusIndex >= 0)
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


    var dateObject = parseDateOrExpression(dateExtract);

    var result = date_add(dateObject, whatToAdd);
    return result;
  };

}

/*
//All of the following examples work
expr = "now + 1d";
console.log(expr + "=>" + date_expressive(expr));

expr = "now + 3D";
console.log(expr + "=>" + date_expressive(expr));

expr = "now - 4D";
console.log(expr + "=>" + date_expressive(expr));

expr = "now - 2m";
console.log(expr + "=>" + date_expressive(expr));

expr = "now + 1y";
console.log(expr + "=>" + date_expressive(expr));

expr = "now - 2y ";
console.log(expr + "=>" + date_expressive(expr));

expr = "2014-06-45";
console.log(expr + "=>" + date_expressive(expr));

expr = "2014-02-27 + 4d";
console.log(expr + "=>" + date_expressive(expr));

expr = "now";
console.log(expr + "=>" + date_expressive(expr));

expr = "this_monday + 1d";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_year + 1m";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_year - 3d";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_saturday";
console.log(expr + "=>" + date_expressive(expr));

expr = "today";
console.log(expr + "=>" + date_expressive(expr));

expr = "today + 50y";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_month - 1d";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_month";
console.log(expr + "=>" + date_expressive(expr));

expr = "next_year";
console.log(expr + "=>" + date_expressive(expr));

expr = "this_tuesday";
console.log(expr + "=>" + date_expressive(expr));
*/
