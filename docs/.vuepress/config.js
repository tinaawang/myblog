module.exports = {
  title: "CHARLLOTE",
  description: "我的个人博客",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png"
      }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  base: "/myblog/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: {
    "@vssue/vuepress-plugin-vssue": {
      // 设置 `platform` 而不是 `api`
      platform: "github-v4",
      // 其他的 Vssue 配置
      owner: "tinaawang",
      repo: "myblog",
      clientId: "84f3ebcac0dbe084791b",
      clientSecret: "8cdee82454dbdf20744f91df7e3f14d898ce9ea5",
      autoCreateIssue: true
    },

    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: true
    },
    "vuepress-plugin-auto-sidebar": {},
    "@vuepress/back-to-top": {},
    "@vuepress/medium-zoom": {}
  },

  themeConfig: {
    lastUpdated: "上次更新时间", // string | boolean
    nav: [
      { text: "css", link: "/css/" }, // 内部链接 以docs为根目录
      { text: "javascript", link: "/js/" }, // 内部链接 以docs为根目录
      {
        text: "其他",
        items: [
          { text: "简书", link: "https://github.com/OBKoro1" },
          {
            text: "掘金",
            link: "https://github.com/OBKoro1/Brush_algorithm"
          }
        ]
      }, // 外部链接
      { text: "GitHub", link: "http://obkoro1.com/" } // 外部链接
    ]
  }
};
