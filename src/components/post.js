import React from "react"
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
  Button,
  Grid,
  CardMedia,
} from "@material-ui/core"
import { format } from "date-fns"
import elzahraLogo from "../images/elzahra-logo.jpg"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => {
  return {
    card: {
      margin: `${theme.spacing()}px 0`,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    cardMedia: {
      height: "145px",
    },
  }
})

const Post = ({ announcements }) => {
  const classes = useStyles()

  return announcements.map(({ node }) => {
    console.log(node)
    return (
      <Grid item xs={12} sm={6} md={4} key={node.id}>
        <Card className={classes.card} key={node.id} elevation={3}>
          <CardMedia
            image={
              node.featured_media
                ? node.featured_media.localFile.childImageSharp.fluid.src
                : elzahraLogo
            }
            title={node.title}
            className={classes.cardMedia}
          />

          <CardContent className={classes.cardContent}>
            <div className={classes.cardHeader}>
              <Typography
                variant="h6"
                style={{
                  marginRight: "5px",
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{ __html: node.title }}
              />
            </div>

            <Typography variant="subtitle2" color="textSecondary">
              {format(new Date(node.date), "M/d/yyyy")}
            </Typography>

            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
              color="textSecondary"
            />
          </CardContent>
          <CardActions>
            <Link
              to={`posts/${node.slug}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="text"
                color="secondary"
                style={{ fontWeight: "bold" }}
              >
                Read more
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    )
  })
}

export default Post
