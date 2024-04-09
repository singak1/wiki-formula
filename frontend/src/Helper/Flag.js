const Flag = (country) => {
    switch (country) {
        //NETHERLANDS
        case "Dutch" :
        case "Netherlands" :
            return "NL"
        //ITALY
        case "Italy" :
        case "Italian" :
            return "IT"
        //BAHRAIN
        case "Bahrain" :
            return "BH"
        //SAUDI
        case "Saudi Arabia" :
            return "SA"
        //AUSTRALIA
        case "Australia" :
        case "Australian" :
            return "AU"
        //AZERBAIJAN
        case "Azerbaijan" :
            return "AZ"
        //UNITED STATES
        case "USA" :
        case "United States" :
        case "American" :
            return "US"
        //MONACO
        case "Monaco" :
        case "Monegasque" :
            return "MC"
        //SPAIN
        case "Spain" :
        case "Spanish" :
            return "ES"
        //CANADA
        case "Canada" :
        case "Canadian" :
            return "CA"
        //AUSTRIA
        case "Austria" :
        case "Austrian" :
            return "AT"
        //UK
        case "UK" :
        case "British" :
            return "GB"
        //HUNGARY
        case "Hungary" :
            return "HU"
        //BELGIUM
        case "Belgium" :
            return "BE"
        //SINGAPORE
        case "Singapore" :
            return "SG"
        //JAPAN
        case "Japan" :
        case "Japanese" :
            return "JP"
        //QATAR
        case "Qatar" :
            return "QA"
        //MEXICO
        case "Mexico" :
        case "Mexican" :
            return "MX"
        //BRAZIL
        case "Brazil" :
            return "BR"
        //UAE
        case "UAE" :
            return "AE"
        //FRANCE
        case "French" :
            return "FR"
        //FINLAND
        case "Finnish" :
            return "FI"
        //CHINA
        case "China" :
        case "Chinese" :
            return "CN"
        //THAILAND
        case "Thai" :
            return "TH"
        //DENMARK
        case "Danish" :
            return "DK"
        //GERMANY
        case "German" :
            return "DE"
        case "Swiss" :
            return "CH"
        default :
            return "error"
    }
}

export default Flag