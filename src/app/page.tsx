'use client';

import { useState } from 'react';

interface FormData {
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

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    clientName: 'JJ',
    businessName: 'Coffee Catering Co.',
    interviewDate: new Date().toISOString().split('T')[0],
    role: 'Owner',
    businessType: 'Coffee Catering',
    location: 'San Francisco, CA',
    
    // Product Experience
    experienceWithProduct: 'First saw Ripples on Instagram, became a "no brainer" after mentor got one',
    howDiscovered: 'Social media and industry mentor recommendation',
    purchaseDecisionFactors: 'Branding capabilities, revenue potential, and social proof',
    initialExpectations: 'Expected to enhance customer experience and increase revenue',
    currentSatisfaction: 'Highly satisfied with product performance and customer response',
    
    // Social & Marketing
    socialMediaImpact: 'Meta Reel collaboration on Instagram as a cool social media interaction',
    socialMediaPlatforms: 'Instagram, Facebook, LinkedIn',
    marketingEffectiveness: 'High engagement on social media posts featuring Ripples',
    wordOfMouthImpact: 'Strong word-of-mouth referrals from satisfied clients',
    
    // Revenue & Pricing
    revenuePotential: '50% of revenue comes from upcharging and offering Ripples',
    currentRevenue: 'Significant increase in average ticket price',
    pricingApproach: 'Charges corporate clients an hourly rate specifically for the ripple printer',
    pricingFlexibility: 'Flexible pricing based on event type and client needs',
    costRecovery: 'Recovered initial investment within 6 months',
    
    // Value & Branding
    perceivedValue: 'Customer experience and branding opportunities for clients. It\'s a way to make customers happier and a total crowd-pleaser',
    valueDrivers: 'Branding and Customisation, Enhanced Customer Experience, Revenue Generation, Marketing and Promotional Tool',
    brandingImportance: 'Main motivation behind purchasing Ripples. Corporate clients look for every touchpoint to be branded',
    customizationNeeds: 'High demand for logo and message customization',
    competitiveAdvantage: 'Unique offering in the market, sets business apart',
    
    // Usage Patterns
    usageFrequency: 'Uses Ripples at about 20% of events',
    eventTypes: 'Corporate events, weddings, private parties',
    peakUsageTimes: 'Weekends and corporate event days',
    equipmentNeeds: 'One machine currently, considering second unit',
    maintenanceChallenges: 'Regular cleaning and cartridge replacement',
    
    // Performance
    highPerformerBehaviors: 'Proactively includes Ripples in initial offer, shows visuals of printed logos, sees it as significant upsell opportunity',
    lowPerformerBehaviors: 'Lack of proactive promotion, not clearly articulating benefits, inconsistent usage due to perceived cost or logistical issues',
    successMetrics: 'Increased bookings, higher customer satisfaction, more referrals',
    performanceChallenges: 'Managing equipment during peak times',
    
    // Support & Resources
    marketingSupportNeeds: 'Videos and images for websites, listing on Ripples website as certified experts, direct referral system, SEO and advertising support',
    salesMaterialsNeeded: 'Video showcasing Ripples in use, product images, latte mock-up tool, best practice guides',
    trainingNeeds: 'Advanced customization techniques, troubleshooting guides',
    technicalSupport: 'Quick response needed for technical issues',
    demoTestingSupport: 'Ability to easily test the machine before events to avoid surprises',
    
    // Referral & Growth
    referralProcess: 'More consistent and higher quality leads, clear communication about referral management, potential for cost/revenue-sharing model',
    referralQuality: 'High-quality leads from corporate sector',
    growthOpportunities: 'Leveraging wow factor for increased bookings, capitalizing on branded experiences in corporate sector',
    expansionPlans: 'Adding second machine, expanding to new markets',
    partnershipInterest: 'Interested in partnerships with event planners',
    
    // Technical & Operational
    supportFrustrations: 'Difficulty in resolving technical issues remotely, concerns about potentially faulty consumables',
    technicalChallenges: 'Cartridge issues, machine calibration',
    equipmentReliability: 'Generally reliable with proper maintenance',
    consumableIssues: 'Occasional cartridge quality concerns',
    integrationNeeds: 'Better integration with existing equipment',
    
    // Feedback & Recommendations
    feedback: 'Amazing product with great customer support. Helps convey value to wedding market and consumers',
    recommendations: 'Implement strong referral program, offer training resources, improve machine reliability and support',
    futureExpectations: 'Looking forward to new features and improvements',
    wishlist: 'More design options, better mobile app, enhanced reporting'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Store in localStorage
    const existingData = localStorage.getItem('clientInsights');
    const insights = existingData ? JSON.parse(existingData) : [];
    insights.push(formData);
    localStorage.setItem('clientInsights', JSON.stringify(insights));
    
    alert('Insight submitted successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderSection = (title: string, fields: string[]) => (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
              {field.split(/(?=[A-Z])/).join(' ')}
            </label>
            <textarea
              id={field}
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Customer Insights Questionnaire</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderSection('Basic Information', ['clientName', 'businessName', 'role', 'businessType', 'location'])}
        {renderSection('Product Experience', ['experienceWithProduct', 'howDiscovered', 'purchaseDecisionFactors', 'initialExpectations', 'currentSatisfaction'])}
        {renderSection('Social & Marketing', ['socialMediaImpact', 'socialMediaPlatforms', 'marketingEffectiveness', 'wordOfMouthImpact'])}
        {renderSection('Revenue & Pricing', ['revenuePotential', 'currentRevenue', 'pricingApproach', 'pricingFlexibility', 'costRecovery'])}
        {renderSection('Value & Branding', ['perceivedValue', 'valueDrivers', 'brandingImportance', 'customizationNeeds', 'competitiveAdvantage'])}
        {renderSection('Usage Patterns', ['usageFrequency', 'eventTypes', 'peakUsageTimes', 'equipmentNeeds', 'maintenanceChallenges'])}
        {renderSection('Performance', ['highPerformerBehaviors', 'lowPerformerBehaviors', 'successMetrics', 'performanceChallenges'])}
        {renderSection('Support & Resources', ['marketingSupportNeeds', 'salesMaterialsNeeded', 'trainingNeeds', 'technicalSupport', 'demoTestingSupport'])}
        {renderSection('Referral & Growth', ['referralProcess', 'referralQuality', 'growthOpportunities', 'expansionPlans', 'partnershipInterest'])}
        {renderSection('Technical & Operational', ['supportFrustrations', 'technicalChallenges', 'equipmentReliability', 'consumableIssues', 'integrationNeeds'])}
        {renderSection('Feedback & Recommendations', ['feedback', 'recommendations', 'futureExpectations', 'wishlist'])}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Insight
          </button>
        </div>
      </form>
    </div>
  );
}
