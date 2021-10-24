import { API_LIST } from "../../environment/api-list";
import { url } from "../../environment/environment";

export function loginCourier(body: { email: string, password: string }) {
    return fetch(`${url}${API_LIST.LOGIN}`, {
        method: "POST",
        body: JSON.stringify(body),
    });
}

