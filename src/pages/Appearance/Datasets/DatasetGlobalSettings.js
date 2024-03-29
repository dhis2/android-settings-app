import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import PageSubtitle from '../../../components/page/PageSubtitle'
import { TableHeader } from '../../../components/table'
import Wrapper from '../../../components/Wrapper'
import { DatasetGlobalSettings as GlobalSettings } from './TableSettings'

const DatasetGlobalSettings = ({ disable, settings, onChange }) => {
    const handleChange = (e) => {
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
            <PageSubtitle title={i18n.t('Global settings')} />
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
