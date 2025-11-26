import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageSubtitle from '../../../components/page/PageSubtitle.jsx'
import { filterUnusedElements } from '../../../utils/utils'
import { useWorkflowContext } from '../../../workflow-context'
import {
    prepareProgramConfigurationList,
    prepareSpecificSettingsList,
} from './helper'
import NewProgramSpecific from './NewProgramSpecific.jsx'
import SpecificTableAction from './SpecificTableAction.jsx'

const ProgramSpecificSettings = ({
    onChange,
    specificSettings,
    spinnerSettings,
    onChangeSpinner,
    disabled,
}) => {
    const { programs } = useWorkflowContext()
    const [initialRows, setInitialRows] = useState()
    const [rows, setRows] = useState()
    const [listName, setListName] = useState()
    const [spinnerList, setSpinnerList] = useState()
    const [initialSpinner, setInitialSpinner] = useState()
    const [loadSpecific, setLoadSpecific] = useState(false)

    useEffect(() => {
        if (programs && specificSettings && spinnerSettings) {
            const settingsListUpdated = prepareSpecificSettingsList(
                specificSettings,
                programs
            )
            const spinnerListUpdated = prepareProgramConfigurationList(
                spinnerSettings,
                programs
            )
            setListName(filterUnusedElements(programs, settingsListUpdated))
            setRows(settingsListUpdated)
            setInitialRows(settingsListUpdated)
            setSpinnerList(spinnerListUpdated)
            setInitialSpinner(spinnerListUpdated)
            setLoadSpecific(true)
        }
    }, [specificSettings, spinnerSettings])

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
            {loadSpecific && (
                <>
                    {rows && (
                        <SpecificTableAction
                            rows={rows}
                            changeRows={setRows}
                            elementList={programs}
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
            )}
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
