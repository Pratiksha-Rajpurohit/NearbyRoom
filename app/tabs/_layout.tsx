import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Tabs tabBar={props => <TabBar {...props} />}>
          <Tabs.Screen name="home" options={{ tabBarLabel: "Home", headerTitle: "NearbyRoom" }} />
          <Tabs.Screen name="post" options={{ tabBarLabel: "Post", headerTitle: "Post" }} />
          <Tabs.Screen name="chat" options={{ tabBarLabel: "Chat", headerTitle: "Chat" }} />
          <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile", headerTitle: "Profile" }} />
        </Tabs>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
