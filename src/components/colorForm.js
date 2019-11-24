import React, { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "styled-components"
import { Button, Field, RowDiv, BlockSpan, ColDiv } from "jdb-components"
import { generateGradientCSSString } from "gradient-steps-string-generator"

const CopyButton = ({ onClick, success }) => {
  return (
    <Button
      onClick={onClick}
      color={success ? "success" : "successSecondary"}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: `0.6rem ${success ? 1 : 1.4}rem`,
      }}
    >
      {success ? "Copied!" : "Copy"}
    </Button>
  )
}

const GradientDemo = ({ colors, direction, percents, stops }) => {
  const stringRef = useRef()
  const [copySuccess, setCopySuccess] = useState(false)
  const {
    colors: themeColors,
    mode: { darkMode },
  } = useContext(ThemeContext)
  const [background, setBackground] = useState("#FFF")
  const formattedPercents = Object.values(percents).map(val => val ? `${val}%` : undefined)
  useEffect(() => {
    const colorValues = Object.values(colors).map(val => val) || []
    const gradientString = generateGradientCSSString(colorValues, stops, {
      customStepDirection: direction,
      customStepStops: formattedPercents,
    })
    setBackground(gradientString)
    setCopySuccess(false)
  }, [colors, stops, formattedPercents, direction])

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false)
      }, 3000)
    }
  }, [copySuccess])

  const copyCodeToClipboard = () => {
    if (!stringRef.current) return
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then(function(result) {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard.writeText(background).then(
            function() {
              setCopySuccess(true)
            },
            function(e) {
              console.log(e)
            }
          )
        }
        // Don't do anything if the permission was denied.
      })
  }
  return (
    <>
      <RowDiv
        align="center"
        justify="center"
        width="80%"
        height="40%"
        style={{
          background: darkMode
            ? themeColors.light.regular
            : themeColors.dark.regular,
          marginTop: "1rem",
        }}
      >
        <RowDiv width="95%" height="90%" style={{ background }} />
      </RowDiv>
      <BlockSpan style={{ marginTop: "1rem", padding: "0 20%" }}>
        Generated value:
      </BlockSpan>
      <ColDiv
        style={{
          background: darkMode
            ? themeColors.light.regular
            : themeColors.dark.regular,
          overflow: "auto",
        }}
        width="60%"
        height="10rem"
        align="center"
      >
        <BlockSpan
          ref={stringRef}
          style={{
            color: darkMode
              ? themeColors.dark.regular
              : themeColors.light.regular,
            padding: "1rem",
            width: "60%",
          }}
        >
          {background}
        </BlockSpan>
        <CopyButton success={copySuccess} onClick={copyCodeToClipboard} />
      </ColDiv>
    </>
  )
}

const ColorForm = () => {
  const [colorFields, setColorFields] = useState({
    color_1: "#000000",
    color_2: "#FFFFFF",
  })
  const [colorPercents, setColorPercents] = useState({
    color_1_percent: undefined,
    color_2_percent: undefined,
  })
  const [direction, setDirection] = useState("45deg")
  const [stops, setStops] = useState(10)
  const addField = () => {
    setColorFields(prevValues => {
      const newColor = `#${Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()}`
      const currentLength = Object.keys(prevValues).length
      return { ...prevValues, [`color_${currentLength + 1}`]: newColor }
    })
    setColorPercents(prevValues => {
      const currentLength = Object.keys(prevValues).length
      return {
        ...prevValues,
        [`color_${currentLength + 1}_percent`]: undefined,
      }
    })
  }
  return (
    <>
      <RowDiv
        p="1rem"
        style={{ flexWrap: "wrap", overflow: "auto" }}
        justify="space-between"
        width="75%"
        height="22rem"
      >
        {Object.entries(colorFields).map((colorTuple, i) => (
          <ColDiv>
            <Field
              type="color"
              defaultValue={colorTuple[1]}
              fieldName={colorTuple[0]}
              key={colorTuple[0]}
              overrideOnChange={e => {
                setColorFields({
                  ...colorFields,
                  [`${colorTuple[0]}`]: e.target.value,
                })
              }}
              overrideValue={colorTuple[1]}
              p="0"
              m="0"
            />
            <Field
              type="number"
              fieldName={`${colorTuple[0]}_percent`}
              value={colorPercents[`${colorTuple[0]}_percent`]}
              onChange={e => {
                setColorPercents({
                  ...colorPercents,
                  [`${colorTuple[0]}_percent`]: e.target.value,
                })
              }}
              p="0"
              m="0"
            />
          </ColDiv>
        ))}
      </RowDiv>
      <RowDiv p="0 25%" justify="space-between" width="100%">
        <Field
          type="number"
          fieldName="stops"
          value={stops}
          onChange={e => setStops(e.target.value)}
        />
        <Field
          type="text"
          fieldName="step_direction"
          value={direction}
          onChange={e => setDirection(e.target.value)}
        />
      </RowDiv>
      <RowDiv p="0 25%" justify="space-between" height="10%" width="100%">
        <Button
          color="successSecondary"
          disabled={Object.keys(colorFields).length > 30}
          message={
            Object.keys(colorFields).length === 0
              ? "Add a Color"
              : "Add Another Color"
          }
          onClick={() => {
            addField()
          }}
        />
        <Button
          color="secondaryPrimary"
          disabled={Object.keys(colorFields).length === 2}
          message="Reset"
          onClick={() => {
            setColorFields({
              color_1: "#000000",
              color_2: "#FFFFFF",
            })
            setStops(10)
            setDirection("45deg")
          }}
        />
      </RowDiv>
      <GradientDemo
        direction={direction}
        percents={colorPercents}
        colors={colorFields}
        stops={stops}
      />
    </>
  )
}

export default ColorForm
