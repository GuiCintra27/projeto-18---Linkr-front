import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
/* import Home from "./home/home"; // A pagina "/" é a rota signIn */
import SignIn from "../components/Login/Sign-in.js";
import SignUp from "../components/Login/sign-up.js";
import UserInfoProvider from "../contexts/userInfo";
import Home from "./home/home";

export default function App() {
  return (
    <>
      <GlobalStyle />
        <BrowserRouter>
          <UserInfoProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </UserInfoProvider>
        </BrowserRouter>
    </>
  );
}