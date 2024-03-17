import React, { useEffect } from "react";
import Header from "../extension/Header";
import { useAuthState, useFetchUserData } from "../../features/hooks/useAuth";
import MainLayoutSkelenton from "../skelenton/MainLayoutSkelenton";
import Overlay from "../extension/Overlay";
import { useLoading } from "../../features/hooks/useLoading";

const MainLayout = ({ children }) => {
  const fetching = useFetchUserData();

  const { user } = useAuthState();
  const {isRequestLoading} = useLoading();

  useEffect(() => {
    if (!user) {
      fetching();
    }
  }, [user]);

  if (!user) {
    return <MainLayoutSkelenton />;
  }

  return (
    <div>
      {isRequestLoading && <Overlay/>} 
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
