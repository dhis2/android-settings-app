import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageSubtitle from '../../../components/page/PageSubtitle'
import { filterUnusedElements } from '../../../utils/utils'
import { useReadDataset } from './datasetQuery'
import { prepareSpecificSettingsList } from './helper'
import NewDatasetSettings from './NewDatasetSettings'
import SpecificTableAction from './SpecificTableAction'

const DatasetSpecificSettings = ({ onChange, specificSettings, disabled }) => {
    const { datasetList } = useReadDataset()
    const [initialRows, setInitialRows] = useState()
    const [rows, setRows] = useState()
    const [listName, setListName] = useState()
    const [loadSpecific, setLoad] = useState(false)

    useEffect(() => {
        if (specificSettings && datasetList) {
            const updated = prepareSpecificSettingsList(
                specificSettings,
                datasetList
            )
            setInitialRows(updated)
            setRows(updated)
            setListName(filterUnusedElements(datasetList, updated))
            setLoad(true)
        }
    }, [specificSettings, datasetList])

    useEffect(() => {
        if (rows && !isEqual(rows, initialRows)) {
            onChange(keyBy(rows, 'id'))
        }
    }, [rows])

    return (
        <>
            <PageSubtitle title={i18n.t('Specific settings')} />
            {loadSpecific && (
                <>
                    {rows && (
                        <SpecificTableAction
                            rows={rows}
                            changeRows={setRows}
                            elementList={datasetList}
                            disableAll={disabled}
                        />
                    )}

                    <NewDatasetSettings
                        datasetList={listName}
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
}

export default DatasetSpecificSettings
