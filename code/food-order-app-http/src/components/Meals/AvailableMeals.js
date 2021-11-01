import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    // We scope our async await logic in a nested inner function (fetchMeals) because useEffects cleanup function should only run synchronously and should not return a promise.
    const fetchMeals = async () => {
      setHttpError(null);
      try {
        const response = await fetch(
          "https://food-order-app-9a5a9-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        // stores the returned data objects
        const data = await response.json();

        // Must map over the data so append it to an array
        const loadedMeals = [];
        // transforms data objects into a formatted array
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        desc={meal.description}
        price={meal.price}
      />
    );
  });

  let content = <p>Loading...</p>;

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    content = <p className={classes.mealsError}>{httpError}</p>;
  }

  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
