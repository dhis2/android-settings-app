import React from 'react'
import SettingsTable from './settings-table'
import { MenuItem, TextField } from '@material-ui/core'
import { GlobalSettingLevel } from '../../constants/program-settings'

import inputStyles from '../../styles/Input.module.css'

const ProgramGlobalSettings = ({ states, data, handleChange }) => {
    return (
        <React.Fragment>
            <div className={inputStyles.container__initial}>
                <TextField
                    id={GlobalSettingLevel.keyDownload}
                    name={GlobalSettingLevel.keyDownload}
                    label={GlobalSettingLevel.option}
                    margin="normal"
                    select
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={states[GlobalSettingLevel.keyDownload]}
                    onChange={handleChange}
                    className={inputStyles.container_minWidth}
                >
                    {GlobalSettingLevel.download.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
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
