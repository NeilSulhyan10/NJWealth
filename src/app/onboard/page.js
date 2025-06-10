"use client"; // This directive marks the component as a Client Component

import { useState, useEffect } from "react"; // Import useEffect for initial hydration check
import FinancialGoalsSection from '../components/case5';

// Main Onboarding Form component
export default function Home() {
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

  const validateStep = (step) => {
    let isValid = true;
    setMessage("");
    setIsError(false);

    // switch (step) {
    //   case 1: // Personal Details
    //     if (
    //       !formData.clientName ||
    //       !formData.dob ||
    //       !formData.gender ||
    //       !formData.maritalStatus ||
    //       formData.number_of_dependents === ""
    //     ) {
    //       setMessage(
    //         "Please fill in all required fields for Personal Details."
    //       );
    //       isValid = false;
    //     }
    //     break;
    //   case 2: // Identification & Contact
    //     if (!formData.pan || !formData.aadhar || !formData.email) {
    //       // mobile was not in schema, keeping it out
    //       setMessage(
    //         "Please fill in all required fields for Identification & Contact."
    //       );
    //       isValid = false;
    //     }
    //     // Basic Regex for PAN and Aadhar (Client-side validation)
    //     if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
    //       setMessage("Invalid PAN format. It should be like ABCDE1234F.");
    //       isValid = false;
    //     }
    //     if (formData.aadhar && !/^[0-9]{12}$/.test(formData.aadhar)) {
    //       setMessage("Invalid Aadhar format. It should be 12 digits.");
    //       isValid = false;
    //     }
    //     if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
    //       setMessage("Invalid email format.");
    //       isValid = false;
    //     }
    //     break;
    //   case 3: // Address Details
    //     if (
    //       !formData.address ||
    //       !formData.city ||
    //       !formData.state ||
    //       !formData.pincode
    //     ) {
    //       setMessage("Please fill in all required fields for Address Details.");
    //       isValid = false;
    //     }
    //     if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
    //       setMessage("Invalid Pincode format. It should be 6 digits.");
    //       isValid = false;
    //     }
    //     break;
    //   case 4: // Financial & Investment Profile
    //     if (
    //       !formData.occupationType ||
    //       !formData.riskProfile ||
    //       !formData.mainGoal ||
    //       !formData.investmentStyle ||
    //       !formData.pastInvestmentExperiences
    //     ) {
    //       setMessage(
    //         "Please fill in all required fields for Financial & Investment Profile."
    //       );
    //       isValid = false;
    //     }
    //     break;
    //   case 5: // Insurance, Tax & Expectations
    //     if (formData.hasLifeInsurance && !formData.lifeInsuranceDetails) {
    //       setMessage("Please provide details for Life Insurance.");
    //       isValid = false;
    //     }
    //     if (formData.hasHealthInsurance && !formData.healthInsuranceDetails) {
    //       setMessage("Please provide details for Health Insurance.");
    //       isValid = false;
    //     }
    //     if (!formData.incomeTaxSlab) {
    //       setMessage("Please select your Income Tax Slab.");
    //       isValid = false;
    //     }
    //     break;
    //   case 6: // Bank Details & Terms (new step)
    //     if (
    //       !formData.bankName ||
    //       !formData.accountNo ||
    //       !formData.ifsc ||
    //       !formData.accountType ||
    //       !formData.accountHolder
    //     ) {
    //       setMessage("Please fill in all required fields for Bank Details.");
    //       isValid = false;
    //     }
    //     if (!formData.termsAccepted) {
    //       setMessage("You must agree to the terms and conditions to submit.");
    //       isValid = false;
    //     }
    //     break;
    //   default:
    //     break;
    // }

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
          taxSavingInvestments: "",
          pastInvestmentExperiences: "",
          expectationsFromAdvisor: "",
          bankName: "",
          accountNo: "",
          ifsc: "",
          accountType: "",
          accountHolder: "",
          termsAccepted: false,
        });
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
                  onChange={handleChange}
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
              {/* Mobile was not explicitly in the schema you provided, but often needed */}
              {/* <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="+919876543210" />
              </div> */}
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
                  Past Investment Experiences
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
          <FinancialGoalsSection
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange} // If you need it for other fields within the section
        />
        )  
      case 6:
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
                  <option value="Old Regime">Old Regime</option>
                  <option value="New Regime">New Regime</option>
                </select>
              </div>

              {/* Tax Saving Investments */}
              <div>
                <label
                  htmlFor="taxSavingInvestments"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Tax Saving Investments (comma-separated)
                </label>
                <input
                  type="text"
                  id="taxSavingInvestments"
                  name="taxSavingInvestments"
                  value={formData.taxSavingInvestments}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="e.g., PPF, ELSS, NPS"
                />
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

  const totalSteps = 6; // Updated total steps

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
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
                  {stepNum === 4 && "Financial"}
                  {stepNum === 5 && "Financial Goals"}
                  {stepNum === 6 && "Insurance & Tax"}
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
        .w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          shadow-sm
          placeholder-gray-400
          text-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
          duration-200,
        .w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          shadow-sm
          bg-white
          text-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
          duration-200 {
          @apply mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base transition duration-150 ease-in-out;
        }
        /* Inter font for better readability */
        body {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </div>
  );
}
