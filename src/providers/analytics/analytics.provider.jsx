// Provides react-ga to all components that need to send data
import ReactGA from "react-ga";
import React, { useEffect, useState, createContext } from "react";
import { withRouter } from "react-router-dom";

export const AnalyticsContext = createContext({
  initialized: false,
  event: null,
});

const AnalyticsProvider = ({ children, history }) => {
  const [initialized, setInitialize] = useState(null);

  useEffect(() => {
    if (process.env.REACT_APP_UA_CODE) {
      ReactGA.initialize(process.env.REACT_APP_UA_CODE, {
        debug: process.env.NODE_ENV === "production" ? false : true,
      });
      history.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
      });
      setInitialize(true);
    }
  }, []);

  const event = (data) => {
    if (initialized) {
      ReactGA.event(data);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        event,
        initialized,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default withRouter(AnalyticsProvider);
