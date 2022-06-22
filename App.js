import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Screens from "./Screens";

export default function App() {
  /*React.useEffect(() => {
    AsyncStorage.removeItem("myProjects");
    AsyncStorage.removeItem("myCompletedProjects");
    AsyncStorage.removeItem("myTasks");
  }, []);*/

  return (
    <Provider store={store}>
      <Screens />
    </Provider>
  );
}
