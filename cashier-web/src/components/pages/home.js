import React, { useEffect } from 'react';
import LobbyHeader from '../presentation/lobbyHeader';
import InsturctionsLobby from '../presentation/instructionsLobby/instructionsLobby';
import { FormattedMessage } from 'react-intl';
import { useLocation } from "react-router-dom";
const Home = () => {
	const location = useLocation();
	useEffect(() => {
		if (location.state) {
			console.log(location);
		}
	}, [location]);
	return (
		<div>
			<h2 className="page-title"><FormattedMessage id="home_manageFunds" /></h2>
			<LobbyHeader />
			<InsturctionsLobby />
		</div >
	)
}

export default Home;