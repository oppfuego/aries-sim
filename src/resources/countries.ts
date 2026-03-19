export interface CountryOption {
    code: string;
    name: string;
    flag: string;
}

export const restrictedRegistrationCountryNames = new Set([
    "Russia",
    "Belarus",
    "Iran",
    "North Korea",
    "Syria",
    "Yemen",
    "Afghanistan",
    "Sudan",
    "South Sudan",
    "Cuba",
    "Venezuela",
    "Zimbabwe",
    "Myanmar",
    "Mali",
    "Democratic Republic of the Congo",
    "Central African Republic",
    "Somalia",
    "Iraq",
    "Haiti",
    "Darfur",
    "Crimea",
]);

export const countries: CountryOption[] = [
    // 🌍 Europe
    { code: "AL", name: "Albania", flag: "🇦🇱" },
    { code: "AT", name: "Austria", flag: "🇦🇹" },
    { code: "BE", name: "Belgium", flag: "🇧🇪" },
    { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
    { code: "HR", name: "Croatia", flag: "🇭🇷" },
    { code: "CY", name: "Cyprus", flag: "🇨🇾" },
    { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "EE", name: "Estonia", flag: "🇪🇪" },
    { code: "FI", name: "Finland", flag: "🇫🇮" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "GR", name: "Greece", flag: "🇬🇷" },
    { code: "HU", name: "Hungary", flag: "🇭🇺" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "LV", name: "Latvia", flag: "🇱🇻" },
    { code: "LT", name: "Lithuania", flag: "🇱🇹" },
    { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "PL", name: "Poland", flag: "🇵🇱" },
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "RO", name: "Romania", flag: "🇷🇴" },
    { code: "SK", name: "Slovakia", flag: "🇸🇰" },
    { code: "SI", name: "Slovenia", flag: "🇸🇮" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "UA", name: "Ukraine", flag: "🇺🇦" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },

    // 🌎 North America
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },

    // 🌎 South America
    { code: "AR", name: "Argentina", flag: "🇦🇷" },
    { code: "BO", name: "Bolivia", flag: "🇧🇴" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "CL", name: "Chile", flag: "🇨🇱" },
    { code: "CO", name: "Colombia", flag: "🇨🇴" },
    { code: "EC", name: "Ecuador", flag: "🇪🇨" },
    { code: "PE", name: "Peru", flag: "🇵🇪" },
    { code: "UY", name: "Uruguay", flag: "🇺🇾" },
    { code: "VE", name: "Venezuela", flag: "🇻🇪" },

    // 🌏 Asia
    { code: "AM", name: "Armenia", flag: "🇦🇲" },
    { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "GE", name: "Georgia", flag: "🇬🇪" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "IL", name: "Israel", flag: "🇮🇱" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "VN", name: "Vietnam", flag: "🇻🇳" },

    // 🌍 Africa
    { code: "DZ", name: "Algeria", flag: "🇩🇿" },
    { code: "EG", name: "Egypt", flag: "🇪🇬" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "MA", name: "Morocco", flag: "🇲🇦" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "TN", name: "Tunisia", flag: "🇹🇳" },

    // 🌏 Oceania
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
];

export const allowedRegistrationCountries = countries.filter(
    (country) => !restrictedRegistrationCountryNames.has(country.name)
);

export const allowedRegistrationCountryNames = new Set(
    allowedRegistrationCountries.map((country) => country.name)
);
