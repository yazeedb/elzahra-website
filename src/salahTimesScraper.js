// Hack to scrape salah times.
Array.from(document.querySelectorAll("table.zero-margin"))
  .filter((_, index) => index % 2 !== 0)
  .map(table =>
    Array.from(table.querySelectorAll("tr:not(.row-title)"))
      .filter(row => !isNaN(row.querySelector("td").innerHTML))
      .map(row =>
        Array.from(row.querySelectorAll("td:not(:first-child)")).map(
          td => td.innerHTML
        )
      )
  )
