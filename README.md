# JSX views compiled with 6to5 for Express

**Work still in progress**

This is a view engine inspired by [express-react-views][reactjs/express-react-views] to
compile React JSX files at request time with [Express][express] based servers.

Unlike express-react-views however, it compiles templates with [6to5][6to5].

Why? Simply because it has better support for ES6 features, and is a transpiler you're more than likely to use.

## Setup

```js
var jsxViews = require('express-6to5-jsx-views');
var app = express();
app.set('view engine', 'jsx');
app.engine('jsx', jsxViews.createEngine());
```

And if you have a file `views/DefaultPage.jsx`:

```jsx
import React from 'react';

var DefaultPage = React.createClass({
    render: () => {
        return(
        <html>
            <head>
                <title>Hello world!</title>
            </head>
            <body>
                <h1>Hello world, from JSX!</h1>
            </body>
        </html>
        );
    }
});

export default DefaultPage;
```

And now you can just call the `render` function:

```js
app.get('/', function(req, res) {
    res.render('DefaultPage', {});
});
```

`createEngine` also takes the following options:

* `engine`
  * `doctype` (default: `<!DOCTYPE html>`) - the DOCTYPE string to prepend to the output automatically
  * `staticOutput` (default: `false`) - if set to `true`, the output will not contain any React-related markup
* `to5`
  * Any 6to5 configuration can go here. By default, only `extensions: ['.jsx']` is set.

**Work still in progress**
