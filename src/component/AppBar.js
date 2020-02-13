import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function AppBar(props) {
  return (
    <View
      style={{
        alignItems: "flex-end",
        // paddingRight: 30,
        // paddingTop: 16
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigate("Home");
        }}
      >
        <Icon
          name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AppBar;
