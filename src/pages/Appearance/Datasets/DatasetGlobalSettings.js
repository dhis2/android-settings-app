import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/wrapper'
import { TableHeader } from '../../../components/table'
import { DatasetGlobalSettings as GlobalSettings } from './TableSettings'
import PageHeader from '../../../components/page/PageHeader'

const DatasetGlobalSettings = ({ disable, settings, onChange }) => {
    const handleChange = e => {
        onChange({
            ...settings,
            [e.name]: {
                filter: e.checked,
                sort: e.checked,
            },
        })
    }

    return (
        <>
            <PageHeader title={i18n.t('Global settings')} />
            <Wrapper>
                <div>
                    <TableHeader title={i18n.t('Show Filter')} />
                    <GlobalSettings
                        states={settings}
                        handleChange={handleChange}
                        disabled={disable}
                        dense={false}
                    />
                </div>
            </Wrapper>
        </>
    )
}

DatasetGlobalSettings.propTypes = {
    settings: PropTypes.object,
    disable: PropTypes.bool,
}

export default DatasetGlobalSettings
