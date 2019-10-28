const ics = require('ics')
const School = require('mealts').School
const fs = require('fs')
let namsan = new School(School.Type.HIGH, School.Region.GYEONGNAM, 'S100000693')

let today = new Date(2019, 9)

let events = []

namsan.getMonthlyMenu(today.getFullYear(), today.getMonth() + 1).then(menus => {
  menus.forEach((menu, ind) => {
    if(menu.lunch.length !== 0) {
      let start = [today.getFullYear(), today.getMonth() + 1, ind + 1, 12, 30]
      events.push({
        start: start,
        duration: {hours: 1},
        title: '중식',
        description: menu.lunch
      })
    }
    if(menu.dinner.length !== 0) {
      let start = [today.getFullYear(), today.getMonth() + 1, ind + 1, 17, 30]
      events.push({
        start: start,
        duration: {hours: 1},
        title: '석식',
        description: menu.dinner
      })
    }
  })
  let {error, value} = ics.createEvents(events)
  value = value.replace(/DTSTART/g, 'DTSTART;TZID=Asia/Seoul')
  let icsarr = value.split('\n')
  icsarr.splice(2, 0, `X-WR-CALNAME:급식
X-WR-TIMEZONE:Asia/Seoul
BEGIN:VTIMEZONE
TZID=Asia/Seoul
X-LIC-LOCATION:Asia/Seoul
BEGIN:STANDARD
TZOFFSETFROM:+0900
TZOFFSETTO:+0900
TZNAME:KST
END:STANDARD
END:VTIMEZONE`)
  value = icsarr.join('\n')
  fs.writeFileSync('meal.ics', value)
})
