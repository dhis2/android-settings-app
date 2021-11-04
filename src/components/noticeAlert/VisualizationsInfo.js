import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { NoticeInfo } from './NoticeInfo'

export const VisualizationsInfo = ({ type }) => (
    <NoticeInfo
        title={i18n.t('No {{type}} Visualization found', { type })}
        notice={i18n.t(
            "It looks like there aren't any configured visualizations."
        )}
    />
)

VisualizationsInfo.propTypes = {
    type: PropTypes.string,
}
