import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/wrapper'
import { TableHeader } from '../../../components/table'
import { TableSettings } from './TableSettings'

const SpecificSettings = ({
    hasCategoryCombo,
    specificSettings,
    handleSettings,
}) => (
    <Wrapper>
        <div>
            <TableHeader title={i18n.t('Show Filter')} />
            <TableSettings
                type={hasCategoryCombo ? 'DatasetCategory' : 'Dataset'}
                states={specificSettings}
                handleChange={handleSettings}
            />
        </div>
    </Wrapper>
)

SpecificSettings.propTypes = {
    hasCategoryCombo: PropTypes.bool,
    specificSettings: PropTypes.object,
    handleSettings: PropTypes.func,
}

export default SpecificSettings
