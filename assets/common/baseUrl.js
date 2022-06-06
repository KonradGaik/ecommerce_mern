
import { Platform } from "react-native";

let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'https://df67-109-207-96-166.eu.ngrok.io/api/v1/'
: baseURL = 'https://df67-109-207-96-166.eu.ngrok.io/api/v1/'
}

export default baseURL;