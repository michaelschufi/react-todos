import express from "express"
const router = express.Router()

import { helloWorld } from "./server/todoController"

router.get( "/todos", helloWorld )

export default router