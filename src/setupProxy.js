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
    }),
    createProxyMiddleware("/chat", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/chatroom", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/find-chat", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/success-login", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/setting", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/setStatusMsg", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/getAllUsers", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/create-groupchat", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/chatroom-list", {
      target: "http://localhost:3001/",
      changeOrigin: true,
    })
  )
}
