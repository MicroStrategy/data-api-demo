// ******** Configuration
// NOTE: Modify "mapResult" to customize result / replace it with some sample JSON.
const demoConfig = {

    // URL of the REST Server
    restServerUrl: "https://demo.microstrategy.com/MicroStrategyLibrary2/api",
    // restServerUrl: "/api",

    // Project ID
    projectId: "B7CA92F04B9FAE8D941C3E9B7E0CD754",

    // Credentials to connect to the MicroStrategy Intelligence Server
    username: "guest",  
    password: "",

    // Number of items the table will display per page
    itemPerPage: 20,

    // MicroStrategy Objects

    cubes: [
        // "BD91AF40492D2C188240DEAF7D9D1510"
    ],

    reports: [
       // "256263D142248D56446F3A80AD100C06"

    ],

    datasets: [
        //{
        //    // Id of the cube or report used
        //    id: "912EA3954331445DCB29558319CA5E32",
        //
        //    // True if running a cube, false if running a report
        //    isCube: false,
        //
        //    // Custom request body
        //    // Note: If you choose request objects / view filter from the UI, this will be overridden.
        //    // Note: requestedObjects is only supported on cubes.
        //    predefinedRequestBody: {
        //        "requestedObjects" : null,
        //        "viewFilter" : null
        //    },
        //},
    ],
}

export default demoConfig
