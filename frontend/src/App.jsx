import React, { useState } from 'react';
import { LayoutDashboard, PieChart, Store, Calendar, TrendingUp, BrainCircuit, Lightbulb } from 'lucide-react';
import { 
  kpiData, productData, outletData, operationalData, 
  demandPlanningData, modelInsightsData, recommendationsData 
} from './data';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

function Overview() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Current State</h2>
        <p className="text-slate-600">
          The synthetic analysis reveals a baseline waste rate of {kpiData.wasteRate}, with a total of {kpiData.totalDiscarded} units discarded and {kpiData.lostDemand} units of lost demand across all locations.
        </p>
        <p className="text-xs text-slate-400 mt-2 italic">Results shown are based on a synthetic dataset and are intended for analytical demonstration. They should be validated against real restaurant operational data before being used for actual decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Waste Rate", value: kpiData.wasteRate, info: "Overall percentage of prepared food discarded" },
          { label: "Total Discarded", value: kpiData.totalDiscarded, info: "Total units of food wasted" },
          { label: "Sell-through Rate", value: kpiData.sellThroughRate, info: "Percentage of prepared food sold" },
          { label: "Lost Demand", value: kpiData.lostDemand, info: "Unfulfilled orders due to stockouts" }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col">
            <span className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</span>
            <span className="text-3xl font-bold text-slate-800">{kpi.value}</span>
            <span className="text-xs text-slate-400 mt-2">{kpi.info}</span>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Product Waste Patterns Overview</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#0d9488" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Legend />
              <Bar yAxisId="left" dataKey="discarded" name="Units Discarded" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="wasteRate" name="Waste Rate (%)" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ProductInsights() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Highest Waste Rate</h3>
          <div className="text-4xl font-bold mb-2">18.84%</div>
          <div className="text-xl font-medium text-slate-700">Salad</div>
          <p className="text-sm text-slate-500 mt-2">Salad has the highest percentage of prepared units that end up discarded.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-amber-600">Highest Volume Discarded</h3>
          <div className="text-4xl font-bold mb-2">160,477</div>
          <div className="text-xl font-medium text-slate-700">French Fries</div>
          <p className="text-sm text-slate-500 mt-2">French fries account for the largest total quantity of units discarded.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Top 5 Products by Waste Impact</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Product Name</th>
                <th className="px-6 py-3 font-medium">Waste Rate (%)</th>
                <th className="px-6 py-3 font-medium">Total Units Discarded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {productData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4">{typeof item.wasteRate === 'number' ? item.wasteRate.toFixed(2) : item.wasteRate}%</td>
                  <td className="px-6 py-4">{item.discarded ? item.discarded.toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OutletPerformance() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Outlet Waste Rate Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outletData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="wasteRate" name="Waste Rate (%)" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                {
                  outletData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.id === 'O007' ? '#ef4444' : entry.id === 'O005' ? '#10b981' : '#3b82f6'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4 text-sm justify-center">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Highest (O007)</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Average</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Lowest (O005)</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm bg-slate-50">
          <h4 className="font-semibold text-slate-800">Highest Waste: Outlet O007</h4>
          <p className="text-slate-600 mt-1">This outlet shows the highest simulated waste rate in the dataset.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm bg-slate-50">
          <h4 className="font-semibold text-slate-800">Lowest Waste: Outlet O005</h4>
          <p className="text-slate-600 mt-1">This outlet shows the lowest simulated waste rate in the dataset.</p>
        </div>
      </div>
    </div>
  );
}

function OperationalFactors() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Promotion */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Promotion Effect</h3>
          <div className="flex items-end gap-4 h-32">
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-slate-200 rounded-t flex items-end justify-center pb-2 text-slate-700 font-medium" style={{ height: '95%' }}>
                {operationalData.promotion.yes.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Promotion</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-teal-500 text-white rounded-t flex items-end justify-center pb-2 font-medium" style={{ height: '100%' }}>
                {operationalData.promotion.no.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">No Promotion</span>
            </div>
          </div>
        </div>

        {/* Weekday vs Weekend */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Day of Week</h3>
          <div className="flex items-end gap-4 h-32">
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-slate-200 rounded-t flex items-end justify-center pb-2 text-slate-700 font-medium" style={{ height: '95%' }}>
                {operationalData.weekend.weekend.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Weekend</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-indigo-500 text-white rounded-t flex items-end justify-center pb-2 font-medium" style={{ height: '100%' }}>
                {operationalData.weekend.weekday.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Weekday</span>
            </div>
          </div>
        </div>
        
        {/* Holiday */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Holiday Effect</h3>
          <div className="flex items-end gap-4 h-32">
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-slate-200 rounded-t flex items-end justify-center pb-2 text-slate-700 font-medium" style={{ height: '94%' }}>
                {operationalData.holiday.yes.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Holiday</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-orange-500 text-white rounded-t flex items-end justify-center pb-2 font-medium" style={{ height: '100%' }}>
                {operationalData.holiday.no.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Non-Holiday</span>
            </div>
          </div>
        </div>

        {/* Special Event */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Special Event Effect</h3>
          <div className="flex items-end gap-4 h-32">
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-slate-200 rounded-t flex items-end justify-center pb-2 text-slate-700 font-medium" style={{ height: '92%' }}>
                {operationalData.event.yes.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">Event</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-purple-500 text-white rounded-t flex items-end justify-center pb-2 font-medium" style={{ height: '100%' }}>
                {operationalData.event.no.toFixed(2)}%
              </div>
              <span className="text-sm font-medium">No Event</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Weather Impact</h3>
        <p className="text-sm text-slate-600 mb-4">Stormy weather shows the highest simulated waste rate at {operationalData.weather.stormy.toFixed(2)}%.</p>
        <div className="flex gap-4">
          {Object.entries(operationalData.weather).sort((a,b) => b[1] - a[1]).map(([condition, rate]) => (
            <div key={condition} className="flex-1 p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <div className="capitalize font-medium text-slate-600">{condition}</div>
              <div className="text-xl font-bold text-slate-800 mt-1">{rate.toFixed(2)}%</div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-slate-400 italic">Note: These represent patterns in the synthetic dataset and do not imply definitive causal real-world relationships.</p>
    </div>
  );
}

function DemandPlanning() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Preparation Strategy Analysis</h3>
          <p className="text-slate-600 mt-1">Comparing trade-offs between Waste Rate and Lost Demand Rate under different preparation buffers.</p>
        </div>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandPlanningData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="scenario" axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} name="Waste Rate (%)" />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} name="Lost Demand Rate (%)" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="wasteRate" name="Waste Rate (%)" stroke="#ef4444" strokeWidth={3} dot={{r: 6}} />
              <Line yAxisId="right" type="monotone" dataKey="lostDemandRate" name="Lost Demand Rate (%)" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {demandPlanningData.map((scenario, idx) => (
          <div key={idx} className={`p-5 rounded-lg border ${scenario.selected ? 'border-teal-500 bg-teal-50 shadow-md ring-1 ring-teal-500' : 'border-slate-200 bg-white shadow-sm'}`}>
            {scenario.selected && <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">Recommended Strategy</div>}
            <h4 className="font-bold text-lg">{scenario.scenario} Expected Demand</h4>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Waste Rate</span>
                <span className="font-semibold">{typeof scenario.wasteRate === 'number' ? scenario.wasteRate.toFixed(2) : scenario.wasteRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Discarded</span>
                <span className="font-semibold">{scenario.discarded.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lost Demand</span>
                <span className="font-semibold">{scenario.lostDemand.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-850 text-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-teal-400 mb-2">110% Strategy Results</h3>
        <p className="mb-2 text-slate-300">The selected 110% Expected Demand scenario provides a practical trade-off between waste and lost demand in this simulation.</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
          <li><strong>Waste Rate:</strong> ~10.98%</li>
          <li><strong>Lost Demand:</strong> 311,248 units</li>
          <li><strong>Total Discarded:</strong> 1,860,506 units</li>
          <li><strong>Simulated Reduction:</strong> ~28.3% compared to the baseline (2,594,812 discarded units)</li>
        </ul>
        <p className="text-xs text-slate-400 mt-4 italic">SIMULATED STRATEGY RESULT: Do not present the 110% strategy as a universally optimal real-world decision without operational validation.</p>
      </div>
    </div>
  );
}

function ModelInsights() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Random Forest Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="text-sm text-slate-500 mb-1">Mean Absolute Error (MAE)</div>
            <div className="text-3xl font-bold text-slate-800">{modelInsightsData.mae}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="text-sm text-slate-500 mb-1">Root Mean Square Error (RMSE)</div>
            <div className="text-3xl font-bold text-slate-800">{modelInsightsData.rmse}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="text-sm text-slate-500 mb-1">R² Score</div>
            <div className="text-3xl font-bold text-slate-800">{modelInsightsData.r2}</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800 text-sm">
          <p className="font-semibold mb-1">Important Note</p>
          <p>These metrics represent the performance on the synthetic dataset. The model is for analytical demonstration and is <strong>not production-ready</strong>.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Feature Importance</h3>
        <p className="text-sm text-slate-600 mb-6">
          Feature importance indicates predictive contribution within the Random Forest model, not definitive real-world causality. 
          <span className="font-semibold block mt-1">Quantity_Prepared and Expected_Demand are the dominant predictive features.</span>
        </p>
        
        <div className="space-y-4">
          {modelInsightsData.features.map((feature, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{feature.name}</span>
                <span className="text-slate-500">{(feature.importance * 100).toFixed(4)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${feature.importance * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Recommendations() {
  return (
    <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
          <Lightbulb size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Operational Recommendations</h2>
      </div>
      
      <p className="text-slate-600 mb-8 max-w-3xl">
        Based strictly on the findings from the synthetic dataset analysis, the following operational strategies are recommended for real-world validation:
      </p>

      <div className="space-y-4">
        {recommendationsData.map((rec, idx) => (
          <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <p className="text-slate-700 pt-1 font-medium">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { id: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'Product Insights', icon: <PieChart size={20} /> },
    { id: 'Outlet Performance', icon: <Store size={20} /> },
    { id: 'Operational Factors', icon: <Calendar size={20} /> },
    { id: 'Demand Planning', icon: <TrendingUp size={20} /> },
    { id: 'Model Insights', icon: <BrainCircuit size={20} /> },
    { id: 'Recommendations', icon: <Lightbulb size={20} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <Overview />;
      case 'Product Insights': return <ProductInsights />;
      case 'Outlet Performance': return <OutletPerformance />;
      case 'Operational Factors': return <OperationalFactors />;
      case 'Demand Planning': return <DemandPlanning />;
      case 'Model Insights': return <ModelInsights />;
      case 'Recommendations': return <Recommendations />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-850 text-slate-300 flex-shrink-0 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-xl font-bold text-teal-400 tracking-tight leading-tight">
            Restaurant Waste<br/><span className="text-teal-400">Intelligence</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left font-medium text-sm ${
                activeTab === tab.id 
                  ? 'bg-teal-600/20 text-teal-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 text-center">
            Synthetic Analysis Dashboard
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800">{activeTab}</h2>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
