'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faUser,
  faBullseye,
  faMoneyBillWave,
  faBuildingColumns,
  faShieldAlt,
  faFileInvoiceDollar,
  faDatabase,
  faEye,
  faEyeSlash,
  faCopy,
  faChevronDown,
  faChevronUp,
  faCalendar,
  faMapMarkerAlt,
  faBriefcase,
  faHeart,
  faBuilding,
  faCoins,
  faChartLine,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';

const SECTIONS = [
  { id: 'personal', label: 'Personal Information', icon: faUser },
  { id: 'goals', label: 'Financial Goals', icon: faBullseye },
  { id: 'income', label: 'Income & Expenses', icon: faMoneyBillWave },
  { id: 'assets', label: 'Assets & Liabilities', icon: faBuildingColumns },
  { id: 'insurance', label: 'Insurance', icon: faShieldAlt },
  { id: 'tax', label: 'Tax & Investments', icon: faFileInvoiceDollar },
  { id: 'metadata', label: 'System Metadata', icon: faDatabase },
];

const RISK_PROFILE_COLORS = {
  Conservative: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Balanced: 'bg-blue-100 text-blue-800',
  Aggressive: 'bg-orange-100 text-orange-800',
  'Very Aggressive': 'bg-red-100 text-red-800',
};

function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function formatDateTime(dateString) {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '—';
  const num = Number(value);
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '—';
  const num = Number(value);
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('en-IN').format(num);
}

function maskSensitive(value, type = 'pan') {
  if (!value) return '—';
  if (type === 'pan') {
    return value.length > 4 ? `${value.slice(0, 3)}****${value.slice(-1)}` : '****';
  }
  if (type === 'aadhar') {
    return value.length > 4 ? `**** **** ${value.slice(-4)}` : '****';
  }
  return value;
}

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function SectionCard({ title, icon, children, emptyMessage }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5" aria-labelledby={title.toLowerCase().replace(/\s+/g, '-')}>
      <h3 id={title.toLowerCase().replace(/\s+/g, '-')} className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        <FontAwesomeIcon icon={icon} className="text-indigo-600" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
        {!children && emptyMessage && (
          <p className="text-gray-500 italic text-center py-4">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}

function DetailRow({ label, value, children, copyable, sensitive, maskType }) {
  const [showSensitive, setShowSensitive] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayValue = sensitive && !showSensitive
    ? maskSensitive(value, maskType)
    : value;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 py-2 border-b border-gray-100 last:border-0">
      <dt className="text-sm font-medium text-gray-600 w-full sm:w-48 flex-shrink-0">
        {label}
      </dt>
      <dd className="text-sm text-gray-900 flex-1 flex items-center gap-2">
        {children || (
          <>
            <span className="font-mono">{displayValue}</span>
            {sensitive && (
              <button
                onClick={() => setShowSensitive(!showSensitive)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label={showSensitive ? 'Hide value' : 'Show value'}
              >
                <FontAwesomeIcon icon={showSensitive ? faEyeSlash : faEye} size="xs" />
              </button>
            )}
            {copyable && value && value !== '—' && (
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-indigo-600 p-1"
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                <FontAwesomeIcon icon={copied ? faCopy : faCopy} size="xs" />
              </button>
            )}
          </>
        )}
      </dd>
    </div>
  );
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function ArrayField({ label, items, renderItem, emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <DetailRow label={label} value={emptyMessage || 'None'} />
    );
  }

  return (
    <div className="py-2 border-b border-gray-100 last:border-0">
      <dt className="text-sm font-medium text-gray-600 mb-2">{label}</dt>
      <dd className="space-y-2 ml-0 sm:ml-48">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            {renderItem(item, index)}
          </div>
        ))}
      </dd>
    </div>
  );
}

