export const kpiData = {
  wasteRate: "14.65%",
  totalDiscarded: "2,594,812",
  sellThroughRate: "85.35%",
  lostDemand: "280,564",
};

export const productData = [
  { name: "Salad", wasteRate: 18.842562 },
  { name: "French Fries", wasteRate: 13.276365, discarded: 160477 },
  { name: "Burger", wasteRate: 13.261183, discarded: 135742 },
  { name: "Biryani", wasteRate: 13.376895, discarded: 121173 },
  { name: "Pizza", wasteRate: 13.521277, discarded: 114107 }
];

export const outletData = [
  { id: "O007", name: "Outlet 007", wasteRate: 15.802712 },
  { id: "O004", name: "Outlet 004", wasteRate: 15.396527 },
  { id: "O009", name: "Outlet 009", wasteRate: 15.379594 },
  { id: "O012", name: "Outlet 012", wasteRate: 15.362378 },
  { id: "O002", name: "Outlet 002", wasteRate: 14.869538 },
  { id: "O006", name: "Outlet 006", wasteRate: 14.767840 },
  { id: "O011", name: "Outlet 011", wasteRate: 14.613343 },
  { id: "O003", name: "Outlet 003", wasteRate: 14.351478 },
  { id: "O008", name: "Outlet 008", wasteRate: 14.205649 },
  { id: "O001", name: "Outlet 001", wasteRate: 14.137021 },
  { id: "O010", name: "Outlet 010", wasteRate: 13.993341 },
  { id: "O005", name: "Outlet 005", wasteRate: 13.981061 },
];

export const operationalData = {
  promotion: { yes: 14.095523, no: 14.842600 },
  weekend: { weekend: 14.184290, weekday: 14.877300 },
  weather: { stormy: 15.304527, rainy: 14.683880, cloudy: 14.632149, sunny: 14.580234 },
  holiday: { yes: 13.877624, no: 14.664803 },
  event: { yes: 13.621365, no: 14.760256 }
};

export const demandPlanningData = [
  { scenario: "100%", prepared: 15405448, discarded: 841882, lostDemand: 835501, wasteRate: 5.464833, lostDemandRate: 5.425660 },
  { scenario: "105%", prepared: 16173376, discarded: 1291492, lostDemand: 517183, wasteRate: 7.985296, lostDemandRate: 3.358535 },
  { scenario: "110%", prepared: 16948325, discarded: 1860506, lostDemand: 311248, wasteRate: 10.977521, lostDemandRate: 2.021213, selected: true },
  { scenario: "115%", prepared: 17710941, discarded: 2500683, lostDemand: 188809, wasteRate: 14.119425, lostDemandRate: 1.226107 }
];

export const modelInsightsData = {
  mae: 5.53,
  rmse: 6.91,
  r2: 0.357,
  features: [
    { name: "Quantity_Prepared", importance: 0.586105 },
    { name: "Expected_Demand", importance: 0.223988 },
    { name: "Month", importance: 0.046164 },
    { name: "Day_Number", importance: 0.023417 },
    { name: "Outlet_Factor", importance: 0.016275 },
    { name: "Base_Demand", importance: 0.012313 },
    { name: "Weather_Sunny", importance: 0.008406 },
    { name: "Weather_Cloudy", importance: 0.007114 },
    { name: "Weather_Rainy", importance: 0.005533 },
    { name: "Day_Factor", importance: 0.002956 },
    { name: "Weather_Factor", importance: 0.002755 },
    { name: "Promotion", importance: 0.002274 },
    { name: "Promotion_Factor", importance: 0.002253 },
    { name: "Outlet_ID_O006", importance: 0.002164 },
    { name: "Outlet_ID_O001", importance: 0.002016 }
  ]
};

export const recommendationsData = [
  "Use expected demand to guide daily preparation.",
  "Closely monitor high-volume products such as French Fries, Burger, Biryani, and Pizza.",
  "Monitor high waste-rate products separately from high-volume products.",
  "Account for outlet-level differences.",
  "Consider promotion, weekday/weekend, weather, holiday, and event patterns when planning preparation.",
  "Use an adjustable preparation policy instead of one fixed buffer.",
  "Track both discarded food and lost demand.",
  "Validate the strategy using real operational restaurant data."
];
