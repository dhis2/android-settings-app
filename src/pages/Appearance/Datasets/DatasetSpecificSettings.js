import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import PageSubtitle from '../../../components/page/PageSubtitle'
import SpecificTableAction from './SpecificTableAction'
import NewDatasetSettings from './NewDatasetSettings'
import { useReadDataset } from './datasetQuery'
import { prepareSpecificSettingsList } from './helper'

export const DatasetSpecificSettings = ({
    onChange,
    specificSettings,
    disabled,
}) => {
    const { datasetList } = useReadDataset()
    const [initialRows, setInitialRows] = useState()
    const [rows, setRows] = useState()
    const [listName, setListName] = useState()

    useEffect(() => {
        if (specificSettings && datasetList) {
            const updated = prepareSpecificSettingsList(
                specificSettings,
                datasetList
            )
            const list = []
            datasetList.map(dataset => {
                if (!updated.some(settings => settings.name === dataset.name)) {
                    list.push(dataset)
                }
            })
            setListName(list)
            setRows(prepareSpecificSettingsList(specificSettings, datasetList))
            setInitialRows(
                prepareSpecificSettingsList(specificSettings, datasetList)
            )
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
    )
}

DatasetSpecificSettings.propTypes = {
    onChange: PropTypes.func,
    specificSettings: PropTypes.object,
    disabled: PropTypes.bool,
}

export default DatasetSpecificSettings
