// 专门操作本地存储的 api 模块

// 存储-数据
export const setItem = (name, data) => {
  return window.localStorage.setItem(name, JSON.stringify(data))
}

// 读取-数据
export const getItem = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}

// 删除-数据
export const removeItem = (name) => {
  return JSON.parse(window.localStorage.removeItem(name))
}
