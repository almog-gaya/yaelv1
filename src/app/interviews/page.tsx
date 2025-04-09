'use client';

import InterviewList from '../components/InterviewList';
import { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface VipInsight {
  title: string;
  percentage: number;
  description: string;
  quotes: {
    text: string;
    author: string;
  }[];
  recommendation: {
    title: string;
    what: string;
    why: string;
  };
}

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState(0);
  
  const vipInsights: VipInsight[] = [
    {
      title: "Unmatched Elegance & Aesthetic Appeal",
      percentage: 90,
      description: "Customers described the bag as stunning, unique, and a style standout. Many said it was more beautiful in person than expected.",
      quotes: [
        {
          text: "It's the most beautiful bag I've ever owned.",
          author: "Donna"
        },
        {
          text: "I love how it looks. I haven't seen anything else like it.",
          author: "Lauren"
        },
        {
          text: "The elegance. The simplicity. I've gotten so many compliments.",
          author: "Janice"
        },
        {
          text: "It's so chic. Even better than I expected when it arrived.",
          author: "Caroline"
        },
        {
          text: "This bag is really different. I was honestly surprised how beautiful it was when I opened it.",
          author: "Claranel"
        }
      ],
      recommendation: {
        title: "Launch a Limited-Time 'Try LaFlore' Offer",
        what: "Create a minimalist version of the hero bag (non-convertible, fewer extras) priced under $250. Position as the entry point to LaFlore ownership.",
        why: "Converts high-intent window shoppers who admire the elegance but can't justify the full price. Lets customers fall in love with the design firsthand."
      }
    },
    {
      title: "Daily Use & Versatility Surpassed Expectations",
      percentage: 70,
      description: "Many expected to use the bag occasionally but found themselves reaching for it every day. It integrated seamlessly into different parts of their life.",
      quotes: [
        {
          text: "I thought it was going to be a special-occasion bag, but I use it every day now.",
          author: "Janice"
        },
        {
          text: "It's surprisingly practical. I use it more than I thought I would.",
          author: "Carla"
        },
        {
          text: "I wear it constantly. I didn't expect it to be this functional.",
          author: "Melanie"
        },
        {
          text: "It fits into every part of my lifestyle — work, errands, travel. That surprised me.",
          author: "Lauren"
        }
      ],
      recommendation: {
        title: "Add 'Real Life Use' Demos for Work, Travel & Errands",
        what: "Record silent 'What's in My Bag' videos for common use cases. Feature short clips on PDPs and email flows.",
        why: "Helps prospective buyers imagine the bag in their life. Converts skeptics who think it's just a stylish accessory."
      }
    },
    {
      title: "Cork Quality Felt Luxurious",
      percentage: 60,
      description: "Several were surprised by how soft, premium, and unique cork felt — and felt proud to support a sustainable, ethical brand.",
      quotes: [
        {
          text: "I was hesitant at first because it's not leather, but the cork is a great alternative—sustainable and lightweight.",
          author: "Carla"
        },
        {
          text: "I didn't know what cork felt like or how it would move.",
          author: "Donna"
        },
        {
          text: "I'm a big fan of the cork material. It's eco-friendly and still feels high-end. I love that it's sustainable.",
          author: "Beth"
        },
        {
          text: "The bags are high quality. They look as good as the day I bought them.",
          author: "Donna"
        }
      ],
      recommendation: {
        title: "Add a 'Feel the Cork' Section with Touch + Movement Demos",
        what: "Create short videos showing close-ups of the cork texture in motion. Include twisting, bending, water drops, and surface close-ups.",
        why: "Addresses the unknowns around stiffness, flexibility, and wear. Visually validates the surprise others had about cork quality."
      }
    }
  ];
  
  const hesitations: VipInsight[] = [
    {
      title: "Price vs. Priority",
      percentage: 60,
      description: "Most loved the bag but saw it as a luxury. Several admired it for months before buying, needing time or financial readiness to justify the purchase.",
      quotes: [
        {
          text: "I had been eyeing it for a long time, trying to justify it.",
          author: "Beth"
        },
        {
          text: "I was obsessed with the backpack and I was just like, oh my god, I need this backpack. But I was also like, okay, you know, it's a good chunk of money. So it took me a while to buy it.",
          author: "Betsy"
        },
        {
          text: "It was a bit of a splurge. I looked at it for a long time.",
          author: "Jennifer"
        },
        {
          text: "I had to hold off for a little while, just because I was trying to be careful with my money.",
          author: "Janice"
        }
      ],
      recommendation: {
        title: "Reinforce Value Through Testimonials + Styling Content",
        what: "Add short testimonials on PDPs about why the price was worth it. Pair with styling videos showing multiple ways to wear it.",
        why: "Helps justify the price emotionally and practically. Eases the internal debate about whether it's worth the investment."
      }
    },
    {
      title: "Uncertainty Around Cork + Durability",
      percentage: 40,
      description: "Some weren't sure how cork would feel or hold up — especially without touching it in person. Durability, texture, and flexibility were common unknowns.",
      quotes: [
        {
          text: "I wasn't sure about the cork, like how soft it would be or if it would be stiff.",
          author: "Carla"
        },
        {
          text: "Cork sounded like it might be stiff or uncomfortable.",
          author: "Jennifer"
        },
        {
          text: "I didn't know what cork felt like or how it would move.",
          author: "Donna"
        },
        {
          text: "I wasn't sure how it would hold up with wear and tear.",
          author: "Melanie"
        }
      ],
      recommendation: {
        title: "Launch a 90-Day Wear-Test Guarantee",
        what: "Offer full returns within 90 days of use. Message it as: 'Try it. Wear it. Travel with it. If it's not for you, send it back.'",
        why: "Reduces hesitation at the moment of doubt. Signals confidence in material durability and day-to-day performance."
      }
    },
    {
      title: "Functionality Fit / Versatility Concerns",
      percentage: 30,
      description: "Some hesitated around how well the bag would suit their lifestyle — especially for work, travel, or ease of use.",
      quotes: [
        {
          text: "I was worried it might be too small for work.",
          author: "Lauren"
        },
        {
          text: "I wasn't sure how the strap configuration worked.",
          author: "Jennifer"
        },
        {
          text: "I wanted something I could take to the office and then out — and wasn't sure at first.",
          author: "Claranel"
        }
      ],
      recommendation: {
        title: "Highlight Daily Use Stories in Email & Social",
        what: "Run a campaign around: 'I thought I'd only use it sometimes...' Feature quotes from Janice, Carla, Lauren, and Melanie.",
        why: "Breaks the perception of it being an occasional/luxury-only item. Drives home practicality without losing the fashion-forward edge."
      }
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-500 mb-6 py-2">
            LaFlore VIP Customer Insights
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-light">
            Findings from 10 in-depth interviews with customers who purchased and love their LaFlore bags
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-8 border-purple-500 transform transition hover:shadow-xl">
          <div className="flex items-start">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
              <span className="text-2xl text-white">💼</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">10 VIP Customer Interviews</p>
              <p className="text-gray-600 text-lg">We conducted in-depth interviews with 10 customers who purchased and love their LaFlore bags to understand what drives value and satisfaction, as well as initial hesitations before purchase.</p>
            </div>
          </div>
        </div>
        
        {/* MAIN TAKEAWAYS SECTION - HIGHLIGHTED AS PRIMARY CONTENT */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-t-2xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-white flex items-center">
              <span className="bg-white h-14 w-14 rounded-full flex items-center justify-center mr-5 shadow-md">
                <span className="text-3xl bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">💡</span>
              </span>
              Takeaways: 10 interviews
            </h2>
          </div>
          
          <div className="bg-white shadow-2xl rounded-b-2xl overflow-hidden border border-t-0 border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left column: Value Drivers */}
              <div className="p-10 border-r border-gray-100">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 mb-8 pb-2 border-b border-purple-100 inline-block">
                  Top 3 Value Drivers / Positive Surprises
                </h3>
                
                <div className="space-y-8">
                  <div className="flex gap-8 bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-xl border border-purple-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      90%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-purple-700 mb-2">Unmatched Elegance & Aesthetic Appeal</h4>
                      <p className="text-gray-700 text-lg">
                        Customers described the bag as stunning, unique, and a style standout. Many said it was more beautiful in person than expected.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-xl border border-purple-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      70%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-purple-700 mb-2">Daily Use & Versatility Surpassed Expectations</h4>
                      <p className="text-gray-700 text-lg">
                        Many expected to use the bag occasionally but found themselves reaching for it every day. It integrated seamlessly into different parts of their life.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-xl border border-purple-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      60%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-purple-700 mb-2">Cork Quality Felt Luxurious</h4>
                      <p className="text-gray-700 text-lg">
                        Several were surprised by how soft, premium, and unique cork felt — and felt proud to support a sustainable, ethical brand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column: Purchase Hesitations */}
              <div className="p-10 bg-gray-50 bg-opacity-60">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600 mb-8 pb-2 border-b border-indigo-100 inline-block">
                  Top 3 Hesitations for Purchase
                </h3>
                
                <div className="space-y-8">
                  <div className="flex gap-8 bg-gradient-to-r from-indigo-50 to-transparent p-6 rounded-xl border border-indigo-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      60%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-indigo-700 mb-2">Price vs. Priority</h4>
                      <p className="text-gray-700 text-lg">
                        Most loved the bag but saw it as a luxury. Several admired it for months before buying, needing time or financial readiness to justify the purchase.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 bg-gradient-to-r from-indigo-50 to-transparent p-6 rounded-xl border border-indigo-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      40%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-indigo-700 mb-2">Uncertainty Around Cork + Durability</h4>
                      <p className="text-gray-700 text-lg">
                        Some weren't sure how cork would feel or hold up — especially without touching it in person. Durability, texture, and flexibility were common unknowns.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 bg-gradient-to-r from-indigo-50 to-transparent p-6 rounded-xl border border-indigo-100 transform transition-transform hover:scale-[1.01] hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-2xl shadow-xl ring-4 ring-white">
                      30%
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-indigo-700 mb-2">Functionality Fit / Versatility Concerns</h4>
                      <p className="text-gray-700 text-lg">
                        Some hesitated around how well the bag would suit their lifestyle — especially for work, travel, or ease of use.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Opportunities Section */}
            <div className="p-10 bg-gradient-to-b from-white to-purple-50/50 border-t border-gray-200">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 mb-8 pb-2 border-b border-purple-100 inline-block">
                Top 3 Opportunities to Increase Conversions
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:border-purple-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-center mr-4 shadow-md">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="text-xl font-bold text-purple-800">Launch a limited-time "Try LaFlore" version</h4>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Create a minimalist version of the hero bag under $250. Position as the entry point to owning a LaFlore, allowing customers to fall in love with the design firsthand.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:border-indigo-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white flex items-center justify-center mr-4 shadow-md">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="text-xl font-bold text-indigo-800">Demystify Cork Material and Durability</h4>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Launch short video demos showing flexibility and texture. Offer a 90-day "wear test" guarantee to help eliminate fear of disappointment.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:border-purple-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-center mr-4 shadow-md">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="text-xl font-bold text-purple-800">Bring Functionality and Everyday Use to Life</h4>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Add "real life use" packing demos and silent video clips. Run a content series featuring customer stories of daily use to show versatility.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-white border-t border-gray-100 text-center">
              <button 
                onClick={() => document.getElementById('detailed-analysis')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center mx-auto group transition-all hover:scale-105"
              >
                <span className="mr-2 text-lg font-medium">View detailed analysis</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* DETAILED ANALYSIS SECTION - Secondary content */}
        <div id="detailed-analysis" className="pt-4">
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border-l-4 border-gray-300">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                <span className="text-xl text-gray-600">📊</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">Detailed Analysis</h3>
                <p className="text-gray-600">Explore detailed customer insights, quotes, and specific recommendations below.</p>
              </div>
            </div>
          </div>
        
          <Tab.Group onChange={(index) => setActiveTab(index)}>
            <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl mb-8 shadow-md">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-4 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                    selected
                      ? 'bg-white text-purple-700 shadow-md'
                      : 'text-gray-600 hover:bg-white/[0.5] hover:text-gray-700'
                  )
                }
              >
                Top Value Drivers
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-4 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                    selected
                      ? 'bg-white text-indigo-700 shadow-md'
                      : 'text-gray-600 hover:bg-white/[0.5] hover:text-gray-700'
                  )
                }
              >
                Purchase Hesitations
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-4 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                    selected
                      ? 'bg-white text-emerald-700 shadow-md'
                      : 'text-gray-600 hover:bg-white/[0.5] hover:text-gray-700'
                  )
                }
              >
                Interview Transcripts
              </Tab>
            </Tab.List>
            
            <Tab.Panels>
              <Tab.Panel>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                      Top 3 Value Drivers / Positive Surprises
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-purple-200 to-pink-200 ml-4"></div>
                  </h3>
                  
                  <div className="grid gap-5 md:grid-cols-3">
                    {vipInsights.map((insight, idx) => (
                      <div 
                        key={idx} 
                        className="relative overflow-hidden group transition-all duration-300 hover:shadow-md"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                        <div className="p-6 border border-gray-100 rounded-xl bg-white relative">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl shadow-sm">
                              {insight.percentage}%
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-600 text-sm">{insight.description}</p>
                          <a 
                            href={`#vip-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="mt-4 text-sm text-purple-600 hover:text-purple-800 inline-flex items-center group"
                          >
                            View details
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-16">
                  {vipInsights.map((insight, insightIdx) => (
                    <div 
                      id={`vip-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
                      key={insightIdx} 
                      className="bg-white shadow-xl rounded-2xl overflow-hidden"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
                        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {insight.title}
                            </h3>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-white text-purple-800">
                              <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                              </span>
                              {insight.percentage}% of customers
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 py-5 bg-gray-50">
                        <div className="flex items-center mb-4">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <span className="text-purple-600">💬</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">Customer Quotes</h4>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Direct quotes from customers expressing what they love about their LaFlore bags.
                        </p>
                        <div className="space-y-4">
                          {insight.quotes.map((quote, quoteIdx) => (
                            <div key={quoteIdx} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-400">
                              <blockquote className="italic text-gray-700 mb-2">"{quote.text}"</blockquote>
                              <div className="text-right text-gray-500 font-medium">- {quote.author}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="px-6 py-5">
                        <div className="flex items-center mb-4">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <span className="text-purple-600">💡</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">Action Recommendation</h4>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Strategic recommendation to leverage this value driver and enhance customer satisfaction.
                        </p>
                        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                          <h5 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                            <span className="inline-block h-6 w-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center mr-2">
                              ✓
                            </span>
                            {insight.recommendation.title}
                          </h5>
                          <div className="mb-4 bg-white p-4 rounded-lg border-l-4 border-emerald-500">
                            <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="inline-block h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2">✓</span>
                              What to Do:
                            </h6>
                            <p className="text-gray-600">{insight.recommendation.what}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border-l-4 border-amber-500">
                            <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="inline-block h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2">?</span>
                              Why:
                            </h6>
                            <p className="text-gray-600">{insight.recommendation.why}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
                      Top 3 Hesitations for Purchase
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-indigo-200 to-blue-200 ml-4"></div>
                  </h3>
                  
                  <div className="grid gap-5 md:grid-cols-3">
                    {hesitations.map((insight, idx) => (
                      <div 
                        key={idx} 
                        className="relative overflow-hidden group transition-all duration-300 hover:shadow-md"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                        <div className="p-6 border border-gray-100 rounded-xl bg-white relative">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xl shadow-sm">
                              {insight.percentage}%
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-600 text-sm">{insight.description}</p>
                          <a 
                            href={`#hesitation-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center group"
                          >
                            View details
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-16">
                  {hesitations.map((insight, insightIdx) => (
                    <div 
                      id={`hesitation-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
                      key={insightIdx} 
                      className="bg-white shadow-xl rounded-2xl overflow-hidden"
                    >
                      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-600">
                        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {insight.title}
                            </h3>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-white text-indigo-800">
                              <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                              </span>
                              {insight.percentage}% of customers
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 py-5 bg-gray-50">
                        <div className="flex items-center mb-4">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            <span className="text-indigo-600">💬</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">Customer Quotes</h4>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Direct quotes from customers expressing their initial hesitations before purchase.
                        </p>
                        <div className="space-y-4">
                          {insight.quotes.map((quote, quoteIdx) => (
                            <div key={quoteIdx} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-400">
                              <blockquote className="italic text-gray-700 mb-2">"{quote.text}"</blockquote>
                              <div className="text-right text-gray-500 font-medium">- {quote.author}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="px-6 py-5">
                        <div className="flex items-center mb-4">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            <span className="text-indigo-600">💡</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">Action Recommendation</h4>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Strategic recommendation to address this hesitation and improve conversion rates.
                        </p>
                        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                          <h5 className="text-lg font-bold text-indigo-800 mb-3 flex items-center">
                            <span className="inline-block h-6 w-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center mr-2">
                              ✓
                            </span>
                            {insight.recommendation.title}
                          </h5>
                          <div className="mb-4 bg-white p-4 rounded-lg border-l-4 border-emerald-500">
                            <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="inline-block h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2">✓</span>
                              What to Do:
                            </h6>
                            <p className="text-gray-600">{insight.recommendation.what}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border-l-4 border-amber-500">
                            <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="inline-block h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2">?</span>
                              Why:
                            </h6>
                            <p className="text-gray-600">{insight.recommendation.why}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
      <InterviewList />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/dashboard" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            View Complete Customer Insights Dashboard
          </a>
        </div>
      </div>
    </main>
  );
} 