// Provides react-ga to all components that need to send data
import ReactGA from "react-ga";
import React, { useEffect, useState, createContext } from "react";
import { withRouter } from "react-router-dom";

export const AnalyticsContext = createContext({
  initialized: false,
  event: null,
  setup: null,
});

const AnalyticsProvider = ({ children, history }) => {
  const [initialized, setInitialize] = useState(false);

  const event = (data) => {
    if (initialized) {
      ReactGA.event(data);
    }
  };

  const setup = () => {
    if (initialized || !process.env.REACT_APP_UA_CODE) return;
    ReactGA.initialize(process.env.REACT_APP_UA_CODE, {
      debug: process.env.NODE_ENV === "production" ? false : true,
    });
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
    setInitialize(true);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        event,
        initialized,
        setup,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default withRouter(AnalyticsProvider);
