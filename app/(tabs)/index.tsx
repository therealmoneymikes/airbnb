import { StyleSheet } from "react-native";
import { Tabs, Link } from "expo-router";
import { View, Text } from "react-native";
import React, {useState, useMemo, useEffect} from "react";
import Colors from "@/constants/Colors";
import ExploreHeaders from "@/components/basecomponents/ExploreHeaders";
import { Stack } from "expo-router";
import Listings from "@/components/basecomponents/Listings";
import listingsData from "@/assets/data/airbnb-listings.json"
import ListingsMap from "@/components/basecomponents/ListingsMap";
import listingsDataGeo from "@/assets/data/airbnb-listings-geo.json"
import ListingsBottomSheet from "@/components/basecomponents/ListingsBottomSheet";
const Layout = () => {
  const [category, setCategory] = useState("Tiny Homes")
  const items = useMemo(() => listingsData as any, [])
  

  const onDataChanged = (category: string) => {
    console.log("Changed: ", category)
    setCategory(category)
  }

  return (
    <View style={{flex: 1, marginTop: 80}}>
        <Stack.Screen options={{
          header: () => <ExploreHeaders onCategoryChanged={onDataChanged} />
        }}/>
        {/* <Listings listings={items} category={category}/> */}
        <ListingsMap listings={listingsDataGeo}/>
        <ListingsBottomSheet  listings={items} category={category}/>
    </View>
  );
};

export default Layout;
