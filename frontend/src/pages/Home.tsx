import { useEffect, useState } from "react";
import { AppConfig, UserSession } from "@stacks/connect";
import { UserData } from "@stacks/auth";

import Header from "../components/Header";
import Hero from "../components/Hero";
import DAOCards from "../components/DAOCards";
import Footer from "../components/Footer";

function App() {
  const [, setUserData] = useState<UserData | undefined>(undefined);

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData: any) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      <Header />
      <Hero />
      <DAOCards />


      <Footer />
    </div>
  );
}

export default App;
