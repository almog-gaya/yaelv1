'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

interface ClientInsight {
  // Basic Information
  clientName: string;
  businessName: string;
  interviewDate: string;
  role: string;
  businessType: string;
  location: string;
  
  // Product Experience
  experienceWithProduct: string;
  howDiscovered: string;
  purchaseDecisionFactors: string;
  initialExpectations: string;
  currentSatisfaction: string;
  
  // Social & Marketing
  socialMediaImpact: string;
  socialMediaPlatforms: string;
  marketingEffectiveness: string;
  wordOfMouthImpact: string;
  
  // Revenue & Pricing
  revenuePotential: string;
  currentRevenue: string;
  pricingApproach: string;
  pricingFlexibility: string;
  costRecovery: string;
  
  // Value & Branding
  perceivedValue: string;
  valueDrivers: string;
  brandingImportance: string;
  customizationNeeds: string;
  competitiveAdvantage: string;
  
  // Usage Patterns
  usageFrequency: string;
  eventTypes: string;
  peakUsageTimes: string;
  equipmentNeeds: string;
  maintenanceChallenges: string;
  
  // Performance
  highPerformerBehaviors: string;
  lowPerformerBehaviors: string;
  successMetrics: string;
  performanceChallenges: string;
  
  // Support & Resources
  marketingSupportNeeds: string;
  salesMaterialsNeeded: string;
  trainingNeeds: string;
  technicalSupport: string;
  demoTestingSupport: string;
  
  // Referral & Growth
  referralProcess: string;
  referralQuality: string;
  growthOpportunities: string;
  expansionPlans: string;
  partnershipInterest: string;
  
  // Technical & Operational
  supportFrustrations: string;
  technicalChallenges: string;
  equipmentReliability: string;
  consumableIssues: string;
  integrationNeeds: string;
  
  // Feedback & Recommendations
  feedback: string;
  recommendations: string;
  futureExpectations: string;
  wishlist: string;
}

const extractKeyPhrases = (text: string): string[] => {
  if (!text) return [];
  // Split by common delimiters and clean up
  return text
    .split(/[,.;!?]+/)
    .map(phrase => phrase.trim())
    .filter(phrase => phrase.length > 0);
};

const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
  if (!text) return 'neutral';
  const positiveWords = ['great', 'amazing', 'excellent', 'love', 'happy', 'satisfied', 'success', 'improve', 'better'];
  const negativeWords = ['problem', 'issue', 'difficult', 'challenge', 'frustrated', 'disappointed', 'concern'];
  
  const words = text.toLowerCase().split(/\s+/);
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

