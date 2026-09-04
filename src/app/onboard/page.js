"use client"; // This directive marks the component as a Client Component

import { useState, useEffect } from "react"; // Import useEffect for initial hydration check
import FinancialGoalsSection from '../components/case5';
import Image from "next/image";


// Main Onboarding Form component
export default function Home() {
  const defaultCurrentInvestments = {
    selected: [],
    availableForFutureInvestment: "",
    majorRequirements: [],
    mutualFunds: {
      currentValue: "",
      currentValueNotSure: false,
      investmentMode: "",
      monthlySip: "",
      monthlySipNotSure: false,
      statement: "",
    },
    sharesStocks: {
      currentValue: "",
      currentValueNotSure: false,
      investmentStyle: "",
      statement: "",
    },
    fdRd: {
      currentValue: "",
      currentValueNotSure: false,
      needTiming: "",
    },
    goldSilver: {
      type: "",
      currentValue: "",
      currentValueNotSure: false,
    },
    landPlot: {
      currentValue: "",
      currentValueNotSure: false,
      purpose: "",
      sellWithinFiveYears: "",
    },
    property: {
      propertyType: "",
      currentValue: "",
      currentValueNotSure: false,
      outstandingLoan: "",
      outstandingLoanNotSure: false,
      rentalIncome: "",
      rentalIncomeNotSure: false,
      sellingTimeline: "",
    },
    epfPpfNps: {
      currentValue: "",
      currentValueNotSure: false,
    },
    insuranceUlip: {
      lifeCover: "",
      lifeCoverNotSure: false,
      annualPremium: "",
      annualPremiumNotSure: false,
      productType: "",
      currentValue: "",
      currentValueNotSure: false,
    },
    bondsDebentures: {
      investmentType: "",
      currentValue: "",
      currentValueNotSure: false,
    },
    businessOther: {
      investmentType: "",
      currentValue: "",
      currentValueNotSure: false,
    },
  };

  // State to manage form input values for all fields
  const [formData, setFormData] = useState({
    clientName: "",
    dob: "", // Changed to Date type in schema, keep string here for input type="date"
    gender: "",
    maritalStatus: "",
    number_of_dependents: "", // New field from schema
    occupationType: "", // Renamed from occupation
    businessName: "", // New field from schema
    pan: "",
    aadhar: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    financialGoals: [], // Will be handled as a dynamic array later
    currentInvestments: defaultCurrentInvestments,
    // sourcesOfIncome: [], // Will be handled as a dynamic array later
    // passiveIncome: [], // Will be handled as a dynamic array later
    // expenses: [], // Will be handled as a dynamic array later
    // assets: [], // Will be handled as a dynamic array later
    // liabilities: [], // Will be handled as a dynamic array later
    // fixedDeposits: [], // Will be handled as a dynamic array later
    // mutualFunds: [], // Will be handled as a dynamic array later
    // stocks: [], // Will be handled as a dynamic array later
    riskProfile: "",// New field from schema
    investmentStyle: "", // New field from schema
    hasLifeInsurance: false, // New field from schema
    lifeInsuranceDetails: "", // New field from schema
    hasHealthInsurance: false, // New field from schema
    healthInsuranceDetails: "", // New field from schema
    incomeTaxSlab: "", // New field from schema
    taxSavingInvestments: "", // New field from schema (string for now, array in schema)
    pastInvestmentExperiences: "", // New field from schema (renamed from 'experience')
    expectationsFromAdvisor: "", // New field from schema

    // Bank Details (from previous form, still relevant but not in the main schema's direct fields)
    // bankName: "",
    // accountNo: "",
    // ifsc: "",
    // accountType: "",
    // accountHolder: "",
    // termsAccepted: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  // This useEffect ensures that hydration issues with localStorage/SSR are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateCurrentInvestment = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      currentInvestments: {
        ...prevData.currentInvestments,
        [category]: {
          ...(prevData.currentInvestments?.[category] || {}),
          [field]: value,
        },
      },
    }));
  };

  const toggleInvestmentOption = (option) => {
    setFormData((prevData) => {
      const selected = new Set(prevData.currentInvestments?.selected || []);

      if (option === "None") {
        if (selected.has("None")) {
          selected.delete("None");
        } else {
          selected.clear();
          selected.add("None");
        }
      } else {
        if (selected.has(option)) {
          selected.delete(option);
        } else {
          selected.add(option);
        }
        selected.delete("None");
      }

      return {
        ...prevData,
        currentInvestments: {
          ...prevData.currentInvestments,
          selected: Array.from(selected),
        },
      };
    });
  };

  const toggleRequirementOption = (option) => {
    setFormData((prevData) => {
      const requirements = new Set(prevData.currentInvestments?.majorRequirements || []);

      if (option === "No major requirement") {
        if (requirements.has("No major requirement")) {
          requirements.delete("No major requirement");
        } else {
          requirements.clear();
          requirements.add("No major requirement");
        }
      } else {
        if (requirements.has(option)) {
          requirements.delete(option);
        } else {
          requirements.add(option);
        }
        requirements.delete("No major requirement");
      }

      return {
        ...prevData,
        currentInvestments: {
          ...prevData.currentInvestments,
          majorRequirements: Array.from(requirements),
        },
      };
    });
  };

  const validateStep = (step) => {
    let isValid = true;
    setMessage("");
    setIsError(false);

    switch (step) {
      case 1: // Personal Details
        if (
          !formData.clientName ||
          !formData.dob ||
          !formData.gender ||
          !formData.maritalStatus ||
          formData.number_of_dependents === ""
        ) {
          setMessage(
            "Please fill in all required fields for Personal Details."
          );
          isValid = false;
        }
        break;
      case 2: // Identification & Contact
        if (!formData.pan || !formData.aadhar || !formData.email) {
          // mobile was not in schema, keeping it out
          setMessage(
            "Please fill in all required fields for Identification & Contact."
          );
          isValid = false;
        }
        // Basic Regex for PAN and Aadhar (Client-side validation)
        if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
          setMessage("Invalid PAN format. It should be like ABCDE1234F.");
          isValid = false;
        }
        if (formData.aadhar && !/^[0-9]{12}$/.test(formData.aadhar)) {
          setMessage("Invalid Aadhar format. It should be 12 digits.");
          isValid = false;
        }
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
          setMessage("Invalid email format.");
          isValid = false;
        }
        break;
      case 3: // Address Details
        if (
          !formData.address ||
          !formData.city ||
          !formData.state ||
          !formData.pincode
        ) {
          setMessage("Please fill in all required fields for Address Details.");
          isValid = false;
        }
        if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
          setMessage("Invalid Pincode format. It should be 6 digits.");
          isValid = false;
        }
        break;
      case 4: // Financial & Investment Profile
        if (
          !formData.occupationType ||
          !formData.riskProfile ||
          !formData.pastInvestmentExperiences
        ) {
          setMessage(
            "Please fill in all required fields for Financial & Investment Profile."
          );
          isValid = false;
        }
        break;
      case 7: // Insurance, Tax & Expectations
        if (formData.hasLifeInsurance && !formData.lifeInsuranceDetails) {
          setMessage("Please provide details for Life Insurance.");
          isValid = false;
        }
        if (formData.hasHealthInsurance && !formData.healthInsuranceDetails) {
          setMessage("Please provide details for Health Insurance.");
          isValid = false;
        }
        if (!formData.incomeTaxSlab) {
          setMessage("Please select your Income Tax Slab.");
          isValid = false;
        }
        break;
      default:
        break;
    }

    if (!isValid) {
      setIsError(true);
    }
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
      setMessage("");
      setIsError(false);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setMessage("");
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("https://onboardingform-ten.vercel.app/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Onboarding form submitted successfully!");
        setIsError(false);
        // Reset form and go back to first step after successful submission
        setFormData({
          clientName: "",
          dob: "",
          gender: "",
          maritalStatus: "",
          number_of_dependents: "",
          occupationType: "",
          businessName: "",
          pan: "",
          aadhar: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          riskProfile: "",
          mainGoal: "",
          hasLifeInsurance: false,
          lifeInsuranceDetails: "",
          hasHealthInsurance: false,
          healthInsuranceDetails: "",
          incomeTaxSlab: "",
          pastInvestmentExperiences: "",
          expectationsFromAdvisor: "",
          termsAccepted: false,
        });
        console.log(formData)
        setCurrentStep(1);
      } else {
        const errorData = await response.json();
        setMessage(
          `Submission failed: ${errorData.message || "Unknown error"}`
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(`An unexpected error occurred: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (!isClient) {
      return null; // Don't render form on server to prevent hydration mismatch
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="clientName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Client Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Marital Status<span className="text-red-500">*</span>
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="number_of_dependents"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Number of Dependents<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="number_of_dependents"
                  name="number_of_dependents"
                  value={formData.number_of_dependents}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="e.g., 0, 1, 2"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Identification & Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="pan"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  PAN Card Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  value={formData.pan}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "pan",
                        value: e.target.value.toUpperCase(),
                        type: "text",
                        checked: false,
                      },
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="ABCDE1234F"
                  maxLength="10"
                />
              </div>
              <div>
                <label
                  htmlFor="aadhar"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Aadhar Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="XXXXXXXXXXXX"
                  maxLength="12"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Address Details
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Street Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="123 Main St"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="City Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    State<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="State Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Pincode<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="123456"
                    maxLength="6"
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Financial & Investment Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="occupationType"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Occupation Type<span className="text-red-500">*</span>
                </label>
                <select
                  id="occupationType"
                  name="occupationType"
                  value={formData.occupationType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                >
                  <option value="">Select Occupation Type</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Retired">Retired</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {formData.occupationType === "Business Owner" && (
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="Your Business Name"
                  />
                </div>
              )}
              {/* Source of Wealth and Income were in your original form, but not explicitly in the schema.
                  If needed, you can re-add them and map them to custom fields or a general 'financialOverview' field.
                  For now, focusing on direct schema fields.
              */}
              <div>
                <label
                  htmlFor="riskProfile"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Risk Profile<span className="text-red-500">*</span>
                </label>
                <select
                  id="riskProfile"
                  name="riskProfile"
                  value={formData.riskProfile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                >
                  <option value="">Select Profile</option>
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Aggressive">Aggressive</option>
                  <option value="Very Aggressive">Very Aggressive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="pastInvestmentExperiences"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Past Investment Experiences<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pastInvestmentExperiences"
                  name="pastInvestmentExperiences"
                  value={formData.pastInvestmentExperiences}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="e.g., Previously invested in stocks, mutual funds..."
                />
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Current Investments & Assets
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  What investments/assets do you currently have?
                </label>
                <p className="text-sm text-gray-500 mb-4">Approximate value is sufficient — no need to list every exact scheme.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Mutual Funds",
                    "Shares / Stocks",
                    "Bank FD / RD",
                    "Gold / Silver",
                    "Land / Plot",
                    "Residential / Commercial Property",
                    "EPF / PPF / NPS",
                    "Insurance / ULIP",
                    "Bonds / Debentures",
                    "Business / Other Investments",
                    "None",
                  ].map((option) => {
                    const isSelected = (formData.currentInvestments?.selected || []).includes(option);

                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleInvestmentOption(option)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {(formData.currentInvestments?.selected || []).includes("Mutual Funds") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Mutual Funds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.mutualFunds.currentValue}
                          onChange={(e) => updateCurrentInvestment("mutualFunds", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.mutualFunds.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 500000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.mutualFunds.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("mutualFunds", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        How do you invest?
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['SIP', 'Lump Sum', 'Both'].map((mode) => (
                          <label key={mode} className="inline-flex items-center gap-2 text-gray-700">
                            <input
                              type="radio"
                              name="mutualFundInvestmentMode"
                              checked={formData.currentInvestments.mutualFunds.investmentMode === mode}
                              onChange={() => updateCurrentInvestment("mutualFunds", "investmentMode", mode)}
                              className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span>{mode}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {['SIP', 'Both'].includes(formData.currentInvestments.mutualFunds.investmentMode) && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Approximate monthly SIP
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                          <input
                            type="number"
                            value={formData.currentInvestments.mutualFunds.monthlySip}
                            onChange={(e) => updateCurrentInvestment("mutualFunds", "monthlySip", e.target.value)}
                            disabled={formData.currentInvestments.mutualFunds.monthlySipNotSure}
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder="e.g. 10000"
                            min="0"
                          />
                        </div>
                        <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={formData.currentInvestments.mutualFunds.monthlySipNotSure}
                            onChange={(e) => updateCurrentInvestment("mutualFunds", "monthlySipNotSure", e.target.checked)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2">I’m not sure</span>
                        </label>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Upload Mutual Fund / CAS Statement (optional)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => updateCurrentInvestment("mutualFunds", "statement", e.target.files?.[0]?.name || "")}
                        className="w-full px-3 py-2 rounded-xl border border-dashed border-gray-300 bg-white text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700"
                      />
                      {formData.currentInvestments.mutualFunds.statement && (
                        <p className="mt-2 text-xs text-gray-500">Selected file: {formData.currentInvestments.mutualFunds.statement}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Shares / Stocks") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Shares / Stocks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.sharesStocks.currentValue}
                          onChange={(e) => updateCurrentInvestment("sharesStocks", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.sharesStocks.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 400000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.sharesStocks.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("sharesStocks", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Investment style
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['Long-term', 'Trading', 'Both'].map((style) => (
                          <label key={style} className="inline-flex items-center gap-2 text-gray-700">
                            <input
                              type="radio"
                              name="sharesInvestmentStyle"
                              checked={formData.currentInvestments.sharesStocks.investmentStyle === style}
                              onChange={() => updateCurrentInvestment("sharesStocks", "investmentStyle", style)}
                              className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span>{style}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Holdings statement upload (optional)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => updateCurrentInvestment("sharesStocks", "statement", e.target.files?.[0]?.name || "")}
                        className="w-full px-3 py-2 rounded-xl border border-dashed border-gray-300 bg-white text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700"
                      />
                      {formData.currentInvestments.sharesStocks.statement && (
                        <p className="mt-2 text-xs text-gray-500">Selected file: {formData.currentInvestments.sharesStocks.statement}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Bank FD / RD") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Bank FD / RD</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate total value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.fdRd.currentValue}
                          onChange={(e) => updateCurrentInvestment("fdRd", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.fdRd.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 800000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.fdRd.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("fdRd", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        When may the money be needed?
                      </label>
                      <select
                        value={formData.currentInvestments.fdRd.needTiming}
                        onChange={(e) => updateCurrentInvestment("fdRd", "needTiming", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select timeline</option>
                        <option value="<1 year">Less than 1 year</option>
                        <option value="1–3 years">1–3 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="No specific requirement">No specific requirement</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Gold / Silver") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Gold / Silver</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={formData.currentInvestments.goldSilver.type}
                        onChange={(e) => updateCurrentInvestment("goldSilver", "type", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select type</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Coins / Bars">Coins / Bars</option>
                        <option value="Gold ETF">Gold ETF</option>
                        <option value="SGB">SGB</option>
                        <option value="Silver">Silver</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.goldSilver.currentValue}
                          onChange={(e) => updateCurrentInvestment("goldSilver", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.goldSilver.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 250000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.goldSilver.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("goldSilver", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Land / Plot") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Land / Plot</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current market value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.landPlot.currentValue}
                          onChange={(e) => updateCurrentInvestment("landPlot", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.landPlot.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 1500000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.landPlot.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("landPlot", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Purpose
                      </label>
                      <select
                        value={formData.currentInvestments.landPlot.purpose}
                        onChange={(e) => updateCurrentInvestment("landPlot", "purpose", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select purpose</option>
                        <option value="Self-use">Self-use</option>
                        <option value="Investment">Investment</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Future construction">Future construction</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expect to sell within 5 years?
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['Yes', 'No', 'Not sure'].map((option) => (
                          <label key={option} className="inline-flex items-center gap-2 text-gray-700">
                            <input
                              type="radio"
                              name="landSellWithinFiveYears"
                              checked={formData.currentInvestments.landPlot.sellWithinFiveYears === option}
                              onChange={() => updateCurrentInvestment("landPlot", "sellWithinFiveYears", option)}
                              className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Residential / Commercial Property") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Property</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Property type
                      </label>
                      <select
                        value={formData.currentInvestments.property.propertyType}
                        onChange={(e) => updateCurrentInvestment("property", "propertyType", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select property type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Plot">Plot</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current market value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.property.currentValue}
                          onChange={(e) => updateCurrentInvestment("property", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.property.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 2500000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.property.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("property", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Outstanding loan, if any
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.property.outstandingLoan}
                          onChange={(e) => updateCurrentInvestment("property", "outstandingLoan", e.target.value)}
                          disabled={formData.currentInvestments.property.outstandingLoanNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 900000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.property.outstandingLoanNotSure}
                          onChange={(e) => updateCurrentInvestment("property", "outstandingLoanNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Rental income, if any
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.property.rentalIncome}
                          onChange={(e) => updateCurrentInvestment("property", "rentalIncome", e.target.value)}
                          disabled={formData.currentInvestments.property.rentalIncomeNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 25000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.property.rentalIncomeNotSure}
                          onChange={(e) => updateCurrentInvestment("property", "rentalIncomeNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expected selling timeline
                      </label>
                      <select
                        value={formData.currentInvestments.property.sellingTimeline}
                        onChange={(e) => updateCurrentInvestment("property", "sellingTimeline", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select timeline</option>
                        <option value="Within 1 year">Within 1 year</option>
                        <option value="1–3 years">1–3 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="No plan to sell">No plan to sell</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("EPF / PPF / NPS") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">EPF / PPF / NPS</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Approximate current value
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.currentInvestments.epfPpfNps.currentValue}
                        onChange={(e) => updateCurrentInvestment("epfPpfNps", "currentValue", e.target.value)}
                        disabled={formData.currentInvestments.epfPpfNps.currentValueNotSure}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="e.g. 1200000"
                        min="0"
                      />
                    </div>
                    <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.currentInvestments.epfPpfNps.currentValueNotSure}
                        onChange={(e) => updateCurrentInvestment("epfPpfNps", "currentValueNotSure", e.target.checked)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2">I’m not sure</span>
                    </label>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Insurance / ULIP") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Insurance / ULIP</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product type
                      </label>
                      <select
                        value={formData.currentInvestments.insuranceUlip.productType}
                        onChange={(e) => updateCurrentInvestment("insuranceUlip", "productType", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      >
                        <option value="">Select product type</option>
                        <option value="Pure insurance">Pure insurance</option>
                        <option value="ULIP / Endowment / Money-back">ULIP / Endowment / Money-back</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate life cover
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.insuranceUlip.lifeCover}
                          onChange={(e) => updateCurrentInvestment("insuranceUlip", "lifeCover", e.target.value)}
                          disabled={formData.currentInvestments.insuranceUlip.lifeCoverNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 2000000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.insuranceUlip.lifeCoverNotSure}
                          onChange={(e) => updateCurrentInvestment("insuranceUlip", "lifeCoverNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Annual premium
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.insuranceUlip.annualPremium}
                          onChange={(e) => updateCurrentInvestment("insuranceUlip", "annualPremium", e.target.value)}
                          disabled={formData.currentInvestments.insuranceUlip.annualPremiumNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 50000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.insuranceUlip.annualPremiumNotSure}
                          onChange={(e) => updateCurrentInvestment("insuranceUlip", "annualPremiumNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>

                    {['ULIP / Endowment / Money-back'].includes(formData.currentInvestments.insuranceUlip.productType) && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Approximate current value
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                          <input
                            type="number"
                            value={formData.currentInvestments.insuranceUlip.currentValue}
                            onChange={(e) => updateCurrentInvestment("insuranceUlip", "currentValue", e.target.value)}
                            disabled={formData.currentInvestments.insuranceUlip.currentValueNotSure}
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder="e.g. 700000"
                            min="0"
                          />
                        </div>
                        <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={formData.currentInvestments.insuranceUlip.currentValueNotSure}
                            onChange={(e) => updateCurrentInvestment("insuranceUlip", "currentValueNotSure", e.target.checked)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2">I’m not sure</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Bonds / Debentures") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Bonds / Debentures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Investment type
                      </label>
                      <input
                        type="text"
                        value={formData.currentInvestments.bondsDebentures.investmentType}
                        onChange={(e) => updateCurrentInvestment("bondsDebentures", "investmentType", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        placeholder="e.g. Bonds, debentures, private placement"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.bondsDebentures.currentValue}
                          onChange={(e) => updateCurrentInvestment("bondsDebentures", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.bondsDebentures.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 300000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.bondsDebentures.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("bondsDebentures", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {(formData.currentInvestments?.selected || []).includes("Business / Other Investments") && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Business / Other Investments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tell us a little about it
                      </label>
                      <input
                        type="text"
                        value={formData.currentInvestments.businessOther.investmentType}
                        onChange={(e) => updateCurrentInvestment("businessOther", "investmentType", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        placeholder="e.g. Business equity, alternative investment"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Approximate current value
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={formData.currentInvestments.businessOther.currentValue}
                          onChange={(e) => updateCurrentInvestment("businessOther", "currentValue", e.target.value)}
                          disabled={formData.currentInvestments.businessOther.currentValueNotSure}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 900000"
                          min="0"
                        />
                      </div>
                      <label className="inline-flex items-center mt-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.currentInvestments.businessOther.currentValueNotSure}
                          onChange={(e) => updateCurrentInvestment("businessOther", "currentValueNotSure", e.target.checked)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">I’m not sure</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  How much of your current investments could potentially be used for future investment?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['None', 'Up to 10%', '10–25%', '25–50%', 'More than 50%'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center rounded-xl border p-3 text-center cursor-pointer transition ${
                        formData.currentInvestments.availableForFutureInvestment === option
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="availableForFutureInvestment"
                        checked={formData.currentInvestments.availableForFutureInvestment === option}
                        onChange={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            currentInvestments: {
                              ...prevData.currentInvestments,
                              availableForFutureInvestment: option,
                            },
                          }))
                        }
                        className="sr-only"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Do you have any major financial requirement in the next 3 years?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {[
                    'Home purchase',
                    'Children\'s education',
                    'Marriage',
                    'Business',
                    'Property purchase',
                    'Vehicle',
                    'Debt repayment',
                    'Other',
                    'No major requirement',
                  ].map((option) => {
                    const isSelected = (formData.currentInvestments.majorRequirements || []).includes(option);

                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-gray-50 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRequirementOption(option)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <FinancialGoalsSection
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange} // If you need it for other fields within the section
        />
        )
      case 7:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Insurance, Tax & Expectations
            </h2>
            <div className="space-y-6">
              {/* Life Insurance */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">
                  Do you have Life Insurance?
                </label>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasLifeInsurance"
                      value="yes"
                      checked={formData.hasLifeInsurance === true}
                      onChange={() =>
                        handleChange({
                          target: { name: "hasLifeInsurance", value: true },
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasLifeInsurance"
                      value="no"
                      checked={formData.hasLifeInsurance === false}
                      onChange={() =>
                        handleChange({
                          target: { name: "hasLifeInsurance", value: false },
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>

                {formData.hasLifeInsurance && (
                  <div className="mt-4">
                    <label
                      htmlFor="lifeInsuranceDetails"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Life Insurance Details
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="lifeInsuranceDetails"
                      name="lifeInsuranceDetails"
                      value={formData.lifeInsuranceDetails}
                      onChange={handleChange}
                      rows="2"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Policy provider, sum assured, etc."
                    />
                  </div>
                )}
              </div>

              {/* Health Insurance */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2 mt-4">
                  Do you have Health Insurance?
                </label>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasHealthInsurance"
                      value="yes"
                      checked={formData.hasHealthInsurance === true}
                      onChange={() =>
                        handleChange({
                          target: { name: "hasHealthInsurance", value: true },
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasHealthInsurance"
                      value="no"
                      checked={formData.hasHealthInsurance === false}
                      onChange={() =>
                        handleChange({
                          target: { name: "hasHealthInsurance", value: false },
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>

                {formData.hasHealthInsurance && (
                  <div className="mt-4">
                    <label
                      htmlFor="healthInsuranceDetails"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Health Insurance Details
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="healthInsuranceDetails"
                      name="healthInsuranceDetails"
                      value={formData.healthInsuranceDetails}
                      onChange={handleChange}
                      rows="2"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Policy provider, coverage, etc."
                    />
                  </div>
                )}
              </div>
              {/* Income Tax Slab */}
              <div>
                <label
                  htmlFor="incomeTaxSlab"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Income Tax Slab<span className="text-red-500">*</span>
                </label>
                <select
                  id="incomeTaxSlab"
                  name="incomeTaxSlab"
                  value={formData.incomeTaxSlab}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                >
                  <option value="">Select Tax Slab</option>
                  <option value="No Tax">No Tax</option>
                  <option value="5% Slab">5% Slab</option>
                  <option value="10% Slab">10% Slab</option>
                  <option value="15% Slab">15% Slab</option>
                  <option value="20% Slab">20% Slab</option>
                  <option value="30% Slab">30% Slab</option>
                </select>
              </div>

              {/* Expectations from Advisor */}
              <div>
                <label
                  htmlFor="expectationsFromAdvisor"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Expectations from Advisor
                </label>
                <textarea
                  id="expectationsFromAdvisor"
                  name="expectationsFromAdvisor"
                  value={formData.expectationsFromAdvisor}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="What do you expect from your financial advisor?"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const totalSteps = 7;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="relative bg-white p-8 pb-4 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
        <Image
          src="/logo.png"
          alt="Value 360 Logo"
          width={69}
          height={69}
        />
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 mt-12 md:mt-0"> {/* Added margin-top for content clearance */}
          Client Onboarding Form
        </h1>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[...Array(totalSteps)].map((_, index) => {
            const stepNum = index + 1;
            return (
              <div key={stepNum} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                  ${currentStep >= stepNum ? "bg-indigo-600" : "bg-gray-300"}
                  ${
                    currentStep === stepNum
                      ? "ring-2 ring-indigo-500 ring-offset-2"
                      : ""
                  }
                `}
                >
                  {stepNum}
                </div>
                <span className="text-xs mt-2 text-gray-600 text-center">
                  {stepNum === 1 && "Personal"}
                  {stepNum === 2 && "ID & Contact"}
                  {stepNum === 3 && "Address"}
                  {stepNum === 4 && "Financial Profile"}
                  {stepNum === 5 && "Current Assets"}
                  {stepNum === 6 && "Financial Goals"}
                  {stepNum === 7 && "Insurance & Tax"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Display messages (success/error) */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-sm font-medium ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              >
                Previous
              </button>
            )}

            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto py-2 px-6 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              >
                Next
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto py-2 px-6 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Form"}
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Global styles for form inputs and selects */}
      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
          background: #f3f4f6;
        }

        input,
        select,
        textarea {
          transition: all 0.2s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
        }

        .form-card {
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        }
      `}</style>
    </div>
  );
}
