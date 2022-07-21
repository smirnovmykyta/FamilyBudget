import express from 'express'
const PORT = process.env.DB_PORT || 4000

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

