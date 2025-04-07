'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import Dashboard from '../../components/Dashboard';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

// Define the types to match the Dashboard component
type SegmentType = 
  | 'closed_lost' 
  | 'churned' 
  | 'abandoned_cart' 
  | 'trial_unconverted' 
  | 'closed_won' 
  | 'loyal_customers';

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

// Mock data with proper typing
const mockData = {
  interviewCount: 15,
  segments: [
    {
      id: 'closed_lost' as SegmentType,
      name: 'Closed Lost',
      description: 'Customers who evaluated your solution but didn\'t buy.'
    },
    {
      id: 'churned' as SegmentType,
      name: 'Churned',
      description: 'Customers who bought, used, and then left.'
    },
    {
      id: 'abandoned_cart' as SegmentType,
      name: 'Abandoned Cart',
      description: 'Customers who added to cart but didn\'t complete purchase.'
    },
    {
      id: 'trial_unconverted' as SegmentType,
      name: 'Trial → Unconverted',
      description: 'Customers who tried the product but didn\'t upgrade or subscribe.'
    },
    {
      id: 'closed_won' as SegmentType,
      name: 'Closed Won',
      description: 'Customers who recently bought or signed up.'
    },
    {
      id: 'loyal_customers' as SegmentType,
      name: 'Loyal Customers',
      description: 'Customers who have stuck around, renewed, or use the product consistently.'
    }
  ],
  products: [
    {
      id: 'product_a',
      name: 'Product A'
    },
    {
      id: 'product_b',
      name: 'Product B'
    },
    {
      id: 'product_c',
      name: 'Product C'
    }
  ],
  insightCategories: [
    {
      id: 'pain_trigger' as InsightCategoryType,
      name: 'Pain / Trigger',
      description: 'What problem led them here?',
      question: 'What was happening that made you start looking for a solution?'
    },
    {
      id: 'desired_outcome' as InsightCategoryType,
      name: 'Desired Outcome',
      description: 'What change were they hoping for?',
      question: 'What were you hoping would change by solving this?'
    },
    {
      id: 'hesitation_risk' as InsightCategoryType,
      name: 'Hesitation / Risk',
      description: 'What made them hesitate or have doubts?',
      question: 'What gave you pause about moving forward with us?'
    },
    {
      id: 'expectation_gap' as InsightCategoryType,
      name: 'Expectation Gap',
      description: 'What didn\'t meet expectations?',
      question: 'What felt like it wouldn\'t work or wasn\'t built for you?'
    },
    {
      id: 'value_impact' as InsightCategoryType,
      name: 'Value / Impact',
      description: 'What value or impact did they experience?',
      question: 'What did they actually experience or achieve?'
    },
    {
      id: 'delight_surprise' as InsightCategoryType,
      name: 'Delight / Surprise',
      description: 'What exceeded expectations?',
      question: 'What worked better than expected?'
    },
    {
      id: 'suggestions_ideas' as InsightCategoryType,
      name: 'Suggestions / Ideas',
      description: 'What would improve the experience?',
      question: 'What would you add, change, or improve?'
    }
  ],
  insights: {
    // Closed Lost
    closed_lost: {
      product_a: {
        pain_trigger: [
          {
            title: "Client Demand",
            percentage: 60,
            description: "Clients requested new ways to reach potential customers",
            quotes: [
              {
                text: "Our clients were demanding more innovative ways to reach their target audience and we needed to explore new options.",
                source: "Marketing Director",
                segment: "closed_lost" as SegmentType,
                product: "product_a",
                theme: "Client pressure",
                category: "pain_trigger" as InsightCategoryType
              },
              {
                text: "We were losing business because we couldn't offer what competitors were offering in terms of reach.",
                source: "Agency Owner",
                segment: "closed_lost" as SegmentType,
                product: "product_a",
                theme: "Competitive pressure",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          },
          {
            title: "Performance Issues",
            percentage: 40,
            description: "Current solutions weren't performing well enough",
            quotes: [
              {
                text: "Our existing tools were giving us diminishing returns. We needed something that could deliver better results.",
                source: "Performance Manager",
                segment: "closed_lost" as SegmentType,
                product: "product_a",
                theme: "Diminishing returns",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        hesitation_risk: [
          {
            title: "Cost Concerns",
            percentage: 75,
            description: "Pricing was perceived as too high for value offered",
            quotes: [
              {
                text: "The pricing structure was difficult to justify to our finance team given our uncertain ROI projections.",
                source: "Marketing Director",
                segment: "closed_lost" as SegmentType,
                product: "product_a",
                theme: "Budget constraints",
                category: "hesitation_risk" as InsightCategoryType
              },
              {
                text: "We did a cost analysis against competitors and couldn't justify the premium being charged.",
                source: "Finance Director",
                segment: "closed_lost" as SegmentType,
                product: "product_a",
                theme: "Price comparison",
                category: "hesitation_risk" as InsightCategoryType
              }
            ]
          }
        ]
      },
      product_b: {
        pain_trigger: [
          {
            title: "Integration Challenges",
            percentage: 65,
            description: "Existing stack integration problems",
            quotes: [
              {
                text: "Our tech stack was becoming fragmented and we needed a solution that would work seamlessly with our existing tools.",
                source: "CTO",
                segment: "closed_lost" as SegmentType,
                product: "product_b",
                theme: "Integration needs",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        expectation_gap: [
          {
            title: "Feature Limitations",
            percentage: 80,
            description: "Missing critical features needed for use case",
            quotes: [
              {
                text: "We were expecting more advanced reporting capabilities than what was offered. The dashboards were too basic for our needs.",
                source: "Analytics Manager",
                segment: "closed_lost" as SegmentType,
                product: "product_b",
                theme: "Reporting needs",
                category: "expectation_gap" as InsightCategoryType
              },
              {
                text: "The API limitations were a dealbreaker. We needed deeper integration than what was possible.",
                source: "Technical Director",
                segment: "closed_lost" as SegmentType,
                product: "product_b",
                theme: "Technical limitations",
                category: "expectation_gap" as InsightCategoryType
              }
            ]
          }
        ]
      }
    },
    // Trial Unconverted
    trial_unconverted: {
      product_a: {
        pain_trigger: [
          {
            title: "Market Expansion",
            percentage: 70,
            description: "Needed to reach new market segments",
            quotes: [
              {
                text: "We were hitting a ceiling with our current audience and needed to break into new markets to continue growing.",
                source: "Growth Manager",
                segment: "trial_unconverted" as SegmentType,
                product: "product_a",
                theme: "Growth limitations",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        expectation_gap: [
          {
            title: "Ease of Use",
            percentage: 65,
            description: "Product was more complicated than expected",
            quotes: [
              {
                text: "The learning curve was steeper than we anticipated. We needed something our team could pick up quickly.",
                source: "Marketing Manager",
                segment: "trial_unconverted" as SegmentType,
                product: "product_a",
                theme: "Learning curve",
                category: "expectation_gap" as InsightCategoryType
              },
              {
                text: "Setting up campaigns took way too many steps compared to our current tools.",
                source: "Campaign Specialist",
                segment: "trial_unconverted" as SegmentType,
                product: "product_a",
                theme: "Workflow efficiency",
                category: "expectation_gap" as InsightCategoryType
              }
            ]
          }
        ],
        desired_outcome: [
          {
            title: "Better Conversion Rates",
            percentage: 80,
            description: "Wanted to improve overall conversion performance",
            quotes: [
              {
                text: "We were looking for at least a 15% lift in conversion rates to justify switching platforms.",
                source: "Performance Director",
                segment: "trial_unconverted" as SegmentType,
                product: "product_a",
                theme: "Performance goals",
                category: "desired_outcome" as InsightCategoryType
              }
            ]
          }
        ]
      },
      product_c: {
        pain_trigger: [
          {
            title: "Competitive Pressure",
            percentage: 55,
            description: "Needed to match competitor capabilities",
            quotes: [
              {
                text: "Our competitors were offering features we couldn't match with our current toolkit.",
                source: "Product Manager",
                segment: "trial_unconverted" as SegmentType,
                product: "product_c",
                theme: "Competitive landscape",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        suggestions_ideas: [
          {
            title: "Simpler Onboarding",
            percentage: 70,
            description: "Need more guided setup and tutorials",
            quotes: [
              {
                text: "A step-by-step guided setup would have made a huge difference in our ability to get value quickly.",
                source: "Digital Marketing Manager",
                segment: "trial_unconverted" as SegmentType,
                product: "product_c",
                theme: "Onboarding experience",
                category: "suggestions_ideas" as InsightCategoryType
              },
              {
                text: "Video tutorials for each feature would have helped our team come up to speed faster.",
                source: "Training Coordinator",
                segment: "trial_unconverted" as SegmentType,
                product: "product_c",
                theme: "Learning resources",
                category: "suggestions_ideas" as InsightCategoryType
              }
            ]
          }
        ]
      }
    },
    // Abandoned Cart
    abandoned_cart: {
      product_b: {
        pain_trigger: [
          {
            title: "Cost Efficiency",
            percentage: 60,
            description: "Seeking more cost-effective solutions",
            quotes: [
              {
                text: "Our marketing budget was under scrutiny and we needed to find more cost-effective channels.",
                source: "Marketing Director",
                segment: "abandoned_cart" as SegmentType,
                product: "product_b",
                theme: "Budget pressure",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        hesitation_risk: [
          {
            title: "Implementation Concerns",
            percentage: 75,
            description: "Worried about time and resources needed to implement",
            quotes: [
              {
                text: "When I saw how much time we'd need to invest in setup, I couldn't commit without more discussion with my team.",
                source: "Project Manager",
                segment: "abandoned_cart" as SegmentType,
                product: "product_b",
                theme: "Resource allocation",
                category: "hesitation_risk" as InsightCategoryType
              },
              {
                text: "The implementation timeline seemed too long given our immediate needs.",
                source: "Operations Director",
                segment: "abandoned_cart" as SegmentType,
                product: "product_b",
                theme: "Timeline concerns",
                category: "hesitation_risk" as InsightCategoryType
              }
            ]
          }
        ]
      }
    },
    // Loyal Customers
    loyal_customers: {
      product_c: {
        pain_trigger: [
          {
            title: "Scaling Challenges",
            percentage: 65,
            description: "Previous solutions couldn't scale with growth",
            quotes: [
              {
                text: "As our business grew, our previous tools started breaking down. We needed something robust that could grow with us.",
                source: "Operations Director",
                segment: "loyal_customers" as SegmentType,
                product: "product_c",
                theme: "Scalability",
                category: "pain_trigger" as InsightCategoryType
              }
            ]
          }
        ],
        value_impact: [
          {
            title: "Efficiency Improvements",
            percentage: 85,
            description: "Significant time and resource savings",
            quotes: [
              {
                text: "We've cut campaign setup time by 60% and reduced the resources needed for management by half.",
                source: "Campaign Director",
                segment: "loyal_customers" as SegmentType,
                product: "product_c",
                theme: "Time savings",
                category: "value_impact" as InsightCategoryType
              },
              {
                text: "The automation features allowed us to reallocate two full-time staff to more strategic initiatives.",
                source: "Resource Manager",
                segment: "loyal_customers" as SegmentType,
                product: "product_c",
                theme: "Resource optimization",
                category: "value_impact" as InsightCategoryType
              }
            ]
          }
        ],
        delight_surprise: [
          {
            title: "Customer Support",
            percentage: 90,
            description: "Exceptional support experience",
            quotes: [
              {
                text: "The support team has been incredibly responsive. We never wait more than an hour for help with complex issues.",
                source: "Account Manager",
                segment: "loyal_customers" as SegmentType,
                product: "product_c",
                theme: "Support quality",
                category: "delight_surprise" as InsightCategoryType
              },
              {
                text: "I was surprised by how often they proactively reached out with optimization suggestions that actually improved our results.",
                source: "Marketing Manager",
                segment: "loyal_customers" as SegmentType,
                product: "product_c",
                theme: "Proactive service",
                category: "delight_surprise" as InsightCategoryType
              }
            ]
          }
        ]
      }
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