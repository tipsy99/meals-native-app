import { View, FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MealItem from './MealItem'

export default function MealsList({items}) {

  const navigation = useNavigation()

  function mealItemPressHandler(mealId) {
    navigation.navigate('MealDetails', {
      mealId: mealId
    })
  }

  function renderMealItem({item}) {
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      onPress: () => mealItemPressHandler(item.id)
    }
    return <MealItem {...mealItemProps}/>
  }

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={meal => meal.id} renderItem={renderMealItem}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})