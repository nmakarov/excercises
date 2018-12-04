q: You're writing a code with some promises or callbacks. What's your first thought if you see this error: `Unhandled rejection TypeError: Cannot read property 'someFunctionName' of undefined`?
a: Most likely `...}.bind(this))` is missing from a `then` clause.

