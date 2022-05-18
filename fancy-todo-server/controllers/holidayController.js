const axios = require('axios');
let holidayApiKey = process.env.HOLIDAY_KEY

class holidaysConstroller {
    static getHolidays(req, res, next) {
        const { year, month } = req.body
        axios({
            method: 'get',
            url: `https://calendarific.com/api/v2/holidays?&api_key=${holidayApiKey}&country=ID&year=${year}&month=${month}&type=national`
        })
            .then(response => {
                response.data.response.holidays.forEach(e => {
                    delete e.description
                    delete e.country
                    delete e.type
                    delete e.locations
                    delete e.states
                    e.date = e.date.iso
                });
                res.status(200).json({ holiday: response.data.response.holidays });
            })
            .catch(next)
    }
}
module.exports = holidaysConstroller
