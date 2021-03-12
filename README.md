# MicroStrategy REST API Data Demo
Contains the code of the React app that demonstrates the capabilities of the MicroStrategy REST Data APIs. This Demo was created using a [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

## Description:
This App is a sample demo app to show the users how to use MicroStrategy REST Data APIs to execute cubes and reports while enabling features like filtering, sorting, and application of metric limits on the data for the V2 data endpoints.

A list of REST APIs were used in the demo. The workflow of API endpoints used for the demo includes authenticating the user, searching and fetching datasets, creating new instances of the reports and cubes, displaying the filtered/sorted data from those cubes and reports.  

## REST APIs Used:

#### POST /auth/login 
Creating a MicroStrategy session given credentials and authentication mode. An authToken will be returned for later operations.
In the demo, this API was used to create a configuration session.

#### GET/searches/results
Search and fetching the objects of a specific type. 
In the demo, this API was used to fetch the objects of type report grid and report cube with a limit of 5.

#### GET /v2/cubes/{cubeId}
Get the definition of a specific cube, including attributes and metrics.
In the demo, this API was used to fetch definitions of 3 report cubes that were populated in the datasets. 

#### GET /v2/reports/{reportId}
Get the definition of a specific report, including attributes and metrics.
In the demo, this API was used to fetch definitions of 4 report grids that were populated in the datasets. 

#### POST /v2/cubes/{cubeId}/instances?offset=0&limit=20
Creating a new instance of a specific cube. This in-memory instance can be used by other subsequent requests. 
In the demo, this API was used to create a new instance of the data in the cube chosen in the dataset dropdown. The body of this request can accept values for performing filtering operations:

```json
{
  "viewFilter": {
    "operator": "And",
    "operands": [
      {
        "operator": "In",
        "operands": [
          {
            "type": "attribute",
            "id": "8D679D3511D3E4981000E787EC6DE8A4",
            "name": "Call Center"
          },
          {
            "type": "elements",
            "elements": [
              {
                "name": "Memphis",
                "id": "8D679D3511D3E4981000E787EC6DE8A4:15"
              }
            ]
          }
        ]
      }
    ]
  },
  "metricLimits": {
    "4C051DB611D3E877C000B3B2D86C964F": {
      "operator": "And",
      "operands": [
        {
          "operator": "Greater",
          "operands": [
            {
              "type": "metric",
              "id": "4C051DB611D3E877C000B3B2D86C964F",
              "name": "Profit"
            },
            {
              "type": "constant",
              "dataType": "Real",
              "value": "1000"
            }
}
```

This POST creates a returns an `instanceId` which is a new resource, which populates the grid in the demo with the data filtered with an attribute name Memphis and a metric limit on Profit greater than 1000. A similar request is made on a report grid with the endpoint POST /v2/reports/{reportId}/instances?offset=0&limit=20

## Customizing and Deploying this App
1. Download or clone this repo.
1. `cd client`
1. Run `npm install`.
1. Change the library URL in src/config.js, to point to your MicroStrategy Library, with the correct login credentials and verify REST server configuration.
1. Run `npm run build`. The build result files are under the build directory. (Note: Change the relative path of api_demo_icon.svg, if it is not deployed to root folder.)
1. Alternatively, run `npm start` to debug the application.

The below document is generated automatically by Create React App:

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Troubleshooting

In case of CORS (Cross-origin resource sharing) error, make sure that the MicroStrategy Library CORS settings allow requests from Tomcat hosted demo. These settings can be updated in the [Library Admin Page's Security Settings.](https://community.microstrategy.com/s/article/How-to-Enable-CORS-in-MicroStrategyLibrary-10-10?language=en_US)

