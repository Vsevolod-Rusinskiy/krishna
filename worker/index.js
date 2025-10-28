export default {
  async fetch(request, env) {
    let res = await env.ASSETS.fetch(request)
    if (res.status === 404 && request.method === "GET" && 
        (request.headers.get("Accept") || "").includes("text/html")) {
      const u = new URL(request.url)
      u.pathname = "/index.html"
      res = await env.ASSETS.fetch(new Request(u.toString()), request)
    }
    return res
  }
}
