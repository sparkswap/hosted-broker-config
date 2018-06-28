const query = require('micro-query')
const request = require('request-promise-native')

const TEMPLATE_FILE_LOCATION = 'https://raw.githubusercontent.com/kinesis-exchange/broker-cli/master/sample-.kcli.js'
let template = ''

const DEFAULT_SERVER = 'localhost'

module.exports = async (req) => {
  if (!template) template = await request(TEMPLATE_FILE_LOCATION)

  const server = query(req).server || DEFAULT_SERVER
  console.log(`Serving custom config for ${server} at ${new Date()}`)
  return template.replace("// rpcAddress: 'localhost:27492'", `rpcAddress: '${server}:27492'`)
}
