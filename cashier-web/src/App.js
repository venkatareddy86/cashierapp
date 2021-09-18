import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter, useLocation } from 'react-router-dom';
import Home from './components/pages/home';
import Deposit from './components/pages/deposit';
import Withdraw from './components/pages/wittdraw';
import AddNewPayment from './components/pages/addNewPayment';
import AddPayment from './components/pages/addPayment';
import Notification from './components/presentation/notification';
import Loader from './components/presentation/loader';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './styles/GlobalStyles';
import { connect } from 'react-redux';
import { validateSession } from './redux/actions/index';
import TopNavigation from './components/presentation/topNavigation';
import { IntlProvider } from "react-intl";
import { getI18nContent } from "./i18n";
import { useHistory } from 'react-router';
function App(props) {
  const { search } = useLocation();
  const history = useHistory();
  const [messages, setMessages] = useState(getI18nContent());
  const { session, validateSession } = props;
  const selectedTheme = { panelBody: '#f5f5f5', primaryButton: '#FF671F', secondaryButton: '#fff' };
  useEffect(() => {
    validateSession(new URLSearchParams(search));
  }, [validateSession]);
  useEffect(() => {
    if (session.data) {
      let { messages, customer, landingPoint } = session.data;
      setMessages(getI18nContent(customer.languageId, messages));
      if (landingPoint != 'Withdraw') {
        history.push('/deposit');
      }
    }
  }, [session]);
  let renderText = null;
  if (session && session.status) {
    renderText = <React.Fragment><TopNavigation />
      <div className="fade in cashier-app">
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/deposit"><Deposit /></Route>
          <Route exact path="/withdraw"><Withdraw /></Route>
          <Route exact path="/addNewPayment"><AddNewPayment /></Route>
          <Route exact path="/addPayment"><AddPayment /></Route>
        </Switch>
      </div>
    </React.Fragment>
  } else if (session && session.status === false) {
    renderText = <React.Fragment><Notification /></React.Fragment>
  } else {
    renderText = <Loader />
  }
  return (
    <IntlProvider locale='en' messages={messages}>
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <div className="cashierapp-standalone">
          {renderText}
        </div>
      </ThemeProvider>
    </IntlProvider>
  )
}
const mapStateToProps = function (state) {
  return { session: state.session }
}
const mapDispatchToProps = (dispatch) => {
  return { validateSession: (searchParams) => dispatch(validateSession(searchParams)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));