import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { NoticeError } from './NoticeError'

export const VisualizationsError = ({ message }) => (
    <NoticeError title={i18n.t('Something went wrong when loading the data')}>
        {message}
    </NoticeError>
)

VisualizationsError.propTypes = {
    message: PropTypes.string,
}
