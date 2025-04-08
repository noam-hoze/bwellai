import { Tooltip } from "../tooltip";

const upArrow = `${import.meta.env.VITE_ASSETS_BASE_URL}up-arrow.svg`;

const extractFirstNumber = (number) => {
  if (!number) return undefined;
  const num = parseFloat(number?.match(/-?\d+\.?\d*/));
  return num;
};
const getNumericValueOrFalse = (item) => {
  if (!item || item == "-") return undefined;
  if (typeof item == typeof 0) return item;
  try {
    let num = item?.replace(/,/g, "");
    num = extractFirstNumber(num);
    if (!num) num = item;
    return num;
  } catch (e) {
    console.log(e, e?.stack, "\n", item);
    return item;
  }
};
function linerInterpolation(x1, x2, y1, y2, scalingValue) {
  const xResult = y1 + ((y2 - y1) / (x2 - x1)) * scalingValue;
  return parseInt(xResult);
}

function createMark3(lowValue, highValue, resultValue) {
  const marks = [];
  marks?.push({
    value: 25,
    label: lowValue,
  });
  marks?.push({
    value: 80,
    label: highValue,
  });
  const resultObj = {
    label: resultValue,
    value: 0,
  };
  if (resultValue < lowValue) {
    resultObj.value = linerInterpolation(0, lowValue, 0, 25, resultValue);
  } else if (resultValue < highValue) {
    resultObj.value = linerInterpolation(
      lowValue,
      highValue,
      25,
      80,
      resultValue - lowValue
    );
  } else
    resultObj.value = linerInterpolation(
      highValue,
      2 * highValue,
      80,
      100,
      resultValue - highValue
    );

  if (resultObj.value < 5) resultObj.value = 5;
  if (resultObj.value > 95) resultObj.value = 95;

  return [marks, resultObj.value];
}

function createMark2(cutoff, resultValue) {
  const marks = [];
  marks.push({
    value: 55,
    label: cutoff,
  });
  // marks.push({
  //   value: 80,
  //   label: highValue,
  // });
  const resultObj = {
    label: resultValue,
    value: 0,
  };
  if (resultValue < cutoff) {
    resultObj.value = linerInterpolation(0, cutoff, 0, 55, resultValue);
  } else
    resultObj.value = linerInterpolation(
      cutoff,
      2 * cutoff,
      55,
      100,
      resultValue - cutoff
    );

  if (resultObj.value < 5) resultObj.value = 5;
  if (resultObj.value > 95) resultObj.value = 95;

  return [marks, resultObj.value];
}
function createMark4(lowValue, borderline, highValue, resultValue) {
  const marks = [];
  marks.push({
    value: 25,
    label: lowValue,
  });
  marks.push({
    value: 55,
    label: borderline,
  });
  marks.push({
    value: 80,
    label: highValue,
  });
  const resultObj = {
    label: resultValue,
    value: 0,
  };
  if (resultValue < lowValue) {
    resultObj.value = linerInterpolation(0, lowValue, 0, 25, resultValue);
  } else if (resultValue < borderline) {
    resultObj.value = linerInterpolation(
      lowValue,
      borderline,
      25,
      55,
      resultValue - lowValue
    );
  } else if (resultValue < highValue) {
    resultObj.value = linerInterpolation(
      borderline,
      highValue,
      55,
      80,
      resultValue - borderline
    );
  } else
    resultObj.value = linerInterpolation(
      highValue,
      2 * highValue,
      80,
      100,
      resultValue - highValue
    );

  if (resultObj.value < 5) resultObj.value = 5;
  if (resultObj.value > 95) resultObj.value = 95;

  return [marks, resultObj.value];
}

function createMark5(borderline, highValue, resultValue) {
  const marks = [];
  marks.push({
    value: 25,
    label: borderline,
  });
  marks.push({
    value: 80,
    label: highValue,
  });
  const resultObj = {
    label: resultValue,
    value: 0,
  };
  if (resultValue < borderline) {
    resultObj.value = linerInterpolation(0, borderline, 0, 25, resultValue);
  } else if (resultValue < highValue) {
    resultObj.value = linerInterpolation(
      borderline,
      highValue,
      25,
      80,
      resultValue - borderline
    );
  } else
    resultObj.value = linerInterpolation(
      highValue,
      2 * highValue,
      80,
      100,
      resultValue - highValue
    );

  if (resultObj.value < 5) resultObj.value = 5;
  if (resultObj.value > 95) resultObj.value = 95;

  return [marks, resultObj.value];
}

