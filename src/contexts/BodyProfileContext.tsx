import { createContext, useContext, useState } from "react";
// import { organImage } from "@/constants/organImage"; // update with correct path

const ProfileContext = createContext(undefined);

export const ProfileProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [profileTitle, setProfileTitle] = useState("");
  const [profileFilterData, setProfileFilterData] = useState([]);
  const [currentImage, setCurrentImage] = useState(
    "/body-parts/Male/male-default.png"
  );
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isBodyPartHighlighted, setIsBodyPartHighlighted] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        isVisible,
        setIsVisible,
        profileTitle,
        setProfileTitle,
        profileFilterData,
        setProfileFilterData,
        currentImage,
        setCurrentImage,
        isImageClicked,
        setIsImageClicked,
        isBodyPartHighlighted,
        setIsBodyPartHighlighted,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
