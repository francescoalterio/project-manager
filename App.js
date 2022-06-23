import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Screens from "./Screens";
import mobileAds from "react-native-google-mobile-ads";

export default function App() {
  mobileAds().initialize();

  return (
    <Provider store={store}>
      <Screens />
    </Provider>
  );
}
