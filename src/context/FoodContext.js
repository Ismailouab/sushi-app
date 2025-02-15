import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedFoods, setGroupedFoods] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both foods and categories in parallel
        const [foodResponse, categoryResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/foods"),
          axios.get("http://localhost:8000/api/categories"),
        ]);

        setFoods(foodResponse.data);
        setCategories(categoryResponse.data);

        // Group foods by category
        const grouped = {};
        foodResponse.data.forEach(food => {
          const category = categoryResponse.data.find(cat => cat.id === food.category_id);
          const categoryName = category ? category.name : "Uncategorized";

          if (!grouped[categoryName]) grouped[categoryName] = [];
          grouped[categoryName].push(food);
        });

        setGroupedFoods(grouped);
      } catch (error) {
        console.error("Error fetching food and category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, categories, groupedFoods, loading }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
