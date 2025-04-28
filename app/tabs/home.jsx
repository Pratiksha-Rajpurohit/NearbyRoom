import React from 'react';
import { View, Text } from 'react-native';

const home = () => {

  const { name, age } = useLocalSearchParams();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Home Screen</Text>
      <Text>{name}</Text>
    </View>
  );
}

export default home