import React, { useContext, useEffect, useState } from "react"
import { ThemeContext } from "styled-components"
import { Button, Field, RowDiv } from "jdb-components"
import { generateGradientCSSString } from "gradient-steps-string-generator"

const GradientDemo = ({ colors }) => {
  const {
    colors: themeColors,
    mode: { darkMode },
  } = useContext(ThemeContext)
  const [background, setBackground] = useState("#FFF")
  useEffect(() => {
    const colorValues = Object.values(colors).map(val => val) || []
    const gradientString = generateGradientCSSString(colorValues, 5)
    setBackground(gradientString)
  }, [colors])
  return (
    <RowDiv
      align="center"
      justify="center"
      width="80%"
      height="50%"
      style={{
        background: darkMode
          ? themeColors.light.regular
          : themeColors.dark.regular,
        marginTop: "1rem",
      }}
    >
      <RowDiv width="95%" height="90%" style={{ background }} />
    </RowDiv>
  )
}

const ColorForm = () => {
  const [fields, setFields] = useState({
    color_1: "#000000",
    color_2: "#FFFFFF",
  })
  const addField = prevValues => {
    const currentLength = Object.keys(prevValues).length
    if (currentLength > 5) {
      return prevValues
    }
    return { ...prevValues, [`color_${currentLength + 1}`]: "#000000" }
  }
  return (
    <>
      <RowDiv
        p="0 25%"
        style={{ flexWrap: "wrap" }}
        justify="space-between"
        width="100%"
      >
        {Object.entries(fields).map(colorTuple => (
          <Field
            type="color"
            defaultValue={colorTuple[1]}
            fieldName={colorTuple[0]}
            key={colorTuple[0]}
            overrideOnChange={e => {
              setFields({ ...fields, [`${colorTuple[0]}`]: e.target.value })
            }}
            overrideValue={colorTuple[1]}
          />
        ))}
      </RowDiv>
      <Button
        color="successPrimary"
        disabled={Object.keys(fields).length > 5}
        message={
          Object.keys(fields).length === 0 ? "Add a Color" : "Add Another Color"
        }
        onClick={() => {
          setFields(addField)
        }}
      />
      <GradientDemo colors={fields} />
    </>
  )
}

export default ColorForm
