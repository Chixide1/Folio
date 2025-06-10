// Template literal type for percentage strings
type Percentage = `${number}%`;

// Union type for integer or percentage
type IntegerOrPercentage = number | Percentage;

export type Point = {
    x: IntegerOrPercentage;
    y: IntegerOrPercentage;
};