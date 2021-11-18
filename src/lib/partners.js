import {call_get, shape_api_then} from "./api";
import {crmPartners} from "./root";

export const getPartners = () => {
    return shape_api_then(call_get(crmPartners))
}
