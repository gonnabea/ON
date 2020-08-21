const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/currentUser", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/chat", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/login", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/join", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/logout", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    })
  )
}
