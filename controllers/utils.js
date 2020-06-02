/*
 * @Author: xukai
 * @Date: 2020-06-02 10:34:37
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 11:26:46
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../config/constant').errnoInfo
const fse = require('fs-extra')
const path = require('path')

// 文件存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
// 文件大小 单位:MB
const MAX_SIZE = 1024 * 1024 * 1024

fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} path 文件路径
 */
async function saveFile ({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  const fileName = Date.now() + '_' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
