import mongoose from 'mongoose';

// Define a sub-schema for financial goals
const FinancialGoalSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  },
  yearsToAchieve: {
    type: Number,
    required: true,
    min: 1
  }
}, { _id: false });

const IncomeSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  frequency: {
    type: String,
    enum: ['monthly', 'annually', 'quarterly', 'one-time'], // Extended enum
    required: true
  }
}, { _id: false });

const ExpenseItemSchema = new mongoose.Schema({
  type: {
    type: String, // "fixed", "variable", or "emi"
    enum: ['fixed', 'variable', 'emi'],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  frequency: { // Added frequency for fixed/variable expenses
    type: String,
    enum: ['monthly', 'annually', 'one-time'],
    required: function() {
      return this.type !== 'emi';
    }
  },
  endDate: {
    type: Date, // Changed to Date
    required: function() {
      return this.type === 'emi';
    }
  }
}, { _id: false });

const AssetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

// Liability schema
const LiabilitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0
  },
  endDate: {
    type: Date,
    required: true
  }
}, { _id: false });

const FixedDepositSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  principalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  roi: {
    type: Number,
    required: true,
    min: 0
  },
  maturityDate: {
    type: Date,
    required: true
  }
}, { _id: false });

// Mutual Fund Schema
const MutualFundSchema = new mongoose.Schema({
  fundName: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  broker: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  amountInvested: {
    type: Number,
    required: true,
    min: 0
  },
  presentValue: {
    type: Number,
    required: true,
    min: 0
  },
  dateInvested: { // Added date of investment
    type: Date
  },
  units: { // Added units
    type: Number,
    min: 0
  }
}, { _id: false });

// Stock Investment Schema
const StockInvestmentSchema = new mongoose.Schema({
  stockName: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  broker: {
    type: String,
    required: true,
    trim: true // Added trim
  },
  amountInvested: {
    type: Number,
    required: true,
    min: 0
  },
  presentValue: {
    type: Number,
    required: true,
    min: 0
  },
  dateInvested: { // Added date of investment
    type: Date
  },
  quantity: { // Added quantity
    type: Number,
    min: 0
  }
}, { _id: false });

// Define the main client schema
const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true, // Made required
    trim: true // Added trim
  },
  dob: {
    type: Date, // Changed to Date type
    required: true // Assuming DOB is required
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'], // Added enum
    trim: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'], // Added enum
    trim: true
  },
  number_of_dependents: {
    type: Number,
    min: 0
  },
  occupationType: {
    type: String,
    trim: true,
    enum: ['Salaried', 'Self-Employed', 'Business Owner', 'Retired', 'Student', 'Other'] // Example enum
  },
  businessName: {
    type: String,
    trim: true
  },
  pan: {
    type: String,
    required: true,
    unique: true, // Assuming PAN is unique
    trim: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ // Basic PAN format validation
  },
  aadhar: {
    type: String,
    required: true,
    unique: true, // Assuming Aadhar is unique
    trim: true,
    match: /^[0-9]{12}$/ // Basic Aadhar format validation
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/ // Basic email format validation
  },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: {
    type: String, // Kept as String for flexibility with leading zeros, etc.
    trim: true,
    match: /^[0-9]{6}$/ // Example for 6-digit Indian pincode
  },
  financialGoals: [FinancialGoalSchema],
  sourcesOfIncome: [IncomeSourceSchema],
  passiveIncome: [IncomeSourceSchema], // CRITICAL FIX: Changed to IncomeSourceSchema
  expenses: [ExpenseItemSchema],
  assets: [AssetSchema],
  liabilities: [LiabilitySchema],
  fixedDeposits: [FixedDepositSchema],
  mutualFunds: [MutualFundSchema],
  stocks: [StockInvestmentSchema],
  riskProfile: {
    type: String,
    enum: ['Conservative', 'Moderate', 'Balanced', 'Aggressive', 'Very Aggressive'], // Added enum
    trim: true
  },
  hasLifeInsurance: {
    type: Boolean,
    default: false
  },
  lifeInsuranceDetails: {
    type: String,
    trim: true,
    required: function() { return this.hasLifeInsurance; } // Conditionally required
  },
  hasHealthInsurance: {
    type: Boolean,
    default: false
  },
  healthInsuranceDetails: {
    type: String,
    trim: true,
    required: function() { return this.hasHealthInsurance; } // Conditionally required
  },
  incomeTaxSlab: {
    type: String,
    enum: [
      'No Tax', '5% Slab', '10% Slab', '15% Slab', '20% Slab', '30% Slab',
      'Old Regime', 'New Regime'
    ],
    trim: true
  },
  taxSavingInvestments: [{ type: String, trim: true }], // Applied trim to array elements
  pastInvestmentExperiences: {
    type: String,
    trim: true
  },
  expectationsFromAdvisor: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Added timestamps: true

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);