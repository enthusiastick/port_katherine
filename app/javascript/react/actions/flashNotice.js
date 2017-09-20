const CLEAR_NOTICES = 'CLEAR_NOTICES'
const FLASH_NOTICE = 'FLASH_NOTICE'

export { CLEAR_NOTICES, FLASH_NOTICE }

let clearNotices = () => {
  return {
    type: CLEAR_NOTICES
  }
}

let flashNotice = notice => {
  return {
    type: FLASH_NOTICE,
    notice
  }
}

export { clearNotices, flashNotice }
