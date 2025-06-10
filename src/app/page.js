import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCoins,
  faBullseye,
  faShieldAlt,
  faHandshake,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Value 360 Logo"
                width={70}
                height={70}
                className="mr-16"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-bold"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-bold"
              >
                About
              </a>
              <a
                href="#credentials"
                className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-bold"
              >
                Credentials
              </a>
            </nav>
            <a
              href="/onboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Your Complete
                <span className="text-blue-600 block">Investment Solution</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert investment consultancy services backed by NISM
                certifications and strategic partnerships. We provide
                comprehensive financial guidance to help you achieve your wealth
                creation goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/onboard"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Book Consultation
                </a>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-4">
                    ✓ NISM Certified
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Professional Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        NISM 5A
                      </div>
                      <div className="text-sm text-gray-600">
                        Mutual Fund Distributor
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        NISM 21A
                      </div>
                      <div className="text-sm text-gray-600">
                        Portfolio Management Services (PMS)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive investment solutions tailored to your financial
              goals and risk appetite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Portfolio Management
              </h3>
              <p className="text-gray-600">
                Professional portfolio construction and management services to
                optimize your investment returns while managing risk
                effectively.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCoins} className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mutual Fund Advisory
              </h3>
              <p className="text-gray-600">
                Expert guidance on mutual fund selection, SIP planning, and fund
                portfolio optimization based on your financial objectives.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                📈
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Equity Derivatives
              </h3>
              <p className="text-gray-600">
                Advanced derivatives strategies for hedging and income
                generation, backed by NISM 21A certification and market
                expertise.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faBullseye} className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Financial Planning
              </h3>
              <p className="text-gray-600">
                Comprehensive financial planning services covering retirement,
                tax planning, insurance, and wealth creation strategies.
              </p>
            </div>

            <div className="bg-red-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-red-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Risk Assessment
              </h3>
              <p className="text-gray-600">
                Detailed risk profiling and assessment to ensure your investment
                strategy aligns with your risk tolerance and goals.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faHandshake} className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Wealth Management
              </h3>
              <p className="text-gray-600">
                Holistic wealth management solutions in partnership with NJ
                Wealth for high-net-worth individuals and families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Value 360?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine professional expertise with personalized service to
                deliver exceptional investment outcomes. Our approach is built
                on transparency, trust, and a deep understanding of market
                dynamics.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FontAwesomeIcon icon={faCheck} className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      NISM Certified Expertise
                    </h4>
                    <p className="text-gray-600">
                      Qualified with NISM 5A and 21A certifications ensuring
                      professional competency
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FontAwesomeIcon icon={faCheck} className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Strategic Partnership
                    </h4>
                    <p className="text-gray-600">
                      Associated with NJ Wealth for comprehensive financial
                      solutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FontAwesomeIcon icon={faCheck} className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Personalized Approach
                    </h4>
                    <p className="text-gray-600">
                      Tailored investment strategies based on individual
                      financial goals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Our Investment Philosophy
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Research-Driven
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Thorough market analysis and fundamental research
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Risk-Managed</h4>
                  <p className="text-gray-600 text-sm">
                    Balanced approach to risk and return optimization
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Long-term Focus
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sustainable wealth creation over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Credentials
            </h2>
            <p className="text-xl text-gray-600">
              Certified expertise you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
              <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                5A
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">NISM 5A</h3>
              <p className="text-gray-600 mb-4">
                Mutual Fund Distributors Certification
              </p>
              <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xl font-semibold">
                Certified
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
              <div className="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                21A
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                NISM 21A
              </h3>
              <p className="text-gray-600 mb-4">
                Portfolio Management Services (PMS)
              </p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xl font-semibold">
                Certified
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
              <div className="bg-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                NJ
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                NJ Wealth
              </h3>
              <p className="text-gray-600 mb-4">Strategic Partnership</p>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xl font-semibold">
                Associated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let our certified experts help you create a personalized investment
            strategy that aligns with your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/onboard"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Schedule Free Consultation
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Download Investment Guide
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                {/* Ensure you have imported Image from 'next/image' if you haven't already */}
                {/* import Image from 'next/image'; */}
                <Image
                  src="/logo.png"
                  alt="Value 360 Logo"
                  width={70}
                  height={70}
                  className="mr-16"
                />
              </div>
              <p className="text-gray-400">
                Professional investment consultancy services with NISM certified
                expertise.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mutual Funds
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Derivatives
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Financial Planning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Credentials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partnership
                  </a>
                </li>
                <li>
                  <a
                    href="/onboard"
                    className="hover:text-white transition-colors"
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </div>

            {/* New Contact Us section */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="tel:7559105682"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    Sidraya Takale : +91 7559105682
                  </a>
                </li>
                <li>
                  <a
                    href="tel:8484979855"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    Neil Sulhyan : +91 8484979855
                  </a>
                </li>
                <li>
                  <a
                    href="tel:9822242006"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    CA Bhupal Sulhyan : +91 9822242006
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Value 360. All rights reserved. | NISM Certified |
              Associated with NJ Wealth
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
