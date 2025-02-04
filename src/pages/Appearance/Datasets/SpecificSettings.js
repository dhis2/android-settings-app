import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {
    DisableManualLocation,
    HelpText,
    MinimumLocation,
    Section,
} from '../../../components/field'
import { TableHeader } from '../../../components/table'
import Wrapper from '../../../components/Wrapper'
import { TableSettings } from './TableSettings'

const SpecificSettings = ({
    hasCategoryCombo,
    specificSettings,
    dataSetConfiguration,
    handleSettings,
}) => (
    <Wrapper>
        <div>
            <Section
                legend={
                    <HelpText
                        helpText={i18n.t('Capture Coordinates settings')}
                        warning={i18n.t(
                            'Only applicable for users using Android app version 3.2 or later.'
                        )}
                        version={i18n.t('3.2 +')}
                        type="info"
                    />
                }
            >
                <>
                    <DisableManualLocation
                        settings={dataSetConfiguration}
                        handleChange={handleSettings}
                    />
                    <MinimumLocation
                        handleChange={handleSettings}
                        settings={dataSetConfiguration}
                    />
                </>
            </Section>
            <Section legend={i18n.t('Filter')}>
                <>
                    <TableHeader title={i18n.t('Show Filter')} />
                    <TableSettings
                        type={hasCategoryCombo ? 'DatasetCategory' : 'Dataset'}
                        states={specificSettings}
                        handleChange={handleSettings}
                    />
                </>
            </Section>
        </div>
    </Wrapper>
)

SpecificSettings.propTypes = {
    hasCategoryCombo: PropTypes.bool,
    specificSettings: PropTypes.object,
    handleSettings: PropTypes.func,
}

export default SpecificSettings
