import { APIURL } from "../../App";

export default async function checkUser(username, password, gmail){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('gmail', gmail);

    const response = await fetch(`${APIURL}/check-user`, {
        method: 'POST',
        body: formData
    })
    const userData = await response.json();
    
    if(userData.username){
        sessionStorage.setItem('username', userData.username)
        sessionStorage.setItem('user_id', userData.id)
    }

    return await userData;
}

export async function addUser(username, password, gmail){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('gmail', gmail);

    const response = await fetch(`${APIURL}/users`, {
        method: 'POST',
        body: formData
    })

    const userData = await response.json();

    if(userData.username) {
        sessionStorage.setItem('username', userData.username)
        sessionStorage.setItem('user_id', userData.id)
    }
}