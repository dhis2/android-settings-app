import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import buttonStyle from '../../styles/Button.module.css'
import warning from '../../styles/Warning.module.css'

const DialogFirstLaunch = ({ handleSave, isOutOfDate, disable }) => {
    const { baseUrl, apiVersion } = useConfig()
    const path = '/dhis-web-commons-about/redirect.action'
    const initialUrl = `${baseUrl}${path}`
    const maxApiVersion = 42
    const redirectUrl = apiVersion >= maxApiVersion ? baseUrl : initialUrl

    return (
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

                {isOutOfDate && (
                    <p>
                        {i18n.t(
                            'The new version of the Android Settings web app comes with improvements and disruptive changes. The previous versions are no longer supported, and the settings stored there will be removed.'
                        )}
                    </p>
                )}

                <p
                    className={cx({
                        [warning.warning_color]: disable,
                    })}
                >
                    {disable
                        ? i18n.t(
                              "You don't have access to this app. Contact your DHIS2 system administrator to fix this problem."
                          )
                        : i18n.t(
                              'To set up the default settings and apply to all devices, click "Set default and save"'
                          )}
                </p>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button>
                        <a
                            href={redirectUrl}
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
    )
}

DialogFirstLaunch.propTypes = {
    handleSave: PropTypes.func.isRequired,
    isOutOfDate: PropTypes.bool,
    disable: PropTypes.bool,
}

export default DialogFirstLaunch
