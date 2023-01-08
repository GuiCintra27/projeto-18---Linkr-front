import React, {createContext, useState} from "react";


export const UserInfoContext = createContext ({});

function UserInfoProvider ({children}) {
    const [ userInfo, setUserInfo] = useState({
        userId: localStorage.getItem("user_id"),
        token:localStorage.getItem("token"),
        name:localStorage.getItem("name"),
        picture_url :localStorage.getItem("picture_url ")
    })

    const header = { headers: { "Authorization": `Bearer ${userInfo.token}` } };

    const [userImage, setUserImage] = useState("https://akamai.sscdn.co/letras/215x215/fotos/f/b/e/7/fbe7f6e0f613d2121a31a68fdd7963cf.jpg");

    const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const [logInObj, setLogInObj] = useState({
        email:"",
        password:""
    });

    return(
        <UserInfoContext.Provider value={{userInfo, setUserInfo, config, logInObj, setLogInObj, userImage, setUserImage, header}}>
            {children}
        </UserInfoContext.Provider>
    );

}

export default UserInfoProvider;