const ReportSpectrum = ({ spectrum, min, max, testResultValue, rangeObj }) => {
  const colors = ["#FFCC00", "#00B588", "#40E0D0", "#00B588", "#FFCC00"];

  if (
    min === "0" ||
    min === "0.0" ||
    min === 0 ||
    min === "Nill" ||
    min === "Nil"
  ) {
    min = null;
  }

  if (
    max === "0" ||
    max === "0.0" ||
    max === 0 ||
    min === "Nill" ||
    min === "Nil"
  ) {
    max = null;
  }

  if ((spectrum?.length === 0 || !spectrum) && min && max) {
    spectrum = [10, 20, 40, 20, 10];
  }

  if ((spectrum?.length === 0 || !spectrum) && !min && max) {
    spectrum = [0, 0, 80, 15, 5];
  }
  if ((spectrum?.length === 0 || !spectrum) && min && !max) {
    spectrum = [5, 15, 80, 0, 0];
  }

  let newResultValue = testResultValue;
  newResultValue = getNumericValueOrFalse(
    testResultValue?.replace("<", "")?.replace(">", "")
  );

  let defaultValue;

  if (rangeObj?.sliderType == "LNH") {
    [, defaultValue] = createMark3(
      rangeObj?.lowThreshold,
      rangeObj?.highThreshold,
      newResultValue
    );
  } else if (rangeObj?.sliderType == "LN") {
    [, defaultValue] = createMark2(rangeObj?.lowThreshold, newResultValue);
  } else if (rangeObj?.sliderType == "NH") {
    [, defaultValue] = createMark2(
      parseFloat(rangeObj?.highThreshold),
      newResultValue
    );
  } else if (rangeObj?.sliderType == "NHHN") {
    [, defaultValue] = createMark3(
      rangeObj?.boderline,
      rangeObj?.highThreshold,
      newResultValue
    );
  } else if (rangeObj?.sliderType == "LLNH") {
    [, defaultValue] = createMark4(
      rangeObj?.lowThreshold,
      rangeObj?.boderline,
      rangeObj?.highThreshold,
      newResultValue
    );
  } else if (rangeObj?.sliderType == "NHH") {
    [, defaultValue] = createMark5(
      rangeObj?.boderline,
      rangeObj?.highThreshold,
      newResultValue
    );
  }

  // Construct the gradient
  const gradientStops: string[] = [];
  let cumulativePercentage = 0;
  let maxValuePosition = "80%";
  let minValuePosition = "25%";

  // Add red at the start if min is true
  if (min) {
    gradientStops?.push(`#FF3B30 ${min && max ? "25%" : "50%"}`);
    cumulativePercentage = min && max ? 25 : 50;
  }
  if (!max && min) {
    minValuePosition = "50%";
  }

  // Add spectrum colors
  spectrum?.forEach((value, index) => {
    if (min) {
      const stopPercentage =
        cumulativePercentage + value / (min && max ? 2 : 1);
      gradientStops?.push(`${colors?.[index]} ${stopPercentage}%`);
      cumulativePercentage = stopPercentage;
    }
    if (!min) {
      const stopPercentage = cumulativePercentage + value * 0.5;
      gradientStops?.push(`${colors?.[index]} ${stopPercentage}%`);
      cumulativePercentage = stopPercentage;
    }
  });

  // Add red at the end if max is true
  if (max && min) {
    gradientStops?.push(`#EB0C00 ${"80%"}`);
  }

  if (max && !min) {
    gradientStops?.push(`#EB0C00 ${"55%"}`);
    maxValuePosition = "55%";
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "300px",
          height: "10px",
          borderRadius: "10px",
          background: `linear-gradient(to right, ${gradientStops?.join(", ")})`,
        }}
      ></div>
      {min && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "15px",
            left: minValuePosition,
            transform: "translateX(-50%)",
          }}
        >
          <img src={upArrow} alt="up-arrow-indicator" crossOrigin="anonymous" />
          <p>{min}</p>
        </div>
      )}
      {max && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "15px",
            left: maxValuePosition,
            transform: "translateX(-50%)",
          }}
        >
          <img src={upArrow} alt="up-arrow-indicator" crossOrigin="anonymous" />
          <p>{max}</p>
        </div>
      )}
      {testResultValue && (
        <Tooltip>
          <div
            style={{
              position: "absolute",
              top: "50%",
              width: "4px",
              height: "4px",
              left: defaultValue + "%",
              background: "black",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
            }}
          ></div>
        </Tooltip>
      )}
      {/* {testResultValue && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: resPosition + "%",
          }}
        >
          <Typography>{testResultValue}</Typography>
        </div>
      )} */}
    </div>
  );
};

export default ReportSpectrum;
