import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    GLOBAL,
    GLOBAL_SPECIAL,
    GlobalProgram,
    GlobalProgramSpecial,
    PER_ORG_UNIT,
} from '../../../constants/program-settings'
import { SelectSettings } from '../../../components/inputs'
import SettingsTable from '../../../components/settings-table/settings-table'
import { parseValueByType } from '../../../modules/programs/parseValueBySettingType'
import { populateProgramObject } from '../../../modules/programs/populateProgramObject'
import inputStyles from '../../../styles/Input.module.css'

const CODE = 'settingDownload'
const OPTIONS = [
    {
        label: i18n.t('Global'),
        value: 'GLOBAL',
    },
    {
        label: i18n.t('Per Org Unit'),
        value: 'PER_ORG_UNIT',
    },
    {
        label: i18n.t('Per program'),
        value: 'PER_PROGRAM',
    },
    {
        label: i18n.t('Per OU and program'),
        value: 'PER_OU_AND_PROGRAM',
    },
]

const ProgramGlobalSettings = ({ settings, handleChange, disable }) => {
    const [defaultValues, setDefaultValues] = useState(GlobalProgram)

    useEffect(() => {
        if (settings) {
            settings.settingDownload === GLOBAL ||
            settings.settingDownload === PER_ORG_UNIT
                ? setDefaultValues(GlobalProgramSpecial)
                : setDefaultValues(GlobalProgram)
        }
    }, [settings])

    const onSelectChange = e => {
        e.selected === GLOBAL || e.selected === PER_ORG_UNIT
            ? handleChange({
                  ...populateProgramObject(GLOBAL_SPECIAL, settings),
                  [CODE]: e.selected,
              })
            : handleChange({
                  ...populateProgramObject(GLOBAL, settings),
                  [CODE]: e.selected,
              })
    }

    const handleInputTable = (e, key) => {
        const name = typeof key === 'string' ? key : e.name
        const value = typeof key === 'string' ? e.selected : e.value

        handleChange({ ...settings, [name]: parseValueByType(name, value) })
    }

    return (
        <>
            <div className={inputStyles.container__initial}>
                <SelectSettings
                    keyDownload={CODE}
                    name={CODE}
                    label={i18n.t('Setting level')}
                    options={OPTIONS}
                    value={settings[CODE]}
                    onChange={onSelectChange}
                    disabled={disable}
                />
            </div>

            <SettingsTable
                data={defaultValues}
                states={{ ...settings, disableAll: disable }}
                onChange={handleInputTable}
            />
        </>
    )
}

ProgramGlobalSettings.propTypes = {
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    disable: PropTypes.bool,
}

export default ProgramGlobalSettings
