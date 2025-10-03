import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { NoticeError } from './NoticeError.jsx'

export const VisualizationsError = ({ message }) => (
    <NoticeError title={i18n.t('Something went wrong when loading the data')}>
        {message}
    </NoticeError>
)

VisualizationsError.propTypes = {
    message: PropTypes.string,
}
