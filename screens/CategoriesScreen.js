import { StatusBar } from "expo-status-bar";
import { FlatList, View, Text } from "react-native";

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from "../components/CategoryGridTile";

export default function CategoriesScreen({navigation}) {

  function renderCategoryItem(itemData) {

    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id
      })
    }
  
    return (
      <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>
    )
  }

  return (
    <FlatList 
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  )
}