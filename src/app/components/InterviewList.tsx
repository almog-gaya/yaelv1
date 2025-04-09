'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';

interface Interview {
  name: string;
  date: string;
  filename: string;
  type: 'abandoned' | 'vip';
  key_quote?: string;
}

const interviews: Interview[] = [
  // Abandoned cart interviews
  { 
    name: 'Alexandrine', 
    date: '2023-04-01', 
    filename: 'Alexandrine (Abandoned cart).docx',
    type: 'abandoned',
    key_quote: "The price is still a bit of a cold shower, but I'm still interested."
  },
  { 
    name: 'Colleen', 
    date: '2023-04-02', 
    filename: 'Colleen (abandoned cart).docx',
    type: 'abandoned',
    key_quote: "I don't need the bag until July, so I've been dragging my feet a bit."
  },
  { 
    name: 'Constanza', 
    date: '2023-04-03', 
    filename: 'Constanza (Abandoned cart).docx',
    type: 'abandoned',
    key_quote: "The cost is quite high… if I convert that in Canadians, it's quite high."
  },
  { 
    name: 'Hannah', 
    date: '2023-04-04', 
    filename: 'Hannah  (abandoned cart).docx',
    type: 'abandoned',
    key_quote: "I wasn't sure about how you change it to a backpack to a handbag… so I looked at that a little extra."
  },
  { 
    name: 'Ritika', 
    date: '2023-04-05', 
    filename: 'Ritika (abandoned cart).docx',
    type: 'abandoned',
    key_quote: "I want a combination of sleek, lightweight, and fits a 15-inch laptop… LaFlore sort of fits, but not completely."
  },
  { 
    name: 'Robin', 
    date: '2023-04-06', 
    filename: 'Robin (abandoned cart) .docx',
    type: 'abandoned',
    key_quote: "Well, it's a want, and I am on a budget so I can only get needs right now, not wants."
  },
  { 
    name: 'Sandra', 
    date: '2023-04-07', 
    filename: 'Sandra (Abandoned cart).docx',
    type: 'abandoned',
    key_quote: "It's a new material, so it's unfamiliar… I want to protect it."
  },
  { 
    name: 'Shelley', 
    date: '2023-04-08', 
    filename: 'Shelley (Abandoned cart).docx',
    type: 'abandoned',
    key_quote: "The straps are never designed to be comfortable and to be worn as often as I need to be wearing the bag."
  },
  { 
    name: 'Tanesha', 
    date: '2023-04-09', 
    filename: 'Tanesha (Abandoned cart).docx',
    type: 'abandoned',
    key_quote: "I was concerned about wear and tear — for the price point."
  },
  { 
    name: 'Todd', 
    date: '2023-04-10', 
    filename: 'Todd (abandoned cart).docx',
    type: 'abandoned',
    key_quote: "The price was over my price range of $150-$250."
  },
  
  // VIP customer interviews
  { 
    name: 'Beth', 
    date: '2023-05-01', 
    filename: 'Beth (VIP customer).docx',
    type: 'vip',
    key_quote: "I'm a big fan of the cork material. It's eco-friendly and still feels high-end. I love that it's sustainable."
  },
  { 
    name: 'Jennifer', 
    date: '2023-05-02', 
    filename: 'Jennifer (VIP customer).docx',
    type: 'vip',
    key_quote: "I love the personal connection with the brand. They always respond to my comments, and it feels like they care about me."
  },
  { 
    name: 'Melanie', 
    date: '2023-05-03', 
    filename: 'Melanie (VIP customer).docx',
    type: 'vip',
    key_quote: "I hesitated initially because of the price, but once I received the bag, I realized it was worth every penny."
  },
  { 
    name: 'Caroline', 
    date: '2023-05-04', 
    filename: 'Caroline (VIP customer).docx',
    type: 'vip',
    key_quote: "It's so chic. Even better than I expected when it arrived."
  },
  { 
    name: 'Janice', 
    date: '2023-05-05', 
    filename: 'Janice (VIP customer).docx',
    type: 'vip',
    key_quote: "I thought it was going to be a special-occasion bag, but I use it every day now."
  },
  { 
    name: 'Donna', 
    date: '2023-05-06', 
    filename: 'Donna (VIP customer).docx',
    type: 'vip',
    key_quote: "It's the most beautiful bag I've ever owned."
  },
  { 
    name: 'Claranel', 
    date: '2023-05-07', 
    filename: 'Claranel (VIP customer).docx',
    type: 'vip',
    key_quote: "This bag is really different. I was honestly surprised how beautiful it was when I opened it."
  },
  { 
    name: 'Carla', 
    date: '2023-05-08', 
    filename: 'Carla (VIP customer).docx',
    type: 'vip',
    key_quote: "It's surprisingly practical. I use it more than I thought I would."
  },
  { 
    name: 'Betsy', 
    date: '2023-05-09', 
    filename: 'Betsy (VIP customer).docx',
    type: 'vip',
    key_quote: "The design is so different from anything I've seen. It's like a vintage piece, but modern at the same time."
  },
  { 
    name: 'Lauren', 
    date: '2023-05-10', 
    filename: 'Lauren (VIP customer).docx',
    type: 'vip',
    key_quote: "It fits into every part of my lifestyle — work, errands, travel. That surprised me."
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function InterviewList() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDownload = async (filename: string) => {
    setLoading(filename);
    setError(null);
    try {
      console.log('Starting download for:', filename);
      const response = await fetch(`/api/interviews?filename=${encodeURIComponent(filename)}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Download failed');
      }
      
      const blob = await response.blob();
      console.log('Blob received, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Received empty file');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log('Download completed successfully');
    } catch (error: any) {
      console.error('Error downloading file:', error);
      setError(error.message || 'Failed to download file');
    } finally {
      setLoading(null);
    }
  };

  const filteredInterviews = interviews.filter(interview => 
    interview.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.key_quote?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abandonedInterviews = filteredInterviews.filter(interview => interview.type === 'abandoned');
  const vipInterviews = filteredInterviews.filter(interview => interview.type === 'vip');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-2">Interview Repository</h1>
      <p className="text-gray-600 mb-6">Access detailed interview transcripts from 20 customer interviews - 10 abandoned cart customers and 10 VIP customers.</p>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">Search interviews</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
            placeholder="Search by name or key quote"
          />
        </div>
      </div>
      
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-indigo-900/5 rounded-xl mb-8">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-3 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                selected
                  ? 'bg-white text-indigo-700 shadow-md'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
              )
            }
          >
            Abandoned Cart Customers
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-3 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                selected
                  ? 'bg-white text-purple-700 shadow-md'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
              )
            }
          >
            VIP Customers
          </Tab>
        </Tab.List>
        
        <Tab.Panels>
          <Tab.Panel>
            <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-indigo-600">🛒</span>
                </div>
                <div>
                  <p className="text-xl font-medium text-indigo-700">Abandoned Cart Interviews</p>
                  <p className="text-indigo-600 text-sm">10 interviews exploring why customers didn't complete their purchase</p>
                </div>
              </div>
            </div>
          
            <div className="grid gap-4">
              {abandonedInterviews.map((interview) => (
                <div
                  key={interview.name}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-indigo-300"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg text-gray-900">{interview.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Interview date: {interview.date}</p>
                    {interview.key_quote && (
                      <div className="mb-2 md:mb-0 flex items-start">
                        <span className="text-indigo-600 mt-0.5 mr-2">❝</span>
                        <p className="italic text-gray-700 text-sm">{interview.key_quote}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDownload(interview.filename)}
                    disabled={loading === interview.filename}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {loading === interview.filename ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download Transcript
                      </>
                    )}
                  </button>
                </div>
              ))}
              
              {abandonedInterviews.length === 0 && (
                <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">No interviews found matching your search criteria.</p>
                </div>
              )}
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-purple-600">💜</span>
                </div>
                <div>
                  <p className="text-xl font-medium text-purple-700">VIP Customer Interviews</p>
                  <p className="text-purple-600 text-sm">10 interviews with customers who purchased and love the product</p>
                </div>
              </div>
            </div>
          
            <div className="grid gap-4">
              {vipInterviews.map((interview) => (
                <div
                  key={interview.name}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-purple-300"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg text-gray-900">{interview.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Interview date: {interview.date}</p>
                    {interview.key_quote && (
                      <div className="mb-2 md:mb-0 flex items-start">
                        <span className="text-purple-600 mt-0.5 mr-2">❝</span>
                        <p className="italic text-gray-700 text-sm">{interview.key_quote}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDownload(interview.filename)}
                    disabled={loading === interview.filename}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-300 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {loading === interview.filename ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download Transcript
                      </>
                    )}
                  </button>
                </div>
              ))}
              
              {vipInterviews.length === 0 && (
                <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">No interviews found matching your search criteria.</p>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Key Findings Summary</h2>
          <a 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Full Dashboard
          </a>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-indigo-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2 text-indigo-700">🛒</span>
              Abandoned Cart Customers
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-5 w-5 text-indigo-500 mr-2">•</span>
                <span><strong>Price vs. Priority (70%)</strong>: Customers love the product but can't justify the spend</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-indigo-500 mr-2">•</span>
                <span><strong>Durability Doubts (60%)</strong>: Uncertainty about how cork holds up over time</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-indigo-500 mr-2">•</span>
                <span><strong>Functionality Misalignment (40%)</strong>: Concerns about laptop fit and strap comfort</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-purple-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2 text-purple-700">💜</span>
              VIP Customers
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-5 w-5 text-purple-500 mr-2">•</span>
                <span><strong>Unmatched Elegance (90%)</strong>: Customers find the bag stunningly beautiful and unique</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-purple-500 mr-2">•</span>
                <span><strong>Daily Use & Versatility (70%)</strong>: Many use the bag more often than expected</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-purple-500 mr-2">•</span>
                <span><strong>Cork Quality (60%)</strong>: Surprised by how premium and luxurious cork feels</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 