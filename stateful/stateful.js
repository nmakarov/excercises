var Stateful = function () {
  this.conditions = {};
  this.waitingFunctions = [];
};

Stateful.prototype.clean = function (condition) {
  this.conditions[condition] = true;
  this.runChecks();
};

Stateful.prototype.dirty = function (condition) {
  this.conditions[condition] = false;
  this.runChecks();
};

Stateful.prototype.runChecks = function () {
  var fn, conds, canBeRun;
  var that = this;
  this.waitingFunctions.forEach(function (funcObject, i) {
    var conds = funcObject.conds;
    var fn = funcObject.fn;

    canBeRun = true;
    conds.forEach(function (c) {
      if ( ! that.conditions[c]) {
        canBeRun = false;
      }
    });

    if (canBeRun) {
      if (funcObject.charged) {
        fn.apply();
        funcObject.charged = false;
      }
      if (funcObject.onetime) {
        delete(that.waitingFunctions[i]);
      }
    } else {
      funcObject.charged = true;
    }
  });
};

Stateful.prototype.when = function (conditions, fn, onetime) {
  if (typeof conditions.forEach !== 'function') {
    conditions = [conditions];
  }

  // check if the function exists already
  var seen = false;
  this.waitingFunctions.forEach(function (funcObject) {
    if (funcObject.fn === fn) {
      funcObject.conds = conditions;
      funcObject.onetime = onetime;
      funcObject.charged = true;
      seen = true;
    }
  });
  if ( ! seen) {
    this.waitingFunctions.push({conds:conditions, fn: fn, onetime: onetime, charged: true});
  }

  this.runChecks();
};

self.shared.stateful = new Stateful();
window.stateful = new Stateful();
window.fn1 = function () {console.log('fn1 here');};
window.fn2 = function () {console.log('fn2 here');};


stateful.when('aaa', fn1);
stateful.when(['aaa', 'bbb'], fn2, true);


