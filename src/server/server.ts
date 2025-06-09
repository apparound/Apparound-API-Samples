import express from 'express'
import axios from 'axios'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { ApparoundUtils } from './apparound-utils'

const app: any = express()
const port: number = 3000
const server_url: string = process.env.SERVER_URL || ''
const CLIENT_ID: string = process.env.CLIENT_ID || ''
const SECRET: string = process.env.SECRET || ''

const X_SESSION_KEY: string = 'x-sessionid'

app.use(express.json())
app.use(cors())

const getSessionIdFromHeaders = (req: any): string => {
   return req.headers[X_SESSION_KEY]?.toString() || null
}

app.get('/init/cpqId/:cpqId', async (req: any, res: any) => {
   try {
      const cpqId: number = req.params?.cpqId || -1
      const response: any = await new ApparoundUtils().init(cpqId)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/initSession/cpqId/:cpqId', async (req: any, res: any) => {
   try {
      const cpqId: number = req.params?.cpqId || -1
      const response: any = await new ApparoundUtils().initSession(cpqId)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getProducts/productGuid/:productGuid', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const productGuid: string = req.params?.productGuid?.toString() || null
      const response: any = await new ApparoundUtils().getValidProductsLegacy(sessionId, productGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getProducts/tofId/:tofId/productGuid/:productGuid?', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const tofId: string = req.params?.tofId?.toString() || null
      const productGuid: string = req.params?.productGuid?.toString() || null
      const response: any = await new ApparoundUtils().getValidProducts(sessionId, tofId, productGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/addProduct/productGuid/:productGuid/parentGuid/:parentGuid?', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const productGuid: string = req.params?.productGuid?.toString() || null
      const parentGuid: string = req.params?.parentGuid?.toString() || null
      const response: any = await new ApparoundUtils().addProductLegacy(sessionId, productGuid, parentGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/addProduct/tofId/:tofId/productGuid/:productGuid/parentGuid/:parentGuid?', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const tofId: string = req.params?.tofId?.toString() || null
      const productGuid: string = req.params?.productGuid?.toString() || null
      const parentGuid: string = req.params?.parentGuid?.toString() || null
      const response: any = await new ApparoundUtils().addProduct(sessionId, tofId, productGuid, parentGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.delete('/removeCart/cartId/:cartId', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const cartId: number = req.params?.cartId || -1
      const response: any = await new ApparoundUtils().deleteCart(sessionId, cartId)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.delete('/removeProduct/productGuid/:productGuid', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const productGuid: string = req.params?.productGuid?.toString() || null
      const response: any = await new ApparoundUtils().removeProductFromCart(sessionId, productGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.post('/setProductQuantity/productGuid/:productGuid/qty/:productQuantity', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const productGuid: string = req.params?.productGuid?.toString() || null
      const productQuantity: number = req.params?.productQuantity || 1
      const response: any = await new ApparoundUtils().setProductQuantity(sessionId, productGuid, productQuantity)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getCartInfo/cartGuid/:cartGuid', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const cartGuid: string = req.params?.cartGuid?.toString() || null
      const response: any = await new ApparoundUtils().getCartInfoByCartGuid(sessionId, cartGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getCartProducts/cartGuid/:cartGuid', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const cartGuid: string = req.params?.cartGuid?.toString() || null
      const response: any = await new ApparoundUtils().getCartProductsByCartGuid(sessionId, cartGuid)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.post('/saveContract', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const contractData = req.body?.contract || {}
      const response: any = await new ApparoundUtils().saveContract(sessionId, contractData)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.post('/updateCustomerQuote', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const customerData = req.body?.customer || {}
      const response: any = await new ApparoundUtils().updateCustormer(sessionId, customerData)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.post('/finalizeQuote', async (req: any, res: any) => {
   try {
      const sessionId: string = getSessionIdFromHeaders(req)
      const response: any = await new ApparoundUtils().finalizeQuote(sessionId)
      res.json(response)
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getPdfQuote', async (req: any, res: any) => {
   try {
      const sessionId: string = req.query.sessionId?.toString() || ''
      const response: any = await new ApparoundUtils().getPdfQuote(sessionId)
      res.set('Content-Type', response.headers.getContentType() || 'application/pdf')
      res.send(Buffer.from(response.data, 'binary'))
   } catch (error: any) {
      res.status(500).send(error)
   }
})

app.get('/getImage', async (req: any, res: any) => {
   try {
      const sessionId: string = req.query.sessionId?.toString() || ''
      const fileName: string = req.query.fileName?.toString() || ''
      const response: any = await new ApparoundUtils().getImageOfProduct(sessionId, fileName)
      res.set('Content-Type', response.headers.getContentType() || 'image/png')
      res.send(Buffer.from(response.data, 'binary'))
   } catch (error: any) {
      res.status(500).send(error)
   }
})

/* OLD APIs */
let TOKEN: string | null = null
let SESSION_ID: string | null = null
const ERRORS: any = {
   500: 'Server ERROR!',
}

const generateHeaders = (): any => {
   let headers: any = {}

   if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`

   if (SESSION_ID) headers['X-SessionId'] = SESSION_ID

   return headers
}

const saveSessionId = (sessionId: string): void => {
   SESSION_ID = sessionId || null
}

app.post('/token', async (req: any, res: any) => {
   try {
      const response: any = await axios.post(`${server_url}/apikey/token`, {
         clientId: CLIENT_ID,
         secret: SECRET,
      })
      TOKEN = response.data.token || ''
      res.json(response.data)
   } catch (error: any) {
      res.status(500).send(ERRORS[500])
   }
})

app.get('/apparound/*', async (req: any, res: any) => {
   try {
      const queryParams: any = req.query
      const queryString: string = new URLSearchParams(queryParams as any).toString()
      const apiPath: string = req.params[0]
      const response: any = await axios.get(`${server_url}/${apiPath}?${queryString}`, {
         headers: generateHeaders(),
      })

      if (response && response.data && response.data.sessionId) saveSessionId(response.data.sessionId)

      res.json(response.data)
   } catch (error: any) {
      res.status(500).send(ERRORS[500])
   }
})

const getImage = async (url: string) => {
   try {
      const response: any = await axios.get(url, {
         headers: generateHeaders(),
         responseType: 'arraybuffer',
         timeout: 3000,
      })

      if (response.code === 'ECONNABORTED' || response.response?.status === 102) return getImage(url)
      return response
   } catch (error: any) {
      if (error.code === 'ECONNABORTED' || error.response.status === 102) {
         return getImage(url)
      }

      throw new Error('Faild to fetch file')
   }
}

app.get('/apparoundimages/*', async (req: any, res: any) => {
   try {
      const queryParams: any = req.query
      const queryString: string = new URLSearchParams(queryParams as any).toString()
      const apiPath: string = req.params[0]

      const response: any = await getImage(`${server_url}/${apiPath}?${queryString}`)

      res.set('Content-Type', response.headers.getContentType() || 'image/png')
      res.send(Buffer.from(response.data, 'binary'))
   } catch (error: any) {
      res.status(500).send(ERRORS[500])
   }
})

const handleRequest = async (req: any, res: any, method: 'post' | 'put' | 'delete') => {
   try {
      const queryParams: any = req.query
      const queryString: string = new URLSearchParams(queryParams as any).toString()
      const apiPath: string = req.params[0]
      console.log(`${method.toUpperCase()} request to: ${server_url}/${apiPath}?${queryString}`)

      const response: any = await axios({
         method,
         url: `${server_url}/${apiPath}?${queryString}`,
         data: req.body,
         headers: generateHeaders(),
      })

      if (response && response.data && response.data.sessionId) saveSessionId(response.data.sessionId)

      res.json(response.data)
   } catch (error: any) {
      console.error(`Error in ${method.toUpperCase()} request:`, error)
      res.status(500).send(ERRORS[500])
   }
}

app.post('/apparound/*', (req: any, res: any) => handleRequest(req, res, 'post'))
app.put('/apparound/*', (req: any, res: any) => handleRequest(req, res, 'put'))
app.delete('/apparound/*', (req: any, res: any) => handleRequest(req, res, 'delete'))

const distPath = path.resolve('dist', 'web')

app.use(express.static(distPath))

app.get('*', (req: any, res: any) => {
   fs.readFile(path.resolve('dist', 'web', 'index.html'), 'utf8', (err, data) => {
      if (err) {
         res.status(500).send('Errore nel file')
         return
      }
      const envKeys = ['CPQ_RETAIL', 'CPQ_UTILITIES', 'CPQ_TELCO', 'UTILITIES_LUCE', 'UTILITIES_GAS']
      const envs = Object.entries(process.env).reduce((obj: any, [key, value]) => {
         if (envKeys.includes(key)) {
            obj[key] = value
         }

         return obj
      }, {})
      const modifiedHtml = data.replace('<!--{{ENV_VARS}}-->', `<script>window.env = ${JSON.stringify(envs)}</script>`)
      res.send(modifiedHtml)
   })
})

app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`)
})
