import React from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
    ScreenCover,
} from '@dhis2/ui-core'

import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { useConfig } from '@dhis2/app-runtime'
import buttonStyle from '../../styles/Button.module.css'

const DialogFirstLaunch = ({ onClose, handleSave, disable }) => {
    const { baseUrl } = useConfig()

    const path = '/dhis-web-commons-about/redirect.action'
    const initialUrl = `${baseUrl}${path}`

    return (
        <ScreenCover>
            <Modal position="middle">
                <ModalTitle>{i18n.t('First time setup')}</ModalTitle>
                <ModalContent>
                    <p>
                        {i18n.t(
                            'Using the Android Settings app will apply default settings to all Android devices connected to this instance.'
                        )}
                    </p>

                    <strong>
                        {i18n.t(
                            "Any settings or configuration on a user's device will be overwritten by settings applied here."
                        )}
                    </strong>

                    <p>
                        {i18n.t(
                            'To set up the default settings and apply to all devices, click "Set default and save"'
                        )}
                    </p>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={onClose}>
                            <a
                                href={initialUrl}
                                className={buttonStyle.button_redirect}
                            >
                                {i18n.t('Exit, do not apply settings')}
                            </a>
                        </Button>
                        <Button primary onClick={handleSave} disabled={disable}>
                            {i18n.t('Set defaults and save')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        </ScreenCover>
    )
}

DialogFirstLaunch.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
}

export default DialogFirstLaunch
