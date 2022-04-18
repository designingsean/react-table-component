# Download Files Table

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

First thing to do is get everything installed. If you need to to get node installed locally first, then check out nvm.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Things Not Done

This is a list of things that still need to be done but that I ran out of time to do.

## Testing

I had it in my head that I could use this project to quickly learn EmberJS at the same time. Realized after a bit that was a poor choice, and so switched back to a framework I am more comfortable with (React). However, that choice ate up some time, and so I chose to leave out testing as a result.

## Responsive

I purposefully chose not to bring in any external libraries to show what I could do without those helpers. However, in the real world, I would probably use a React table library, which would have helped make the table more friendly on mobile devices. This is also why I did not make the table a separate component.

## Accessibility

The checkboxes as implemented right now might not be super accessible, given that their checked state are changed programmatically. Not 100% sure, though, as I am basing this on the CSS for the `:checked` state no longer working correctly.
