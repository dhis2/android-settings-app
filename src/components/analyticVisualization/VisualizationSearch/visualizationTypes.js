import {
    IconFileDocument24,
    IconQuestion24,
    IconTable24,
    IconVisualizationArea24,
    IconVisualizationBar24,
    IconVisualizationBarStacked24,
    IconVisualizationColumnStacked24,
    IconVisualizationColumn24,
    IconVisualizationLineMulti24,
    IconVisualizationScatter24,
    IconVisualizationGauge24,
    IconVisualizationRadar24,
    IconVisualizationColumnMulti24,
    IconWorld24,
    IconVisualizationLine24,
    IconVisualizationPie24,
    IconVisualizationSingleValue24,
} from '@dhis2/ui'

export const VISUALIZATION = 'VISUALIZATION'
export const REPORT_TABLE = 'REPORT_TABLE'
export const CHART = 'CHART'
export const MAP = 'MAP'
export const EVENT_REPORT = 'EVENT_REPORT'
export const EVENT_CHART = 'EVENT_CHART'
export const REPORTS = 'REPORTS'
export const STACKED_COLUMN = 'STACKED_COLUMN'
export const BAR = 'BAR'
export const STACKED_BAR = 'STACKED_BAR'
export const AREA = 'AREA'
export const GAUGE = 'GAUGE'
export const YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE'
export const YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN'
export const SCATTER = 'SCATTER'

export const COLUMN = 'COLUMN'
export const LINE = 'LINE'
export const PIE = 'PIE'
export const SINGLE_VALUE = 'SINGLE_VALUE'
export const PIVOT_TABLE = 'PIVOT_TABLE'
export const RADAR = 'RADAR'

export const getVisualizationIcon = type => {
    switch (type) {
        case REPORT_TABLE:
        case EVENT_REPORT:
            return IconTable24
        case REPORTS:
            return IconFileDocument24
        case CHART:
        case VISUALIZATION:
        case EVENT_CHART:
            return IconVisualizationColumn24
        case MAP:
            return IconWorld24
        case BAR:
            return IconVisualizationBar24
        case STACKED_COLUMN:
            return IconVisualizationColumnStacked24
        case STACKED_BAR:
            return IconVisualizationBarStacked24
        case AREA:
            return IconVisualizationArea24
        case YEAR_OVER_YEAR_LINE:
            return IconVisualizationLineMulti24
        case YEAR_OVER_YEAR_COLUMN:
            return IconVisualizationColumnMulti24
        case SCATTER:
            return IconVisualizationScatter24
        case GAUGE:
            return IconVisualizationGauge24
        case PIVOT_TABLE:
            return IconTable24
        case LINE:
            return IconVisualizationLine24
        case COLUMN:
            return IconVisualizationColumn24
        case PIE:
            return IconVisualizationPie24
        case SINGLE_VALUE:
            return IconVisualizationSingleValue24
        case RADAR:
            return IconVisualizationRadar24
        default:
            return IconQuestion24
    }
}
