const app = require('../app')
const PORT = process.env.PORT || 3211

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
