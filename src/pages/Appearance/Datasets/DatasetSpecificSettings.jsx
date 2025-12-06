import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageSubtitle from '../../../components/page/PageSubtitle.jsx'
import {
    filterListByDataWriteAccess,
    filterUnusedElements,
} from '../../../utils/utils'
import { useWorkflowContext } from '../../../workflow-context'
import {
    prepareDataSetConfigurationList,
    prepareSpecificSettingsList,
} from './helper'
import NewDatasetSettings from './NewDatasetSettings.jsx'
import SpecificTableAction from './SpecificTableAction.jsx'

const DatasetSpecificSettings = ({
    onChange,
    specificSettings,
    onChangeConfiguration,
    configuration,
    disabled,
}) => {
    const { dataSets } = useWorkflowContext()
    const datasetList = filterListByDataWriteAccess(dataSets)
    const [initialRows, setInitialRows] = useState()
    const [initialConfiguration, setInitialConfiguration] = useState()
    const [rows, setRows] = useState()
    const [dataSetConfiguration, setDataSetConfiguration] = useState()
    const [listName, setListName] = useState()
    const [loadSpecific, setLoadSpecific] = useState(false)

    useEffect(() => {
        if (specificSettings && datasetList) {
            const updated = prepareSpecificSettingsList(
                specificSettings,
                datasetList
            )
            const updatedConfiguration = prepareDataSetConfigurationList(
                configuration,
                datasetList
            )
            setInitialRows(updated)
            setRows(updated)
            setDataSetConfiguration(updatedConfiguration)
            setInitialConfiguration(updatedConfiguration)
            setListName(filterUnusedElements(datasetList, updated))
            setLoadSpecific(true)
        }
    }, [specificSettings, configuration])

    useEffect(() => {
        if (
            (rows && !isEqual(rows, initialRows)) ||
            !isEqual(dataSetConfiguration, initialConfiguration)
        ) {
            onChange(keyBy(rows, 'id'))
            onChangeConfiguration(keyBy(dataSetConfiguration, 'id'))
        }
    }, [rows, dataSetConfiguration])

    return (
        <>
            <PageSubtitle title={i18n.t('Specific settings')} />
            {loadSpecific && (
                <>
                    {rows && (
                        <SpecificTableAction
                            rows={rows}
                            changeRows={setRows}
                            configurationList={dataSetConfiguration}
                            handleConfigurationList={setDataSetConfiguration}
                            elementList={datasetList}
                            disableAll={disabled}
                        />
                    )}

                    <NewDatasetSettings
                        datasetList={listName}
                        configurationList={dataSetConfiguration}
                        handleConfigurationList={setDataSetConfiguration}
                        rows={rows}
                        handleRows={setRows}
                        disabled={disabled}
                    />
                </>
            )}
        </>
    )
}

DatasetSpecificSettings.propTypes = {
    onChange: PropTypes.func,
    specificSettings: PropTypes.object,
    disabled: PropTypes.bool,
    onChangeConfiguration: PropTypes.func,
    configuration: PropTypes.object,
}

export default DatasetSpecificSettings
