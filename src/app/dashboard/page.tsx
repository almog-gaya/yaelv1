'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface InsightData {
  title: string;
  percentage: number;
  quotes: {
    text: string;
    author: string;
  }[];
  recommendations: {
    title: string;
    what: string;
    why: string;
  }[];
}

interface CustomerSegment {
  name: string;
  insights: InsightData[];
}

export default function DashboardPage() {
  // Abandoned cart insights data based on the new research
  const abandonedCartInsights: InsightData[] = [
    {
      title: "Price vs. Priority",
      percentage: 70,
      quotes: [
        {
          text: "Well, it's a want, and I am on a budget so I can only get needs right now, not wants.",
          author: "Robin"
        },
        {
          text: "To spend that much money on a purse that I will rarely use even though I love it… that's why I haven't done it.",
          author: "Shelley"
        },
        {
          text: "The price is still a bit of a cold shower, but I'm still interested.",
          author: "Alexandrine"
        },
        {
          text: "The cost is quite high… if I convert that in Canadians, it's quite high.",
          author: "Constanza"
        },
        {
          text: "I don't need the bag until July, so I've been dragging my feet a bit.",
          author: "Colleen"
        }
      ],
      recommendations: [
        {
          title: "Launch a Lower-Priced Entry-Level Bag ($225–245)",
          what: "Offer a simplified version (non-convertible, fewer extras) that maintains the brand aesthetic. Position it as the 'everyday essential' version of your hero bag.",
          why: "Converts high-interest, price-sensitive shoppers without discounting flagship SKUs. Opens the door for gift-buyers and new customers to try the brand."
        },
        {
          title: "Create a 'Complete Set' Bundle at ~$295",
          what: "Bundle key add-ons (insert, cork oil, 1 strap option) with the bag. Market it as 'Everything you need. One simple price.'",
          why: "Prevents sticker shock when accessories get added. Gives a clean, high-value option to convert cart abandoners."
        },
        {
          title: "Expand and Promote Payment Plans (esp. in Canada + EU)",
          what: "Enable Shop Pay, Klarna, or similar services where currently unavailable. Surface the option early: 'Pay in 4 at checkout' on PDPs and emails.",
          why: "Makes the full price digestible without requiring discounts. High-intent buyers like Alexandrine would've purchased immediately."
        }
      ]
    },
    {
      title: "Durability Doubts",
      percentage: 60,
      quotes: [
        {
          text: "Spending a lot of money on bags and then having it break down is really disappointing.",
          author: "Robin"
        },
        {
          text: "It's a new material, so it's unfamiliar… I want to protect it.",
          author: "Sandra"
        },
        {
          text: "I was concerned about wear and tear — for the price point.",
          author: "Tanesha"
        },
        {
          text: "I've seen some reviews saying the product wears off easily. That's a concern at this price.",
          author: "Alexandrine"
        },
        {
          text: "You don't know how well it's going to stand up in your lifestyle until you purchase it and use it.",
          author: "Robin"
        }
      ],
      recommendations: [
        {
          title: "Introduce a 90-Day Wear-Test Guarantee",
          what: "Allow full returns within 90 days of use. Market it as: 'Try it. Wear it. Travel with it. If it's not for you, send it back.'",
          why: "Removes risk and builds trust at the point of hesitation. Reinforces confidence in your quality."
        },
        {
          title: "Launch a 'Real Wear' Series Showing 6–24 Month Use",
          what: "Feature customer photos/videos of their bags after 6, 12, 24 months. Include real wear, scratches, patina, and commentary: 'Still my daily go-to.'",
          why: "Visually answers: 'How does this hold up over time?' Reassures buyers like Tanesha and Robin who have been burned before."
        },
        {
          title: "Launch a 'Cork 101' Content Hub (Care, Aging, Myths)",
          what: "Create a clearly named section on your site: 'All About Cork' or 'Cork 101'. Include videos on cork feel, FAQ on care, comparisons with leather, and customer reviews of aged cork.",
          why: "Customers like Alexandrine and Sandra had open questions about how cork behaves. Education on this unique material is conversion-critical."
        }
      ]
    },
    {
      title: "Functionality Misalignment",
      percentage: 40,
      quotes: [
        {
          text: "I want a combination of sleek, lightweight, and fits a 15-inch laptop… LaFlore sort of fits, but not completely.",
          author: "Ritika"
        },
        {
          text: "The straps are never designed to be comfortable and to be worn as often as I need to be wearing the bag.",
          author: "Shelley"
        },
        {
          text: "I needed a bag that could bring my stuff comfortably. That's why I haven't pulled the trigger yet.",
          author: "Alexandrine"
        },
        {
          text: "I carry a backpack because it's better for weight distribution on my back.",
          author: "Shelley"
        },
        {
          text: "I wasn't sure about how you change it to a backpack to a handbag… so I looked at that a little extra.",
          author: "Hannah"
        }
      ],
      recommendations: [
        {
          title: "Add 'What Fits Inside' Demos for Every Bag",
          what: "Create short, silent videos showing the bag packed with 15\" laptop, charger, book, water bottle, wallet, snacks. Label videos by use case: 'Workday Loadout', 'Mom on the Go', 'Artist Setup'.",
          why: "Builds confidence around utility without relying on text or specs. Reduces uncertainty and cart drop-off."
        },
        {
          title: "Refresh Brand Imagery to Include Style-Conscious Male Buyers",
          what: "Feature men — especially creative professionals — wearing the bags in business and casual settings. Highlight the Boho Bark and similar convertible models in these visuals.",
          why: "Todd isn't alone: men are interested, but invisible in LaFlore's current positioning. Representation builds resonance and unlocks a high-value, under-tapped segment."
        }
      ]
    }
  ];

  // VIP customer insights data based on the new research
  const vipCustomerInsights: InsightData[] = [
    {
      title: "Unmatched Elegance & Aesthetic Appeal",
      percentage: 90,
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
      recommendations: [
        {
          title: "Make the First Purchase Feel More Accessible",
          what: "Introduce a limited-time 'Try LaFlore' version",
          why: "Converts high-intent window shoppers who admire the elegance but can't justify the full price. Lets customers fall in love with the design firsthand."
        },
        {
          title: "Add styling + value-focused testimonials to PDPs",
          what: "Add short testimonials on PDPs about why the price was worth it. Pair with styling videos showing multiple ways to wear it (work, evening, errands).",
          why: "Helps justify the price emotionally and practically. Eases the internal debate: 'Is it really worth it?'"
        }
      ]
    },
    {
      title: "Daily Use & Versatility Surpassed Expectations",
      percentage: 70,
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
      recommendations: [
        {
          title: "Bring Functionality and Everyday Use to Life",
          what: "Add 'real life use' packing demos and silent video clips",
          why: "Helps prospective buyers imagine the bag in their life. Converts skeptics who think it's just a stylish accessory."
        },
        {
          title: "Run a content series featuring customer stories of daily use",
          what: "Run a campaign around: 'I thought I'd only use it sometimes…' Feature quotes from Janice, Carla, Lauren, and Melanie. Pair with user-generated photos in different settings.",
          why: "Breaks the perception of it being an occasional/luxury-only item. Drives home practicality without losing the fashion-forward edge."
        }
      ]
    },
    {
      title: "Cork Quality Felt Luxurious",
      percentage: 60,
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
      recommendations: [
        {
          title: "Demystify Cork Material and Durability",
          what: "Launch short video demos showing flexibility and texture",
          why: "Addresses the unknowns around stiffness, flexibility, and wear. Visually validates the surprise others had: 'It's actually luxurious'."
        },
        {
          title: "Offer a 90-day 'wear test' guarantee",
          what: "Offer full returns within 90 days of use. Message it as: 'Try it. Wear it. Travel with it. If it's not for you, send it back.'",
          why: "Reduces hesitation at the moment of doubt. Signals confidence in material durability and day-to-day performance."
        }
      ]
    }
  ];

  // Customer segments with interview counts
  const customerSegments: CustomerSegment[] = [
    {
      name: "Abandoned Cart Customers",
      insights: abandonedCartInsights
    },
    {
      name: "VIP Customers",
      insights: vipCustomerInsights
    }
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  // Segment descriptions for better context
  const segmentDescriptions: Record<string, string> = {
    "Abandoned Cart Customers": "10 abandoned cart interviews",
    "VIP Customers": "10 VIP customer interviews"
  };

  // Expanded sections state
  const [expandedBarriers, setExpandedBarriers] = useState<string[]>([]);
  const [expandedOpportunities, setExpandedOpportunities] = useState<string[]>([]);
  const [expandedDrivers, setExpandedDrivers] = useState<string[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<string[]>([]);
  
  // Toggle section expansion
  // These are no longer needed with the flat structure
  const toggleBarrier = (id: string) => {
    setExpandedBarriers(
      expandedBarriers.includes(id)
        ? expandedBarriers.filter(item => item !== id)
        : [...expandedBarriers, id]
    );
  };
  
  const toggleOpportunity = (id: string) => {
    setExpandedOpportunities(
      expandedOpportunities.includes(id)
        ? expandedOpportunities.filter(item => item !== id)
        : [...expandedOpportunities, id]
    );
  };
  
  const toggleDriver = (id: string) => {
    setExpandedDrivers(
      expandedDrivers.includes(id)
        ? expandedDrivers.filter(item => item !== id)
        : [...expandedDrivers, id]
    );
  };
  
  const toggleDetail = (id: string) => {
    setExpandedDetails(
      expandedDetails.includes(id)
        ? expandedDetails.filter(item => item !== id)
        : [...expandedDetails, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
            LaFlore Customer Insights
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Analysis of customer feedback to drive product improvements and increase conversions
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-indigo-900/5 rounded-xl mb-8">
            {customerSegments.map((segment, index) => (
              <Tab
                key={index}
                className={({ selected }: { selected: boolean }) =>
                  classNames(
                    'w-full py-4 text-lg font-medium leading-5 rounded-lg transition-all duration-200',
                    selected
                      ? 'bg-white text-indigo-700 shadow-md'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
                  )
                }
              >
                {segment.name}
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels>
            {customerSegments.map((segment, segmentIdx) => (
              <Tab.Panel key={segmentIdx}>
                {segment.name === "Abandoned Cart Customers" ? (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-indigo-500">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <span className="text-xl text-indigo-600">🛒</span>
                      </div>
                      <div>
                        <p className="text-xl font-medium text-indigo-700">Abandoned Cart Customers</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-purple-500">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                        <span className="text-xl text-purple-600">💰</span>
                      </div>
                      <div>
                        <p className="text-xl font-medium text-purple-700">{segmentDescriptions[segment.name]}</p>
                        <p className="text-purple-600 text-sm">10 interviews with customers who purchased and love the product</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* MAIN TAKEAWAYS SECTION - FLAT STRUCTURE WITH TITLES AND BULLET POINTS */}
                <div className="mb-12">
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-t-xl p-8 shadow-lg">
                    <h2 className="text-4xl font-bold text-white flex items-center">
                      <span className="bg-white h-12 w-12 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <span className="text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-transparent bg-clip-text">💡</span>
                      </span>
                      {segment.name === "Abandoned Cart Customers" ? 
                        "Takeaways: 10 interviews" : 
                        "Takeaways: 10 interviews - VIP customers"}
                    </h2>
                  </div>
                  
                    <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden border border-t-0 border-gray-100">
                      <div className="p-10">
                      {segment.name === "Abandoned Cart Customers" ? (
                        <>
                          <div className="mb-8 text-center">
                            <h3 className="text-3xl font-bold text-yellow-500 mb-2">
                              Takeaways:
                        </h3>
                            <p className="text-lg text-gray-600 mb-8">10 interviews</p>
                          </div>

                          <div className="mb-10">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                              Top 3 barriers to purchase:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl shadow-md border border-yellow-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-white text-xl font-bold mx-auto mb-4">
                                  70%
                                  </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Price vs. Priority</h5>
                                <p className="text-gray-700">Customers love the product, but can't justify the spend — especially when seen as a luxury or "treat." Add-ons and unclear total cost make the price feel even higher.</p>
                                    </div>
                              
                              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-md border border-orange-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-400 text-white text-xl font-bold mx-auto mb-4">
                                  60%
                                          </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Durability Doubts</h5>
                                <p className="text-gray-700">Cork is unfamiliar. Buyers are unsure how it holds up — especially at this price point. Some have been burned by past purchases and don't want to make the same mistake.</p>
                                      </div>
                              
                              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md border border-amber-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-400 text-white text-xl font-bold mx-auto mb-4">
                                  40%
                                    </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Functionality Misalignment</h5>
                                <p className="text-gray-700">Some didn't know if the bag fit their life — laptop, body, commute — while others didn't feel represented in the brand (especially style-conscious male buyers).</p>
                                  </div>
                        </div>
                      </div>
                      
                          <div className="mb-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                              Top 3 Opportunities to Increase Conversions:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-md border border-indigo-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <span className="text-3xl text-indigo-600">💰</span>
                                </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Launch a lower-priced entry bag</h5>
                                <p className="text-gray-700">Unlocks price-sensitive buyers without devaluing the core line. Offers a simpler, non-convertible version to bring more people into the brand.</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-3xl text-blue-600">🛡️</span>
                                </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Build confidence in cork</h5>
                                <p className="text-gray-700">Use aged-bag visuals, a "Cork 101" education hub, and a 90-day wear-test guarantee to eliminate fear of disappointment.</p>
                          </div>
                          
                              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl shadow-md border border-cyan-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center">
                                    <span className="text-3xl text-cyan-600">📐</span>
                                </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Help shoppers understand size & fit</h5>
                                <p className="text-gray-700">Add short "What Fits Inside" videos on product pages showing bags packed with 15" laptops, books, bottles, etc. Include visual guides for how each bag wears.</p>
                              </div>
                                </div>
                                </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-8 text-center">
                            <h3 className="text-3xl font-bold text-purple-500 mb-2">
                              Takeaways:
                            </h3>
                            <p className="text-lg text-gray-600 mb-8">10 interviews - VIP customers</p>
                          </div>
                          
                          <div className="mb-10">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                              Top 3 hesitations for purchase:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl shadow-md border border-purple-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-400 text-white text-xl font-bold mx-auto mb-4">
                                  60%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Price vs. Priority</h5>
                                <p className="text-gray-700">Most loved the bag but saw it as a luxury. Several admired it for months before buying, needing time or financial readiness to justify the purchase.</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl shadow-md border border-fuchsia-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-fuchsia-400 text-white text-xl font-bold mx-auto mb-4">
                                  40%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Uncertainty Around Cork + Durability</h5>
                                <p className="text-gray-700">Some were unsure how cork would feel or hold up over time, especially without seeing or touching it in person.</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl shadow-md border border-violet-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-400 text-white text-xl font-bold mx-auto mb-4">
                                  30%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Functionality Fit / Versatility Concerns</h5>
                                <p className="text-gray-700">A few weren't sure if the bag would suit their work, travel, or daily needs — or how intuitive the strap configuration would be.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-10">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                              Top 3 Value Drivers / Positive Surprises
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl shadow-md border border-purple-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-400 text-white text-xl font-bold mx-auto mb-4">
                                  90%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Unmatched Elegance & Aesthetic Appeal</h5>
                                <p className="text-gray-700">Customers described the bag as stunning, unique, and a style standout. Many said it was more beautiful in person than expected.</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl shadow-md border border-fuchsia-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-fuchsia-400 text-white text-xl font-bold mx-auto mb-4">
                                  70%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Daily Use & Versatility Surpassed Expectations</h5>
                                <p className="text-gray-700">Many expected to use the bag occasionally but found themselves reaching for it every day. It integrated seamlessly into different parts of their life.</p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl shadow-md border border-violet-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-400 text-white text-xl font-bold mx-auto mb-4">
                                  60%
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Cork Quality Felt Luxurious</h5>
                                <p className="text-gray-700">Several were surprised by how soft, premium, and unique cork felt — and felt proud to support a sustainable, ethical brand.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                              Top 3 Opportunities to Increase Conversions
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-md border border-pink-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                                    <span className="text-3xl text-pink-600">🏷️</span>
                                  </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Make First Purchase More Accessible</h5>
                                <ul className="list-none pl-5 text-gray-700">
                                  <li className="mb-2 flex items-start">
                                    <span className="text-pink-500 mr-2">→</span>
                                    Introduce a limited-time "Try LaFlore" version
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-pink-500 mr-2">→</span>
                                    Add styling + value-focused testimonials to PDPs
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl shadow-md border border-rose-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                                    <span className="text-3xl text-rose-600">🛡️</span>
                                  </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Demystify Cork Material and Durability</h5>
                                <ul className="list-none pl-5 text-gray-700">
                                  <li className="mb-2 flex items-start">
                                    <span className="text-rose-500 mr-2">→</span>
                                    Launch short video demos showing flexibility and texture
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-rose-500 mr-2">→</span>
                                    Offer a 90-day "wear test" guarantee
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl shadow-md border border-fuchsia-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-fuchsia-100 flex items-center justify-center">
                                    <span className="text-3xl text-fuchsia-600">📱</span>
                                  </div>
                                </div>
                                <h5 className="text-xl font-bold text-gray-800 text-center mb-3">Bring Functionality and Everyday Use to Life</h5>
                                <ul className="list-none pl-5 text-gray-700">
                                  <li className="mb-2 flex items-start">
                                    <span className="text-fuchsia-500 mr-2">→</span>
                                    Add "real life use" packing demos and silent video clips
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-fuchsia-500 mr-2">→</span>
                                    Run a content series featuring customer stories of daily use
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                          </div>
                        </div>
                      </div>
                      
                {/* Continue with the rest of the content... */}
                {/* DETAILED ANALYSIS SECTION - Voice of the Customer */}
                <div id="detailed-analysis" className="pt-4">
                  <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                      Detailed Analysis (Voice of the Customer)
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>

                  {/* Top 3 Hesitations for Purchase Section */}
                  <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-100">
                    {segment.name === "Abandoned Cart Customers" ? (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                          Top 3 Barriers to Purchase
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                          {/* Barrier 1 - Price vs. Priority */}
                          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl shadow-md border border-rose-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xl shadow-md mb-2">
                                70%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">1. Price vs. Priority</h4>
                              <p className="text-sm text-rose-800 font-medium text-center">7 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              Most customers genuinely admired the product, but saw it as a luxury or "treat" — not urgent or justifiable based on current finances or lifestyle.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-rose-100">
                              <h5 className="font-semibold text-rose-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"Well, it's a want, and I am on a budget so I can only get needs right now, not wants."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Robin</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"To spend that much money on a purse that I will rarely use even though I love it… that's why I haven't done it."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Shelley</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"The price is still a bit of a cold shower, but I'm still interested."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Alexandrine</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"The cost is quite high… if I convert that in Canadians, it's quite high."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Constanza</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"I don't need the bag until July, so I've been dragging my feet a bit."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Colleen</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Barrier 2 - Concerns About Durability / Wear & Tear */}
                          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md border border-amber-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xl shadow-md mb-2">
                                60%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">2. Concerns About Durability</h4>
                              <p className="text-sm text-amber-800 font-medium text-center">6 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              A key hesitation was not knowing how well the bag would hold up — particularly given the investment. Several expressed concern about cork's durability or past experiences with bags that didn't last.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                              <h5 className="font-semibold text-amber-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"Spending a lot of money on bags and then having it break down is really disappointing."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Robin</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"It's a new material, so it's unfamiliar… I want to protect it."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Sandra</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"I was concerned about wear and tear — for the price point."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Tanesha</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"I've seen some reviews saying the product wears off easily. That's a concern at this price."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Alexandrine</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"You don't know how well it's going to stand up in your lifestyle until you purchase it and use it."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Robin</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Barrier 3 - Functionality Misalignment */}
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-md border border-emerald-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xl shadow-md mb-2">
                                40%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">3. Functionality Misalignment</h4>
                              <p className="text-sm text-emerald-800 font-medium text-center">4 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              Some shoppers were genuinely interested, but the bag didn't fit a key use case — whether that was carrying a laptop, lacking comfort for all-day wear, or not being the right shape for their lifestyle.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100">
                              <h5 className="font-semibold text-emerald-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I want a combination of sleek, lightweight, and fits a 15-inch laptop… LaFlore sort of fits, but not completely."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Ritika</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"The straps are never designed to be comfortable and to be worn as often as I need to be wearing the bag."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Shelley</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I needed a bag that could bring my stuff comfortably. That's why I haven't pulled the trigger yet."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Alexandrine</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I carry a backpack because it's better for weight distribution on my back."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Shelley</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I wasn't sure about how you change it to a backpack to a handbag… so I looked at that a little extra."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Hannah</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                          Top 3 Hesitations for Purchase
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                          {/* Hesitation 1 - Price vs. Priority */}
                          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl shadow-md border border-rose-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xl shadow-md mb-2">
                                60%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">1. Price vs. Priority</h4>
                              <p className="text-sm text-rose-800 font-medium text-center">6 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              Most loved the bag but saw it as a luxury, requiring time or financial readiness to commit. Some admired it for months before purchasing, while others held off due to budget.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-rose-100">
                              <h5 className="font-semibold text-rose-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"I had been eyeing it for a long time, trying to justify it."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Beth</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"I was obsessed with the backpack and I was just like, oh my god, I need this backpack. But I was also like, okay, you know, it's a good chunk of money. So it took me a while to buy it."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Betsy</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"It was a bit of a splurge. I looked at it for a long time."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Jennifer</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"I had to hold off for a little while, just because I was trying to be careful with my money."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Janice</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"I kept looking at it. I kept looking at it. And then I just did it. But yeah, it took me a while to pull the trigger. Mostly a money thing."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Melanie</p>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50">
                                  <p className="italic text-gray-700 text-sm">"It took me a while to justify it. I was trying to be financially responsible."</p>
                                  <p className="text-right text-rose-600 font-medium text-xs">– Lauren</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hesitation 2 - Uncertainty Around Cork + Durability */}
                          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md border border-amber-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xl shadow-md mb-2">
                                40%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">2. Uncertainty Around Cork</h4>
                              <p className="text-sm text-amber-800 font-medium text-center">4 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              Some weren't sure how cork would feel or hold up — especially without touching it in person. Durability, texture, and flexibility were common unknowns.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                              <h5 className="font-semibold text-amber-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"I wasn't sure about the cork, like how soft it would be or if it would be stiff."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Carla</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"Cork sounded like it might be stiff or uncomfortable."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Jennifer</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"I didn't know what cork felt like or how it would move."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Donna</p>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                  <p className="italic text-gray-700 text-sm">"I wasn't sure how it would hold up with wear and tear."</p>
                                  <p className="text-right text-amber-600 font-medium text-xs">– Melanie</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hesitation 3 - Functionality Fit / Versatility Concerns */}
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-md border border-emerald-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col items-center mb-4">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xl shadow-md mb-2">
                                30%
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 text-center">3. Functionality Concerns</h4>
                              <p className="text-sm text-emerald-800 font-medium text-center">3 out of 10 customers</p>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              Some hesitated around how well the bag would suit their lifestyle — especially for work, travel, or ease of use. Others weren't sure if it would feel natural to carry or transition from backpack to crossbody.
                            </p>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100">
                              <h5 className="font-semibold text-emerald-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I was worried it might be too small for work."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Lauren</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I wasn't sure how the strap configuration worked."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Jennifer</p>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <p className="italic text-gray-700 text-sm">"I wanted something I could take to the office and then out — and wasn't sure at first."</p>
                                  <p className="text-right text-emerald-600 font-medium text-xs">– Claranel</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Top 3 Value Drivers / Positive Surprises */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                      Top 3 Value Drivers / Positive Surprises
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Value Driver 1 - Unmatched Elegance and Aesthetic Appeal */}
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl shadow-md border border-purple-200 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-xl shadow-md mb-2">
                            90%
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 text-center">1. Unmatched Elegance</h4>
                          <p className="text-sm text-purple-800 font-medium text-center">9 out of 10 customers</p>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          Customers consistently described LaFlore bags as beautiful, elegant, and different from anything else they'd seen — and often more stunning in person. The design gave them a sense of confidence, uniqueness, and personal style.
                        </p>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                          <h5 className="font-semibold text-purple-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                          <div className="space-y-2">
                            <div className="p-2 rounded-lg bg-purple-50">
                              <p className="italic text-gray-700 text-sm">"It's the most beautiful bag I've ever owned."</p>
                              <p className="text-right text-purple-600 font-medium text-xs">– Donna</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-50">
                              <p className="italic text-gray-700 text-sm">"I love how it looks. I haven't seen anything else like it."</p>
                              <p className="text-right text-purple-600 font-medium text-xs">– Lauren</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-50">
                              <p className="italic text-gray-700 text-sm">"The elegance. The simplicity. I've gotten so many compliments."</p>
                              <p className="text-right text-purple-600 font-medium text-xs">– Janice</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-50">
                              <p className="italic text-gray-700 text-sm">"It's so chic. Even better than I expected when it arrived."</p>
                              <p className="text-right text-purple-600 font-medium text-xs">– Caroline</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-50">
                              <p className="italic text-gray-700 text-sm">"This bag is really different. I was honestly surprised how beautiful it was when I opened it."</p>
                              <p className="text-right text-purple-600 font-medium text-xs">– Claranel</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Value Driver 2 - Daily Use & Versatility Surpassed Expectations */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-md mb-2">
                            70%
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 text-center">2. Daily Versatility</h4>
                          <p className="text-sm text-blue-800 font-medium text-center">7 out of 10 customers</p>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          Many thought they'd use it occasionally — but were surprised by how often it became their go-to. It fit seamlessly into work, travel, and everyday life, while still feeling elevated.
                        </p>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                          <h5 className="font-semibold text-blue-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                          <div className="space-y-2">
                            <div className="p-2 rounded-lg bg-blue-50">
                              <p className="italic text-gray-700 text-sm">"I thought it was going to be a special-occasion bag, but I use it every day now."</p>
                              <p className="text-right text-blue-600 font-medium text-xs">– Janice</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-50">
                              <p className="italic text-gray-700 text-sm">"It's surprisingly practical. I use it more than I thought I would."</p>
                              <p className="text-right text-blue-600 font-medium text-xs">– Carla</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-50">
                              <p className="italic text-gray-700 text-sm">"I wear it constantly. I didn't expect it to be this functional."</p>
                              <p className="text-right text-blue-600 font-medium text-xs">– Melanie</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-50">
                              <p className="italic text-gray-700 text-sm">"It fits into every part of my lifestyle — work, errands, travel. That surprised me."</p>
                              <p className="text-right text-blue-600 font-medium text-xs">– Lauren</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Value Driver 3 - Cork Quality and Sustainability Felt Luxurious */}
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md border border-teal-200 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xl shadow-md mb-2">
                            60%
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 text-center">3. Cork Quality</h4>
                          <p className="text-sm text-teal-800 font-medium text-center">6 out of 10 customers</p>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          Several customers didn't expect cork to feel so premium — they were delighted by the texture, weight, and uniqueness of the material. Many also mentioned feeling good about supporting a sustainable, ethical brand.
                        </p>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-100">
                          <h5 className="font-semibold text-teal-700 mb-3 text-center text-sm uppercase tracking-wider">Supporting Quotes</h5>
                          <div className="space-y-2">
                            <div className="p-2 rounded-lg bg-teal-50">
                              <p className="italic text-gray-700 text-sm">"I was hesitant at first because it's not leather, but the cork is a great alternative—sustainable and lightweight."</p>
                              <p className="text-right text-teal-600 font-medium text-xs">– Carla</p>
                            </div>
                            <div className="p-2 rounded-lg bg-teal-50">
                              <p className="italic text-gray-700 text-sm">"I'm a big fan of the cork material. It's eco-friendly and still feels high-end. I love that it's sustainable."</p>
                              <p className="text-right text-teal-600 font-medium text-xs">– Beth</p>
                            </div>
                            <div className="p-2 rounded-lg bg-teal-50">
                              <p className="italic text-gray-700 text-sm">"The bags are high quality. They look as good as the day I bought them."</p>
                              <p className="text-right text-teal-600 font-medium text-xs">– Donna</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* RECOMMENDATIONS SECTION BASED ON HESITATIONS AND VALUE DRIVERS */}
                <div className="pt-12 pb-16">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
                    <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 p-8">
                      <h2 className="text-3xl font-bold text-white">
                        Recommendations
                      </h2>
                      <p className="text-teal-100 mt-2">
                        Based on top hesitations and value drivers
                      </p>
                    </div>
                    
                    <div className="space-y-6 p-6">
                      {/* Recommendation 1 */}
                      <div className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden">
                        <button 
                          onClick={() => toggleOpportunity('rec-price-elegance')}
                          className="w-full text-left p-6 focus:outline-none" 
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                                1
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Price vs. Priority (60%) × Elegance & Aesthetic Delight (90%)</h3>
                                <p className="text-gray-600 italic mt-1">"It's so beautiful… but it felt like a splurge."</p>
                              </div>
                            </div>
                            {expandedOpportunities.includes('rec-price-elegance') ? (
                              <ChevronUpIcon className="h-6 w-6 text-teal-500" />
                            ) : (
                              <ChevronDownIcon className="h-6 w-6 text-teal-500" />
                            )}
                          </div>
                        </button>
                        
                        {expandedOpportunities.includes('rec-price-elegance') && (
                          <div className="bg-gradient-to-b from-white to-teal-50 border-t border-teal-100">
                            <div className="p-6 space-y-6">
                              {/* Rec 1.1 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 1. Launch a Limited-Time "Try LaFlore" Offer (Under $250)
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Create a minimalist version of the hero bag (non-convertible, fewer extras)</li>
                                    <li>Cap price between $225–245</li>
                                    <li>Position as the "entry point" to owning a LaFlore</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Converts high-intent window shoppers who admire the elegance but can't justify the full price</li>
                                    <li>Lets customers fall in love with the design firsthand, increasing LTV and upsell potential</li>
                                  </ul>
                                </div>
                              </div>
                              
                              {/* Rec 1.2 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 2. Reinforce Value Through Testimonials + Styling Content
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Add short testimonials on PDPs about why the price was worth it</li>
                                    <li>Pair with styling videos showing multiple ways to wear it (work, evening, errands)</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Helps justify the price emotionally and practically</li>
                                    <li>Eases the internal debate: "Is it really worth it?"</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Recommendation 2 */}
                      <div className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden">
                        <button 
                          onClick={() => toggleOpportunity('rec-cork-durability')}
                          className="w-full text-left p-6 focus:outline-none" 
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                                2
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Cork/Durability Concerns (40%) × Cork Quality Surprised Customers (60%)</h3>
                                <p className="text-gray-600 italic mt-1">"I wasn't sure about cork… now I love how it feels."</p>
                              </div>
                            </div>
                            {expandedOpportunities.includes('rec-cork-durability') ? (
                              <ChevronUpIcon className="h-6 w-6 text-teal-500" />
                            ) : (
                              <ChevronDownIcon className="h-6 w-6 text-teal-500" />
                            )}
                          </div>
                        </button>
                        
                        {expandedOpportunities.includes('rec-cork-durability') && (
                          <div className="bg-gradient-to-b from-white to-teal-50 border-t border-teal-100">
                            <div className="p-6 space-y-6">
                              {/* Rec 2.1 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 1. Add a "Feel the Cork" Section with Touch + Movement Demos
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Create 10–20 sec. videos showing close-ups of the cork texture in motion</li>
                                    <li>Include twisting, bending, water drops, and surface close-ups</li>
                                    <li>Label it "Cork, Up Close" or "How It Moves, How It Lasts"</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Addresses the unknowns around stiffness, flexibility, and wear</li>
                                    <li>Visually validates the surprise others had: "It's actually luxurious"</li>
                                  </ul>
                                </div>
                              </div>
                              
                              {/* Rec 2.2 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 2. Launch a 90-Day Wear-Test Guarantee
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Offer full returns within 90 days of use</li>
                                    <li>Message it as: "Try it. Wear it. Travel with it. If it's not for you, send it back."</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Reduces hesitation at the moment of doubt</li>
                                    <li>Signals confidence in material durability and day-to-day performance</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Recommendation 3 */}
                      <div className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden">
                        <button 
                          onClick={() => toggleOpportunity('rec-functionality-daily')}
                          className="w-full text-left p-6 focus:outline-none" 
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                                3
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Functionality Fit Concerns (30%) × Daily Use Surpassed Expectations (70%)</h3>
                                <p className="text-gray-600 italic mt-1">"I wasn't sure it'd fit into my life… but now I use it every day."</p>
                              </div>
                            </div>
                            {expandedOpportunities.includes('rec-functionality-daily') ? (
                              <ChevronUpIcon className="h-6 w-6 text-teal-500" />
                            ) : (
                              <ChevronDownIcon className="h-6 w-6 text-teal-500" />
                            )}
                          </div>
                        </button>
                        
                        {expandedOpportunities.includes('rec-functionality-daily') && (
                          <div className="bg-gradient-to-b from-white to-teal-50 border-t border-teal-100">
                            <div className="p-6 space-y-6">
                              {/* Rec 3.1 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 1. Add "Real Life Use" Demos for Work, Travel & Errands
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Record silent "What's in My Bag" videos for common use cases (laptop, snacks, travel gear)</li>
                                    <li>Feature short clips on PDPs and email flows: "Workday Loadout", "Mom on the Go", etc.</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Helps prospective buyers imagine the bag in their life</li>
                                    <li>Converts skeptics who think it's just a stylish accessory</li>
                                  </ul>
                                </div>
                              </div>
                              
                              {/* Rec 3.2 */}
                              <div className="bg-white rounded-lg shadow p-6 border border-teal-100">
                                <h4 className="text-lg font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
                                  Recommendation 2. Highlight Daily Use Stories in Email & Social
                                </h4>
                                
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">What to do:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Run a campaign around: "I thought I'd only use it sometimes…"</li>
                                    <li>Feature quotes from Janice, Carla, Lauren, and Melanie</li>
                                    <li>Pair with user-generated photos in different settings</li>
                                  </ul>
                                </div>
                                
                                <div className="mt-5">
                                  <h5 className="font-semibold text-gray-800 mb-2">Why:</h5>
                                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>Breaks the perception of it being an occasional/luxury-only item</li>
                                    <li>Drives home practicality without losing the fashion-forward edge</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* INTERVIEW SUMMARIES SECTION */}
                <div className="pt-12 pb-16">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-6">
                      <h2 className="text-3xl font-bold text-white">
                        {segment.name === "Abandoned Cart Customers" ? 
                          "Abandoned Cart Interview Summaries" : 
                          "VIP Customer Interview Summaries"}
                      </h2>
                      <p className="text-indigo-100 mt-2">
                        {segment.name === "Abandoned Cart Customers" ? 
                          "Complete summaries of all 10 interviews with customers who abandoned their cart" : 
                          "Complete summaries of all 10 interviews with VIP customers"}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                      {segment.name === "Abandoned Cart Customers" ? (
                        <>
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">1</span>
                              Robin
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Loved the aesthetic and size: "She cute."</li>
                                <li>Wanted a bag large enough to carry kids' snacks and her lunch</li>
                                <li>A self-described "shoes and purse girl" — likes variety and style</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>On a tight budget — sees the bag as a "want, not a need"</li>
                                <li>Concerned about durability: "Spending a lot of money on bags and then having it break down is really disappointing."</li>
                                <li>Hesitant to invest without firsthand proof it will hold up</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Currently using a large Steve Madden bucket bag but finds it "not really well made"</li>
                                <li>Would be more confident if she knew someone personally who used and vouched for the bag</li>
                                <li>Rotates bags regularly, so durability and design both matter</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">2</span>
                              Todd
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Loved the high-end, sleek look and unisex aesthetic — especially how the Boho Bark didn't look like a typical backpack</li>
                                <li>Was considering it for work use as a polished, functional alternative to briefcases</li>
                                <li>Appreciated that it was stylish enough for business meetings but still wearable day-to-day</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Found the $300+ price too high for his budget; his comfort zone is $150–$200</li>
                                <li>Felt the quality looked good, but not quite beyond $250 in perceived value</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Durability wasn't a concern — his friend owns one and vouched for it</li>
                                <li>Pointed out that LaFlore is missing a clear opportunity to market to men</li>
                                <li>Believes his husband will likely buy it for him as a birthday gift</li>
                                <li>Highlighted demand among men in creative industries for elegant, non-traditional backpacks</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">3</span>
                              Shelley
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Former apparel professional — values construction, design, and craftsmanship</li>
                                <li>Loved the unique apothecary-style clasp; design stood out</li>
                                <li>Interested in sustainability and rare materials</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Doesn't use purses anymore — prefers backpacks for health reasons</li>
                                <li>Finds convertible backpack straps often lack comfort for extended wear</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Is visually impaired, so access and visibility inside the bag is crucial</li>
                                <li>Travels extensively for work and needs ergonomic, padded straps</li>
                                <li>Mentioned that most high-end convertible bags "aren't designed to be worn as often as I need to wear them"</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">4</span>
                              Tanesha
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Thought the Toto bag was stylish and functional</li>
                                <li>Loved the cork material and convertible nature</li>
                                <li>Remembered the brand from its original crowdfunding campaign</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Searched on Poshmark and saw signs of wear and tear, which spooked her</li>
                                <li>Concerned that the bag wouldn't hold up to regular use given the price</li>
                                <li>Said she would buy it "if the product could actually hold up"</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>The brand's resale visibility actually backfired — not because of price, but because it surfaced durability concerns</li>
                                <li>Highlighted that people are selling second-hand bags at full price, which could be reframed as a value point</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">5</span>
                              Hannah
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Saw the founder/daughter video and emotionally connected with the story</li>
                                <li>Loved the vintage aesthetic, cork sustainability, and made-in-France craftsmanship</li>
                                <li>Looking for a bag that's both secure and stylish for daily NYC life</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>No hesitation on product — she's simply waiting for her birthday and next paycheck</li>
                                <li>Plans to buy it as a personal gift</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Incredibly high-intent buyer: "I look at it online basically every day just kind of pining after it."</li>
                                <li>Wants to see more content showing real-life usage (e.g., bookstore, subway)</li>
                                <li>Has read every single product page — likely a power user and potential brand advocate</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">6</span>
                              Ritika
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Sleek, elegant design for work and travel</li>
                                <li>Appreciates cork's lightweight feel and environmental benefits</li>
                                <li>Compared many options and found LaFlore appealing</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Bag claimed to fit a 15" laptop, but when she tried it in person (via a friend), it didn't fit with other items</li>
                                <li>Needs something that can carry a laptop + accessories without bulging</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Very intentional shopper — she's been hunting for the right bag "for as long as I can remember"</li>
                                <li>If the bag were slightly larger or better-optimized, she would've already bought it</li>
                                <li>This segment may require more detailed sizing videos or visual packing guides</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">7</span>
                              Constanza
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Was actively considering the Bebe Bark or Toto</li>
                                <li>Thought the bags were cute and versatile for travel and everyday use</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Total price felt high, especially when converted to Canadian dollars</li>
                                <li>Didn't love that extras like straps and cork oil felt like necessary add-ons</li>
                                <li>Saw it as a big one-time cost that needed more thought</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>She added the product to cart — so she got close</li>
                                <li>Suggested including care items or accessories in the base price could push people to purchase</li>
                                <li>Thought cork bags would have longevity — wasn't worried about materials, just cost stacking</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">8</span>
                              Alexandrine
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Loved the Doc Quinton bag's design, spaciousness, and French aesthetic</li>
                                <li>Manager in a high-end law firm — wants something stylish, functional, and status-elevating</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>The price in USD + no payment plan in Canada</li>
                                <li>Frustrated that Shop Pay was advertised but unavailable</li>
                                <li>Concerned about unclear return policy and shipping costs</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Strong believer in durability guarantees — would love to pass the bag down to her daughter someday</li>
                                <li>Still plans to buy the bag eventually — seeing it in real life on someone bumped it back to the top of her list</li>
                                <li>Wants to see more clarity upfront on policies, warranties, and payment flexibility for international buyers</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">9</span>
                              Colleen
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Was shopping for laptop bags and drawn to LaFlore's uniqueness</li>
                                <li>Liked the brand story and non-generic aesthetic</li>
                                <li>Was intrigued by the raspberry limited edition color</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What held them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Doesn't need a new bag right away — works from home most of the time</li>
                                <li>Delaying decision until an upcoming conference</li>
                                <li>Color availability and limited-time editions may influence purchase</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Values subtle elegance — doesn't want a bag that screams "backpack"</li>
                                <li>Said LaFlore stood out because "a lot of bags out there all look the same"</li>
                                <li>Could be swayed by a limited drop or new colorway timed with a work trip</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all p-6">
                            <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                              <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-indigo-800 font-bold">10</span>
                              Sandra
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Purchased the Grand Bond via Kickstarter — already owns it</li>
                                <li>Loved the color (dark green), size, versatility, and interior layout</li>
                                <li>Interested in buying more bags + shoes</li>
                              </ul>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-semibold text-indigo-700 mb-2">What's holding them back:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Hasn't used the bag yet because of rain and uncertainty about cork care</li>
                                <li>Wants more clarity on weather resistance and cleaning instructions</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-indigo-700 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>Found the interior compartments extremely functional: "It's the biggest purse I've owned, and the pockets don't compromise the main space."</li>
                                <li>Wants better info on cork care, oiling frequency, and scratch resistance</li>
                                <li>Suggested a small design change: raise the bottom studs to better protect the bag</li>
                                <li>Loves the brand and is watching closely — just wants reassurance before she builds a collection</li>
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-2 bg-white rounded-lg shadow border border-purple-100 p-6 mb-4">
                            <h3 className="text-3xl font-bold text-purple-800 mb-3">
                              Interview Summaries (10 customers)
                            </h3>
                            <p className="text-gray-600 mb-6">Detailed VIP customer interviews with insights on what drew them to LaFlore, what caused hesitation, and additional valuable insights.</p>
                          </div>
                          
                          {/* Jennifer */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">1</span>
                              <h3 className="text-xl font-bold text-purple-800">Jennifer</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>The unique, structured design and professional polish</li>
                                <li>The non-leather, eco-conscious material</li>
                                <li>Discovered it via Kickstarter, appreciated the story and mission</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Concern about shipping delays and not receiving the product</li>
                                <li>Thought the price was high, but justified it by values and quality</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>She seeks out statement pieces and avoids fast fashion</li>
                                <li>Travels frequently and wanted a bag that blends beauty with practicality</li>
                                <li>Appreciates that the bag feels intentional and ethical</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Beth */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">2</span>
                              <h3 className="text-xl font-bold text-purple-800">Beth</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Loved the color and aesthetic immediately</li>
                                <li>Found it stylish but subtle—something she could wear every day</li>
                                <li>Was excited by the modular, convertible design</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Honestly, none — she bought right away without hesitation</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Found LaFlore via Instagram, proving strong visual appeal</li>
                                <li>She's drawn to products that are simple, elegant, and different</li>
                                <li>Felt good about supporting something eco-friendly and woman-founded</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Melanie */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">3</span>
                              <h3 className="text-xl font-bold text-purple-800">Melanie</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Saw it on Kickstarter and loved the eco-conscious mission</li>
                                <li>The structure and sleekness of the design stood out</li>
                                <li>Thought it would fit well into her professional wardrobe</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Hesitated at the price point, but decided it was worth it if quality delivered</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Was genuinely surprised by the high-end feel when it arrived</li>
                                <li>LaFlore checked both her boxes: fashion-forward and ethical</li>
                                <li>She views the bag as a reflection of her values and identity</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Caroline */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">4</span>
                              <h3 className="text-xl font-bold text-purple-800">Caroline</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>The European aesthetic and versatility for daily life</li>
                                <li>Loved the convertible function and minimalist design</li>
                                <li>The sustainability angle sealed the deal</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Slight hesitation about the size (would it hold enough?)</li>
                                <li>Otherwise, felt confident because she backed other campaigns</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Likes products that are elevated, practical, and intentional</li>
                                <li>Described the bag as luxurious yet simple</li>
                                <li>Envisions using it for travel and everyday errands alike</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Janice */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">5</span>
                              <h3 className="text-xl font-bold text-purple-800">Janice</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Appealed to her as a vegan, non-leather option</li>
                                <li>Wasn't "greenwashed"—seemed genuinely ethical</li>
                                <li>Convertible, clean design with a professional edge</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Unsure if cork would feel cheap or fall apart</li>
                                <li>Surprised and impressed by the craftsmanship</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Bought during a transitional time—starting a new job</li>
                                <li>Wanted something that was both intentional and attractive</li>
                                <li>Finds herself now using it as a go-to bag</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Donna */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">6</span>
                              <h3 className="text-xl font-bold text-purple-800">Donna</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Loved the eco-conscious, sustainable story</li>
                                <li>Aesthetically pleasing, modern and polished</li>
                                <li>Thought it would be perfect for travel and work</li>
                                <li>Found it through Kickstarter</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Price gave her some pause</li>
                                <li>Wondered about material durability</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>She's often between events, meetings, and travel—wanted function without sacrificing style</li>
                                <li>Describes the bag as "forward-thinking" in values and design</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Claranel */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">7</span>
                              <h3 className="text-xl font-bold text-purple-800">Claranel</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Elegant, convertible design</li>
                                <li>Appreciated that it could be dressed up or down</li>
                                <li>Values vegan alternatives and design that feels timeless</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Thought it looked "too perfect"—feared it wouldn't live up to the images</li>
                                <li>Was relieved and impressed when it arrived</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Likes products that are smart and intentional</li>
                                <li>Loved that it had a distinctive character—something she doesn't see in mass market bags</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Carla */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">8</span>
                              <h3 className="text-xl font-bold text-purple-800">Carla</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Searched for a sustainable luxury bag and found LaFlore</li>
                                <li>Liked that it wasn't mass-market—felt like a secret brand</li>
                                <li>Loved the cork, the values, and the European identity</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Worried it might be too good to be true</li>
                                <li>Was blown away when it arrived—called it a "pleasant surprise"</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Wanted something she could wear confidently in Paris or New York</li>
                                <li>Felt the brand matched her values without sacrificing elegance</li>
                                <li>Has a deep appreciation for intentionality and craft</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Betsy */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">9</span>
                              <h3 className="text-xl font-bold text-purple-800">Betsy</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Saw it on Instagram and loved the sleek, convertible design</li>
                                <li>Wanted something that wasn't leather but still looked luxurious</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>None mentioned — purchased quickly</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Seeks products that don't compromise ethics or aesthetics</li>
                                <li>Felt the purchase was aligned with her personal style and values</li>
                              </ul>
                            </div>
                          </div>
                          
                          {/* Lauren */}
                          <div className="bg-white rounded-lg shadow border border-purple-100 p-6">
                            <div className="flex items-center mb-4">
                              <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">10</span>
                              <h3 className="text-xl font-bold text-purple-800">Lauren</h3>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What drew them in:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>Caught her eye with a Facebook ad</li>
                                <li>Thought the design was beautiful and practical for travel</li>
                                <li>Loved the idea of sustainable cork that looked elevated</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">What caused potential hesitation:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                                <li>None — she was already looking for something like it</li>
                              </ul>
                              
                              <h4 className="font-semibold text-purple-800 mb-2">Extra insights:</h4>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Uses it for both events and daily carry</li>
                                <li>She found it filled a gap in the market—polished, ethical, and functional</li>
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 

