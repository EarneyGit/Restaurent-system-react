"use client"

import React, { useState } from "react"

function TodoList() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState<string[]>([])
  const [timePeriod, setTimePeriod] = useState("week")

  // Sample todos for different time periods
  const weekTodos: any[] = []
  const monthTodos = ["Prepare monthly inventory report", "Schedule staff meeting"]
  const yearTodos = ["Plan annual budget", "Prepare annual tax documents", "Review yearly performance"]

  // Get todos based on time period
  const getFilteredTodos = () => {
    switch(timePeriod) {
      case "month": return [...todos, ...monthTodos];
      case "year": return [...todos, ...yearTodos];
      default: return todos;
    }
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo])
      setNewTodo("")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">To-do list</h3>
        <div className="flex items-center gap-2 text-sm">
          <button 
            className={`px-4 py-1 rounded-md ${timePeriod === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimePeriod('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${timePeriod === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimePeriod('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${timePeriod === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimePeriod('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Write your note..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="space-y-3 mt-4">
        {getFilteredTodos().length > 0 ? (
          getFilteredTodos().map((todo, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className="w-5 h-5 border border-gray-300 rounded-md mr-3"></div>
              <span>{todo}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No tasks for this time period</div>
        )}
      </div>
    </div>
  )
}

export default TodoList 