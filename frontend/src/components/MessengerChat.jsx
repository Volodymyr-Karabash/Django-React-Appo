import { FacebookProvider, CustomChat } from 'react-facebook';

export default function MessengerChat() {
    return (
        <FacebookProvider appId="422937690495030" chatSupport>
            <CustomChat pageId="341127662974151" minimized="true" />
        </FacebookProvider>
    )
}