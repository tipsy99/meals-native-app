import { MEALS, CATEGORIES } from "../data/dummy-data";

import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

export default function MealOverview({ route, navigation }) {

  const catId = route.params.categoryId

  const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(catId))


  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === catId).title
    navigation.setOptions({
      title: categoryTitle
    })
  }, [catId, navigation])

  return (
    <MealsList items={displayedMeals}/>
  )
}