export default function ClientDetailModal({ client, onClose }) {
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!client) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-xl text-indigo-600" />
              </div>
              <div>
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">{client.clientName || 'Client Details'}</h2>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Section Navigation */}
          <nav className="border-b border-gray-200 bg-gray-50 px-4 overflow-x-auto" aria-label="Detail sections">
            <ul className="flex gap-1 min-w-max" role="tablist">
              {SECTIONS.map((section) => (
                <li key={section.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={activeSection === section.id}
                    aria-controls={`${section.id}-panel`}
                    id={`${section.id}-tab`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 -mb-px'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={section.icon} size="sm" />
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5" role="tabpanel" id={`${activeSection}-panel`} aria-labelledby={`${activeSection}-tab`}>
            {activeSection === 'personal' && (
              <>
                <SectionCard title="Personal Information" icon={faUser} emptyMessage="No personal information available">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow label="Client Name" value={client.clientName} copyable />
                    <DetailRow label="Email" value={client.email} copyable />
                    <DetailRow label="Phone" value={client.phone || '—'} />
                    <DetailRow label="Date of Birth" value={formatDate(client.dob)} />
                    <DetailRow label="Gender" value={client.gender} />
                    <DetailRow label="Marital Status" value={client.maritalStatus} />
                    <DetailRow label="Dependents" value={client.number_of_dependents ?? '—'} />
                    <DetailRow label="PAN" value={client.pan} copyable sensitive maskType="pan" />
                    <DetailRow label="Aadhar" value={client.aadhar} copyable sensitive maskType="aadhar" />
                  </div>
                </SectionCard>

                <SectionCard title="Occupation & Address" icon={faBriefcase} emptyMessage="No occupation or address details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow label="Occupation Type" value={client.occupationType}>
                      {client.occupationType && <Badge className="bg-gray-100 text-gray-700">{client.occupationType}</Badge>}
                    </DetailRow>
                    <DetailRow label="Business Name" value={client.businessName || '—'} />
                    <DetailRow label="Address" value={client.address} />
                    <DetailRow label="City" value={client.city} />
                    <DetailRow label="State" value={client.state} />
                    <DetailRow label="Pincode" value={client.pincode} />
                  </div>
                </SectionCard>
              </>
            )}

            {activeSection === 'goals' && (
              <>
                <SectionCard title="Financial Goals" icon={faTarget} emptyMessage="No financial goals recorded">
                  <ArrayField
                    label="Goals"
                    items={client.financialGoals}
                    renderItem={(goal) => (
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900">{goal.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span><strong>Target:</strong> {formatCurrency(goal.targetAmount)}</span>
                          <span><strong>Timeline:</strong> {goal.yearsToAchieve} years</span>
                        </div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Advisor Expectations" icon={faTarget} emptyMessage="No expectations recorded">
                  <DetailRow label="Expectations" value={client.expectationsFromAdvisor || '—'} />
                </SectionCard>

                <SectionCard title="Past Investment Experience" icon={faChartLine} emptyMessage="No past experience recorded">
                  <DetailRow label="Experience" value={client.pastInvestmentExperiences || '—'} />
                </SectionCard>
              </>
            )}

            {activeSection === 'income' && (
              <>
                <SectionCard title="Sources of Income" icon={faMoneyBillWave} emptyMessage="No income sources recorded">
                  <ArrayField
                    label="Income Sources"
                    items={client.sourcesOfIncome}
                    renderItem={(source) => (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div><span className="text-gray-500">Name:</span> <span className="font-medium ml-1">{source.name}</span></div>
                        <div><span className="text-gray-500">Amount:</span> <span className="font-medium ml-1">{formatCurrency(source.amount)}</span></div>
                        <div><span className="text-gray-500">Frequency:</span> <span className="font-medium ml-1 capitalize">{source.frequency}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Passive Income" icon={faCoins} emptyMessage="No passive income recorded">
                  <ArrayField
                    label="Passive Income"
                    items={client.passiveIncome}
                    renderItem={(source) => (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div><span className="text-gray-500">Name:</span> <span className="font-medium ml-1">{source.name}</span></div>
                        <div><span className="text-gray-500">Amount:</span> <span className="font-medium ml-1">{formatCurrency(source.amount)}</span></div>
                        <div><span className="text-gray-500">Frequency:</span> <span className="font-medium ml-1 capitalize">{source.frequency}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Expenses" icon={faMoneyBillWave} emptyMessage="No expenses recorded">
                  <ArrayField
                    label="Expense Items"
                    items={client.expenses}
                    renderItem={(expense) => (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Type:</span> <Badge className="ml-1 capitalize">{expense.type}</Badge></div>
                        <div><span className="text-gray-500">Description:</span> <span className="font-medium ml-1">{expense.description}</span></div>
                        <div><span className="text-gray-500">Amount:</span> <span className="font-medium ml-1">{formatCurrency(expense.amount)}</span></div>
                        <div><span className="text-gray-500">Frequency:</span> <span className="font-medium ml-1 capitalize">{expense.frequency || '—'}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>
              </>
            )}

            {activeSection === 'assets' && (
              <>
                <SectionCard title="Assets" icon={faBuildingColumns} emptyMessage="No assets recorded">
                  <ArrayField
                    label="Assets"
                    items={client.assets}
                    renderItem={(asset) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div><span className="text-gray-500">Description:</span> <span className="font-medium ml-1">{asset.description}</span></div>
                        <div><span className="text-gray-500">Value:</span> <span className="font-medium ml-1">{formatCurrency(asset.amount)}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Liabilities" icon={faBuildingColumns} emptyMessage="No liabilities recorded">
                  <ArrayField
                    label="Liabilities"
                    items={client.liabilities}
                    renderItem={(liability) => (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Description:</span> <span className="font-medium ml-1">{liability.description}</span></div>
                        <div><span className="text-gray-500">Amount:</span> <span className="font-medium ml-1">{formatCurrency(liability.amount)}</span></div>
                        <div><span className="text-gray-500">Interest Rate:</span> <span className="font-medium ml-1">{liability.interestRate}%</span></div>
                        <div><span className="text-gray-500">End Date:</span> <span className="font-medium ml-1">{formatDate(liability.endDate)}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Fixed Deposits" icon={faLandmark} emptyMessage="No fixed deposits recorded">
                  <ArrayField
                    label="Fixed Deposits"
                    items={client.fixedDeposits}
                    renderItem={(fd) => (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Bank:</span> <span className="font-medium ml-1">{fd.bankName}</span></div>
                        <div><span className="text-gray-500">Principal:</span> <span className="font-medium ml-1">{formatCurrency(fd.principalAmount)}</span></div>
                        <div><span className="text-gray-500">ROI:</span> <span className="font-medium ml-1">{fd.roi}%</span></div>
                        <div><span className="text-gray-500">Maturity:</span> <span className="font-medium ml-1">{formatDate(fd.maturityDate)}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Mutual Funds" icon={faChartLine} emptyMessage="No mutual funds recorded">
                  <ArrayField
                    label="Mutual Funds"
                    items={client.mutualFunds}
                    renderItem={(mf) => (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Fund:</span> <span className="font-medium ml-1">{mf.fundName}</span></div>
                        <div><span className="text-gray-500">Broker:</span> <span className="font-medium ml-1">{mf.broker}</span></div>
                        <div><span className="text-gray-500">Invested:</span> <span className="font-medium ml-1">{formatCurrency(mf.amountInvested)}</span></div>
                        <div><span className="text-gray-500">Current:</span> <span className="font-medium ml-1">{formatCurrency(mf.presentValue)}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Stocks" icon={faChartLine} emptyMessage="No stock investments recorded">
                  <ArrayField
                    label="Stock Investments"
                    items={client.stocks}
                    renderItem={(stock) => (
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Stock:</span> <span className="font-medium ml-1">{stock.stockName}</span></div>
                        <div><span className="text-gray-500">Broker:</span> <span className="font-medium ml-1">{stock.broker}</span></div>
                        <div><span className="text-gray-500">Invested:</span> <span className="font-medium ml-1">{formatCurrency(stock.amountInvested)}</span></div>
                        <div><span className="text-gray-500">Current:</span> <span className="font-medium ml-1">{formatCurrency(stock.presentValue)}</span></div>
                      </div>
                    )}
                  />
                </SectionCard>
              </>
            )}

            {activeSection === 'insurance' && (
              <>
                <SectionCard title="Life Insurance" icon={faHeart} emptyMessage="No life insurance details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow
                      label="Status"
                      value={client.hasLifeInsurance ? 'Active' : 'Not Opted'}
                    >
                      {client.hasLifeInsurance ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Not Opted</Badge>
                      )}
                    </DetailRow>
                    <DetailRow label="Details" value={client.lifeInsuranceDetails || '—'} />
                  </div>
                </SectionCard>

                <SectionCard title="Health Insurance" icon={faShieldAlt} emptyMessage="No health insurance details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow
                      label="Status"
                      value={client.hasHealthInsurance ? 'Active' : 'Not Opted'}
                    >
                      {client.hasHealthInsurance ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Not Opted</Badge>
                      )}
                    </DetailRow>
                    <DetailRow label="Details" value={client.healthInsuranceDetails || '—'} />
                  </div>
                </SectionCard>
              </>
            )}

            {activeSection === 'tax' && (
              <>
                <SectionCard title="Tax Information" icon={faFileInvoiceDollar} emptyMessage="No tax information recorded">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailRow label="Income Tax Slab" value={client.incomeTaxSlab}>
                      {client.incomeTaxSlab && <Badge className="bg-blue-100 text-blue-800">{client.incomeTaxSlab}</Badge>}
                    </DetailRow>
                    <DetailRow label="Risk Profile" value={client.riskProfile}>
                      {client.riskProfile && (
                        <Badge className={RISK_PROFILE_COLORS[client.riskProfile] || 'bg-gray-100 text-gray-700'}>
                          {client.riskProfile}
                        </Badge>
                      )}
                    </DetailRow>
                  </div>
                </SectionCard>

                <SectionCard title="Tax-Saving Investments" icon={faFileInvoiceDollar} emptyMessage="No tax-saving investments recorded">
                  <ArrayField
                    label="Investments"
                    items={client.taxSavingInvestments}
                    renderItem={(investment) => (
                      <Badge className="bg-gray-100 text-gray-700">{investment}</Badge>
                    )}
                  />
                </SectionCard>

                <SectionCard title="Relevant Investment Information" icon={faChartLine} emptyMessage="No additional investment information">
                  <DetailRow label="Information" value={client.relevantInvestmentInfo || client.relevantInvestmentInformation || '—'} />
                </SectionCard>
              </>
            )}

            {activeSection === 'metadata' && (
              <SectionCard title="System Metadata" icon={faDatabase} emptyMessage="No metadata available">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow label="Response ID" value={client._id} copyable />
                  <DetailRow label="Created At" value={formatDateTime(client.createdAt)} />
                  <DetailRow label="Updated At" value={formatDateTime(client.updatedAt)} />
                  <DetailRow label="Version" value={client.__v ?? '—'} />
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}