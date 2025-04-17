import { useProfileContext } from "@/contexts/BodyProfileContext";
import { useEffect, useRef, useState } from "react";

// import.meta.env.VITE_ASSETS_BASE_URL
const manWithOrgans = `/body-parts/Male/male-default.png`;
const heartImage = `/body-parts/Male/male-heart.png`;
const lungsImage = `/body-parts/Male/male-lungs.png`;
const digestiveSystemImage = `/body-parts/Male/male-digest-system.png`;
const skinImage = `/body-parts/Male/male-skin.png`;
const brainImage = `/body-parts/Male/male-brain.png`;
const kidneyImage = `/body-parts/Male/male-kidney.png`;
const liverImage = `/body-parts/Male/male-liver.png`;
const thyroidImage = `/body-parts/Male/male-thyroid.png`;
const reproductiveImage = `/body-parts/Male/male-reproductive-organs.png`;

// import {
//   profileNameToBodyPartObject,
//   profileNameToProfileArrayObject,
// } from "../modules/constant/report-data/body-profile-data";

const organImage = {
  human: manWithOrgans,
  Lungs: lungsImage,
  Kidneys: kidneyImage,
  Liver: liverImage,
  Skin: skinImage,
  "Nervous System & Brain": brainImage,
  "Heart & Cardiovascular System": heartImage,
  "Digestive System": digestiveSystemImage,
  "Thyroid & Adrenal Glands": thyroidImage,
  "Bladder & Urinary System": kidneyImage,
  "Reproductive Organs": reproductiveImage,
};

const ManBody = ({ handleOrganClick }) => {
  // Define the types for the image and map
  const mapRef = useRef<HTMLMapElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // const [isVisible, setIsVisible] = useState(false);
  // const [profileTitle, setProfileTitle] = useState("");
  // const [profileFilterData, setProfileFilterData] = useState([]);
  // const [currentImage, setCurrentImage] = useState(organImage?.human);
  // const [isImageClicked, setIsImageClicked] = useState(false);
  // const [isBodyPartHighlighted, setIsBodyPartHighlighted] = useState(false);

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

  const [isFading, setIsFading] = useState(false);
  const [isImageHovering, setIsImageHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store debounce timeout

  useEffect(() => {
    if (!isVisible || !isBodyPartHighlighted) {
      setCurrentImage(organImage?.human);
    }
  }, [isVisible, isBodyPartHighlighted]);

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
        }, 400); // Match CSS transition duration
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

  const imageKeys = (
    Object.keys(organImage) as (keyof typeof organImage)[]
  ).filter((key) => key !== "Skin" && key !== "human");
  const currentIndexRef = useRef(0); // Ref to keep track of current index

  useEffect(() => {
    if (!isImageClicked && !isImageHovering) {
      const intervalId = setInterval(() => {
        // Trigger fade-out
        setIsFading(true);

        setTimeout(() => {
          // Update the image based on the current index stored in the ref
          setCurrentImage(organImage[imageKeys[currentIndexRef.current]]);
          handleOrganClick(imageKeys[currentIndexRef.current]);

          // Move to the next index, cycling back to 0 if at the end
          currentIndexRef.current =
            (currentIndexRef.current + 1) % imageKeys.length;

          // Trigger fade-in
          setIsFading(false);
        }, 400);
      }, 3000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [imageKeys, isImageClicked, isImageHovering]);

  return (
    <div
      style={{
        // width: "30em",
        position: "relative",
        display: "inline-block",
        // border: "2px solid black",
      }}
    >
      <img
        src={currentImage}
        ref={imageRef}
        alt="Man with Organs"
        useMap="#image-map"
        style={{
          // width: "100%",
          position: "relative",
          // left: isVisible ? "-100px" : "0px",
          // transition: "left 0.5s ease-in-out, opacity 0.4s ease-in-out",
          transition: "opacity 0.4s ease-in-out",
          opacity: isFading ? 0.9 : 1,
          outline: "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      />

      {/* Make this in different component */}

      <map name="image-map" ref={mapRef}>
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          // coords="326,159,378,368"
          coords="329,148,382,447"
          shape="rect"
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
          onMouseLeave={(e) => mouseLeaveHandler(e)}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          // coords="203,160,149,356"
          coords="205,147,151,443"
          shape="rect"
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
          onMouseLeave={(e) => mouseLeaveHandler(e)}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          // coords="203,160,149,356"
          coords="296,130,382,146"
          shape="rect"
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
          onMouseLeave={(e) => mouseLeaveHandler(e)}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          // coords="203,160,149,356"
          coords="239,129,150,148"
          shape="rect"
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
          onMouseLeave={(e) => mouseLeaveHandler(e)}
        />
        <area
          target="_self"
          alt="Skin"
          title="Skin"
          href="javascript:void(0)"
          // coords="203,160,149,356"
          coords="206,149,224,185"
          shape="rect"
          onClick={(e) => mouseClickHandler(e, "Skin", ["Vitamin"])}
          onMouseEnter={(e) => mouseEnterHandler(e, "Skin", ["Vitamin"])}
          onMouseLeave={(e) => mouseLeaveHandler(e)}
        />
        <area
          target="_self"
          alt="Nervous System &amp; Brain"
          title="Nervous System &amp; Brain"
          href="javascript:void(0)"
          coords="228,32,303,101"
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
          // coords="200,413,262,572"
          coords="197,406,339,719"
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
          coords="297,369,337,405"
          // coords="270,415,334,571"
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
          coords="197,367,239,405"
          // coords="270,415,334,571"
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
          alt="Thyroid &amp; Adrenal Glands"
          title="Thyroid &amp; Adrenal Glands"
          href="javascript:void(0)"
          // coords="251,124,283,142"
          coords="239,105,295,148"
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
          // coords="273,162,316,238"
          coords="274,149,327,243"
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
          // coords="273,162,316,238"
          coords="222,149,273,190"
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
          // coords="272,183,243,238"
          coords="207,190,278,236"
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
          coords="221,237,273,287"
          // coords="229,241,276,271"
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
          // coords="279,258,313,305"
          coords="272,245,327,309"
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
          coords="220,306,315,336"
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
          // coords="220,306,315,336"
          coords="213,288,271,315"
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
          // coords="241,338,293,369"
          coords="204,333,333,368"
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
          // coords="243,371,292,398"
          coords="240,368,296,405"
          shape="rect"
          onMouseLeave={(e) => mouseLeaveHandler(e)}
          onClick={(e) =>
            mouseClickHandler(e, "Reproductive Organs", [
              "STD Profile",
              "Fertility Panel",
            ])
          }
          onMouseEnter={(e) =>
            mouseEnterHandler(e, "Reproductive Organs", [
              "STD Profile",
              "Fertility Panel",
            ])
          }
        />
      </map>
    </div>
  );
};

export default ManBody;
