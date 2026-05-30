import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)

export default defineConfig({
  base: "./",
  plugins: [react(), probeInputDevServer()],
  
  server: {
    port: 5173,
    strictPort: true
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})

function probeInputDevServer() {
  let serialApi = null
  let serialApiError = null
  let stopSerial = null
  let selectedPort = ""
  let latestReading = null
  let latestStatus = "Waiting for serial connection."

  function loadSerialApi() {
    if (serialApi || serialApiError) {
      return serialApi
    }

    try {
      serialApi = require("../serial.cjs")
    } catch (error) {
      serialApiError = error
      latestStatus = `Serial bridge unavailable: ${error?.message || error}`
    }

    return serialApi
  }

  function setStatus(message) {
    latestStatus = String(message || "Serial status updated.")
  }

  function setReading(packet) {
    latestReading = packet
  }

  function restartSerial(portPath) {
    const api = loadSerialApi()
    if (!api) {
      throw serialApiError || new Error("Serial bridge unavailable.")
    }

    try {
      stopSerial?.()
    } catch {}

    selectedPort = String(portPath || "").trim()
    latestReading = null
    stopSerial = api.startSerial({
      selectedPort,
      onStatus: setStatus,
      onData: setReading
    })
  }

  return {
    name: "probe-input-dev-server",
    configureServer(server) {
      server.middlewares.use("/api/probe/ports", async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { error: "Method not allowed" })
          return
        }

        try {
          const api = loadSerialApi()
          if (!api) {
            throw serialApiError || new Error("Serial bridge unavailable.")
          }

          const ports = await api.listPorts()
          sendJson(res, 200, {
            ports: Array.isArray(ports) ? ports : [],
            selectedPort,
            status: latestStatus
          })
        } catch (error) {
          setStatus(`Serial port refresh failed: ${error?.message || error}`)
          sendJson(res, 500, { error: error?.message || String(error), ports: [] })
        }
      })

      server.middlewares.use("/api/probe/select-port", async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" })
          return
        }

        try {
          const body = await readRequestJson(req)
          const portPath = String(body.portPath || "").trim()
          if (!portPath) {
            selectedPort = ""
            setStatus("Choose a detected serial port.")
            sendJson(res, 200, { selectedPort, status: latestStatus })
            return
          }

          restartSerial(portPath)
          sendJson(res, 200, { selectedPort, status: `Connecting to ${selectedPort}` })
        } catch (error) {
          setStatus(`Serial port selection failed: ${error?.message || error}`)
          sendJson(res, 500, { error: error?.message || String(error), selectedPort })
        }
      })

      server.middlewares.use("/api/probe/state", (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { error: "Method not allowed" })
          return
        }

        sendJson(res, 200, {
          selectedPort,
          status: latestStatus,
          reading: latestReading
        })
      })
    }
  }
}

function readRequestJson(req) {
  return new Promise((resolve, reject) => {
    let raw = ""

    req.on("data", (chunk) => {
      raw += chunk
    })

    req.on("end", () => {
      if (!raw) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })

    req.on("error", reject)
  })
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(payload))
}