const generateWordCloudData = (insights: ClientInsight[], field: keyof ClientInsight) => {
  const phrases = insights.flatMap(insight => extractKeyPhrases(insight[field]));
  const wordCounts = phrases.reduce((acc, phrase) => {
    acc[phrase] = (acc[phrase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([phrase, count]) => ({
      text: phrase,
      value: count,
      sentiment: analyzeSentiment(phrase)
    }));
};

const generateSentimentData = (insights: ClientInsight[], field: keyof ClientInsight) => {
  const sentiments = insights.map(insight => analyzeSentiment(insight[field]));
  const counts = sentiments.reduce((acc, sentiment) => {
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          counts['positive'] || 0,
          counts['neutral'] || 0,
          counts['negative'] || 0
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Green
          'rgba(156, 163, 175, 0.8)', // Gray
          'rgba(239, 68, 68, 0.8)', // Red
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
};

const generateTrendData = (insights: ClientInsight[], field: keyof ClientInsight) => {
  const phrases = insights.flatMap(insight => extractKeyPhrases(insight[field]));
  const wordCounts = phrases.reduce((acc, phrase) => {
    acc[phrase] = (acc[phrase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([phrase, count]) => ({
      phrase,
      count,
      sentiment: analyzeSentiment(phrase)
    }));
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 12,
      },
    },
  },
};

const generateStats = (insights: ClientInsight[]) => {
  const totalInsights = insights.length;
  const positiveFeedback = insights.filter(insight => 
    analyzeSentiment(insight.feedback) === 'positive'
  ).length;
  const highRevenuePotential = insights.filter(insight => 
    analyzeSentiment(insight.revenuePotential) === 'positive'
  ).length;
  const activeUsers = insights.filter(insight => 
    insight.usageFrequency && !insight.usageFrequency.toLowerCase().includes('rare')
  ).length;

  return {
    totalInsights,
    positiveFeedback,
    highRevenuePotential,
    activeUsers,
    satisfactionRate: Math.round((positiveFeedback / totalInsights) * 100),
    revenuePotentialRate: Math.round((highRevenuePotential / totalInsights) * 100),
    activeUserRate: Math.round((activeUsers / totalInsights) * 100)
  };
};

const generateCustomerQuotes = (insights: ClientInsight[]) => {
  return insights
    .filter(insight => insight.feedback && insight.feedback.length > 20)
    .map(insight => ({
      quote: insight.feedback,
      author: insight.clientName,
      business: insight.businessName,
      sentiment: analyzeSentiment(insight.feedback)
    }))
    .slice(0, 3);
};

export default function Dashboard() {
  const [insights, setInsights] = useState<ClientInsight[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const storedData = localStorage.getItem('clientInsights');
    if (storedData) {
      setInsights(JSON.parse(storedData));
    }
  }, []);

  const businesses = ['all', ...new Set(insights.map(insight => insight.businessName))];
  const filteredInsights = selectedBusiness === 'all' 
    ? insights 
    : insights.filter(insight => insight.businessName === selectedBusiness);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'revenue', name: 'Revenue & Pricing' },
    { id: 'marketing', name: 'Marketing & Social' },
    { id: 'performance', name: 'Performance & Usage' },
    { id: 'support', name: 'Support & Resources' },
  ];

  const stats = generateStats(filteredInsights);
  const customerQuotes = generateCustomerQuotes(filteredInsights);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                Customer Insights Dashboard
              </h1>
              <p className="text-gray-600">Analyzing {stats.totalInsights} customer interviews</p>
            </div>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Filter Data</h2>
            <p className="mt-1 text-sm text-gray-600">Customize your view by selecting specific businesses or categories</p>
          </div>
          <div className="px-6 py-4 flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                Business
              </label>
              <select
                id="business"
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all"
              >
                {businesses.map((business) => (
                  <option key={business} value={business}>
                    {business === 'all' ? 'All Businesses' : business}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Insights Card */}
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Insights</p>
                    <p className="text-3xl font-bold text-indigo-600">{stats.totalInsights}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            {/* Satisfaction Rate Card */}
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Satisfaction Rate</p>
                    <p className="text-3xl font-bold text-green-600">{stats.satisfactionRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${stats.satisfactionRate}%` }}></div>
                </div>
              </div>
            </div>

            {/* Revenue Potential Card */}
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue Potential</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.revenuePotentialRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${stats.revenuePotentialRate}%` }}></div>
                </div>
              </div>
            </div>

            {/* Active Users Card */}
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Users</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.activeUserRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${stats.activeUserRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Customer Quotes */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Customer Testimonials
              </h2>
              <p className="mt-1 text-sm text-gray-600">Direct feedback from customers in their own words</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {customerQuotes.map((quote, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        quote.sentiment === 'positive' ? 'bg-green-100' : 
                        quote.sentiment === 'negative' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          quote.sentiment === 'positive' ? 'text-green-600' : 
                          quote.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{quote.author}</h3>
                        <p className="text-sm text-gray-500">{quote.business}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{quote.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Sentiment Analysis */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Sentiment Analysis
              </h2>
              <p className="mt-1 text-sm text-gray-600">Overview of customer sentiment across different aspects</p>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Feedback Sentiment</h3>
                <div className="h-80">
                  <Pie 
                    data={generateSentimentData(filteredInsights, 'feedback')} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                              size: 12,
                            },
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(17, 24, 39, 0.9)',
                          padding: 12,
                          titleFont: {
                            size: 14,
                            weight: 'bold',
                          },
                          bodyFont: {
                            size: 12,
                          },
                          cornerRadius: 8,
                        }
                      },
                      cutout: '60%',
                    }} 
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction by Category</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positive</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neutral</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Negative</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: 'Product Experience', field: 'experienceWithProduct' },
                        { name: 'Revenue Potential', field: 'revenuePotential' },
                        { name: 'Value Proposition', field: 'perceivedValue' },
                        { name: 'Support Quality', field: 'technicalSupport' },
                      ].map((category) => {
                        const sentiments = filteredInsights.map(insight => analyzeSentiment(insight[category.field as keyof ClientInsight]));
                        const counts = sentiments.reduce((acc, sentiment) => {
                          acc[sentiment] = (acc[sentiment] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>);
                        const total = sentiments.length || 1;
                        
                        return (
                          <tr key={category.name} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${((counts['positive'] || 0) / total) * 100}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500">{Math.round(((counts['positive'] || 0) / total) * 100)}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${((counts['neutral'] || 0) / total) * 100}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500">{Math.round(((counts['neutral'] || 0) / total) * 100)}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${((counts['negative'] || 0) / total) * 100}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500">{Math.round(((counts['negative'] || 0) / total) * 100)}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Feedback Trends */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Key Insights & Trends
              </h2>
              <p className="mt-1 text-sm text-gray-600">Most frequently mentioned topics across customer feedback</p>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Revenue Drivers</h3>
                <div className="space-y-3">
                  {generateWordCloudData(filteredInsights, 'revenuePotential').map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          item.sentiment === 'positive' ? 'bg-green-500' : 
                          item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-gray-900 font-medium">{item.text}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{item.value} mentions</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-green-500' : 
                            item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`} style={{ width: `${(item.value / 10) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Most Valuable Features</h3>
                <div className="space-y-3">
                  {generateWordCloudData(filteredInsights, 'valueDrivers').map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          item.sentiment === 'positive' ? 'bg-green-500' : 
                          item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-gray-900 font-medium">{item.text}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{item.value} mentions</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-green-500' : 
                            item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`} style={{ width: `${(item.value / 10) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Usage Patterns & Support Needs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Usage Patterns & Support Needs
              </h2>
              <p className="mt-1 text-sm text-gray-600">How customers use the product and what support they require</p>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Frequency</h3>
                <div className="space-y-3">
                  {generateWordCloudData(filteredInsights, 'usageFrequency').map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          item.sentiment === 'positive' ? 'bg-green-500' : 
                          item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-gray-900 font-medium">{item.text}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{item.value} mentions</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-green-500' : 
                            item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`} style={{ width: `${(item.value / 10) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Support Needs</h3>
                <div className="space-y-3">
                  {generateWordCloudData(filteredInsights, 'marketingSupportNeeds').map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          item.sentiment === 'positive' ? 'bg-green-500' : 
                          item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-gray-900 font-medium">{item.text}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{item.value} mentions</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-green-500' : 
                            item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`} style={{ width: `${(item.value / 10) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Detailed Insights */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Detailed Business Insights
              </h2>
              <p className="mt-1 text-sm text-gray-600">In-depth look at each business interview</p>
            </div>
            <div className="overflow-hidden">
              <div className="px-6 py-4 space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {filteredInsights.length > 0 ? (
                  filteredInsights.map((insight, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{insight.clientName}</h3>
                          <p className="text-indigo-600 font-medium">{insight.businessName}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {new Date(insight.interviewDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Key Insights</h4>
                          <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Experience</span>
                              <p className="text-gray-900">{insight.experienceWithProduct}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Revenue Impact</span>
                              <p className="text-gray-900">{insight.revenuePotential}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Value Drivers</span>
                              <p className="text-gray-900">{insight.valueDrivers}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Recommendations</h4>
                          <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Growth Opportunities</span>
                              <p className="text-gray-900">{insight.growthOpportunities}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Support Needs</span>
                              <p className="text-gray-900">{insight.marketingSupportNeeds}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="block text-xs text-gray-500 mb-1">Feedback</span>
                              <p className="text-gray-900">{insight.recommendations}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">No insights found. Try changing your filters or add some through the questionnaire!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 