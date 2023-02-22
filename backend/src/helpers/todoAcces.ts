import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

const createDynamoDBClient = () => {
  return new XAWS.DynamoDB.DocumentClient()
}

// TODO: Implement the dataLayer logic
export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX
  ) {}

  //  gets all todos for a user
  async getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todos')

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as TodoItem[]
  }

  //  create todo item
  async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
    logger.info('Creating a todo item')
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todoItem
      })
      .promise()

    return todoItem
  }

  //  Update todo items
  async updateTodoItem(
    todoId: string,
    userId: string,
    updatedTodo: TodoUpdate
  ): Promise<TodoUpdate> {
    logger.info('Updating a todo item')
    const result = await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          todoId,
          userId
        },
        UpdateExpression:
          'set #name = :name, dueDate = :dueDate, done = :done, attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
          ':name': updatedTodo.name,
          ':dueDate': updatedTodo.dueDate,
          ':done': updatedTodo.done,
          ':attachmentUrl': updatedTodo.attachmentUrl || ''
        },
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise()
    logger.info('result', result)
    return result.Attributes as TodoUpdate
  }
  //  delete todo items
  async deleteTodoItem(todoId: string, userId: string): Promise<TodoItem> {
    logger.info('Deleting a todo item')
    const result = await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          todoId,
          userId
        },
        ReturnValues: 'ALL_OLD'
      })
      .promise()

    return result.Attributes as TodoItem
  }

  async getTodoById(todoId: string, userId: string): Promise<TodoItem> {
    logger.info('Getting a todo item by id')
    const result = await this.docClient
      .get({
        TableName: this.todosTable,
        Key: {
          todoId,
          userId
        }
      })
      .promise()

    return result.Item as TodoItem
  }
}
