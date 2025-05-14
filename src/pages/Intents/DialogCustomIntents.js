import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalActions,
    ButtonStrip,
    Button,
    TabBar,
    Tab,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import IntentIdentifiers from './IntentIdentifiers'
import { validMandatoryFields } from './intentsDatastoreQuery'
import RequestForm from './RequestForm'
import ResponseForm from './ResponseForm'

// Utility to deeply update state via string paths like "request.arguments.projectID"
const setByPath = (obj, path, value) => {
    const keys = path.split('.')
    const lastKey = keys.pop()
    const deepRef = keys.reduce((acc, key) => {
        if (!acc[key]) {
            acc[key] = {}
        }
        return acc[key]
    }, obj)
    deepRef[lastKey] = value
    return { ...obj }
}

const getDefaultForm = () => ({
    name: '',
    description: '',
    trigger: { dataElements: [], attributes: [] },
    action: [],
    packageName: '',
    request: { arguments: {} },
    response: { data: {} },
})

const DialogCustomIntents = ({
    open,
    handleClose,
    handleSave,
    handleChange,
    edit,
    dataElements,
    attributes,
    specificSettings,
}) => {
    const [step, setStep] = useState(0)

    const [formData, setFormData] = useState({
        ...getDefaultForm(),
        ...specificSettings,
        trigger: {
            dataElements: specificSettings?.trigger?.dataElements || [],
            attributes: specificSettings?.trigger?.attributes || [],
        },
        request: {
            arguments:
                specificSettings?.request?.arguments?.length > 0
                    ? specificSettings.request.arguments
                    : [{ key: '', value: '' }],
        },
        response: {
            data: specificSettings?.response?.data || {},
        },
    })

    const disableSave = !validMandatoryFields(formData)

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

    const onChangeByPath = (path, value) => {
        const updated = setByPath({ ...formData }, path, value)
        setFormData(updated)
        handleChange(updated)
    }

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <IntentIdentifiers
                        formData={formData}
                        onChange={onChangeByPath}
                        edit={edit}
                        dataElements={dataElements}
                        attributes={attributes}
                    />
                )
            case 1:
                return (
                    <RequestForm
                        argumentsData={formData.request.arguments}
                        onChange={onChangeByPath}
                    />
                )
            case 2:
                return (
                    <ResponseForm
                        data={formData.response.data}
                        onChange={onChangeByPath}
                    />
                )

            default:
                return null
        }
    }

    return (
        <>
            {open && (
                <Modal large position="middle">
                    <ModalTitle>
                        {i18n.t(edit ? 'Edit Intent' : 'Add Intent')}
                    </ModalTitle>
                    <ModalContent>
                        <TabBar>
                            <Tab
                                selected={step === 0}
                                onClick={() => setStep(0)}
                            >
                                {i18n.t('Identifiers')}
                            </Tab>
                            <Tab
                                selected={step === 1}
                                onClick={() => setStep(1)}
                            >
                                {i18n.t('Request')}
                            </Tab>
                            <Tab
                                selected={step === 2}
                                onClick={() => setStep(2)}
                            >
                                {i18n.t('Response')}
                            </Tab>
                        </TabBar>

                        <div
                            style={{
                                marginTop: 16,
                                width: '40%',
                                height: '500px',
                            }}
                        >
                            {renderStep()}
                        </div>
                        <ButtonStrip end>
                            {step > 0 && (
                                <Button onClick={prevStep}>
                                    {i18n.t('Prev')}
                                </Button>
                            )}
                            {step < 2 && (
                                <Button onClick={nextStep}>
                                    {i18n.t('Next')}
                                </Button>
                            )}
                        </ButtonStrip>
                    </ModalContent>

                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={handleClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            <Button
                                onClick={() => {
                                    handleSave(formData)
                                }}
                                primary
                                disabled={disableSave}
                            >
                                {i18n.t('Save Intent')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogCustomIntents.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    specificSettings: PropTypes.object,
    handleChange: PropTypes.func,
    edit: PropTypes.bool,
    dataElements: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired,
}

export default DialogCustomIntents
