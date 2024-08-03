import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons"
import { FontAwesome6} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: "mon-sb"
      }
        }}>
      <Tabs.Screen name="index" options={{
        tabBarLabel:"Explore",
        tabBarIcon: ({color, size}) => <Ionicons name="search"
        size={size}
        color={color}/>
      }}/>
           <Tabs.Screen name="wishlists" options={{
        tabBarLabel:"Wishlists",
        tabBarIcon: ({color, size}) => <Ionicons name="heart-circle"
        size={size}
        color={color}/>
      }}/>
      <Tabs.Screen name="trips" options={{
        tabBarLabel:"Trips",
        tabBarIcon: ({color, size}) => <FontAwesome5 name="airbnb"
        size={size}
        color={color}/>
      }}/>
      <Tabs.Screen name="inbox" options={{
        tabBarLabel:"Inbox",
        tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="message-outline"
        size={size}
        color={color}/>
      }}/>
      <Tabs.Screen name="profile" options={{
        tabBarLabel:"Profile",
        headerShown: false,
        tabBarIcon: ({color, size}) => <Ionicons name="person-circle-outline"       
        size={size}
        color={color}/>
      }}/>
 
    </Tabs>
  )
}

export default Layout