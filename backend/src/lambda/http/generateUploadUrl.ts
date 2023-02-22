import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { http_response } from '../../common/http-response'
import { uploadImage } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const userId = getUserId(event)
    console.log('Generating upload todoId & userId', { todoId, userId })

    const url = await uploadImage(todoId, userId)

    if (!url || url === 'Not Found') {
      http_response._404({ error: `The url for todoId: ${todoId} not found!` })
    }
    return http_response._200({ uploadUrl: url })
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
