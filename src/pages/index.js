import React from "react"

import ColorForm from "../components/colorForm"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ setDarkMode }) => (
  <Layout setDarkMode={setDarkMode}>
    <SEO title="Gradient Generator Demo" />
    <ColorForm />
  </Layout>
)

export default IndexPage
