import React from 'react'
import PropTypes from 'prop-types'
import SettingsTable from '../../../components/settingsTable/SettingsTable'
import { DataSetting } from '../../../constants/data-set-settings'
import { parseValueBySettingType } from './parseValueBySettingType'

const DatasetGlobalSettings = ({ settings, handleChange, disable }) => {
    const handleInputTable = e => {
        handleChange({
            ...settings,
            [e.name]: parseValueBySettingType(e.name, e.value),
        })
    }

    return (
        <>
            {settings && (
                <SettingsTable
                    data={DataSetting}
                    states={{ ...settings, disableAll: disable }}
                    onChange={handleInputTable}
                />
            )}
        </>
    )
}

DatasetGlobalSettings.propTypes = {
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    disable: PropTypes.bool,
}

export default DatasetGlobalSettings
