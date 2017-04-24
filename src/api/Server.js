import express from "express"
const router = express.Router()

import { getTodos } from "./server/todoController"

router.get( "/todos", getTodos )

export default router