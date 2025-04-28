import { useProfileContext } from "@/contexts/BodyProfileContext";
import { useEffect, useRef, useState } from "react";

const womanWithOrgans = `/body-parts/Female/female-default.png`;
const brainImage = `/body-parts/Female/female-nervous-system.png`;
const thyroidImage = `/body-parts/Female/female-thyroid.png`;
const lungsImage = `/body-parts/Female/female-lungs.png`;
const heartImage = `/body-parts/Female/female-heart.png`;
const liverImage = `/body-parts/Female/female-liver.png`;
const kidneyImage = `/body-parts/Female/female-kidneys.png`;
const reproductiveImage = `/body-parts/Female/female-reproductive-organs.png`;
const digestiveSystemImage = `/body-parts/Female/female-digestive-system.png`;
const skinImage = `/body-parts/Female/female-skin.png`;

// import {
//   profileNameToBodyPartObject,
//   profileNameToProfileArrayObject,
// } from "../modules/constant/report-data/body-profile-data";

const organImage = {
  human: womanWithOrgans,
  Lungs: lungsImage,
  Skin: skinImage,
  Kidneys: kidneyImage,
  Liver: liverImage,
  "Nervous System & Brain": brainImage,
  "Heart & Cardiovascular System": heartImage,
  "Digestive System": digestiveSystemImage,
  "Thyroid & Adrenal Glands": thyroidImage,
  "Bladder & Urinary System": kidneyImage,
  "Reproductive Organs": reproductiveImage,
};

