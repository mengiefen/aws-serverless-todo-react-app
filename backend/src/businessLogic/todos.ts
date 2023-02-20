import { TodosAccess } from '../dataLayer/todoAcces'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'

// import * as createError from 'http-errors'

// TODO: Implement businessLogic

const todoAccess = new TodosAccess()
const logger = createLogger('TodosAccess')

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting all todos')
  return todoAccess.getAllTodos(userId)
}
