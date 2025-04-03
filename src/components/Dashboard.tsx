import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface DashboardProps {
  data: {
    pricingStructure: Record<string, number>;
    contractLength: Record<string, number>;
    taboolaExperience: string[];
    primaryUseCase: Record<string, number>;
    platformComparison: Record<string, number>;
    targetingCapabilities: Record<string, number>;
    trackingSetup: { yes: number; no: number };
  };
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Transform data for charts with enhanced styling
  const pricingData = {
    labels: Object.keys(data.pricingStructure),
    datasets: [
      {
        data: Object.values(data.pricingStructure),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  const useCaseData = {
    labels: Object.keys(data.primaryUseCase),
    datasets: [
      {
        label: 'Number of Agencies',
        data: Object.values(data.primaryUseCase),
        backgroundColor: 'rgba(94, 114, 228, 0.8)',
        borderColor: 'rgba(94, 114, 228, 1)',
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(94, 114, 228, 1)'
      }
    ]
  };

  const platformComparisonData = {
    labels: Object.keys(data.platformComparison),
    datasets: [
      {
        label: 'Rating',
        data: Object.values(data.platformComparison),
        backgroundColor: 'rgba(45, 206, 137, 0.8)',
        borderColor: 'rgba(45, 206, 137, 1)',
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(45, 206, 137, 1)'
      }
    ]
  };

  // New radar chart for targeting capabilities
  const targetingCapabilitiesData = {
    labels: Object.keys(data.targetingCapabilities),
    datasets: [
      {
        label: 'Capability Rating',
        data: Object.values(data.targetingCapabilities),
        backgroundColor: 'rgba(251, 99, 64, 0.2)',
        borderColor: 'rgba(251, 99, 64, 1)',
        pointBackgroundColor: 'rgba(251, 99, 64, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(251, 99, 64, 1)',
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.15)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      }
    }
  };

  const pieOptions = {
    ...chartOptions,
    cutout: '60%',
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: 'right' as const
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        pointLabels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        },
        ticks: {
          backdropColor: 'transparent',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: chartOptions.plugins
  };

  // Calculate metrics
  const trackingSuccessRate = ((data.trackingSetup.yes / (data.trackingSetup.yes + data.trackingSetup.no)) * 100).toFixed(1);
  const avgExperience = (data.taboolaExperience.reduce((acc, curr) => acc + parseInt(curr), 0) / data.taboolaExperience.length).toFixed(1);
  const mostCommonContract = Object.entries(data.contractLength).sort((a, b) => b[1] - a[1])[0][0];
  
  // Convert top pricing structure to percentage
  const topPricingKey = Object.entries(data.pricingStructure).sort((a, b) => b[1] - a[1])[0][0];
  const topPricingPercentage = ((data.pricingStructure[topPricingKey] / Object.values(data.pricingStructure).reduce((sum, val) => sum + val, 0)) * 100).toFixed(1);

  const metrics = [
    { 
      title: 'Conversion Tracking',
      value: `${trackingSuccessRate}%`, 
      subtitle: 'Success Rate',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-indigo-500'
    },
    { 
      title: 'Average Experience',
      value: `${avgExperience}`, 
      subtitle: 'Years',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-emerald-500'
    },
    { 
      title: 'Top Pricing Model',
      value: `${topPricingPercentage}%`, 
      subtitle: topPricingKey,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    { 
      title: 'Contract Length',
      value: mostCommonContract, 
      subtitle: 'Most Common',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-amber-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Agency Insights Dashboard
            </h1>
            <p className="text-gray-400">
              Comprehensive overview of agency partnerships and performance metrics
            </p>
          </div>
          
          {/* Toggle Tabs */}
          <div className="mt-4 md:mt-0 bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'overview' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'detailed' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('detailed')}
            >
              Detailed Analysis
            </button>
          </div>
        </div>
        
        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${hoveredMetric === metric.title ? 'ring-2 ring-opacity-60 ring-' + metric.color.substring(3) : ''}`}
              onMouseEnter={() => setHoveredMetric(metric.title)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className="relative z-10">
                <div className={`absolute -right-3 -top-3 w-20 h-20 rounded-full ${metric.color} opacity-10`}></div>
                <div className={`inline-flex items-center justify-center p-3 rounded-lg ${metric.color} bg-opacity-10 mb-4`}>
                  <div className={`text-${metric.color.substring(3)}`}>
                    {metric.icon}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-200">{metric.title}</h3>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-400 ml-2 mb-1">{metric.subtitle}</span>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 ${metric.color}`} style={{width: hoveredMetric === metric.title ? '100%' : '30%', transition: 'width 0.3s ease'}}></div>
            </div>
          ))}
        </div>
        
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pricing Structure */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl transform hover:scale-[1.02]">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  Pricing Structure Distribution
                </h2>
                <p className="text-sm text-gray-400 mb-4">Breakdown of pricing models across agencies</p>
              </div>
              <div className="px-6 pb-6">
                <div className="h-80">
                  <Pie data={pricingData} options={pieOptions} />
                </div>
              </div>
            </div>

            {/* Primary Use Case */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl transform hover:scale-[1.02]">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Primary Use Cases
                </h2>
                <p className="text-sm text-gray-400 mb-4">Main application scenarios for different agencies</p>
              </div>
              <div className="px-6 pb-6">
                <div className="h-80">
                  <Bar data={useCaseData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Comparison */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl transform hover:scale-[1.02]">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Platform Comparison Ratings
                </h2>
                <p className="text-sm text-gray-400 mb-4">How our platform compares to competitors</p>
              </div>
              <div className="px-6 pb-6">
                <div className="h-80">
                  <Bar data={platformComparisonData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Targeting Capabilities */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl transform hover:scale-[1.02]">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Targeting Capabilities
                </h2>
                <p className="text-sm text-gray-400 mb-4">Assessment of targeting feature effectiveness</p>
              </div>
              <div className="px-6 pb-6">
                <div className="h-80">
                  <Radar data={targetingCapabilitiesData} options={radarOptions} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Experience Summary Card */}
        <div className="mt-6 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Taboola Experience Summary
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                A comprehensive analysis of agency experience with the platform, including time using the platform and contract preferences.
              </p>
            </div>
            
            <div className="flex-1 p-6 flex items-center border-t md:border-t-0 md:border-l border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="flex flex-col">
                  <div className="text-gray-400 text-sm mb-2">Average Experience Duration</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                    {avgExperience} <span className="text-xl text-gray-400">years</span>
                  </div>
                  <div className="mt-2 text-gray-400 text-sm">
                    Based on {data.taboolaExperience.length} agencies
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-gray-400 text-sm mb-2">Most Common Contract Length</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                    {mostCommonContract}
                  </div>
                  <div className="mt-2 text-gray-400 text-sm">
                    Preferred by {data.contractLength[mostCommonContract]} agencies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 