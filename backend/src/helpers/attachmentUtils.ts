import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('AttachmentUtils')

const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})
const bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)

// TODO: Implement the fileStogare logic
export const getAttachmentUrl = (todoId: string) => {
  return `https://${bucketName}.s3.amazonaws.com/${todoId}`
}

export const getUploadUrl = (todoId: string) => {
  logger.info('Creating a presigned url for an attachment', todoId)
  const result = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  })
  console.log('result', result)
  logger.info('Presigned url created', result)
  return result
}

export const deleteAttachment = async (todoId: string) => {
  await s3
    .deleteObject({
      Bucket: bucketName,
      Key: todoId
    })
    .promise()
}
