import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
const Iframe = (props) => {
    return <div>
        <iframe id="iframe" className="frame" height="650px" width="100%" frameBorder="0" border="0"
            marginWidth="0" marginHeight="0" src={props.url} allowFullScreen="false"></iframe>
        <div className="btn-centered">
            <Link className="btn btn-outline sightline-cancel" to="/home"><FormattedMessage id="cancel" /></Link>
        </div>
    </div>
}
export default Iframe;