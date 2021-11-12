import mapValues from 'lodash/mapValues'
import {
    LAST_12_MONTHS,
    LAST_12_WEEKS,
    LAST_14_DAYS,
    LAST_30_DAYS,
    LAST_3_DAYS,
    LAST_3_MONTHS,
    LAST_4_QUARTERS,
    LAST_4_WEEKS,
    LAST_5_YEAR,
    LAST_6_MONTHS,
    LAST_7_DAYS,
    LAST_MONTH,
    LAST_QUARTER,
    LAST_WEEK,
    LAST_YEAR,
    MONTHS_THIS_YEAR,
    QUARTERS_THIS_YEAR,
    THIS_MONTH,
    THIS_QUARTER,
    THIS_WEEK,
    THIS_YEAR,
    TODAY,
    YESTERDAY,
} from './periods'
import {
    COLUMN,
    LINE,
    PIE,
    PIVOT_TABLE,
    SINGLE_VALUE,
    RADAR,
} from './visualizationTypes'

export const validateAndroidVisualization = visualizations => {
    return visualizations.map(visualization =>
        checkVisualizationType(visualization)
    )
}

const checkVisualizationType = visualization => {
    if (isValidVisualizationType(visualization.type)) {
        mapValues(visualization.relativePeriods, (period, i) => {
            if (
                isValidPeriod(i) &&
                period &&
                isValidDimension(visualization.rowDimensions, 1) &&
                isValidDimension(visualization.columnDimensions, 2) &&
                isValidOrgUnit(visualization)
            ) {
                visualization.valid = true
            }
        })
    } else {
        visualization.valid = false
    }
}

const relativePeriodsList = [
    TODAY,
    YESTERDAY,
    LAST_3_DAYS,
    LAST_7_DAYS,
    LAST_14_DAYS,
    LAST_30_DAYS,
    THIS_WEEK,
    LAST_WEEK,
    LAST_4_WEEKS,
    LAST_12_WEEKS,
    THIS_MONTH,
    LAST_MONTH,
    LAST_3_MONTHS,
    LAST_6_MONTHS,
    LAST_12_MONTHS,
    MONTHS_THIS_YEAR,
    THIS_QUARTER,
    LAST_QUARTER,
    LAST_4_QUARTERS,
    QUARTERS_THIS_YEAR,
    THIS_YEAR,
    LAST_YEAR,
    LAST_5_YEAR,
]

const isValidVisualizationType = visualizationType =>
    [PIVOT_TABLE, LINE, COLUMN, PIE, SINGLE_VALUE, RADAR].includes(
        visualizationType
    )

const isValidPeriod = period => relativePeriodsList.includes(period)

const isValidDimension = (type, numberOfDimensions) =>
    type.length <= numberOfDimensions

const isValidOrgUnit = visualization =>
    visualization.userOrganisationUnit ||
    visualization.userOrganisationUnitChildren ||
    visualization.userOrganisationUnitGrandChildren
