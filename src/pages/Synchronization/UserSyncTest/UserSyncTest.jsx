import i18n from '@dhis2/d2-i18n'
import React from 'react'
import Page from '../../../components/page/Page.jsx'
import UserSearch from './UserSearch.jsx'

const UserSyncTest = () => (
    <Page
        title={i18n.t('User Sync Test')}
        desc={i18n.t(
            'Check the amount of data a user would sync to their device.'
        )}
        unsavedChanges={false}
        authority={false}
    >
        <UserSearch />
    </Page>
)

export default UserSyncTest
