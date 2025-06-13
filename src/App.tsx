import React, { useState, useEffect } from "react";
// import backgroundImage from './assets/image.png'; 
import './App.css';

export default function StudentTaskManager() {
  const [activities, setActivities] = useState<{ text: string; completed: boolean }[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isDarkMode, setIsDarkMode] = useState(true); 

  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#171823'; 
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F2F2F2'; 
    }
  }, [isDarkMode]);

  const handleAddActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newActivity.trim() === "") return;
    setActivities([...activities, { text: newActivity.trim(), completed: false }]);
    setNewActivity(""); 
  };

  
  const handleDeleteActivity = (activityText: string) => {
    const updatedActivities = activities.filter(activity => activity.text !== activityText);
    setActivities(updatedActivities);
  };

  
  const handleToggleComplete = (activityText: string) => {
    const updatedActivities = activities.map(activity =>
      activity.text === activityText ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
  };

  
  const handleClearCompleted = () => {
    const activeActivities = activities.filter(activity => !activity.completed);
    setActivities(activeActivities);
  };

  
  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  
  const filteredActivities = activities.filter(activity => {
    if (filter === 'active') {
      return !activity.completed;
    }
    if (filter === 'completed') {
      return activity.completed;
    }
    return true; 
  });

  
  const itemsLeft = activities.filter(activity => !activity.completed).length;

  return (
    <div
      className={`items app-background ${isDarkMode ? 'bg-[#171823]' : 'bg-[#F2F2F2]'}`}
      style={{
        // backgroundImage and related styles moved to CSS
      }}
    >

      <div className="TODO-header">
        <h1 className="">TODO</h1>

        <button className=" " onClick={handleToggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="w-full max-w-xl mb-6">
        <form className={`flex items-center p-4 rounded-lg shadow-xl ${isDarkMode ? 'bg-[#25273C]' : 'bg-white'}`} onSubmit={handleAddActivity}>

          <div className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
          <input
            type="text"
            placeholder="Create a new todo..."
            className={` text-lg ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          />
        </form>
      </div>

      
      <div className={`w-full max-w-xl rounded-lg shadow-xl overflow-hidden relative ${isDarkMode ? 'bg-[#25273C]' : 'bg-white'}`}>
      
        {filteredActivities.length === 0 && activities.length > 0 && (
          <p className={` text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>No tasks found for this filter.</p>
        )}
        {filteredActivities.length === 0 && activities.length === 0 && (
          <p className={`text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>No tasks yet. Add a new todo!</p>
        )}
      
        {filteredActivities.map((activity) => (
          <div className={`flex items-center ${isDarkMode ? 'border-[#393A4C]' : 'border-gray-200'}`} key={activity.text}>
           
            <div
              className={`cursor-pointer flex items-center justify-center transition-all duration-200
                ${activity.completed ? 'bg-gradient-to-br from-blue-400 to-purple-500 border-none' : (isDarkMode ? 'border-gray-600' : 'border-gray-300')}
              `}
              onClick={() => handleToggleComplete(activity.text)}
            >
              {activity.completed && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4.304L3.696 7L10 1" stroke="white" strokeWidth="2"/>
                </svg>
              )}
            </div>
            <p className={`text-lg flex-grow ${activity.completed ? 'line-through opacity-50' : ''} ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {activity.text}
            </p>
            
            <button
              className={`text-xl ml-4 flex-shrink-0 focus:outline-none ${isDarkMode ? 'text-gray-500 hover:text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              onClick={() => handleDeleteActivity(activity.text)}
            >
              &times;
            </button>
          </div>
        ))}

        
        <div className={`flex justify-between items-center p-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <span>{itemsLeft} items left</span>
          <div className={`flex space-x-4 font-bold rounded-lg px-4 py-2 shadow-lg sm:shadow-none sm:p-0 sm:static sm:flex-row absolute
                      ${isDarkMode ? 'bg-[#25273C]' : 'bg-white'}`}>
                     
            <button
              className={`${filter === 'all' ? 'text-blue-500' : (isDarkMode ? 'hover:text-white' : 'hover:text-gray-800')} `}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`${filter === 'active' ? 'text-blue-500' : (isDarkMode ? 'hover:text-white' : 'hover:text-gray-800')} `}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`${filter === 'completed' ? 'text-blue-500' : (isDarkMode ? 'hover:text-white' : 'hover:text-gray-800')} `}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button
            className={`${isDarkMode ? 'hover:text-white' : 'hover:text-gray-800'} `}
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>

      
      <p className={`text-sm mt-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Drag and drop to reorder list</p>
    </div>
  );
}