import React from 'react'
import SettingsTable from './settings-table'
import { Select } from '../inputs'
import { GlobalSettingLevel } from '../../constants/program-settings'
import inputStyles from '../../styles/Input.module.css'

const ProgramGlobalSettings = ({ states, data, handleChange }) => {
    return (
        <React.Fragment>
            <div className={inputStyles.container__initial}>
                <Select
                    data={GlobalSettingLevel}
                    states={states}
                    onChange={handleChange}
                    label={GlobalSettingLevel.option}
                />
            </div>

            <SettingsTable
                data={data}
                states={states}
                onChange={handleChange}
            />
        </React.Fragment>
    )
}

export default ProgramGlobalSettings
