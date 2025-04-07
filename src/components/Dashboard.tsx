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

interface Quote {
  text: string;
  source: string;
  segment: 'high_seller' | 'low_seller' | 'neutral';
  theme: string;
}

interface InsightSection {
  question: string;
  insights: {
    title: string;
    percentage: number;
    description: string;
    quotes: Quote[];
  }[];
  chart?: {
    type: 'pie' | 'bar' | 'radar';
    data: any;
    options: any;
  };
}

interface DashboardProps {
  data: {
    interviewCount: number;
    highSellerCount: number;
    lowSellerCount: number;
    insights: InsightSection[];
    quarterlyComparison?: {
      previousQuarter: Record<string, number>;
      currentQuarter: Record<string, number>;
    };
  };
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState<string>(data.insights[0]?.question || '');
  const [activeFilter, setActiveFilter] = useState<'all' | 'high_seller' | 'low_seller'>('all');
  const [expandedQuotes, setExpandedQuotes] = useState<string[]>([]);
  const [comparisonView, setComparisonView] = useState<boolean>(false);
  
  // Toggle a quote to expand/collapse
  const toggleQuote = (quoteId: string) => {
    if (expandedQuotes.includes(quoteId)) {
      setExpandedQuotes(expandedQuotes.filter(id => id !== quoteId));
    } else {
      setExpandedQuotes([...expandedQuotes, quoteId]);
    }
  };
  
  // Copy quote text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };
  
  // Filter insights based on selected filter
  const getFilteredQuotes = (quotes: Quote[]) => {
    if (activeFilter === 'all') return quotes;
    return quotes.filter(quote => quote.segment === activeFilter);
  };
  
  // Helper to get active section data
  const getActiveSectionData = () => {
    return data.insights.find(section => section.question === activeSection);
  };
  
  // Get key metrics
  const topThemes = data.insights.flatMap(section => 
    section.insights.map(insight => insight.title)
  ).slice(0, 4);
  
  // Color schemes for consistent styling - extremely bright daylight colors
  const colors = {
    primary: {
      main: 'rgb(14, 165, 233)',   // Sky blue
      light: 'rgb(125, 211, 252)', // Light sky blue
      lighter: 'rgb(224, 242, 254)' // Very light sky blue
    },
    success: {
      main: 'rgb(34, 197, 94)',    // Bright green
      light: 'rgb(134, 239, 172)', // Light green
      lighter: 'rgb(220, 252, 231)' // Very light green
    },
    warning: {
      main: 'rgb(249, 115, 22)',   // Bright orange
      light: 'rgb(253, 186, 116)', // Light orange
      lighter: 'rgb(255, 237, 213)' // Very light orange
    },
    error: {
      main: 'rgb(239, 68, 68)',    // Bright red
      light: 'rgb(252, 165, 165)', // Light red
      lighter: 'rgb(254, 226, 226)' // Very light red
    },
    neutral: {
      main: 'rgb(100, 116, 139)',  // Slate
      light: 'rgb(148, 163, 184)', // Light slate
      lighter: 'rgb(226, 232, 240)' // Very light slate
    },
    chart: [
      'rgb(14, 165, 233)',    // Sky blue
      'rgb(236, 72, 153)',    // Pink
      'rgb(249, 115, 22)',    // Orange
      'rgb(34, 197, 94)',     // Green
      'rgb(168, 85, 247)',    // Purple
      'rgb(234, 179, 8)'      // Yellow
    ]
  };
  
