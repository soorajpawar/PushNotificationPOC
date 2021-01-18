import React from "react";
import { View, Image, Button, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import App from '../App'
import notification from '../app/screens/Notification'
TouchableOpacity.defaultProps = { activeOpacity: 0.8 };


componentDidMount =()=> {
  notification()
}


const AppNavigator = () => {
  return (
  <App></App>
  );
};

export default AppNavigator;