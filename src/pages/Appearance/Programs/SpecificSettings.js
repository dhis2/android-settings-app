import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DisableManualLocation,
    DisableReferral,
    HideFormSections,
    MinimumLocation,
    OptionalTEISearch,
    ProgramCompletionSpinner,
    Section,
} from '../../../components/field'
import { TableHeader } from '../../../components/table'
import Wrapper from '../../../components/Wrapper'
import { TableSettings } from './TableSettings'
import { TeiHeader } from './TeiHeader'

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
                <Section legend={i18n.t('TEI Header')}>
                    <TeiHeader
                        handleChange={handleSettings}
                        settings={spinnerSettings}
                        program={specificSettings.id}
                    />
                </Section>

                <Section legend={i18n.t('Advanced options')}>
                    <>
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
                            isTrackerProgram={isTrackerProgram}
                            handleChange={handleSettings}
                            settings={spinnerSettings}
                        />
                        <HideFormSections
                            handleChange={handleSettings}
                            settings={spinnerSettings}
                        />
                    </>
                </Section>
                <Section legend={i18n.t('Capture Coordinates settings')}>
                    <>
                        <DisableManualLocation
                            handleChange={handleSettings}
                            settings={spinnerSettings}
                        />
                        <MinimumLocation
                            handleChange={handleSettings}
                            settings={spinnerSettings}
                        />
                    </>
                </Section>
                <Section legend={i18n.t('Filter')}>
                    <>
                        <TableHeader title={i18n.t('Show Filter')} />
                        <TableSettings
                            type={
                                hasCategoryCombo ? 'ProgramCategory' : 'Program'
                            }
                            states={specificSettings}
                            handleChange={handleSettings}
                        />
                    </>
                </Section>
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
