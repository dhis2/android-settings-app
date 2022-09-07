import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { TableHeader } from '../../../components/table'
import Wrapper from '../../../components/Wrapper'
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
