## How to use

run this in console:
```
node_modules/.bin/webpack-dev-server ./entry --hot --inline --module-bind "css=style\!css"
```

point the browser to `http://localhost:8080/bundle`

now edit something in style.css, and observe that while appearance changes, data in the input box remains.
