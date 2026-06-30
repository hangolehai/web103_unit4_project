export const CAR_PRICING = {
    base: 25000,
    is_convertible: {
        true: 5000,
        false: 0
    },
    exterior: {
        red: 500,
        blue: 500,
        black: 0,
        silver: 0,
        custom: 1500
    },
    roof: {
        solid: 0,
        sunroof: 1200,
        panoramic: 2500
    },
    wheels: {
        standard: 0,
        sport: 1000,
        offroad: 1500
    },
    interior: {
        fabric: 0,
        leather: 2000,
        premium: 3500
    }
};

export const calculateTotalPrice = (features) => {
    let total = CAR_PRICING.base;
    
    if (features.is_convertible) {
        total += CAR_PRICING.is_convertible.true;
    }

    if (features.exterior && CAR_PRICING.exterior[features.exterior] !== undefined) {
        total += CAR_PRICING.exterior[features.exterior];
    }
    
    if (features.roof && CAR_PRICING.roof[features.roof] !== undefined) {
        total += CAR_PRICING.roof[features.roof];
    }
    
    if (features.wheels && CAR_PRICING.wheels[features.wheels] !== undefined) {
        total += CAR_PRICING.wheels[features.wheels];
    }
    
    if (features.interior && CAR_PRICING.interior[features.interior] !== undefined) {
        total += CAR_PRICING.interior[features.interior];
    }
    
    return total;
};

export const validateFeatures = (features) => {
    // Example rule: convertible cannot have panoramic roof
    if (String(features.is_convertible) === 'true' && features.roof === 'panoramic') {
        return { isValid: false, message: "A convertible cannot have a panoramic roof." };
    }
    if (String(features.is_convertible) === 'true' && features.roof === 'sunroof') {
        return { isValid: false, message: "A convertible cannot have a sunroof." };
    }
    return { isValid: true, message: "" };
};
