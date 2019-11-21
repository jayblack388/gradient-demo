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

const GradientDemo = ({ colors, stops }) => {
  const stringRef = useRef()
  const [copySuccess, setCopySuccess] = useState(false)
  const {
    colors: themeColors,
    mode: { darkMode },
  } = useContext(ThemeContext)
  const [background, setBackground] = useState("#FFF")
  useEffect(() => {
    const colorValues = Object.values(colors).map(val => val) || []
    const gradientString = generateGradientCSSString(colorValues, stops)
    setBackground(gradientString)
    setCopySuccess(false)
  }, [colors, stops])

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
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(background).then(
            function() {
              /* clipboard successfully set */
              setCopySuccess(true)
            },
            function() {
              /* clipboard write failed */
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
        }}
        width="60%"
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
  const [stops, setStops] = useState(10)
  const addField = () => {
    setColorFields(prevValues => {
      const newColor = `#${Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()}`
      const currentLength = Object.keys(prevValues).length
      if (currentLength > 5) {
        return prevValues
      }
      return { ...prevValues, [`color_${currentLength + 1}`]: newColor }
    })
  }
  return (
    <>
      <RowDiv
        p="0 25%"
        style={{ flexWrap: "wrap" }}
        justify="space-between"
        width="100%"
      >
        {Object.entries(colorFields).map((colorTuple, i) => (
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
          />
        ))}
      </RowDiv>
      <RowDiv p="0 25%" justify="space-between" height="10%" width="100%">
        <Field
          type="number"
          fieldName="stops"
          value={stops}
          onChange={e => setStops(e.target.value)}
        />
        <Button
          color="successSecondary"
          disabled={Object.keys(colorFields).length > 5}
          message={
            Object.keys(colorFields).length === 0
              ? "Add a Color"
              : "Add Another Color"
          }
          onClick={() => {
            addField()
          }}
        />
      </RowDiv>
      <GradientDemo colors={colorFields} stops={stops} />
    </>
  )
}

export default ColorForm
