import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for balançado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função será chamada quando os componentes forem desmontados
    return () => subscription.remove();
  }, []);

  return ( 
    <View style = {toggle ? style.containerLight : style.container}>
      <TouchableOpacity 
        onPress = {handleChangeToggle}>
        <Image
          style = {toggle ? style.lightingOn : style.lightingOff}
          source = {
            toggle
              ? require("./assets/icons/echo-light.png")
              : require("./assets/icons/echo-light-off.png")
          } 
        />
        <Image
          style = {style.diologo}
          source = {
            toggle
              ? require("./assets/icons/logo-dio.png")
              : require("./assets/icons/logo-dio-white.png")
          } 
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center", 
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center", 
  },
  lightingOn: {
    resizeMode:  'contain',
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode:  'contain',
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  },
  diologo: {
    resizeMode:  'contain',
    alignSelf: "center",
    width: 250,
    height: 250,
  },
});