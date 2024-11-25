# 一个 `tailwind-css` 的练习

来自油管 `adma`，不同的是通过 `NextJS` 来做练习，所以数据请求、组件封装、配置文件略微会不一样。

除此之外还记录 `NextJS` 的一些记录：

### `default.tsx` 并行路由回退展示

当设置平行路由的时候，如下：

```
├── @booking
│   ├── default.tsx
│   ├── layout.tsx
│   └── page.tsx
├── default.tsx
├── index.css
├── layout.tsx
├── page.tsx
└── settings
    └── page.tsx
```

`@booking` 就是平行路由中的一个插槽，在这样的目录下遵循以下原则：

-   插槽在 `layout.tsx` 中可以和 `children` 一起作为 `props` 传入组件 [[查看](https://github.com/cgfeel/tailwind-adam/blob/main/src/app/adam/layout.tsx)]

在插槽路由下创建一个子路由：

-   若插槽目录没有 `default.tsx`，也没有同名的子路由，访问子路由将返回 `404`
-   若插槽目录中存在 `default.tsx`，没有同名的路由子路由也能正常展示

插槽的展示根据导航切换方式来：

-   软导航：通过 `NextJS` 中的导航切换到当前路由下的子路由，插槽展示 `page.tsx` 不做改变
-   硬导航：通过刷新页面、或首次访问，插槽展示 `default.tsx` 不做改变

官方提供了 4 个应用场景：

1.  仪表盘：`Dashboard`
2.  权限：比如普通用户和管理员分别展示不同的插槽
3.  `Tab` 切换
4.  导航拦截

但在拥有插槽的目录下创建子目录，会增加心智负担：

-   因为除了要关心 `children` 随路由的变更外，还需要考虑插槽的更新
-   这样 `场景 3` 的情况下就要确认是否要用这种方式了，不是每个条件下的插槽目录都相同
-   访问的 `url` 对应不上，因而展示 `default` 有可能并非预想

除此之外在导航拦截时候 `default.tsx` 的作用是为了不输出：

-   返回一个 `null`，以便硬导航的时候展示原本的页面
-   详细见演示 [[查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/photo)]
