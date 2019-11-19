import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Glide from "@glidejs/glide"
import { Typography, IconButton, Button } from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { makeStyles } from "@material-ui/core"

const titleTopAmount = 30
const arrowTopAmount = titleTopAmount + 10

const useStyles = makeStyles(theme => {
  const arrowStyles = {
    position: "absolute",
    top: `${arrowTopAmount}%`,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  }

  return {
    backArrow: {
      ...arrowStyles,
      left: 0,
    },
    forwardArrow: {
      ...arrowStyles,
      right: 0,
    },
    // overlay: {
    //   backgroundColor: "rgba(0, 0, 0, 0.6)",
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   top: 0,
    //   left: 0,
    // },
  }
})

const Carousel = () => {
  const latestNews = useStaticQuery(graphql`
    query LatestNewsQuery {
      allWordpressPost(limit: 3, sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
            title
            featured_media {
              localFile {
                childImageSharp {
                  resolutions {
                    base64
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const [slider] = useState(new Glide(".glide"))

  useEffect(() => {
    slider.mount()

    return () => {
      slider.destroy()
    }
  }, [slider])

  const classes = useStyles()

  return (
    <div
      className="glide"
      style={{
        textAlign: "center",
      }}
    >
      <div className="glide__track" data-glide-el="track">
        <ul
          className="glide__slides"
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {latestNews.allWordpressPost.edges.map(({ node }) => {
            return (
              <li
                className="glide__slide"
                key={node.id}
                style={{
                  margin: 0,
                  height: "100%",
                  minHeight: "300px",
                  position: "relative",
                }}
              >
                <img
                  src={
                    node.featured_media.localFile.childImageSharp.resolutions
                      .src
                  }
                  style={{
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </li>
            )
          })}
        </ul>

        <div data-glide-el="controls">
          <IconButton
            data-glide-dir="<"
            className={classes.backArrow}
            size="medium"
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            data-glide-dir=">"
            className={classes.forwardArrow}
            size="medium"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Carousel