const WomanBody = ({ handleOrganClick }) => {
  // const [isVisible, setIsVisible] = useAtom(isBodySummaryPopupVisible);
  // const [profileTitle, setProfileTitle] = useAtom(clickProfileTitleAtom);
  // const [profileFilterData, setProfileFilterData] = useAtom(profileFilterDataAtom);
  // const bodyData = useAtomValue(bodyAtom);
  // const [currentImage, setCurrentImage] = useState(organImage?.human);
  // const [isImageClicked, setIsImageClicked] = useAtom(isImageClickedAtom);
  // const [isBodyPartHighlighted, setIsBodyPartHighlighted] = useAtom(isBodyPartHighlightedAtom);

  const [isFading, setIsFading] = useState(false);
  const [isImageHovering, setIsImageHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store debounce timeout

  // Define the types for the image and map
  const mapRef = useRef<HTMLMapElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const {
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
  } = useProfileContext();

  const mouseClickHandler = (e, title, profileName) => {
    if (e) {
      e.stopPropagation();
    }

    setIsVisible(true);
    setProfileTitle(title);
    setIsImageClicked(true);

    // Change image after fade-out transition completes
    // setTimeout(() => {
    handleOrganClick(title); // Call the parent function to handle organ click
    setCurrentImage(organImage?.[title]); // Update image
    // }, 100); // Match the CSS transition duration
  };

  const mouseEnterHandler = (e, title, profileName) => {
    e.stopPropagation();

    // Clear any previous timeout to prevent triggering on fast cursor movements
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a delay before triggering the hover effect
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isVisible) {
        setIsBodyPartHighlighted(true);
        setProfileTitle(title);

        // Trigger fade-out
        setIsFading(true);
        setIsImageHovering(true);

        setTimeout(() => {
          handleOrganClick(title);
          setCurrentImage(organImage?.[title]); // Update image
          setIsFading(false); // Fade-in new image
        }, 300); // Match CSS transition duration
      }
    }, 200); // Debounce delay, adjust this time as needed
  };

  const mouseLeaveHandler = (e) => {
    e.stopPropagation();
    // Clear any hover delay if the cursor leaves
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsImageHovering(false);
  };

  // The image map resize logic converted to TypeScript
  const imageMapResize = () => {
    const map = mapRef.current;
    const image = imageRef.current;

    if (!map || !image) return;

    const resizeMap = () => {
      const scale = {
        width: image.width / image.naturalWidth,
        height: image.height / image.naturalHeight,
      };

      const padding = {
        width:
          parseInt(
            window.getComputedStyle(image).getPropertyValue("padding-left"),
            10
          ) || 0,
        height:
          parseInt(
            window.getComputedStyle(image).getPropertyValue("padding-top"),
            10
          ) || 0,
      };

      const areas = Array.from(map.getElementsByTagName("area"));

      areas.forEach((area) => {
        const coords =
          area.getAttribute("coords")?.split(",").map(Number) || [];
        let isWidth = true;
        const newCoords = coords.map((coord) => {
          const dimension = isWidth ? "width" : "height";
          isWidth = !isWidth;
          return padding[dimension] + Math.floor(coord * scale[dimension]);
        });
        area.setAttribute("coords", newCoords.join(","));
      });
    };

    // Call `resizeMap` if the image's dimensions are not the natural dimensions
    if (
      image.width !== image.naturalWidth ||
      image.height !== image.naturalHeight
    ) {
      resizeMap();
    }

    // Add event listener for window resize
    window.addEventListener("resize", resizeMap);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", resizeMap);
  };

  useEffect(() => {
    const handleImageLoad = () => {
      if (mapRef.current && imageRef.current) {
        imageMapResize();
      }
    };

    const image = imageRef.current;
    if (image) {
      // Trigger resizeMap on image load
      image.addEventListener("load", handleImageLoad);
      window.addEventListener("resize", imageMapResize);

      // Cleanup listener on unmount
      return () => {
        image.removeEventListener("load", handleImageLoad);
        window.removeEventListener("resize", imageMapResize);
      };
    }
  }, []);

  // Preload images when component mounts
  useEffect(() => {
    Object.values(organImage).forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  useEffect(() => {
    if (!isVisible || !isBodyPartHighlighted) {
      setCurrentImage(organImage?.human);
    }
  }, [isVisible, isBodyPartHighlighted]);

  const imageKeys = (
    Object.keys(organImage) as (keyof typeof organImage)[]
  ).filter((key) => key !== "Skin" && key !== "human");
  const currentIndexRef = useRef(0); // Ref to keep track of current index

  useEffect(() => {
    if (!isImageClicked && !isImageHovering) {
      const intervalId = setInterval(() => {
        // Update the image based on the current index stored in the ref
        setCurrentImage(organImage[imageKeys[currentIndexRef.current]]);
        handleOrganClick(imageKeys[currentIndexRef.current]);

        // Move to the next index, cycling back to 0 if at the end
        currentIndexRef.current =
          (currentIndexRef.current + 1) % imageKeys.length;
      }, 3000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [imageKeys, isImageClicked, isImageHovering]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <img
        src={currentImage}
        ref={imageRef}
        alt="Woman with Organs"
        useMap="#image-map"
        style={{
          // width: "100%",
          position: "relative",
          // left: isVisible ? "-100px" : "0px",
          left: "0px",
          // transition: "left 0.5s ease-in-out, opacity 0.4s ease-in-out",
          opacity: isFading ? 0.9 : 1,
          outline: "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      />

      <map name="image-map">
        <area
          target="_self"
          alt="Nervous System &amp; Brain"
          title="Nervous System &amp; Brain"
          href="javascript:void(0)"
          // coords="230,41,298,78"
          coords="224,37,303,111"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Nervous System &amp; Brain"
          title="Nervous System &amp; Brain"
          href="javascript:void(0)"
          // coords="269,413,331,553"
          coords="331,403,195,702"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Nervous System &amp; Brain"
          title="Nervous System &amp; Brain"
          href="javascript:void(0)"
          // coords="269,413,331,553"
          coords="288,370,332,402"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Nervous System &amp; Brain"
          title="Nervous System &amp; Brain"
          href="javascript:void(0)"
          coords="197,369,237,402"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Nervous System & Brain", [
              "Hormones",
              "Inflammation Panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          coords="319,151,366,429"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          coords="207,153,157,426"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          coords="207,151,223,202"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          coords="289,131,365,153"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          coords="152,134,239,153"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
        />
        <area
          target="_self"
          alt="Thyroid &amp; Adrenal Glands"
          title="Thyroid &amp; Adrenal Glands"
          href="javascript:void(0)"
          coords="240,112,287,153"
          // coords="244,127,285,147"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Thyroid & Adrenal Glands", [
              "Thyroid Profile",
              "Hormones",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Thyroid & Adrenal Glands", [
              "Thyroid Profile",
              "Hormones",
            ])
          }
        />
        <area
          target="_self"
          alt="Lungs"
          title="Lungs"
          href="javascript:void(0)"
          // coords="271,164,312,255"
          coords="270,153,318,257"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Lungs", ["Bacterial Infections Panel"])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Lungs", ["Bacterial Infections Panel"])
          }
        />
        <area
          target="_self"
          alt="Lungs"
          title="Lungs"
          href="javascript:void(0)"
          // coords="271,164,312,255"
          coords="269,154,224,200"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Lungs", ["Bacterial Infections Panel"])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Lungs", ["Bacterial Infections Panel"])
          }
        />
        <area
          target="_self"
          alt="Heart &amp; Cardiovascular System"
          title="Heart &amp; Cardiovascular System"
          href="javascript:void(0)"
          // coords="269,191,237,245"
          coords="210,202,268,244"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Heart & Cardiovascular System", [
              "Cardiac panel",
              "Lipid Profile",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Heart & Cardiovascular System", [
              "Cardiac panel",
              "Lipid Profile",
            ])
          }
        />
        <area
          target="_self"
          alt="Liver"
          title="Liver"
          href="javascript:void(0)"
          // coords="220,248,269,279"
          coords="211,246,267,299"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) => mouseClickHandler(e, "Liver", ["Liver Profile"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Liver", ["Liver Profile"])}
        />
        <area
          target="_self"
          alt="Kidneys"
          title="Kidneys"
          href="javascript:void(0)"
          // coords="272,262,309,305"
          coords="269,259,314,311"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Kidneys", [
              "Kidney Profile",
              "Electrolyte Profile",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Kidneys", [
              "Kidney Profile",
              "Electrolyte Profile",
            ])
          }
        />
        <area
          target="_self"
          alt="Digestive System"
          title="Digestive System"
          href="javascript:void(0)"
          coords="325,310,207,336"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Digestive System", [
              "Vitamin",
              "Pancreatic panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Digestive System", [
              "Vitamin",
              "Pancreatic panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Digestive System"
          title="Digestive System"
          href="javascript:void(0)"
          coords="210,299,265,309"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Digestive System", [
              "Vitamin",
              "Pancreatic panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Digestive System", [
              "Vitamin",
              "Pancreatic panel",
            ])
          }
        />
        <area
          target="_self"
          alt="Bladder &amp; Urinary System"
          title="Bladder &amp; Urinary System"
          href="javascript:void(0)"
          coords="200,336,331,369"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Bladder & Urinary System", ["Urinalysis"])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Bladder & Urinary System", ["Urinalysis"])
          }
        />
        <area
          target="_self"
          alt="Reproductive Organs"
          title="Reproductive Organs"
          href="javascript:void(0)"
          coords="238,369,287,402"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Reproductive Organs", [
              "Pregnancy",
              "STD Profile",
              "Fertility Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Reproductive Organs", [
              "Pregnancy",
              "STD Profile",
              "Fertility Panel",
            ])
          }
        />
      </map>
    </div>
  );
};

export default WomanBody;
