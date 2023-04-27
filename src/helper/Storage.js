export const setAuthUser = (data)=>{
    localStorage.setItem("user", JSON.stringify(data));
}

export const getAuthUser = (data)=>{
    if(localStorage.get("user")){
        return JSON.parse(localStorage.getItem("user"))
    }
}
export const removeAuthUser=()=>{
    if(localStorage.getItem("user"))localStorage.removeItem("user");
}