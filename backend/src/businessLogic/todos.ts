import { UpdateTodoRequest } from './../requests/UpdateTodoRequest'
import { CreateTodoRequest } from './../requests/CreateTodoRequest'
import { TodosAccess } from '../dataLayer/todoAcces'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'
import { getAttachmentUrl } from '../helpers/attachmentUtils'
import { v4 as uuid } from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate'

// import * as createError from 'http-errors'

// TODO: Implement businessLogic

const todoAccess = new TodosAccess()
const logger = createLogger('TodosAccess')

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting all todos')
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('Creating a todo item')
  const todoId = uuid()
  const url = getAttachmentUrl(todoId)
  const createdAt = new Date().toISOString()
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: url,
    ...newTodo
  }

  return await todoAccess.createTodoItem(newItem)
}

export async function updateTodo(
  todoId: string,
  userId: string,
  updatedTodo: UpdateTodoRequest
): Promise<TodoUpdate> {
  return await todoAccess.updateTodoItem(todoId, userId, updatedTodo)
}

export async function deleteTodo(
  todoId: string,
  userId: string
): Promise<TodoItem> {
  return await todoAccess.deleteTodoItem(todoId, userId)
}
