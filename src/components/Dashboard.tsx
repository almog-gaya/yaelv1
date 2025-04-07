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

// Customer segment types
type SegmentType = 
  | 'closed_lost' 
  | 'churned' 
  | 'abandoned_cart' 
  | 'trial_unconverted' 
  | 'closed_won' 
  | 'loyal_customers';

// Insight category types
type InsightCategoryType = 
  | 'pain_trigger' 
  | 'desired_outcome' 
  | 'hesitation_risk' 
  | 'expectation_gap' 
  | 'value_impact' 
  | 'delight_surprise' 
  | 'suggestions_ideas';

interface Quote {
  text: string;
  source: string;
  segment: SegmentType;
  product: string;
  theme: string;
  category: InsightCategoryType;
}

interface InsightData {
  title: string;
  percentage: number;
  description: string;
  quotes: Quote[];
}

interface MatrixCell {
  segment: SegmentType;
  product: string;
  insightCount: number;
}

interface DashboardProps {
  data: {
    segments: {
      id: SegmentType;
      name: string;
      description: string;
    }[];
    products: {
      id: string;
      name: string;
    }[];
    interviewCount: number;
    insightCategories: {
      id: InsightCategoryType;
      name: string;
      description: string;
      question: string;
    }[];
    insights: {
      [segment: string]: {
        [product: string]: {
          [category: string]: InsightData[];
        }
      }
    }
  };
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeSegment, setActiveSegment] = useState<SegmentType | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<InsightCategoryType | null>(null);
  const [expandedQuotes, setExpandedQuotes] = useState<string[]>([]);
  
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
  
  // Generate matrix cell counts
  const getMatrixCells = (): MatrixCell[] => {
    const cells: MatrixCell[] = [];
    
    data.segments.forEach(segment => {
      data.products.forEach(product => {
        const segmentData = data.insights[segment.id];
        let insightCount = 0;
        
        if (segmentData && segmentData[product.id]) {
          Object.values(segmentData[product.id]).forEach(categoryInsights => {
            insightCount += categoryInsights.reduce((total, insight) => total + insight.quotes.length, 0);
          });
        }
        
        cells.push({
          segment: segment.id,
          product: product.id,
          insightCount
        });
      });
    });
    
    return cells;
  };
  
  // Go back to matrix view
  const goBackToMatrix = () => {
    setActiveSegment(null);
    setActiveProduct(null);
    setActiveCategory(null);
  };
  
  // Handle cell click to drill down
  const handleCellClick = (segment: SegmentType, product: string) => {
    setActiveSegment(segment);
    setActiveProduct(product);
  };

  // Get segment label
  const getSegmentLabel = (segmentId: SegmentType) => {
    return data.segments.find(s => s.id === segmentId)?.name || segmentId;
  };
  
  // Get product label
  const getProductLabel = (productId: string) => {
    return data.products.find(p => p.id === productId)?.name || productId;
  };
  
  // Get category label
  const getCategoryLabel = (categoryId: InsightCategoryType) => {
    return data.insightCategories.find(c => c.id === categoryId)?.name || categoryId;
  };
  
  // Get category description
  const getCategoryDescription = (categoryId: InsightCategoryType) => {
    return data.insightCategories.find(c => c.id === categoryId)?.description || '';
  };
  
  // Get category question
  const getCategoryQuestion = (categoryId: InsightCategoryType) => {
    return data.insightCategories.find(c => c.id === categoryId)?.question || '';
  };
  
  // Get active segment data
  const getActiveSegmentData = () => {
    if (!activeSegment || !activeProduct) return null;
    return data.insights[activeSegment]?.[activeProduct] || null;
  };
  
  // Get active category data
  const getActiveCategoryData = () => {
    if (!activeSegment || !activeProduct || !activeCategory) return null;
    return data.insights[activeSegment]?.[activeProduct]?.[activeCategory] || null;
  };
  
  // Color schemes
  const colors = {
    primary: 'rgb(14, 165, 233)',  // Sky blue
    secondary: 'rgb(236, 72, 153)', // Pink
    success: 'rgb(34, 197, 94)',    // Green
    warning: 'rgb(249, 115, 22)',   // Orange
    purple: 'rgb(168, 85, 247)',    // Purple
    yellow: 'rgb(234, 179, 8)',     // Yellow
    slate: 'rgb(100, 116, 139)',    // Slate
  };
  
  // Get segment badge color
  const getSegmentColor = (segment: SegmentType) => {
    switch (segment) {
      case 'closed_won': return 'bg-green-100 text-green-600 border border-green-200';
      case 'loyal_customers': return 'bg-blue-100 text-blue-600 border border-blue-200';
      case 'closed_lost': return 'bg-red-100 text-red-600 border border-red-200';
      case 'churned': return 'bg-orange-100 text-orange-600 border border-orange-200';
      case 'abandoned_cart': return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
      case 'trial_unconverted': return 'bg-purple-100 text-purple-600 border border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  // Get category badge color
  const getCategoryColor = (category: InsightCategoryType) => {
    switch (category) {
      case 'pain_trigger': return 'bg-red-100 text-red-600 border border-red-200';
      case 'desired_outcome': return 'bg-blue-100 text-blue-600 border border-blue-200';
      case 'hesitation_risk': return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
      case 'expectation_gap': return 'bg-orange-100 text-orange-600 border border-orange-200';
      case 'value_impact': return 'bg-green-100 text-green-600 border border-green-200';
      case 'delight_surprise': return 'bg-purple-100 text-purple-600 border border-purple-200';
      case 'suggestions_ideas': return 'bg-cyan-100 text-cyan-600 border border-cyan-200';
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

  // Helper to get cell background
  const getCellBackground = (insightCount: number) => {
    if (insightCount === 0) return 'bg-slate-50';
    if (insightCount < 5) return 'bg-sky-50';
    if (insightCount < 10) return 'bg-sky-100';
    return 'bg-sky-200';
  };
  
  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-pink-500">
                Interview Insights Dashboard
              </h1>
              <p className="text-sky-600">
                {data.interviewCount} interviews across {data.segments.length} segments and {data.products.length} products
              </p>
            </div>
            
            {activeSegment && activeProduct && (
              <button
                onClick={goBackToMatrix}
                className="mt-4 md:mt-0 flex items-center text-sky-600 hover:text-sky-800"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Matrix View
              </button>
            )}
          </div>
        </div>
        
        {/* Matrix Layout View */}
        {!activeSegment && !activeProduct && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto shadow-lg">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3 px-4 bg-slate-50 text-left text-sm font-semibold text-slate-600 tracking-wider border-b border-r border-slate-200">
                    Segment ↓ / Product →
                  </th>
                  {data.products.map(product => (
                    <th key={product.id} scope="col" className="py-3 px-4 bg-slate-50 text-center text-sm font-semibold text-slate-600 tracking-wider border-b border-slate-200">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {data.segments.map(segment => (
                  <tr key={segment.id} className="hover:bg-slate-50">
                    <th scope="row" className="py-4 px-4 text-sm font-medium text-slate-700 border-r border-slate-200 max-w-xs">
                      <div className="font-bold">{segment.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{segment.description}</div>
                    </th>
                    {data.products.map(product => {
                      const cell = getMatrixCells().find(
                        c => c.segment === segment.id && c.product === product.id
                      );
                      const insightCount = cell?.insightCount || 0;
                      
                      return (
                        <td 
                          key={`${segment.id}-${product.id}`}
                          className={`py-4 px-6 text-sm text-center cursor-pointer transition-colors duration-150 hover:bg-sky-100 ${getCellBackground(insightCount)}`}
                          onClick={() => handleCellClick(segment.id, product.id)}
                        >
                          {insightCount > 0 ? (
                            <div>
                              <div className="font-bold text-lg text-sky-600">{insightCount}</div>
                              <div className="text-xs text-slate-500">insights</div>
                              <div className="mt-2 text-sky-600 text-xs">View insights</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">No data</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Segment & Product Detail View */}
        {activeSegment && activeProduct && !activeCategory && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className={`text-sm px-3 py-1 rounded-full ${getSegmentColor(activeSegment)} mr-2`}>
                  {getSegmentLabel(activeSegment)}
                </span>
                <span className="text-lg font-semibold text-slate-700">+</span>
                <span className="text-sm px-3 py-1 rounded-full bg-sky-100 text-sky-600 border border-sky-200 ml-2">
                  {getProductLabel(activeProduct)}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-1 text-sky-600">
                Insight Categories
              </h2>
              <div className="h-1 w-16 bg-sky-500 mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.insightCategories.map(category => {
                  const hasData = !!data.insights[activeSegment]?.[activeProduct]?.[category.id]?.length;
                  const insightCount = data.insights[activeSegment]?.[activeProduct]?.[category.id]?.reduce(
                    (total, insight) => total + insight.quotes.length, 0
                  ) || 0;
                  
                  return (
                    <div 
                      key={category.id}
                      onClick={() => hasData && setActiveCategory(category.id)}
                      className={`${hasData ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'} 
                        bg-white rounded-lg p-5 shadow-md border border-slate-200 transition-all duration-200`}
                    >
                      <div className="flex items-center mb-3">
                        <span className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(category.id).replace('bg-', '').split(' ')[0]}`}></span>
                        <h3 className="font-semibold text-lg text-slate-800">{category.name}</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                      <p className="text-slate-500 text-sm italic mb-4">"{category.question}"</p>
                      
                      {hasData ? (
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-sm font-medium text-sky-600">{insightCount} insights</span>
                          <span className="text-sky-500 flex items-center">
                            View details
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center mt-auto">
                          <span className="text-sm text-slate-400">No data available</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Category Detail View */}
        {activeSegment && activeProduct && activeCategory && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="text-sky-600 hover:text-sky-800 flex items-center mr-4"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Categories
                </button>
                
                <span className={`text-sm px-3 py-1 rounded-full ${getSegmentColor(activeSegment)} mr-2`}>
                  {getSegmentLabel(activeSegment)}
                </span>
                <span className="text-sm px-3 py-1 rounded-full bg-sky-100 text-sky-600 border border-sky-200 mx-2">
                  {getProductLabel(activeProduct)}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(activeCategory)} ml-2`}>
                  {getCategoryLabel(activeCategory)}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mt-4 mb-1 text-sky-600">
                {getCategoryLabel(activeCategory)}
              </h2>
              <p className="text-slate-600 mb-2">{getCategoryDescription(activeCategory)}</p>
              <p className="text-slate-700 italic mb-6">"{getCategoryQuestion(activeCategory)}"</p>
              
              <div className="h-1 w-16 bg-sky-500 mb-6"></div>
              
              {/* Insight Cards */}
              {getActiveCategoryData() && getActiveCategoryData()!.length > 0 ? (
                <div className="space-y-6">
                  {getActiveCategoryData()!.map((insight, insightIndex) => (
                    <div 
                      key={insightIndex} 
                      className="bg-slate-50 rounded-lg p-4 shadow-md"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg flex items-center text-slate-800">
                          <span className="inline-block w-3 h-3 rounded-full mr-2" 
                            style={{backgroundColor: 
                              insightIndex % 6 === 0 ? colors.primary :
                              insightIndex % 6 === 1 ? colors.secondary :
                              insightIndex % 6 === 2 ? colors.success :
                              insightIndex % 6 === 3 ? colors.warning :
                              insightIndex % 6 === 4 ? colors.purple :
                              colors.yellow
                            }}></span>
                          {insight.title}
                        </h3>
                        {insight.percentage > 0 && (
                          <span className="text-xl font-bold text-sky-600">{insight.percentage}%</span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{insight.description}</p>
                      
                      {/* Quotes */}
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-pink-600 mb-3">
                          Quotes ({insight.quotes.length})
                        </h4>
                        <div className="space-y-3">
                          {insight.quotes.slice(0, expandedQuotes.includes(`insight-${insightIndex}`) ? undefined : 3).map((quote, quoteIndex) => (
                            <div 
                              key={quoteIndex} 
                              className="bg-white rounded-md p-3 relative border border-slate-200"
                            >
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getSegmentColor(quote.segment)}`}>
                                  {getSegmentLabel(quote.segment)}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-600 border border-sky-200">
                                  {getProductLabel(quote.product)}
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
                          
                          {insight.quotes.length > 3 && (
                            <button
                              className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1 mt-2"
                              onClick={() => toggleQuote(`insight-${insightIndex}`)}
                            >
                              {expandedQuotes.includes(`insight-${insightIndex}`) ? (
                                <>
                                  Show Less
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  Show All ({insight.quotes.length})
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
              ) : (
                <div className="bg-slate-50 p-8 text-center rounded-lg">
                  <p className="text-slate-500">No insights available for this category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 