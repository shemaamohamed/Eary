export const setAuthUser = (data)=>{
    localStorage.setItem("user", JSON.stringify(data.user));

}

export const getAuthUser = ()=>{
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"))
    }
}
export const removeAuthUser=()=>{
    if(localStorage.getItem("user"))localStorage.removeItem("user");
}
