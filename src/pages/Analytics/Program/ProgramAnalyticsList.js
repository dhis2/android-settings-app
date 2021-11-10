import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { AddNewSetting } from '../../../components/field'

const ProgramAnalyticsList = ({ disable }) => {
    return (
        <>
            <AddNewSetting
                label={i18n.t('Add Program Visualization')}
                disable={disable}
            />
        </>
    )
}

export default ProgramAnalyticsList
