/* eslint-disable no-undef */
// eslint-disable-next-line no-multi-assign
const encodeHTMLEntities = (rawStr) => rawStr.replace(/[\u00A0-\u9999<>&]/g, ((i) => `&#${i.charCodeAt(0)};`));
module.exports = { encodeHTMLEntities };