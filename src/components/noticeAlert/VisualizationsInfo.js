import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { NoticeInfo } from './NoticeInfo'

export const VisualizationsInfo = ({ title }) => (
    <NoticeInfo
        title={title}
        notice={i18n.t(
            "It looks like there aren't any configured visualizations."
        )}
    />
)

VisualizationsInfo.propTypes = {
    title: PropTypes.string,
}
