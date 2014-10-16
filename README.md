Excercises
==========

Interview tasks, interesting things

### Curry

language: **javascript**

folder: **curry/**

The whole thing is about how to wtite functions with execution signatures like this: 

    var result = func(param1)(param2)(param3)

or this:

~~~
    var partial = func(param1)(param2);
    var result = partial(param3);
~~~

While the description in *curry/curry.md* is in Russian, *curry.js* is fairly straightforward and quite easy to follow. The final result is in the last test.

How to run: 

    mocha curry

or

    mocha -R spec curry

