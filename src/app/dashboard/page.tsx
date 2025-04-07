'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import Dashboard from '../../components/Dashboard';

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

// Type for segment to ensure correct values
type Segment = 'high_seller' | 'low_seller' | 'neutral';

// Mock data based on real interview insights
const mockData = {
  interviewCount: 15,
  highSellerCount: 8,
  lowSellerCount: 7,
  insights: [
    {
      question: "What causes users to try/use Ripples?",
      insights: [
        {
          title: "Leads/Conversions",
          percentage: 60,
          description: "Agencies primarily seek more leads and conversions for their clients",
          quotes: [
            {
              text: "The client wanted us to find new ways to reach buyers. Our ultimate goal was getting people filling out the lead form.",
              source: "Agency Director",
              segment: "high_seller" as Segment,
              theme: "Client needs"
            },
            {
              text: "We find to find new sources for potential customers. The only thing we care about is more leads and conversions.",
              source: "Marketing Manager",
              segment: "low_seller" as Segment,
              theme: "Performance"
            },
            {
              text: "We wanted to find new ways to get more leads for our clients. That was our sole purpose.",
              source: "Account Manager",
              segment: "high_seller" as Segment,
              theme: "Client acquisition"
            },
            {
              text: "We do performance marketing. Leads and conversions are all we care about.",
              source: "Digital Marketer",
              segment: "high_seller" as Segment,
              theme: "Performance"
            }
          ]
        },
        {
          title: "Traffic",
          percentage: 20,
          description: "Driving volume of traffic to client websites and content",
          quotes: [
            {
              text: "We were measuring success purely based on volume of traffic",
              source: "Agency Owner",
              segment: "low_seller" as Segment,
              theme: "Traffic metrics"
            },
            {
              text: "We use it for article placement to drive traffic to blogs and articles, primarily from an SEO perspective.",
              source: "Content Manager",
              segment: "high_seller" as Segment,
              theme: "Content promotion"
            },
            {
              text: "We promote original content that we write and use Ripples to advertise those pieces of content in native places. We use Ripples for niche targeting to drive traffic to those pieces of content.",
              source: "Content Strategist",
              segment: "high_seller" as Segment,
              theme: "Content promotion"
            }
          ]
        },
        {
          title: "Awareness",
          percentage: 20,
          description: "Generating brand awareness for clients",
          quotes: [
            {
              text: "Obviously it depends on the client, but we use Ripples when trying to generate awareness for our clients by targeting specific audiences on specific sites and platforms. The main focus is awareness.",
              source: "Brand Manager",
              segment: "high_seller" as Segment,
              theme: "Brand awareness"
            },
            {
              text: "Ripples is best for awareness. That's what we use it for.",
              source: "Media Buyer",
              segment: "neutral" as Segment,
              theme: "Brand awareness"
            },
            {
              text: "We only use it for exposure and awareness. Hopefully it'll result in sales. But the main focus is awareness.",
              source: "Agency Strategist",
              segment: "low_seller" as Segment,
              theme: "Brand awareness"
            }
          ]
        }
      ],
      chart: {
        type: 'pie' as const,
        data: {
          labels: ['Leads/Conversions', 'Traffic', 'Awareness'],
          datasets: [
            {
              data: [60, 20, 20],
              backgroundColor: [
                'rgb(14, 165, 233)',   // Sky blue
                'rgb(34, 197, 94)',     // Green
                'rgb(249, 115, 22)'     // Orange
              ],
              borderColor: [
                'rgb(14, 165, 233)',
                'rgb(34, 197, 94)',
                'rgb(249, 115, 22)'
              ],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: 'white',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              padding: 12,
              cornerRadius: 6
            }
          }
        }
      }
    },
    {
      question: "What unique value does Ripples provide?",
      insights: [
        {
          title: "Reach Large Audiences",
          percentage: 33,
          description: "Access to massive market and high traffic volume",
          quotes: [
            {
              text: "Ripples drives a lot of traffic because of the access to a massive market. We can get more scale with Ripples.",
              source: "Media Director",
              segment: "high_seller" as Segment,
              theme: "Scale"
            },
            {
              text: "It reaches audiences in a wide variety of places allowing us to scale up a campaign. With Ripples, we don't have to go to all these places individually and reach all of them with the same campaign.",
              source: "Campaign Manager",
              segment: "high_seller" as Segment,
              theme: "Efficiency"
            },
            {
              text: "Ripples has tons of distribution on high-authority websites which reaches more people and gets more visibility.",
              source: "Media Planner",
              segment: "neutral" as Segment,
              theme: "Distribution"
            }
          ]
        },
        {
          title: "Cheaper Cost of Traffic",
          percentage: 33,
          description: "Lower cost per click compared to other platforms",
          quotes: [
            {
              text: "Ripples has cheap high volume of top of funnel traffic with a low cost per click. I don't use it for straight conversions because the quality isn't as high.",
              source: "Performance Marketer",
              segment: "low_seller" as Segment,
              theme: "Traffic cost"
            },
            {
              text: "It's a cheaper cost of traffic, making it a good place to promote blog articles and drive traffic to them. It's great for retargeting audiences, back link building and onsite SEO.",
              source: "SEO Specialist",
              segment: "high_seller" as Segment,
              theme: "Content promotion"
            },
            {
              text: "Ripples is way less expensive than Google, Meta, TikTok and IG. Ripples gets way more impressions and clicks for fraction of the cost.",
              source: "Digital Media Buyer",
              segment: "high_seller" as Segment,
              theme: "Cost efficiency"
            }
          ]
        },
        {
          title: "Niche Targeting",
          percentage: 27,
          description: "Ability to target specific audiences and demographics",
          quotes: [
            {
              text: "We can narrow down industry and type of demographic and get really specific. The value is that it delivers ads to the specific audience that the client wants and spending money getting to the right people.",
              source: "Targeting Specialist",
              segment: "high_seller" as Segment,
              theme: "Targeting precision"
            },
            {
              text: "Ripples has very specific targeting. The platform has a lot of opportunities to target specific groups.",
              source: "Campaign Strategist",
              segment: "neutral" as Segment,
              theme: "Targeting options"
            },
            {
              text: "Ripples has really good targeting and categories that other platforms don't allow for.",
              source: "Media Planner",
              segment: "high_seller" as Segment,
              theme: "Platform comparison"
            },
            {
              text: "There are big problems with FB and Google with narrowing down niches in the right demographics. You can't get specific. I love Ripples for this.",
              source: "Digital Marketer",
              segment: "high_seller" as Segment,
              theme: "Platform comparison"
            }
          ]
        },
        {
          title: "No value",
          percentage: 33,
          description: "Some agencies found no value in the platform",
          quotes: [
            {
              text: "It was a waste. We didn't get any leads.",
              source: "Agency Owner",
              segment: "low_seller" as Segment,
              theme: "Disappointing results"
            },
            {
              text: "It didn't do anything for us. We couldn't get it to work.",
              source: "Marketing Manager",
              segment: "low_seller" as Segment,
              theme: "Usability issues"
            }
          ]
        }
      ],
      chart: {
        type: 'bar' as const,
        data: {
          labels: ['Reach Large Audiences', 'Cheaper Cost of Traffic', 'Niche Targeting', 'No value'],
          datasets: [
            {
              label: 'Percentage of Agencies',
              data: [33, 33, 27, 33],
              backgroundColor: [
                'rgb(14, 165, 233)',    // Sky blue
                'rgb(34, 197, 94)',     // Green
                'rgb(168, 85, 247)',    // Purple
                'rgb(236, 72, 153)'     // Pink
              ],
              borderColor: [
                'rgb(14, 165, 233)',
                'rgb(34, 197, 94)',
                'rgb(168, 85, 247)',
                'rgb(236, 72, 153)'
              ],
              borderWidth: 1,
              borderRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              padding: 12,
              cornerRadius: 6
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(75, 85, 99, 0.2)'
              },
              ticks: {
                color: 'rgba(209, 213, 219, 0.8)'
              }
            },
            y: {
              grid: {
                display: false
              },
              ticks: {
                color: 'rgba(209, 213, 219, 0.8)'
              }
            }
          }
        }
      }
    },
    {
      question: "What challenges do users encounter?",
      insights: [
        {
          title: "No Challenges",
          percentage: 40,
          description: "Many users reported no issues with the platform",
          quotes: [
            {
              text: "I had no issues at all. It was super easy to set up.",
              source: "Digital Specialist",
              segment: "high_seller" as Segment,
              theme: "Ease of use"
            },
            {
              text: "Very straightforward to get started.",
              source: "Campaign Manager",
              segment: "high_seller" as Segment,
              theme: "Onboarding"
            }
          ]
        },
        {
          title: "Unclear why it's not working",
          percentage: 33,
          description: "Users couldn't understand why campaigns weren't producing results",
          quotes: [
            {
              text: "Our team has played with it a lot and with all honesty I don't know why it's not working. Didn't even get 1 conversion.",
              source: "Performance Marketer",
              segment: "low_seller" as Segment,
              theme: "Performance issues"
            },
            {
              text: "There's nothing in particular that I struggled with. I just couldn't figure out how to get it to work.",
              source: "Media Buyer",
              segment: "low_seller" as Segment,
              theme: "Performance issues"
            },
            {
              text: "I spent several hours going through the university learning prior to. I thought I used the best practices guides. I did use the articles. But didn't see any leads at all. Zero conversions.",
              source: "Agency Director",
              segment: "low_seller" as Segment,
              theme: "Performance issues"
            }
          ]
        },
        {
          title: "Learning Curve",
          percentage: 20,
          description: "Some users found the platform complex to learn",
          quotes: [
            {
              text: "Learning the tool is the hardest part. I spent quite a bit of time digging around and looking for guidance and how to use the rules.",
              source: "New User",
              segment: "neutral" as Segment,
              theme: "Learning difficulty"
            },
            {
              text: "User experience was too complex. It was overwhelmingly jarring. It requires a steep learning curve. I powered through it because I'm desperate. It's a very overwhelming experience.",
              source: "Digital Marketer",
              segment: "low_seller" as Segment,
              theme: "Complexity"
            }
          ]
        },
        {
          title: "Other Issues",
          percentage: 14,
          description: "Compliance review process and tracking issues",
          quotes: [
            {
              text: "The automatic review process blocks things by default which would otherwise not be removed. They cancel things in the middle of campaigns. The compliance review process is inefficient.",
              source: "Campaign Manager",
              segment: "low_seller" as Segment,
              theme: "Compliance process"
            },
            {
              text: "It said everything was fine and got the green check marks, but wasn't seeing any of the pixels firing that they've been hit. There was a lot of back and forth with the tech team.",
              source: "Technical Specialist",
              segment: "low_seller" as Segment,
              theme: "Tracking issues"
            }
          ]
        }
      ],
      chart: {
        type: 'pie' as const,
        data: {
          labels: ['No Challenges', 'Unclear Why Not Working', 'Learning Curve', 'Other Issues'],
          datasets: [
            {
              data: [40, 33, 20, 14],
              backgroundColor: [
                'rgb(34, 197, 94)',     // Green
                'rgb(234, 179, 8)',     // Yellow
                'rgb(14, 165, 233)',    // Sky blue
                'rgb(148, 163, 184)'    // Slate
              ],
              borderColor: [
                'rgb(34, 197, 94)',
                'rgb(234, 179, 8)',
                'rgb(14, 165, 233)',
                'rgb(148, 163, 184)'
              ],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: 'white',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              padding: 12,
              cornerRadius: 6
            }
          }
        }
      }
    },
    {
      question: "What are users' unmet expectations?",
      insights: [
        {
          title: "No unmet expectations",
          percentage: 33,
          description: "Platform met expectations for many users",
          quotes: [
            {
              text: "Nothing was unexpected.",
              source: "Campaign Manager",
              segment: "high_seller" as Segment,
              theme: "Satisfaction"
            },
            {
              text: "I have some feedback but it was exactly what I expected.",
              source: "Media Planner",
              segment: "neutral" as Segment,
              theme: "Satisfaction"
            }
          ]
        },
        {
          title: "Poor quality traffic",
          percentage: 33,
          description: "Concerns about bot traffic and quality of leads",
          quotes: [
            {
              text: "We got leads - but they were really really really bad. People entered fake stuff. They entered vulgar information in the form fields. It really spooked out our client.",
              source: "Account Manager",
              segment: "low_seller" as Segment,
              theme: "Lead quality"
            },
            {
              text: "We use lucky orange to see scrollability. There was high evidence of bot traffic. It recorded lots of clicks with no activity or engagement on the site.",
              source: "Analytics Specialist",
              segment: "low_seller" as Segment,
              theme: "Bot traffic"
            },
            {
              text: "There is way too much bot traffic. There are sites with low views and high clicks. It means there's weird stuff going on in terms of fraud.",
              source: "Media Buyer",
              segment: "low_seller" as Segment,
              theme: "Fraud concerns"
            },
            {
              text: "I expected the quality of the traffic to be better.",
              source: "Performance Marketer",
              segment: "low_seller" as Segment,
              theme: "Traffic quality"
            }
          ]
        },
        {
          title: "No leads/conversions",
          percentage: 27,
          description: "Campaign failed to produce expected leads or sales",
          quotes: [
            {
              text: "I thought after spending $400 there would be leads. The phone didn't ring once. It's disheartening.",
              source: "Agency Owner",
              segment: "low_seller" as Segment,
              theme: "ROI concerns"
            },
            {
              text: "I was expecting to convert at a 1:1 ROAS. I was expecting to see results as soon as being on high quality domains. My plan was to spend $5000 but we didn't get a single lead after spending $658.",
              source: "Agency Director",
              segment: "low_seller" as Segment,
              theme: "ROAS expectations"
            },
            {
              text: "We've been with Ripples for 6 months and didn't even get 1 lead. Tried it with 10 different clients and it didn't work.",
              source: "Account Manager",
              segment: "low_seller" as Segment,
              theme: "Persistent failure"
            },
            {
              text: "I realized it's much more of an awareness play, not for conversions.",
              source: "Media Planner",
              segment: "neutral" as Segment,
              theme: "Expectation adjustment"
            }
          ]
        },
        {
          title: "Tracking Issues",
          percentage: 7,
          description: "Difficulties with conversion tracking",
          quotes: [
            {
              text: "I thought setting up tracking for conversions would be easier. It didn't work right and was confusing to do. We are used to complex methods of setting up tracking which might haven't been the reason.",
              source: "Technical Specialist",
              segment: "low_seller" as Segment,
              theme: "Tracking complexity"
            }
          ]
        }
      ],
      chart: {
        type: 'bar' as const,
        data: {
          labels: ['No unmet expectations', 'Poor quality traffic', 'No leads/conversions', 'Tracking Issues'],
          datasets: [
            {
              label: 'Percentage of Agencies',
              data: [33, 33, 27, 7],
              backgroundColor: [
                'rgb(34, 197, 94)',     // Green
                'rgb(249, 115, 22)',    // Orange
                'rgb(236, 72, 153)',    // Pink
                'rgb(14, 165, 233)'     // Sky blue
              ],
              borderColor: [
                'rgb(34, 197, 94)',
                'rgb(249, 115, 22)',
                'rgb(236, 72, 153)',
                'rgb(14, 165, 233)'
              ],
              borderWidth: 1,
              borderRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              padding: 12,
              cornerRadius: 6
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(75, 85, 99, 0.2)'
              },
              ticks: {
                color: 'rgba(209, 213, 219, 0.8)'
              }
            },
            y: {
              grid: {
                color: 'rgba(75, 85, 99, 0.2)'
              },
              ticks: {
                color: 'rgba(209, 213, 219, 0.8)'
              }
            }
          }
        }
      }
    },
    {
      question: "What do users want Ripples to improve?",
      insights: [
        {
          title: "Filter out bot traffic",
          percentage: 40,
          description: "Better control over traffic quality and site filtering",
          quotes: [
            {
              text: "I want to know how to avoid junk leads. Specific guidance on how to not have junk leads. Or, just not have the junk leads at all.",
              source: "Agency Director",
              segment: "low_seller" as Segment,
              theme: "Lead quality"
            },
            {
              text: "I've been working in ad tech for 15 years. The amount of bot traffic that exists is really high. They need to do a better job of filtering out bot traffic.",
              source: "Ad Tech Veteran",
              segment: "low_seller" as Segment,
              theme: "Traffic quality"
            },
            {
              text: "I want the option to have a black list campaign and a white list to filter to know which is good and which isn't. I don't want bad traffic.",
              source: "Campaign Manager",
              segment: "low_seller" as Segment,
              theme: "Site filtering"
            },
            {
              text: "There are lots of garbage sites that pop up on Ripples. The more control we have, the better. Would love to use Ripples more extensively, but there isn't enough control and optionality.",
              source: "Media Buyer",
              segment: "neutral" as Segment,
              theme: "Control options"
            }
          ]
        },
        {
          title: "Guidance on what gets leads",
          percentage: 33,
          description: "Better guidance on campaign optimization and performance",
          quotes: [
            {
              text: "We need expert guidance on what copy and positioning actually works to get leads. If we can start getting conversions, we will use this for all our customers. We have over 100.",
              source: "Agency Owner",
              segment: "low_seller" as Segment,
              theme: "Best practices"
            },
            {
              text: "I'd love a short video that explains: 'If you're doing lead gen, here is what you have to do.'",
              source: "Performance Marketer",
              segment: "low_seller" as Segment,
              theme: "Educational content"
            },
            {
              text: "If there was guidance in terms of ad budget and leads it would've been helpful. For example, if it said 'if your goal is to generate X leads in X time frame, we suggest X budget.' this would be valuable.",
              source: "Media Planner",
              segment: "neutral" as Segment,
              theme: "Budget guidance"
            },
            {
              text: "Maybe I didn't go through the tutorials enough, but if there was clear 'how to rules' on how to make me more profitable, I would leverage the platform better.",
              source: "Digital Marketer",
              segment: "low_seller" as Segment,
              theme: "Profitability guidance"
            }
          ]
        },
        {
          title: "Other Improvements",
          percentage: 27,
          description: "Account management, invoicing, and reporting improvements",
          quotes: [
            {
              text: "I have to send an email to team members to add people to the account. It was hard to add my boss and coworkers to see the billing. It would be great if this wasn't an issue.",
              source: "Account Manager",
              segment: "neutral" as Segment,
              theme: "Account management"
            },
            {
              text: "I want to be charged when a campaign stops. The invoicing was inconsistent. I had a charge for November that went into December. Makes it messy for expense reports for client billing.",
              source: "Finance Manager",
              segment: "neutral" as Segment,
              theme: "Invoicing"
            },
            {
              text: "The reporting capabilities are limited. Right now I have to go into each day and pull how the ads did each did. I want to pull a report month and see how the ads did each day.",
              source: "Analytics Specialist",
              segment: "high_seller" as Segment,
              theme: "Reporting"
            },
            {
              text: "If Ripples can improve the targeting piece, that would be a competitive differentiator. Right now, I can't target combinations of segments and deep targeting.",
              source: "Targeting Specialist",
              segment: "high_seller" as Segment,
              theme: "Targeting improvements"
            }
          ]
        }
      ],
      chart: {
        type: 'radar' as const,
        data: {
          labels: ['Filter Bot Traffic', 'Lead Generation Guidance', 'Account Management', 'Invoicing', 'Reporting', 'Targeting'],
          datasets: [
            {
              label: 'Improvement Priority',
              data: [40, 33, 10, 7, 5, 5],
              backgroundColor: 'rgba(14, 165, 233, 0.2)',
              borderColor: 'rgb(14, 165, 233)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(14, 165, 233)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(14, 165, 233)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: 'rgba(255, 255, 255, 0.15)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.15)'
              },
              pointLabels: {
                color: 'rgba(255, 255, 255, 0.7)',
                font: {
                  size: 11
                }
              },
              ticks: {
                backdropColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              padding: 12,
              cornerRadius: 6
            }
          }
        }
      }
    }
  ],
  quarterlyComparison: {
    previousQuarter: {
      "Leads/Conversions Focus": 50,
      "Traffic Focus": 30,
      "Awareness Focus": 20,
      "Reporting Poor Lead Quality": 20,
      "No Conversions Reported": 20,
      "Satisfied With Platform": 50
    },
    currentQuarter: {
      "Leads/Conversions Focus": 60,
      "Traffic Focus": 20,
      "Awareness Focus": 20,
      "Reporting Poor Lead Quality": 33,
      "No Conversions Reported": 27,
      "Satisfied With Platform": 40
    }
  }
};

export default function DashboardPage() {
  return (
    <div>
      <Dashboard data={mockData} />
    </div>
  );
} 