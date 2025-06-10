// src/app/admin/page.js (or pages/admin/clients.js)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // <--- Import Link
import { fetchClients } from '../../lib/api'; // Adjust path if needed

const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 animate-pulse text-gray-800">
            Client Management Dashboard
          </h1>
          <p className="text-xl text-gray-600">Loading client data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Error</h1>
          <p className="text-xl text-red-600">Failed to load clients: {error}</p>
          <p className="text-md text-gray-600 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Client Management Dashboard
        </h1>

        {clients.length === 0 ? (
          <p className="text-center text-xl text-gray-500 mt-10">No clients found.</p>
        ) : (
          <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Client Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      PAN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Aadhar
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Occupation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Risk Profile
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Financial Goals
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {/* Make client name clickable */}
                        <Link href={`/admin/${client._id}`} className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
                          {client.clientName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.pan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.aadhar}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.occupationType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {client.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            client.riskProfile === 'High'
                              ? 'bg-red-100 text-red-800'
                              : client.riskProfile === 'Moderate'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {client.riskProfile}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {client.financialGoals && client.financialGoals.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {client.financialGoals.map((goal, index) => (
                              <li key={index}>
                                {goal.description}:{' '}
                                <span className="font-semibold text-blue-600">
                                  ₹{goal.targetAmount.toLocaleString()}
                                </span>{' '}
                                ({goal.yearsToAchieve} yrs)
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500 italic">No goals set</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClientsPage;