# GOALS frontend

Frontend for Goals app.

JavaScript / React / Material UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<i><b>Note:</b> This app is not functional without the GOALS API. This can be found [here](https://github.com/cwaymeyer/goals-backend).</i>

## Available Scripts

#### `npm start`

Runs the app in the development mode on [http://localhost:3000](http://localhost:3000).

#### `npm test`

Launches the test runner in the interactive watch mode.

### Component Hierarchy

<img src="/public/images/component_tree.jpg" width="800"/>

<hr />

### How does the app work?

The main functionality of the app lies in the <i>Goalpage</i>, an interactive dashboard to track a specific user goal.
<br />

<img src="/public/images/dashboard_screenshot.jpg" width="800"/>

One rep max (ORM or 1RM) is used to track user progress. ORM is a scalable measure of strength in a specific category, where a weight and reps combination can be reduced to a single number of the maximum weight that can be moved in a single repetition. In this app, ORM is calculated using the [Brzycki formula](https://en.wikipedia.org/wiki/One-repetition_maximum#Brzycki).

When a user creates a goal, they enter in a ORM target and a timeline in which they want to reach that target (3, 6, 9, or 12 months). That timeline starts on creation of the goal.

An important detail for calculating the bar and progress charts(right side of the dashboard) is the start weight. Start weight is set on the first recorded workout:

```
const firstRecord = startingProgress.date === 0;

      if (firstRecord) {
        setStartingProgress({
          date: formData.date,
          orm: formData.orm,
        });
      }
```

This <i>startingProgress</i> is then used as the base for the percentage calculations used on the bar chart and progress bar.
Example:

- Goal set as 200 lbs
- First workout is 100 lbs with 1 rep (100 ORM)
  - The baseline is now set as a scale from 100 - 200
- Second workout is 120 lbs with 1 rep (120 ORM)
  - % completed bar and progress line are now at 20%
- <i>The blue time-passed bar is a percentage of time elapsed from the start date to the latest recorded workout</i>
