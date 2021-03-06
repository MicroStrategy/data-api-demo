export const MAIN_UI_ACTIONS = {
    DISPLAY_ERROR_MSG: "DISPLAY_ERROR_MSG",
    HIDE_ERROR_MSG: "HIDE_ERROR_MSG"
}

export const DATASET_LIST_ACTIONS = {
    SET_DATASET_LIST: "SET_DATASET_LIST",
    CHANGE_SELECT_DATASET: "CHANGE_SELECT_DATASET"
}

export const ATTRIBUTES_ACTIONS = {
    TOGGLE_ATTRIBUTE_SELECTION: "TOGGLE_ATTRIBUTE_SELECTION",
    TOGGLE_ALL_ATTRIBUTES: "TOGGLE_ALL_ATTRIBUTES"
}

export const METRIC_ACTIONS = {
    TOGGLE_METRIC_SELECTION: "TOGGLE_METRIC_SELECTION",
    TOGGLE_ALL_METRICS: "TOGGLE_ALL_METRICS"
}

export const FILTER_ACTIONS ={
    ADD_NEW_EXPRESSION: "ADD_NEW_EXPRESSION",
    DELETE_AN_EXPRESSION: "DELETE_AN_EXPRESSION",
    MODIFY_EXPRESSION: "MODIFY_EXPRESSION",
    MODIFY_ATTRIBUTE_ELEMENTS: "MODIFY_ATTRIBUTE_ELEMENTS",
    CLEAR_ALL_FILTER_EXPRESSIONS: "CLEAR_ALL_FILTER_EXPRESSIONS",
}

export const SORT_ACTIONS = {
    CHANGE_SORTING_ELEMENT: "CHANGE_SORTING_ELEMENT",
    CHANGE_SORTING_CHOICE: "CHANGE_SORTING_CHOICE",
    ADD_SORTING_DROPDOWN: "ADD_SORTING_DROPDOWN",
    CHANGE_SORTING_DATA: "CHANGE_SORTING_DATA",
    DELETE_SORTING_DROPDOWN: "DELETE_SORTING_DROPDOWN",
    CLEAR_SORTING_STATE: "CLEAR_SORTING_STATE",
}

export const RESULT_ACTIONS = {
    REFRESH_INSTANCE_ID: "REFRESH_INSTANCE_ID",
    REFRESH_RESULT_PANEL: "REFRESH_RESULT_PANEL",
    GO_TO_PAGE: "GO_TO_PAGE",
    BEGIN_LOADING_PAGE: "BEGIN_LOADING_PAGE"
}

export const HTTP_ACTIONS = {
    ADD_NEW_HTTP_REQUEST: "ADD_NEW_HTTP_REQUEST",
    SELECT_REQUEST: "SELECT_REQUEST",
    SELECT_DETAIL_TAB: "SELECT_DETAIL_TAB",
    CLEAR_REQUESTS: "CLEAR_REQUESTS"
}

export const CONSTANTS = {
    MAX_TRY_COUNT: 2,
    CUBE_TYPE: 776,
    REPORT_TYPE: 768
}
