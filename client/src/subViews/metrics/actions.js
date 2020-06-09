import {METRIC_ACTIONS} from '../../constants'

export const toggleMetricSelection = (metricId) => {
	return {
		type: METRIC_ACTIONS.TOGGLE_METRIC_SELECTION,
		payload: metricId
	}
}

export const toggleMetricAllSelection = (select, metrics) => {
	return {
		type: METRIC_ACTIONS.TOGGLE_ALL_METRICS,
		payload: {
			metrics,
			select
		}
	}
}