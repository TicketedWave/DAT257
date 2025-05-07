export const categories = {
    TRANSPORTATION: [
      {
        label: 'How many kilometers do you drive per week?',
        name: 'kilometersPerWeek',
        min: 0,
        max: 600,
        step: 10,
        marks: {
          0: '0 km',
          600: '600+ km'
        },
        unit: 'km'
      },
      {
        label: 'How often do you use public transportation each week?',
        name: 'publicTransportPerWeek',
        min: 0,
        max: 7,
        step: 0.5,
        marks: {
          0: 'Never',
          7: 'Every day'
        },
        unit: 'times'
      },
      {
        label: 'How many flights do you take per year?',
        name: 'flightsPerYear',
        min: 0,
        max: 8,
        step: 0.5,
        marks: {
          0: 'None',
          8: '8 or more'
        },
        unit: 'flights'
      },
      {
        label: 'What is your vehicle fuel efficiency?',
        name: 'fuelEfficiency',
        min: 4,
        max: 14,
        step: 0.5,
        marks: {
          4: 'Efficient',
          14: 'Very Low'
        },
        unit: 'L/100km'
      }
    ],
    FOOD: [
      {
        label: 'How often do you eat red meat (beef, lamb, pork) per week?',
        name: 'redMeatPerWeek',
        min: 0,
        max: 6,
        step: 0.5,
        marks: {
          0: 'Never',
          6: '5 or more times'
        },
        unit: 'meals'
      },
      {
        label: 'How often do you eat poultry (chicken, turkey) per week?',
        name: 'poultryPerWeek',
        min: 0,
        max: 6,
        step: 0.5,
        marks: {
          0: 'Never',
          6: '5 or more times'
        },
        unit: 'meals'
      },
      {
        label: 'How often do you consume dairy products per week?',
        name: 'dairyPerWeek',
        min: 0,
        max: 6,
        step: 0.5,
        marks: {
          0: 'Never',
          6: '5 or more times'
        },
        unit: 'servings'
      }, {
        label: 'How often do you consume plant-based meals (vegetarian or vegan) per week?',
        name: 'plantBasedMealsPerWeek',
        min: 0,
        max: 6,
        step: 0.5,
        marks: {
          0: 'Never',
          6: '5 or more times'
        },
        unit: 'meals'
      }
    ],
    SHOPPING: [
      {
        label: 'How many new clothing or footwear items do you buy each year?',
        name: 'clothingPurchasesPerYear',
        min: 0,
        max: 50,
        step: 5, // Step by 5 items
        marks: {
          0: '0',
          50: '50'
        },
        unit: 'items',
      },
      {
        label: 'How many electronic gadgets or household appliances do you buy each year?',
        name: 'electronicsPurchasesPerYear',
        min: 0,
        max: 20,
        step: 2, // Step by 2 items
        marks: {
          0: '0',
          20: '20'
        },
        unit: 'electronics',
      },
      {
        label: 'How many purchases of locally sourced or sustainably produced food and goods do you do each month?',
        name: 'sustainablePurchasesPerMonth',
        min: 0,
        max: 50,
        step: 5, // Step by 5 purchases
        marks: {
          0: '0',
          50: '50'
        },
        unit: 'purchases',
      },
      {
        label: 'How many online shopping deliveries do you receive per month?',
        name: 'onlineShoppingDeliveriesPerMonth',
        min: 0,
        max: 50,
        step: 5, // Step by 5 deliveries
        marks: {
          0: '0',
          50: '50'
        },
        unit: 'deliveries',
      },
    ],
    HOME: [
      {
        label: 'How warm do you keep your home in winter?',
        name: 'homeTemperatureWinter',
        min: 0,
        max: 30,
        step: 1, // Step by 1 degree
        marks: {
          0: '0°C',
          30: '30°C'
        },
        unit: 'degrees',
      },
      {
        label: 'How many adults live in your household?',
        name: 'adultsInHousehold',
        min: 0,
        max: 10,
        step: 1, // Step by 1 adult
        marks: {
          0: '0',
          10: '10'
        },
        unit: 'adults',
      },
      {
        label: 'How many bedrooms are in your household?',
        name: 'bedroomsInHousehold',
        min: 0,
        max: 10,
        step: 1, // Step by 1 bedroom
        marks: {
          0: '0',
          10: '10'
        },
        unit: 'bedrooms',
      },
      {
        label: 'How many minutes per day does your household typically spend using hot water?',
        name: 'hotWaterUsagePerDay',
        min: 0,
        max: 300,
        step: 10, // Step by 10 minutes
        marks: {
          0: '0 min',
          300: '300 min'
        },
        unit: 'minutes',
      },
    ],
  };
  
  export const initialFormData = {
    kilometersPerWeek: -1,
    publicTransportPerWeek: -1,
    flightsPerYear: -1,
    fuelEfficiency: -1,
    redMeatPerWeek: -1,
    poultryPerWeek: -1,
    dairyPerWeek: -1,
    plantBasedMealsPerWeek: -1,
    clothingPurchasesPerYear: -1,
    electronicsPurchasesPerYear: -1,
    sustainablePurchasesPerMonth: -1,
    onlineShoppingDeliveriesPerMonth: -1,
    homeTemperatureWinter: -1,
    adultsInHousehold: -1,
    bedroomsInHousehold: -1,
    hotWaterUsagePerDay: -1,
  };