import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home", headerTitle: "NearbyRoom" }} />
      <Tabs.Screen name="post" options={{ tabBarLabel: "Post", headerTitle: "Post" }} />
      <Tabs.Screen name="chat" options={{ tabBarLabel: "Chat", headerTitle: "Chat" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile", headerTitle: "Profile" }} />
    </Tabs>
  );
}
