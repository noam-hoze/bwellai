import { createContext, useContext, useState } from "react";

// Create the context
const UserInfoContext = createContext(undefined);

// Provider component
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    goal: "", // What are you aiming for?
    age: null,
    gender: "", // 'male', 'female', 'other', etc.
    height: null, // in cm or ft+inches (you can customize format)
    weight: null, // in kg or lbs
  });

  const updateUserInfo = (key, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

// Custom hook for easy usage
export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error(
      "UserInfoContext must be used within an UserInfoContextProvider"
    );
  }
  return context;
};
