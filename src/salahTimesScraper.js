const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]

const salahTimings = ["fajr", "sunrise", "dhur", "asr", "maghrib", "isha"]

// Hack to scrape salah times.
const salahTimesScraper = Array.from(
  document.querySelectorAll("table.zero-margin")
)
  .filter((_, index) => index % 2 !== 0)
  .map((table, index) => {
    return {
      monthName: months[index],
      data: Array.from(table.querySelectorAll("tr:not(.row-title)"))
        .filter(row => !isNaN(row.querySelector("td").innerHTML))
        .map(row => {
          const times = Array.from(
            row.querySelectorAll("td:not(:first-child)")
          ).reduce((acc, td, index) => {
            acc[salahTimings[index]] = td.innerHTML
            return acc
          }, {})

          return times
        }),
    }
  })
