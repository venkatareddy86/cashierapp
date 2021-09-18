
import { FormattedMessage } from 'react-intl';
const Notification = () => {
    return <div className="session-error">
        <div className="session-error__message">
            <p><FormattedMessage id="notification_sessionExpiredTitle" /></p>
        </div>
    </div>

}
export default Notification;