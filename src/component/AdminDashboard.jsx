import React, { useState } from "react";
import Header from "./Header";
import AddFood from "./AddFood";
import UpdateFood from "./UpdateFood";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext"; 

import AOS from "aos";
import "aos/dist/aos.css";
import "../css/AdminDashboard.css";

function AdminDashboard({ onShowInfoClick }) {
  const { user } = useAuth();
  const {  groupedFoods, loading } = useFood(); // Use global food context
  const [selectedSection, setSelectedSection] = useState("food");

  AOS.init({ duration: 1000, offset: 100 });

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
            className={selectedSection === "food" ? "active" : ""}
            onClick={() => setSelectedSection("food")}
          >
            Food
          </li>
        </ul>
      </nav>

      {/* Food Section */}
      {selectedSection === "food" && (
        <div>
          <h3 className="manage-food__title">Manage Food</h3>
          <button className="manage-food__button" onClick={() => setSelectedSection("addFood")}>
            Add Food
          </button>

          {/* Show loading indicator while data is being fetched */}
          {loading ? (
            <p></p>
          ) : (
            Object.entries(groupedFoods).map(([category, foods]) => (
              <div key={category} className="food-category">
                <h3 className="category-title" data-aos="fade-right">
                  {category} :
                </h3>
                <div className="food-list" data-aos="fade-up">
                  {foods.map((food) => (
                    <div key={food.id} className="food-card">
                      <img
                        src={food.image.startsWith("http") ? food.image : `/${food.image.replace("public/", "")}`}
                        alt={food.name}
                      />
                      <h4>{food.name}</h4>
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
                      <button className="edit-btn" onClick={() => setSelectedSection("updateFood")}>
                        Edit
                      </button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {selectedSection === "addFood" && <AddFood  setSelectedSection={setSelectedSection}/>}
      {selectedSection === "updateFood" && <UpdateFood  setSelectedSection={setSelectedSection}/>}
    </div>
  );
}

export default AdminDashboard;