import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { http_response } from '../../common/http-response'
import { deleteTodo } from '../../helpers/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const userId = getUserId(event)
    if (!userId) return http_response._404({ error: 'Not found' })
    logger.info('To delete todo', { todoId, userId })
    const res = await deleteTodo(todoId, userId)
    logger.info('Deleted todo', { todoId, userId, res })
    if (!res) {
      return http_response._400({ error: 'Unable to delete the user' })
    }
    return http_response._200({
      message: `Todo with ID; ${todoId} is deleted!`
    })
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
