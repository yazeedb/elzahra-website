import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  Typography,
  TableBody,
} from "@material-ui/core"
import { getTitleStyles } from "../pages"

const findTodaysSalahTimes = salahTimes => {
  const todaysDate = new Date()
  const todaysMonth = todaysDate.getMonth()
  const todaysDay = todaysDate.getDay()

  return salahTimes.allSalahTimes2020Json.nodes
    .find((_, index) => index === todaysMonth)
    .data.find((_, index) => index === todaysDay - 1)
}

const useStyles = makeStyles(theme => {
  const tableRow = {
    display: "flex",
    justifyContent: "space-between",
  }

  return {
    paper: {
      marginTop: theme.spacing(2),
    },
    table: {
      backgroundColor: "white",
    },
    title: {
      ...getTitleStyles(theme),
      marginTop: theme.spacing(8),
    },
    headerRow: {
      ...tableRow,
      backgroundColor: theme.palette.primary.main,
    },
    headerCell: {
      color: "white",
      fontWeight: "bold",
      borderBottom: 0,
    },
    bodyCell: {
      color: theme.palette.textSecondary,
      border: 0,
      textTransform: "capitalize",
    },
    bodyRow: {
      ...tableRow,
      backgroundColor: "white",
      "&:nth-of-type(odd)": {
        backgroundColor: `rgba(${theme.palette.primary.mainRgb}, 0.2)`,
      },
    },
  }
})

const SalahTimes = () => {
  const salahTimes = useStaticQuery(graphql`
    query SalahTimesQuery {
      allSalahTimes2020Json {
        nodes {
          data {
            fajr
            sunrise
            dhur
            asr
            maghrib
            isha
          }
          monthName
        }
      }
    }
  `)

  const todaysSalahTimes = {
    ...findTodaysSalahTimes(salahTimes),
    juma: "1:00 PM",
  }

  const iqamas = {
    fajr: "5:45 AM",
    dhur: "1:15 PM",
    asr: "3:30 PM",
    maghrib: "5:30 PM",
    isha: "7:30 PM",
    juma: "1:35 PM",
  }

  const completedTimes = Object.keys(iqamas).reduce((acc, key) => {
    acc.push({
      name: key,
      adhan: todaysSalahTimes[key],
      iqama: iqamas[key],
    })

    return acc
  }, [])

  const classes = useStyles()

  console.log(completedTimes)

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Prayer Times
      </Typography>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.headerRow}>
              {["", "Adhan", "Iqama"].map(c => (
                <TableCell className={classes.headerCell} key={c}>
                  {c}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableBody}>
            {completedTimes.map(t => {
              return (
                <TableRow className={classes.bodyRow} key={t.name}>
                  <TableCell className={classes.bodyCell}>{t.name}</TableCell>
                  <TableCell className={classes.bodyCell}>{t.adhan}</TableCell>
                  <TableCell className={classes.bodyCell}>{t.iqama}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default SalahTimes
