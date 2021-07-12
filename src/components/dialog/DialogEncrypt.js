import React from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui-core'
import { encryptTitles } from '../../constants/android-settings'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

const DialogEncrypt = ({ openDialog, onClose, checked, handleEncrypt }) => {
    let encrypt

    if (checked) {
        encrypt = encryptTitles.decrypt
    } else {
        encrypt = encryptTitles.encrypt
    }

    return (
        <>
            {openDialog && (
                <Modal small onClose={onClose} position="middle">
                    <ModalTitle>
                        {i18n.t('{{encrypt}} the device database', { encrypt })}
                    </ModalTitle>
                    <ModalContent>
                        {checked
                            ? i18n.t(
                                  'Decrypting the device database is a critical action that will reduce the level of protection of your data. Are you sure you want to decrypt the device database?'
                              )
                            : i18n.t(
                                  'Encrypting the device database is a critical action that could have an impact on the database volume and performance. Are you sure you want to encrypt the device database?'
                              )}
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            {checked ? (
                                <Button
                                    onClick={() => {
                                        handleEncrypt(checked)
                                    }}
                                    primary
                                >
                                    {i18n.t('Decrypt')}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        handleEncrypt(checked)
                                    }}
                                    destructive
                                >
                                    {i18n.t('Encrypt')}
                                </Button>
                            )}
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogEncrypt.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleEncrypt: PropTypes.func.isRequired,
}

export default DialogEncrypt
