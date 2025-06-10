'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const ClientDetailsPage = ({ params }) => {
  const { id } = React.use(params);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchClientDetails = async () => {
      try {
        const response = await fetch(`https://onboardingform-ten.vercel.app/api/clients/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch client details for ID: ${id}`);
        }
        const data = await response.json();
        setClient(data.client);
      } catch (err) {
        console.error("Error fetching client details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-lg text-red-500">Could not load client details: {error}</p>
          <Link href="/admin" className="mt-4 text-blue-600 hover:underline">
            Go back to client list
          </Link>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Client Not Found</h1>
          <p className="text-lg text-gray-600">{`The client with ID "${id}" could not be found.`}</p>
          <Link href="/admin" className="mt-4 text-blue-600 hover:underline">
            Go back to client list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {`${client.clientName}'s Details`}
          </h1>
          <Link href="/admin" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Clients
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg">
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Email:</span> {client.email}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">PAN:</span> {client.pan}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Aadhar:</span> {client.aadhar}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Gender:</span> {client.gender}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Date of Birth:</span>{' '}
            {new Date(client.dob).toLocaleDateString()}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Marital Status:</span>{' '}
            {client.maritalStatus}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Dependents:</span>{' '}
            {client.number_of_dependents}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Occupation:</span>{' '}
            {client.occupationType}
          </div>
          {client.businessName && (
            <div className="pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Business Name:</span>{' '}
              {client.businessName}
            </div>
          )}
          <div className="pb-2 border-b border-gray-200 col-span-1 md:col-span-2">
            <span className="font-semibold text-gray-700">Address:</span> {client.address}, {client.city}, {client.state} - {client.pincode}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Risk Profile:</span>{' '}
            <span
              className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                client.riskProfile === 'High'
                  ? 'bg-red-100 text-red-800'
                  : client.riskProfile === 'Moderate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {client.riskProfile}
            </span>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Income Tax Slab:</span>{' '}
            {client.incomeTaxSlab}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Life Insurance:</span>{' '}
            {client.hasLifeInsurance ? `Yes (${client.lifeInsuranceDetails})` : 'No'}
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Health Insurance:</span>{' '}
            {client.hasHealthInsurance ? `Yes (${client.healthInsuranceDetails})` : 'No'}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Goals</h2>
          {client.financialGoals && client.financialGoals.length > 0 ? (
            <div className="space-y-3">
              {client.financialGoals.map((goal, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-800">{goal.description}</p>
                  <p className="text-gray-700">Target Amount: <span className="font-bold text-blue-700">₹{goal.targetAmount.toLocaleString()}</span></p>
                  <p className="text-gray-700">Years to Achieve: {goal.yearsToAchieve}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No financial goals recorded.</p>
          )}
        </div>

        {client.sourcesOfIncome && client.sourcesOfIncome.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sources of Income</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {client.sourcesOfIncome.map((source, index) => (
                <li key={index}>{source.type}: ${source.amount.toLocaleString()} {source.frequency && `(${source.frequency})`}</li>
              ))}
            </ul>
          </div>
        )}

         {/* Example for tax saving investments */}
         {client.taxSavingInvestments && client.taxSavingInvestments.length > 0 && client.taxSavingInvestments[0] !== 'none' && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax Saving Investments</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {client.taxSavingInvestments.map((investment, index) => (
                <li key={index}>{investment}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Expectations from Advisor */}
        {client.expectationsFromAdvisor && client.expectationsFromAdvisor !== 'none' && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expectations from Advisor</h2>
            <p className="text-gray-700">{client.expectationsFromAdvisor}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientDetailsPage;