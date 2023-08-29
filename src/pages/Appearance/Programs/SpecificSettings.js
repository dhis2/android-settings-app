import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DisableReferral,
    OptionalTEISearch,
    ProgramCompletionSpinner,
} from '../../../components/field'
import { TableHeader } from '../../../components/table'
import Wrapper from '../../../components/Wrapper'
import { TableSettings } from './TableSettings'

const SpecificSettings = ({
    hasCategoryCombo,
    specificSettings,
    handleSettings,
    spinnerSettings,
    isTrackerProgram,
}) => (
    <>
        <Wrapper>
            <div>
                <ProgramCompletionSpinner
                    handleChange={handleSettings}
                    settings={spinnerSettings}
                />

                <OptionalTEISearch
                    isTrackerProgram={isTrackerProgram}
                    handleChange={handleSettings}
                    settings={spinnerSettings}
                />

                <DisableReferral
                    handleChange={handleSettings}
                    settings={spinnerSettings}
                />
            </div>
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
    isTrackerProgram: PropTypes.bool,
}

export default SpecificSettings
