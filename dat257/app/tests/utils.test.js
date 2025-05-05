import {
    calculateCarbonFootprint,
    getFunFacts,
    generateNormalDistribution,
    getPercentile
  } from '../calculator/components/utils';
  
  describe('calculateCarbonFootprint', () => {
    it('correctly sums all emission sources and rounds to two decimals', () => {
      const formData = {
        kilometersPerWeek: 10,
        fuelEfficiency: 10,           // (10 km/week * 52 * 0.1 L/km * 2.31)
        publicTransportPerWeek: 1,    // (1 * 52 * 7 * 0.05)
        flightsPerYear: 2,            // (2 * 600)
        redMeatPerWeek: 1,            // (1 * 52 * 6)
        poultryPerWeek: 1,            // (1 * 52 * 1.7)
        dairyPerWeek: 1,              // (1 * 52 * 2)
        plantBasedMealsPerWeek: 1,     // (1 * 52 * -2)
        clothingPurchasesPerYear: 1,  // (1 * 30)
        electronicsPurchasesPerYear: 1,// (1 * 100)
        sustainablePurchasesPerMonth: 1,// (1 * 12 * -2)
        onlineShoppingDeliveriesPerMonth: 1,// (1 * 12 * 5)
        homeTemperatureWinter: 2,     // (2 * 100)
        hotWaterUsagePerDay: 10,      // (10 * 365 * 0.1)
        bedroomsInHousehold: 2,
        adultsInHousehold: 1,
      };
  
      const result = calculateCarbonFootprint(formData);
  
      // Manually compute expected:
      // driving: 10*52*(10/100)*2.31 = 10*52*0.1*2.31 = 10*5.2*2.31 = 10*12.012 = 120.12
      // public transport: 1*52*7*0.05 = 18.2
      // flights: 2*600 = 1200
      // red meat: 1*52*6 = 312
      // poultry: 1*52*1.7 = 88.4
      // dairy: 1*52*2 = 104
      // plant-based: 1*52*-2 = -104
      // clothing: 1*30 = 30
      // electronics: 1*100 = 100
      // sustainable: 1*12*-2 = -24
      // deliveries: 1*12*5 = 60
      // degrees: 2*100 = 200
      // hot water: 10*365*0.1 = 365
      // household: (2/1)*500 = 1000
      // sum = 120.12 + 18.2 + 1200 + 312 + 88.4 + 104 -104 + 30 + 100 -24 + 60 + 200 + 365 + 1000 = 3779.72
  
      expect(result).toBe('3469.72');
    });
  });
  
  
  describe('generateNormalDistribution', () => {
    it('generates data of length points+1 with correct x range', () => {
      const data = generateNormalDistribution(1000, 100, 10);
      expect(data).toHaveLength(11);
      expect(data[0].x).toBeCloseTo(0);
      expect(data[data.length - 1].x).toBeCloseTo((10 / 9) * 20000);
      data.forEach(item => {
        expect(item).toHaveProperty('y');
        expect(typeof item.y).toBe('number');
      });
    });
  });
  
  describe('getPercentile', () => {
    it('returns ~50 for x equal to mean', () => {
      const p = getPercentile(5000, 5000, 2000);
      expect(p).toBe(50);
    });
  
    it('returns >84 for x = mean + stdDev', () => {
      const p = getPercentile(7000, 5000, 2000);
      expect(p).toBeGreaterThanOrEqual(84);
      expect(p).toBeLessThanOrEqual(85);
    });
  });
  