import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import PageSubtitle from '../../../components/page/PageSubtitle'
import NewProgramSpecific from './NewProgramSpecific'
import SpecificTableAction from './SpecificTableAction'
import { prepareSpecificSettingsList } from './helper'
import { useReadProgram } from './programQuery'
import { filterUnusedElements } from '../../../utils/utils'

const ProgramSpecificSettings = ({
    onChange,
    specificSettings,
    spinnerSettings,
    onChangeSpinner,
    disabled,
}) => {
    const { programList } = useReadProgram()
    const [initialRows, setInitialRows] = useState()
    const [rows, setRows] = useState()
    const [listName, setListName] = useState()
    const [spinnerList, setSpinnerList] = useState()
    const [initialSpinner, setInitialSpinner] = useState()

    useEffect(() => {
        if (programList && specificSettings && spinnerSettings) {
            const settingsListUpdated = prepareSpecificSettingsList(
                specificSettings,
                programList
            )
            const spinnerListUpdated = prepareSpecificSettingsList(
                spinnerSettings,
                programList
            )
            setListName(filterUnusedElements(programList, settingsListUpdated))
            setRows(settingsListUpdated)
            setInitialRows(settingsListUpdated)
            setSpinnerList(spinnerListUpdated)
            setInitialSpinner(spinnerListUpdated)
        }
    }, [programList, specificSettings, spinnerSettings])

    useEffect(() => {
        if (rows) {
            if (
                !isEqual(rows, initialRows) ||
                !isEqual(spinnerList, initialSpinner)
            ) {
                onChange(keyBy(rows, 'id'))
                onChangeSpinner(keyBy(spinnerList, 'id'))
            }
        }
    }, [rows, spinnerList])

    return (
        <>
            <PageSubtitle title={i18n.t('Specific settings')} />

            {rows && (
                <SpecificTableAction
                    rows={rows}
                    changeRows={setRows}
                    elementList={programList}
                    spinnerList={spinnerList}
                    onChangeSpinnerList={setSpinnerList}
                    disableAll={disabled}
                />
            )}

            <NewProgramSpecific
                programList={listName}
                rows={rows}
                handleRows={setRows}
                spinnerList={spinnerList}
                onChangeSpinnerList={setSpinnerList}
                disabled={disabled}
            />
        </>
    )
}

ProgramSpecificSettings.propTypes = {
    onChange: PropTypes.func,
    specificSettings: PropTypes.object,
    spinnerSettings: PropTypes.object,
    onChangeSpinner: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ProgramSpecificSettings
