import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/wrapper'
import { TableHeader } from '../../../components/table'
import { TableSettings } from './TableSettings'
import { CheckboxField } from '../../../components/field'

const SpecificSettings = ({
    hasCategoryCombo,
    specificSettings,
    handleSettings,
    spinnerSettings,
}) => (
    <>
        <Wrapper>
            <CheckboxField
                name="visible"
                label={i18n.t(
                    'Show percentage (%) complete in Program toolbar'
                )}
                onChange={handleSettings}
                checked={spinnerSettings.visible}
            />
        </Wrapper>

        <Wrapper>
            <div>
                <TableHeader title={i18n.t('Show Filter')} />
                <TableSettings
                    type={hasCategoryCombo ? 'ProgramCategory' : 'Program'}
                    states={specificSettings}
                    handleChange={handleSettings}
                />
            </div>
        </Wrapper>
    </>
)

SpecificSettings.propTypes = {
    hasCategoryCombo: PropTypes.bool,
    specificSettings: PropTypes.object,
    spinnerSettings: PropTypes.object,
    handleSettings: PropTypes.func,
}

export default SpecificSettings
