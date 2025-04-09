'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  // Basic Information
  clientName: string;
  interviewDate: string;
  
  // Product Interest
  designAndStyle: string;
  brandStoryAndValues: string;
  
  // Purchase Hesitation
  lackOfImmediateNeed: string;
  priceConcerns: string;
  laptopFit: string;
  
  // Brand Comparison
  comparedToOtherBrands: string;
  capacityAndFitConcerns: string;
  
  // Product Clarity
  unclearSizingOrFit: string;
  
  // Pricing and Shipping
  priceConcernsShipping: string;
  returnShippingUncertainty: string;
  
  // Purchase Confidence
  clearerBagComparison: string;
  discountOrIncentive: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    clientName: 'LaFlore Customer',
    interviewDate: new Date().toISOString().split('T')[0],
    
    // Product Interest
    designAndStyle: 'It doesn\'t look like a typical backpack — it\'s stylish, sleek, and more elevated. I want something sleek and sophisticated… and LaFlore had that. The design is beautiful. It was something different, not your typical bag. The structure is really nice — it\'s not slouchy. It looked stylish and refined, something you could carry to a meeting. It caught my eye. Looked very professional but unique. I liked the minimalist design. It didn\'t look like a tech bag or an outdoorsy bag — it felt intentional.',
    brandStoryAndValues: 'I liked that it was a family-run company. The mother-daughter story was charming. The cork and sustainable materials were a draw. It felt like a family business, not a big corporation. Knowing it\'s eco-friendly made me feel better about the price.',
    
    // Purchase Hesitation
    lackOfImmediateNeed: 'I work from home and don\'t really need a bag right now. My next work trip isn\'t until summer — I\'ve got time. I\'m not going into the office daily, so I held off. It\'s something I want, not something I urgently need. I liked it, but I\'ve been putting off the purchase. It\'s not something I need immediately — just something I\'m considering.',
    priceConcerns: 'It\'s a big investment for a bag I\'ve never tried. It\'s beautiful, but I couldn\'t justify the price given the laptop fit issue. A bit out of my usual budget — I kept hesitating. I wanted to be totally sure before spending that much. I was nervous about paying full price without seeing it first. At full price, it felt like a risk.',
    laptopFit: 'If the 15-inch laptop had fit, I would\'ve bought the bag. It technically fits, but then nothing else fits — it stretches the bag.',
    
    // Brand Comparison
    comparedToOtherBrands: 'I looked at Cuyana and Dagne Dover. LaFlore looked more unique, but the others were cheaper. I checked out a few canvas options. Some were lighter, but not as sleek. I considered Bellroy and Lo & Sons — they had good function, but the look wasn\'t right. I looked at Away\'s bags and some others. LaFlore had a more elevated feel. I\'ve tried similar work bags from other brands, but none had the same polish. I was also browsing travel bags from Samsonite, but those felt bulky. I usually use a simple tote, but this looked more refined than my usual go-tos.',
    capacityAndFitConcerns: 'Most bags say they fit a 15-inch laptop, but in practice, they don\'t — or they do, but then you can\'t fit anything else. I was torn between the Bobo and Toto bags — not sure which could actually carry everything I need. I couldn\'t tell which size would hold my laptop and also feel light. The LaFlore bag looked ideal, but I worried the structured size wouldn\'t be as roomy as it appeared.',
    
    // Product Clarity
    unclearSizingOrFit: 'The description said it fits a 15" laptop — but it barely does, and you can\'t carry anything else. The sizing info was technical — I needed comparisons or real examples. I couldn\'t tell which bag is best for work vs travel. I was confused by the model differences — not sure which one matched my needs. The descriptions weren\'t detailed enough. It wasn\'t clear what situations each bag is made for.',
    
    // Pricing and Shipping
    priceConcernsShipping: 'It felt high for a brand I hadn\'t heard of before. I wanted to feel more confident before spending that much. It\'s over my usual bag budget — I needed reassurance. Felt like a gamble without seeing it first. It\'s expensive, especially for cork. Still on the fence because of the price. Didn\'t want to make a pricey mistake.',
    returnShippingUncertainty: 'The return policy wasn\'t clear — I didn\'t want to be stuck with it. I was unsure about the shipping timeline. Would it arrive in time for my trip? I needed to know if I could return it easily if it didn\'t work out. I looked for reviews about the return process and couldn\'t find much.',
    
    // Purchase Confidence
    clearerBagComparison: 'I wasn\'t sure which bag matched my day-to-day needs. A chart comparing sizes and features would\'ve helped. Which one is best for travel vs work? I couldn\'t tell. The bag names weren\'t descriptive — I got confused. I didn\'t know which one could fit what — just needed more guidance.',
    discountOrIncentive: 'Even a 10% code would\'ve tipped me over the edge. If I\'d seen a promo, I probably would\'ve bought it. Something small — free shipping or bonus gift — would\'ve helped. I liked it, but the price made me hesitate. A deal would\'ve pushed me to buy.'
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

  const renderField = (field: string) => (
    <div key={field} className="mb-6">
      <label htmlFor={field} className="block text-base font-medium text-gray-700 mb-2">
        • {field.split(/(?=[A-Z])/).join(' ')}
      </label>
      <textarea
        id={field}
        name={field}
        value={formData[field as keyof FormData]}
        onChange={handleChange}
        required
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
        placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto p-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-900 mb-3">LaFlore Customer Insights</h1>
          <p className="text-lg text-gray-600">Collect and analyze customer feedback to improve your products</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">👤 Basic Information</h2>
            {renderField('clientName')}
            {renderField('interviewDate')}
          </div>
          
          {/* Product Interest */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">✨ Product Interest</h2>
            {renderField('designAndStyle')}
            {renderField('brandStoryAndValues')}
          </div>
          
          {/* Purchase Hesitation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">🤔 Purchase Hesitation</h2>
            {renderField('lackOfImmediateNeed')}
            {renderField('priceConcerns')}
            {renderField('laptopFit')}
          </div>
          
          {/* Brand Comparison */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">🔄 Brand Comparison</h2>
            {renderField('comparedToOtherBrands')}
            {renderField('capacityAndFitConcerns')}
          </div>
          
          {/* Product Clarity */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">🔍 Product Clarity</h2>
            {renderField('unclearSizingOrFit')}
          </div>
          
          {/* Pricing and Shipping */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">💰 Pricing and Shipping</h2>
            {renderField('priceConcernsShipping')}
            {renderField('returnShippingUncertainty')}
          </div>
          
          {/* Purchase Confidence */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">💪 Purchase Confidence</h2>
            {renderField('clearerBagComparison')}
            {renderField('discountOrIncentive')}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Link 
              href="/dashboard" 
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              <span className="mr-2">📊</span> View Dashboard
            </Link>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">💾</span> Submit Insight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
