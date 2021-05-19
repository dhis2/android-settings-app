import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import PageHeader from '../../../components/page/PageHeader'
import { prepareSpecificSettingsList } from './helper'
import SpecificTableAction from './SpecificTableAction'
import NewProgramSpecific from './NewProgramSpecific'
import { useReadProgram } from './programQueries'
import { filterUnusedElements } from '../../../utils/utils'

const ProgramSpecificSettings = ({
    specificSettings,
    changeSpecificSettings,
    disabled,
}) => {
    const { programList } = useReadProgram()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [listName, setListName] = useState()

    useEffect(() => {
        if (specificSettings && programList) {
            const rowList = prepareSpecificSettingsList(
                specificSettings,
                programList
            )
            setInitialRows(rowList)
            setRows(rowList)
            setListName(filterUnusedElements(programList, rowList))
        }
    }, [specificSettings, programList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            changeSpecificSettings(keyBy(rows, 'id'))
        }
    }, [rows])

    return (
        <>
            <PageHeader
                title={i18n.t('Programs specific download sync settings')}
                desc={i18n.t(
                    'Applies only to the assigned program. Program specific settings will overwrite the global settings above.'
                )}
            />

            {rows && (
                <SpecificTableAction
                    rows={rows}
                    specificSettingList={specificSettings}
                    changeRows={setRows}
                    programList={programList}
                    disableAll={disabled}
                />
            )}

            <NewProgramSpecific
                programList={listName}
                rows={rows}
                handleRows={setRows}
                disabled={disabled}
            />
        </>
    )
}

ProgramSpecificSettings.propTypes = {
    specificSettings: PropTypes.object,
    changeSpecificSettings: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ProgramSpecificSettings
