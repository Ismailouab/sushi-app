import React, { useState } from "react";
import Header from "./Header";
import AddFood from "./AddFood";
import UpdateFood from "./UpdateFood";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext";
import { useUser } from "../context/UserContext"; 
import Subscription from './Subscription';
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/AdminDashboard.css";

function AdminDashboard({ onShowInfoClick }) {
  const { user, token  } = useAuth(); // Use global auth context
  const {groupedFoods, loading ,fetchData} = useFood(); // Use global food context
  const { users, loading: usersLoading } = useUser(); // Use global user context
  const [selectedSection, setSelectedSection] = useState({ section: "food", foodId: null });

  AOS.init({ duration: 1000, offset: 100 });

  // Function to delete a food item
  const handleDeleteFood = async (foodId) => {
    if (!user || !token) {
      alert("You must be logged in to delete food.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this food?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/users/${user.id}/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      fetchData(); // Reload the food list
      alert("✅ Food deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting food:", error);
      alert("Failed to delete food. Please try again.");
    }
    
  }; 

  return (
    <div>
      <Header onShowInfoClick={onShowInfoClick} />

      {user && (
        <div className="username" data-aos="fade-right">
          <h2 className="name">
            Welcome, <span className="first">{user.name}</span>
          </h2>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="admin-dashboard__breadcrumb" data-aos="fade-right">
        <ul>
          <li
            className={selectedSection.section === "food" ? "active" : ""}
            onClick={() => setSelectedSection({ section: "food", foodId: null })}
          >
            Foods
          </li>
          <li
            className={selectedSection.section === "users" ? "active" : ""}
            onClick={() => setSelectedSection({ section: "users", foodId: null })}
          >
            Users
          </li>
        </ul>
      </nav>

      {/* Food Section */}
      {selectedSection.section === "food" && (
        <div>
          <h3 className="manage-food__title" data-aos="fade-right">Manage Food</h3>
          <button className="manage-food__button" 
          onClick={() => setSelectedSection({ section: "addFood", foodId: null })} data-aos="fade-right">
            Add Food
          </button>

          {/* Show loading indicator while data is being fetched */}
          {loading ? (
            <div className="loading" data-aos="fade-up">
            <img src="/assets/infinite-spinner.svg" alt="loading" />
            <p>Loading...</p>
            </div>
          ) : (
            Object.entries(groupedFoods).map(([category, foods]) => (
              <div key={category} className="food-category">
                <h3 className="category-title" data-aos="fade-right">
                  {category} :
                </h3>
                <div className="list" data-aos="fade-up">
                  {foods.map((food) => (
                    <div key={food.id} className="card" >
                      <img
                        src={food.image.startsWith("http") ? food.image : `/${food.image.replace("public/", "")}`}
                        alt={food.name}
                      />
                      <h4 className="popular-foods__card-title">{food.name}</h4>
                      <p>
                        <strong>Description:</strong> {food.description}
                      </p>
                      <p>
                        <strong>Price:</strong> ${food.price}
                      </p>
                      <p>
                        <strong>Rating:</strong> {food.rating}
                      </p>
                      <p>
                        <strong>Category:</strong> {category}
                      </p>
                      <p><strong>Created At:</strong>{new Date(food.created_at).toLocaleString()}</p>
                      <p><strong>Updated At:</strong>{new Date(food.updated_at).toLocaleString()}</p>
                      <button className="edit-btn" 
                         onClick={() => {
                          setSelectedSection({ section: "updateFood", foodId: food.id });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                        Edit
                      </button>
                      <button className="delete-btn"  onClick={() => handleDeleteFood(food.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {selectedSection.section === "addFood" && <AddFood  setSelectedSection={setSelectedSection}/>}
      {selectedSection.section === "updateFood" && (
        <UpdateFood setSelectedSection={setSelectedSection} foodId={selectedSection.foodId} />
      )}
      {/* Users Section */}
      {selectedSection.section === "users" && (
        <div>
          <h3 className="manage-food__title" data-aos="fade-right">All Users</h3>

          {/* Show loading indicator for users */}
          {usersLoading ? (
            <div className="loading" data-aos="fade-up">
            <img src="/assets/infinite-spinner.svg" alt="loading" />
            <p>Loading...</p>
            </div>
          ) : (
            <div className="list"  data-aos="fade-up">
              {users.map((user) => (
                <div key={user.id} className="card" >
                  <img src="/assets/man-user-circle-icon.svg" alt="facebook"/>
                  <h4>{user.name}</h4>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role.name}</p>
                  <p><strong>Join:</strong> {new Date(user.created_at).toLocaleString()}</p>
                  <p><strong>Update At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Subscription />
    </div>
    
  );

}

export default AdminDashboard;