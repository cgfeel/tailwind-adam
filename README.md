# 一个 `tailwind-css` 的练习

来自油管 `adma`，不同的是通过 `NextJS` 来做练习，所以数据请求、组件封装、配置文件略微会不一样。

除此之外还记录 `NextJS` 的一些记录（暂记录在这个仓库，稍后整理 `NextJS 15` 时会重新归类）：

### `default.tsx` 并行路由回退展示

目录：https://github.com/cgfeel/tailwind-adam/tree/main/src/app/adam

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

### `Fetch` 默认不再缓存，导致的细微改变

目录：https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time

以下总结建议启动项目直接查看演示：

**`SSR` 下的动态路由：**

-   动态路由以 `[]` 包裹，路由下的 `fetch` 将实时更新

**`SSR` 下的动态方法：**

-   `RSC` 用到了 `cookies` 和 `headers` 等动态方法，路由下的 `fetch` 将实时更新

**`SSR` 下的没有动态路由也没有动态方法等同于 `SSG`：**

-   路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新

**手动刷新已缓存的静态 `SSR`：**

-   非动态路由、也不包含动态方法，通过 `revalidatePath` 手动刷新已缓存的`SSR`

**`ISR` 随时间自动更新：**

-   通过导出 `revalidate` 设定时间，自动刷新缓存

> `dev` 环境下 `ssr` 每次都会刷新数据

由于 `NextJS v15` 更新了 `fetch` 缓存机制，那么 `revalidateTag` 还有必要存在吗？

-   有必要，虽然 `fetch` 不再默认缓存，但是可以手动记录缓存

```tsx
import { unstable_cache } from "next/cache";
import { db, posts } from "@/lib/db";

const getPosts = unstable_cache(
    async () => {
        return await db.select().from(posts);
    },
    ["posts"],
    { revalidate: 3600, tags: ["posts"] }
);

export default async function Page() {
    const allPosts = await getPosts();

    return (
        <ul>
            {allPosts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

**重回 `NextJS 13`**

通过 `use cache`，不过这个方法目前处于 `canary`，需要在 `experimental` 开启 [[查看](https://nextjs.org/docs/canary/app/api-reference/directives/use-cache)]

### `template` 和 `layout`

目录：https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time

以下总结建议启动项目直接查看演示：

**layout.tsx：**

-   布局下 `client component` 的 `hook` 状态将会被保存，不随导航切换清空

**template.tsx：**

-   布局下的 `client component` 的 `hook` 状态随导航切换清空还原初始状态
