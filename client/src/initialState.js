import demoConfig from './config'

const initialState = {
  ui: {
    projectId: demoConfig.projectId,
    pageLimit: demoConfig.itemPerPage,
    latestError: "",
    showError: false
  },
  datasetList: {
    data: [],
    ui: {
      selectDatasetIndex: -1
    }
  },
  attributes: {
    ui: {
      unselect: {}
    }
  },
  metrics: {
    ui: {
      unselect: {}
    }
  },
  resultTable: {
    data: [],
    ui: {
      currentPageIndex: -1,
      totalPageCount: 0,
      loading: false
    }
  },
  http: {
    data: [],
    ui: {
      
    }
  },
  filters: {
    viewFilter: {
        summary: [],
        expressions: {
            operator: 'And',
            operands: []
        }
    },
    metricLimits: {
        summary: {},
        expressions: {
        }
    },
    ui: {}
  },
  sorting: {
    output: [],
    ui: {
      sortingDropdownNum: 1,
      sorting: [
        {
          sortby: -1,
          order: -1
        }
      ]
    },
    data: []
  }
}

export default initialState