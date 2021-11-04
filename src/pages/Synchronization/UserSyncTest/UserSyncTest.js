import React from 'react'
import i18n from '@dhis2/d2-i18n'
import Page from '../../../components/page/Page'
import UserSearch from './UserSearch'

const UserSyncTest = () => {
    return (
        <Page
            title={i18n.t('User Sync Test')}
            desc={i18n.t(
                'Check the amount of data a user would sync to their device.'
            )}
            unsavedChanges={false}
        >
            <UserSearch />
        </Page>
    )
}

export default UserSyncTest
