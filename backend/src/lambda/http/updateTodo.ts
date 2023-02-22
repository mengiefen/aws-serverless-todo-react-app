import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { updateTodo } from '../../helpers/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { http_response } from '../../common/http-response'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const userId = getUserId(event)
    if (!userId) {
      return http_response._404({
        message: 'The user is not found'
      })
    }
    const todo = await updateTodo(todoId, userId, updatedTodo)
    return http_response._201({
      item: todo
    })
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