  // Get segment badge color
  const getSegmentColor = (segment: string) => {
    switch(segment) {
      case 'high_seller': return 'bg-green-100 text-green-600 border border-green-200';
      case 'low_seller': return 'bg-orange-100 text-orange-600 border border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  // Theme badge colors for consistent styling
  const getThemeColor = (index: number) => {
    const themeColors = [
      'bg-sky-100 text-sky-600 border border-sky-200',
      'bg-green-100 text-green-600 border border-green-200',
      'bg-purple-100 text-purple-600 border border-purple-200',
      'bg-amber-100 text-amber-600 border border-amber-200',
      'bg-pink-100 text-pink-600 border border-pink-200',
      'bg-cyan-100 text-cyan-600 border border-cyan-200'
    ];
    return themeColors[index % themeColors.length];
  };
  
  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Key Metrics */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-pink-500">
                Interview Insights Dashboard
              </h1>
              <p className="text-sky-600">
                {data.interviewCount} interviews • {data.highSellerCount} high sellers • {data.lowSellerCount} low sellers
              </p>
            </div>
            
            {data.quarterlyComparison && (
              <div className="mt-4 md:mt-0 bg-sky-100 p-1 rounded-lg inline-flex">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${!comparisonView ? 'bg-sky-500 text-white' : 'text-sky-600 hover:text-sky-800'}`}
                  onClick={() => setComparisonView(false)}
                >
                  Current Quarter
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${comparisonView ? 'bg-sky-500 text-white' : 'text-sky-600 hover:text-sky-800'}`}
                  onClick={() => setComparisonView(true)}
                >
                  Quarterly Comparison
                </button>
              </div>
            )}
          </div>
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-sky-50 rounded-lg p-4 shadow-lg border-l-4 border-sky-400">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-sky-100 mr-4">
                  <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{data.interviewCount}</h2>
                  <p className="text-sm text-slate-600">Total Interviews</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-400">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-green-100 mr-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{data.highSellerCount}</h2>
                  <p className="text-sm text-slate-600">High Sellers</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 shadow-lg border-l-4 border-orange-400">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-orange-100 mr-4">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{data.lowSellerCount}</h2>
                  <p className="text-sm text-slate-600">Low Sellers</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 shadow-lg border-l-4 border-purple-400">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-purple-100 mr-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{topThemes.length}</h2>
                  <p className="text-sm text-slate-600">Key Themes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 bg-sky-50 rounded-lg p-4 shadow-lg h-fit sticky top-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">Interview Questions</h2>
            <nav>
              <ul className="space-y-2">
                {data.insights.map((section, index) => (
                  <li key={index}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${activeSection === section.question ? 'bg-sky-500 text-white' : 'text-slate-600 hover:bg-sky-100'}`}
                      onClick={() => setActiveSection(section.question)}
                    >
                      {section.question}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-6 pt-6 border-t border-sky-200">
              <h3 className="text-sm font-medium text-slate-600 mb-3">Filter by Segment</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${activeFilter === 'all' ? 'bg-sky-500 text-white' : 'text-slate-600 hover:bg-sky-100'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Segments
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${activeFilter === 'high_seller' ? 'bg-green-500 text-white' : 'text-slate-600 hover:bg-sky-100'}`}
                  onClick={() => setActiveFilter('high_seller')}
                >
                  High Sellers
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${activeFilter === 'low_seller' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-sky-100'}`}
                  onClick={() => setActiveFilter('low_seller')}
                >
                  Low Sellers
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg">
              {!comparisonView ? (
                <>
                  {/* Current Quarter View */}
                  {getActiveSectionData() && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-1 text-sky-600">{activeSection}</h2>
                      <div className="h-1 w-16 bg-sky-500 mb-6"></div>
                      
                      {/* Insight Theme Cards and Visualization */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Key Themes */}
                        <div>
                          {getActiveSectionData()?.insights.map((insight, index) => (
                            <div 
                              key={index} 
                              className="bg-slate-50 rounded-lg p-4 mb-4 shadow-md transition-transform duration-300 transform hover:translate-x-1 hover:shadow-lg"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg flex items-center text-slate-800">
                                  <span className={`inline-block w-3 h-3 rounded-full mr-2`} style={{backgroundColor: colors.chart[index % colors.chart.length]}}></span>
                                  {insight.title}
                                </h3>
                                <span className="text-xl font-bold text-sky-600">{insight.percentage}%</span>
                              </div>
                              <p className="text-slate-600 text-sm mb-3">{insight.description}</p>
                              
                              {/* Collapsed quote summary */}
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-pink-600 mb-2">Related Quotes ({getFilteredQuotes(insight.quotes).length})</h4>
                                <div className="space-y-3">
                                  {getFilteredQuotes(insight.quotes).slice(0, expandedQuotes.includes(`insight-${index}`) ? undefined : 2).map((quote, quoteIndex) => (
                                    <div 
                                      key={quoteIndex} 
                                      className="bg-white rounded-md p-3 relative border border-slate-200"
                                    >
                                      <div className="flex gap-2 mb-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSegmentColor(quote.segment)}`}>
                                          {quote.segment === 'high_seller' ? 'High Seller' : quote.segment === 'low_seller' ? 'Low Seller' : 'Neutral'}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getThemeColor(quoteIndex)}`}>
                                          {quote.theme}
                                        </span>
                                      </div>
                                      <p className="text-sm italic text-slate-700">"{quote.text}"</p>
                                      <p className="text-xs text-slate-500 mt-1">— {quote.source}</p>
                                      <button 
                                        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                                        onClick={() => copyToClipboard(quote.text)}
                                        title="Copy to clipboard"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                        </svg>
                                      </button>
                                    </div>
                                  ))}
                                  
                                  {getFilteredQuotes(insight.quotes).length > 2 && (
                                    <button
                                      className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1 mt-2"
                                      onClick={() => toggleQuote(`insight-${index}`)}
                                    >
                                      {expandedQuotes.includes(`insight-${index}`) ? (
                                        <>
                                          Show Less
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                          </svg>
                                        </>
                                      ) : (
                                        <>
                                          Show All ({getFilteredQuotes(insight.quotes).length})
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Visualization */}
                        {getActiveSectionData()?.chart && (
                          <div className="bg-white rounded-lg p-4 shadow-md h-96 flex flex-col border border-slate-200">
                            <h3 className="font-semibold mb-3 text-slate-800">Data Visualization</h3>
                            <div className="flex-1">
                              {getActiveSectionData()?.chart?.type === 'pie' && (
                                <Pie data={getActiveSectionData()?.chart?.data} options={getActiveSectionData()?.chart?.options} />
                              )}
                              {getActiveSectionData()?.chart?.type === 'bar' && (
                                <Bar data={getActiveSectionData()?.chart?.data} options={getActiveSectionData()?.chart?.options} />
                              )}
                              {getActiveSectionData()?.chart?.type === 'radar' && (
                                <Radar data={getActiveSectionData()?.chart?.data} options={getActiveSectionData()?.chart?.options} />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Quote Wall with copy functionality */}
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-pink-600">All Quotes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {getActiveSectionData()?.insights.flatMap(insight => 
                            getFilteredQuotes(insight.quotes).map((quote, quoteIndex) => (
                              <div 
                                key={`${insight.title}-${quoteIndex}`} 
                                className="bg-white rounded-lg p-4 shadow-md relative hover:shadow-lg transition-all duration-200 border border-slate-200"
                              >
                                <div className="flex gap-2 mb-2">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSegmentColor(quote.segment)}`}>
                                    {quote.segment === 'high_seller' ? 'High Seller' : quote.segment === 'low_seller' ? 'Low Seller' : 'Neutral'}
                                  </span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getThemeColor(quoteIndex)}`}>
                                    {quote.theme}
                                  </span>
                                </div>
                                <p className="text-sm italic mb-3 text-slate-700">"{quote.text}"</p>
                                <p className="text-xs text-slate-500">— {quote.source}</p>
                                <button 
                                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                                  onClick={() => copyToClipboard(quote.text)}
                                  title="Copy to clipboard"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                  </svg>
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Quarterly Comparison View */}
                  {data.quarterlyComparison && (
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-1 text-sky-600">Quarterly Comparison</h2>
                      <div className="h-1 w-16 bg-sky-500 mb-6"></div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Previous Quarter */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-lg font-semibold mb-4 text-pink-600">Previous Quarter</h3>
                          <div className="space-y-4">
                            {Object.entries(data.quarterlyComparison.previousQuarter).map(([key, value], index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-slate-700">{key}</span>
                                <span className="font-medium text-slate-800">{value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Current Quarter */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <h3 className="text-lg font-semibold mb-4 text-pink-600">Current Quarter</h3>
                          <div className="space-y-4">
                            {Object.entries(data.quarterlyComparison.currentQuarter).map(([key, value], index) => {
                              const previousValue = data.quarterlyComparison?.previousQuarter[key] || 0;
                              const change = value - previousValue;
                              
                              return (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-slate-700">{key}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-slate-800">{value}%</span>
                                    {change !== 0 && (
                                      <span className={`text-xs font-extrabold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {change > 0 ? '+' : ''}{change}%
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Comparison Chart */}
                      <div className="mt-8 bg-white rounded-lg p-4 h-96 border border-slate-200">
                        <h3 className="font-semibold mb-3 text-slate-800">Quarter-over-Quarter Comparison</h3>
                        <Bar 
                          data={{
                            labels: Object.keys(data.quarterlyComparison.currentQuarter),
                            datasets: [
                              {
                                label: 'Previous Quarter',
                                data: Object.values(data.quarterlyComparison.previousQuarter),
                                backgroundColor: 'rgb(148, 163, 184)',
                                borderColor: 'rgb(100, 116, 139)',
                                borderWidth: 1
                              },
                              {
                                label: 'Current Quarter',
                                data: Object.values(data.quarterlyComparison.currentQuarter),
                                backgroundColor: 'rgb(14, 165, 233)',
                                borderColor: 'rgb(2, 132, 199)',
                                borderWidth: 1
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'top',
                                labels: {
                                  color: 'rgb(51, 65, 85)'
                                }
                              }
                            },
                            scales: {
                              x: {
                                grid: {
                                  color: 'rgba(226, 232, 240, 0.5)'
                                },
                                ticks: {
                                  color: 'rgb(71, 85, 105)'
                                }
                              },
                              y: {
                                grid: {
                                  color: 'rgba(226, 232, 240, 0.5)'
                                },
                                ticks: {
                                  color: 'rgb(71, 85, 105)'
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 