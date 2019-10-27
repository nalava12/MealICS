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
  fs.writeFileSync('meal.ics', value)
})