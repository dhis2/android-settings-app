import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
    Layer,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import cx from 'classnames'
import buttonStyle from '../../styles/Button.module.css'
import warning from '../../styles/Warning.module.css'
import { authorityQuery } from '../../modules/apiLoadFirstSetup'

const DialogFirstLaunch = ({ handleSave, isOutOfDate }) => {
    const { baseUrl } = useConfig()
    const { data } = useDataQuery(authorityQuery)
    const [disable, setDisable] = useState(false)

    const path = '/dhis-web-commons-about/redirect.action'
    const initialUrl = `${baseUrl}${path}`

    useEffect(() => {
        data && setDisable(!data.authority)
    }, [data])

    return (
        <>
            {data && (
                <Layer translucent>
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
                                          "You don't have the authority to set up the android settings to this instance"
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
                                        href={initialUrl}
                                        className={buttonStyle.button_redirect}
                                    >
                                        {i18n.t('Exit, do not apply settings')}
                                    </a>
                                </Button>
                                <Button
                                    primary
                                    onClick={handleSave}
                                    disabled={disable}
                                >
                                    {i18n.t('Set defaults and save')}
                                </Button>
                            </ButtonStrip>
                        </ModalActions>
                    </Modal>
                </Layer>
            )}
        </>
    )
}

DialogFirstLaunch.propTypes = {
    handleSave: PropTypes.func.isRequired,
    isOutOfDate: PropTypes.bool,
}

export default DialogFirstLaunch
