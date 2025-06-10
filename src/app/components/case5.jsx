import React, { useState } from 'react'; // Make sure to import useState if not already

// Assuming formData and handleChange are passed as props or defined in parent component
// You'll also need a way to store and update the financial goals array, e.g., in formData.financialGoals

const FinancialGoalsSection = ({ formData, setFormData, handleChange }) => { // Pass setFormData here
  const [newGoal, setNewGoal] = useState({
    description: '',
    targetAmount: '',
    yearsToAchieve: '',
  });

  const handleGoalInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleAddGoal = () => {
    if (newGoal.description && newGoal.targetAmount && newGoal.yearsToAchieve) {
      setFormData((prevData) => ({
        ...prevData,
        financialGoals: [...prevData.financialGoals, { ...newGoal,
          targetAmount: parseFloat(newGoal.targetAmount),
          yearsToAchieve: parseInt(newGoal.yearsToAchieve, 10)
        }],
      }));
      setNewGoal({
        description: '',
        targetAmount: '',
        yearsToAchieve: '',
      });
    } else {
      alert('Please fill in all fields for the financial goal.');
    }
  };

  const handleDeleteGoal = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      financialGoals: prevData.financialGoals.filter((_, i) => i !== index),
    }));
  };

  // Example options for the select dropdown
  const financialGoalOptions = [
    { value: "Education", label: "Education" },
    { value: "Retirement", label: "Retirement" },
    { value: "Child Education", label: "Child Education" },
    { value: "Child Marriage", label: "Child Marriage" },
    { value: "Home Purchase", label: "Home Purchase" },
    { value: "Car Purchase", label: "Car Purchase" },
    { value: "Travel", label: "Travel" },
    { value: "Debt Repayment", label: "Debt Repayment" },
    { value: "Emergency Fund", label: "Emergency Fund" },
    { value: "Other", label: "Other" },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Financial Goals
      </h2>

      {/* Inputs for adding a new financial goal */}
      <div className="mb-6 p-4 border rounded-xl shadow-sm bg-gray-50">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Add a New Financial Goal</h3>

        <div className="mb-4">
          <label
            htmlFor="goalDescription"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Goal Description
          </label>
          <select
            id="goalDescription"
            name="description"
            value={newGoal.description}
            onChange={handleGoalInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          >
            <option value="">Select a Goal</option>
            {financialGoalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {newGoal.description === "Other" && (
            <input
              type="text"
              id="otherGoalDescription"
              name="description" // Keep the name as 'description'
              value={newGoal.description === "Other" ? "" : newGoal.description} // Clear if "Other" is selected, user will type
              onChange={handleGoalInputChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Specify your goal"
            />
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="targetAmount"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Target Amount (Expected Return)
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={newGoal.targetAmount}
            onChange={handleGoalInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="e.g., 500000"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="yearsToAchieve"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Time Period (Years to Achieve)
          </label>
          <input
            type="number"
            id="yearsToAchieve"
            name="yearsToAchieve"
            value={newGoal.yearsToAchieve}
            onChange={handleGoalInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="e.g., 10"
            min="1"
          />
        </div>

        <button
          type="button"
          onClick={handleAddGoal}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Add Goal
        </button>
      </div>

      {/* Display existing financial goals in a table */}
      {formData.financialGoals && formData.financialGoals.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Your Financial Goals</h3>
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Goal Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Period (Years)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.financialGoals.map((goal, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {goal.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      ₹{goal.targetAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {goal.yearsToAchieve}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleDeleteGoal(index)}
                        className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default FinancialGoalsSection;