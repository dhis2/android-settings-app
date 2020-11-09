import React from 'react'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
} from '@dhis2/ui'
import ProgramTable from './settings-table/program-table'
import DataSetTable from './settings-table/dataset-table'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import { Select } from './inputs'

const DialogTable = ({
    open,
    title,
    handleClose,
    dataTitle,
    dataTitleOptions,
    titleValue,
    handleChange,
    data,
    handleSubmitDialog,
    specificSetting,
    completeListOptions,
}) => (
    <>
        {open && (
            <Modal large onClose={handleClose} position="middle">
                <ModalTitle>
                    {i18n.t('Values per {{title}}', { title })}
                </ModalTitle>
                <ModalContent>
                    {dataTitle === undefined ? (
                        <Select
                            name="name"
                            inputWidth="300px"
                            onChange={handleChange}
                            value={titleValue}
                            options={dataTitleOptions}
                        />
                    ) : (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {dataTitle}
                        </p>
                    )}

                    {title === 'Programs' ? (
                        <ProgramTable
                            data={data}
                            states={specificSetting}
                            onChange={handleChange}
                            programTitle={dataTitle}
                            programOptions={dataTitleOptions}
                            programSelected={titleValue}
                            completeListOptions={completeListOptions}
                        />
                    ) : (
                        <DataSetTable
                            data={data}
                            states={specificSetting}
                            onChange={handleChange}
                            dataSetTitle={dataTitle}
                            dataSetOptions={dataTitleOptions}
                            dataSetSelected={titleValue}
                            completeListOptions={completeListOptions}
                        />
                    )}
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button
                            onClick={handleClose}
                            className={buttonStyles.mainContent__dialog__button}
                        >
                            {i18n.t('Cancel')}
                        </Button>
                        <Button onClick={handleSubmitDialog}>
                            {i18n.t('Add/Save')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

export default DialogTable
