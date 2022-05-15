
import { Platform } from "react-native";

let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'https://6e4e-109-207-104-248.eu.ngrok.io/api/v1/'
: baseURL = 'https://6e4e-109-207-104-248.eu.ngrok.io/api/v1/'
}

export default baseURL;