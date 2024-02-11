"use client"
import "github-markdown-css/github-markdown.css"
import React from "react"
import Markdown from "react-markdown"
import "./page.css"
import markdownIt from 'markdown-it'

const Page = () => {
    const md = markdownIt()
    return <div
        style={{ minHeight: "100vh", padding: "50px" }}
        className="preview markdown-body">
        <code>Hello</code>
    </div>
}
export default Page