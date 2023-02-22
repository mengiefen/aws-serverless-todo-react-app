import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { fetchAllTodos } from '../../helpers/todos'
import { getUserId } from '../utils'
import { http_response } from '../../common/http-response'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const allTodos = await fetchAllTodos(getUserId(event))

    if (!allTodos) return http_response._400({ error: 'Unable to fetch todos' })

    return http_response._200({ items: allTodos })
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
