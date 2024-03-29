import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
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
