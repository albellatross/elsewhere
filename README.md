
  # Interactive Scroll Page

  This is a code bundle for Interactive Scroll Page. The original project is available at https://www.figma.com/design/m6KdKw8q6oyTycrVxvbCex/Interactive-Scroll-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## GitHub Pages 自动更新

  当前 Pages 来源是 `main` 分支的 `/docs` 目录。每次你想更新线上链接时：

  1. 运行 `npm run build:pages`（会把 `dist` 同步到 `docs`）
  2. 提交并推送：
     - `git add docs`
     - `git commit -m "Update pages"`
     - `git push`

  推送后 1–3 分钟生效，链接为 `https://albellatross.github.io/elsewhere/`。
