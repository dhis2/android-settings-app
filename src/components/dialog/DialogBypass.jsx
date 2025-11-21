import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const bypassTitles = {
    bypass: i18n.t('Bypass'),
    require: i18n.t('Require'),
}

const DialogBypass = ({ openDialog, onClose, handleBypass, checked }) => {
    let bypass

    if (checked) {
        bypass = bypassTitles.require
    } else {
        bypass = bypassTitles.bypass
    }

    return (
        <>
            {openDialog && (
                <Modal small onClose={onClose} position="middle">
                    <ModalTitle>
                        {i18n.t('{{bypass}} DHIS2 Version Validation', {
                            bypass,
                        })}
                    </ModalTitle>
                    <ModalContent>
                        <>
                            {checked ? (
                                <>
                                    <p>
                                        {i18n.t(
                                            'Use this option to enforce strict version validation when connecting to DHIS2 instances.'
                                        )}
                                    </p>
                                    <p>
                                        {i18n.t(
                                            'This ensures that only supported DHIS2 versions are accessed, maintaining compatibility and security standards.'
                                        )}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        {i18n.t(
                                            'Enabling this option allows you to proceed with connecting to DHIS2 instances even if they are not officially supported.'
                                        )}
                                    </p>
                                    <p>
                                        {i18n.t(
                                            'Use this with caution and ensure compatibility and security measures are in place.'
                                        )}
                                    </p>
                                </>
                            )}
                        </>
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            {checked ? (
                                <Button
                                    primary
                                    onClick={() => handleBypass(checked)}
                                >
                                    {i18n.t('Validate version')}
                                </Button>
                            ) : (
                                <Button
                                    destructive
                                    onClick={() => handleBypass(checked)}
                                >
                                    {i18n.t('Bypass version')}
                                </Button>
                            )}
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogBypass.propTypes = {
    checked: PropTypes.bool.isRequired,
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleBypass: PropTypes.func.isRequired,
}

export default DialogBypass
