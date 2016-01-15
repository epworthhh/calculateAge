Template.age.helpers({
  age: function() {
    var age = Session.get('age');
    return age;
  },

  name: function() {
    var name = Session.get('name');
    return name;
  },
});

Template.age.events({

  'click .calculate': function(e, t) {
    var year = t.find('input[name="year"]').value,
      month = t.find('input[name="month"]').value,
      date = new Date(),
      currentYear = date.getFullYear(),
      currentMonth = date.getMonth() + 1,
      sMonths, sYears;

    // Calculate year
    currentYear -= year;

    // Check if month has a value and it calculate month
    if (month) {
      if (currentMonth > month) {
        currentMonth -= month;
      } else {
        currentMonth = 12 - month + currentMonth;
        if (currentMonth !== 12) {
          currentYear--;
        } else {
          currentMonth = 0;
        }
      }
    } else {
      currentMonth = 0;
    }

    // Singular or plural for strings
    if (currentYear > 1) {
      sYears = ' years old';
    } else {
      sYears = ' year old';
    }

    if (currentMonth > 1) {
      sMonths = ' months';
    } else {
      sMonths = ' month';
    }

    // Set message into 'age'
    if (currentMonth === 0) {
      age = currentYear + sYears;
    } else {
      age = currentYear + sYears + ' and ' + currentMonth + sMonths;
    }

    // Years.insert({year: year});
    Session.set('age', age);
  },

  'keyup input': function(e, t) {
    var name = t.find('input[name="name"]').value;

    if (name) {
       Session.set('name', name + ' is');
    }

  },

  'click .clear': function(e, t) {
      t.find('input[name="year"]').value = '';
      t.find('input[name="month"]').value = '';
      t.find('input[name="name"]').value = '';
      Session.set('age', '');
      Session.set('name', '');
  }

});
