import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useLayoutEffect } from 'react'

import { MEALS } from '../data/dummy-data'
import MealDetail from '../components/MealDetail'
import Subtitle from '../components/MealDetail/Subtitle'
import List from '../components/MealDetail/List'
import IconButton from '../components/IconButton'
import { useDispatch, useSelector } from 'react-redux'
// import { useContext } from 'react'
// import { FavoritesContext } from '../store/context/favorites-context'

import { addFavorite, removeFavorite } from '../store/redux/favorites'


export default function MealDetails({navigation, route}) {
  // const favoriteMealsCtx = useContext(FavoritesContext)

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)

  const dispatch = useDispatch()

  const mealId = route.params.mealId

  const currentMeal = MEALS.find(meal => meal.id === mealId)

  const mealIsFavorite = favoriteMealIds.includes(mealId)

  function changeFavoriteStatus() {
    if(mealIsFavorite) {
      dispatch(removeFavorite({id: mealId}))
    } else {
      dispatch(addFavorite({id: mealId}))
    }
  }

  // useLayoutEffect(() => {
  //   const currentMealTitle = MEALS.find(meal => meal.id === mealId).title
  //   navigation.setOptions({
  //     title: currentMealTitle
  //   })
  // }, [mealId, navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} onPress={changeFavoriteStatus}/>
      }
    })
  }, [navigation, changeFavoriteStatus])

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{uri: currentMeal.imageUrl}} style={styles.image}/>
      <Text style={styles.title}>{currentMeal.title}</Text>
      <View>
        <MealDetail textStyle={styles.detailText} duration={currentMeal.duration} complexity={currentMeal.complexity} affordability={currentMeal.affordability}/>
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={currentMeal.ingredients}/>
          <Subtitle>Steps</Subtitle>
          <List data={currentMeal.steps}/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: "100%",
    height: 350
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },
  detailText: {
    color: 'white'
  },
  listContainer: {
    width: '80%'
  },
  listOuterContainer: {
    alignItems: 'center'
  }
})