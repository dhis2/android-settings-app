import React from 'react'
import SettingsTable from './settings-table'
import { SelectSettings } from '../inputs'
import { GlobalSettingLevel } from '../../constants/program-settings'
import inputStyles from '../../styles/Input.module.css'

const ProgramGlobalSettings = ({ states, data, handleChange }) => (
    <React.Fragment>
        <div className={inputStyles.container__initial}>
            <SelectSettings
                data={GlobalSettingLevel}
                states={states}
                onChange={handleChange}
                label={GlobalSettingLevel.option}
            />
        </div>

        <SettingsTable data={data} states={states} onChange={handleChange} />
    </React.Fragment>
)

export default ProgramGlobalSettings
