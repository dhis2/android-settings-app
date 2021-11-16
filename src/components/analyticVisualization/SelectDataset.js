import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SelectField } from '../field'
import { useReadDatasetQuery } from '../../pages/Analytics/Dataset/DatasetVisualizationQuery'

export const SelectDataset = ({ settings, onChange }) => {
    const { datasetList, loading } = useReadDatasetQuery()
    const options = datasetList || []

    const handleChange = e => {
        const name = options.find(dataset => dataset.id === e.selected)
        onChange({
            ...settings,
            dataset: e.selected,
            datasetName: name.name,
        })
    }

    return (
        <SelectField
            dense
            inputWidth="350px"
            name="dataset"
            label={i18n.t('Dataset')}
            selected={settings.dataset || ''}
            onChange={handleChange}
            options={options}
            loading={loading}
        />
    )
}

SelectDataset.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
