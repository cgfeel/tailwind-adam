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

在插槽路由平级创建一个子路由：

| 插槽内 `default.tsx` | 插槽内同名子路由 | 访问插槽平级子路由         |
| -------------------- | ---------------- | -------------------------- |
| 不存在               | 不存在           | 返回 `404`                 |
| 不存在               | 存在             | 插槽随路由变化             |
| 存在                 | 不存在           | 根据软、硬导航决定插槽展示 |

访问插槽平级子路由的链接，`default.tsx` 展示根据导航切换方式来：

-   软导航：通过 `NextJS` 中的导航切换到当前路由下的子路由，插槽展示 `page.tsx` 不做改变
-   硬导航：通过刷新页面、或首次通过链接访问，插槽展示 `default.tsx`

官方提供了 4 个应用场景：

1.  仪表盘：`Dashboard`
2.  权限：比如普通用户和管理员分别展示不同的插槽
3.  `Tab` 切换
4.  导航拦截

在导航拦截时候 `default.tsx` 的作用是为了返回 `null` 不输出：

-   以便硬导航的时候展示原本的页面，详细见演示 [[查看](https://github.com/cgfeel/next.v2/tree/master/routing-file/src/app/photo)]

但在拥有插槽的目录下创建子目录，会增加心智负担：

-   因为除了要关心 `children` 随路由的变更外，还需要考虑插槽的更新
-   这样 `场景 2` 的情况下就要确认是否要用这种方式了，不是每个条件下的插槽目录都相同
-   由此可能导致：访问的 `url` 对应不上，非预期的展示了 `default`

对此官方文档提供了动态导航的方式做弥补，即：

-   在插槽目录内增加 `[...cacheAll]`，展示一个默认的 `page.tsx`
-   这样无论导航至什么层级、无论是软导航还是硬导航，都会统一展示一个信息

> 那么这个时候不由得产生个问题，不用插槽不也可以 `[...cacheAll]` 吗？那么这就又回到根据业务需求来判断的问题了。

**官方文档也不会说的问题：**

如果插槽内部存在子路由，而插槽平级子路由不存在，当访问子路由时会报错

-   无论如何访问子路由，一定要确保插槽父级目录下存在对应的子目录
-   然后再考虑插槽内部采用哪种方式：层级相同的子目录、`default.tsx`、`[...cacheAll]`

### `NextJS v15` 缓存细微的改变

目录：https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time

以下总结建议启动项目直接查看演示：

#### 1. `SSR` 下的动态路由：

-   动态路由以 `[]` 包裹，不缓存，实时反回数据
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/no-cache/%5Bslug%5D)] 说明：打开演示页面，切换导航查看 `fetch` 请求时间的变化
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/cookies/dynamic/%5Bslug%5D)] 说明：打开演示页面，切换导航查看时间戳变化

**原理：**

-   存在动态路由的页面，切换或刷新导航每次都会发送请求到服务端
-   打开浏览器调试窗口，每次切换导航即可看到重复发送的请求

#### 2. `SSR` 下的动态方法：

-   `RSC` 用到了 `cookies` 和 `headers` 等动态方法，不缓存，实时反回数据
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/cookies)] 说明：打开演示页面，切换导航查看 `fetch` 请求时间的变化
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/cookies/method)] 说明：打开演示页面，切换导航查看时间戳变化

**原理：**

-   存在动态方法的页面，切换或刷新导航每次都会发送请求到服务端
-   打开浏览器调试窗口，每次切换导航即可看到重复发送的请求

> `dev` 环境下 `ssr` 每次都会刷新数据

#### 3. `SSR` 下的没有动态路由也没有动态方法等同于 `SSG`：

-   路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/cache)] 说明：切换或刷新演示中的导航，无法更新缓存中的时间，除非点 `refresh` 手动刷新

**原理：**

-   没有动态路由，没有动态方法的 `SSR` 等同 `SSG`，缓存分别存储在 `server` 和 `client`
-   发起 `server action` 通过 `revalidatePath` 刷新服务端缓存，`useRouter` 刷新本地缓存

#### 4. 通过 `generateStaticParams` 将动态路由的作为 `SSG`：

-   路由下的 `fetch` 将在构建时缓存数据，一旦构建不能更新资源
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/cache/ssg/%5Bslug%5D)] 说明：生成的缓存为静态资源，不接受任何刷新

**原理：**

-   `SSG` 在构建时生成静态资源作为缓存，不能包含动态方法，也不接受手动或自动更新
-   请勿通过 `revalidatePath` 手动刷新 `SSG`，只会让服务端清空缓存资源，无法恢复

**静态路由下的 `SSR` 和动态路由范围下的 `SSG`，在行为表现上是一致的，区别有 2 个：**

-   静态路由下的 `SSR` 可以定期或手动刷新缓存
-   当只存在 `generateStaticParams` 预构生成的静态的资源，才能将整个项目导出为静态 `html`

#### 5. `ISR` 随时间自动更新

-   通过导出 `revalidate` 设定时间，自动刷新缓存
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/isr)] 说明：静态路由，每隔 10 秒刷新获取新数据，切换导航不发送请求，除非通过 `useRouter` 刷新本地缓存
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/isr/dynamic/%5Bslug%5D)] 说明：动态路由，行为和 `SSR` 一致，实时获取数据，`revalidate` 在这里无效
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/isr/method)] 说明：动态方法，行为和 `SSR` 一致，实时获取数据，`revalidate` 在这里无效

**原理：**

-   `ISR` 完全按照 `SSR` 标准来，唯一的不同在于定时更新服务端缓存
-   因此动态方法、动态路由参考 `SSR`
-   而静态路由需要刷新后才能更新数据，是因为存在 `client cache`，需要通过 `useRouter` 来刷新缓存
-   静态路由的 `SSR` 则要 `useRouter` 刷新本地缓存前，还需要通过 `revalidatePath` 刷新服务端缓存

**`ISR` 更新资源原理：**

-   `ISR` 会为缓存标记一个时间戳，当有新的请求时会将资源有效期和时间戳进行比对
-   未过期直接输出，过期删除缓存，发起 `RSC playload` 请求，拿到结果重新缓存后返回

#### 6. 布局：layout.tsx

-   布局下 `client component` 的 `hooks` 状态将会被保存，不随导航切换清空，支持插槽
-   [[演示](<https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/(auth)/layout>)] 说明：输入框中随意写点啥，切换演示中的导航，内容不会清空

#### 7. 布局：template.tsx

-   布局下的 `client component` 的 `hooks` 状态随导航切换清空还原初始状态，不支持插槽
-   [[演示](<https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/(auth)/template>)] 说明：输入框中随意写点啥，切换演示中的导航，内容被清空

#### 8. 页面：page.tsx

-   和 `template` 一样 `hooks` 状态不被保留
-   [[演示](<https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/(auth)/page>)] 说明：输入框中随意写点啥，切换演示中的导航，内容被清空

#### 结论：

-   只有 `layout.tsx` 能够保留 `hooks` 状态
-   `template.tsx` 也是布局，但不能保留 `hooks` 状态，也不支持插槽，但可以包裹当前目录中所有 `page.tsx`
-   `page.tsx` 是页面中的叶子节点，但借助布局也可以将 `component` 通过 `children` 或其他 `props` 作为子组件
-   如果能够通过布局组合页面和组件的情况，优先考虑组合，而不使用引入，避免 `client component` 引入 `server component`

**布局缓存和数据缓存的区别：**

-   布局缓存仅用于本地 `hooks`，数据缓存用于本地端和服务端数据缓存
-   布局无法刷新本地、以及服务端的数据缓存
-   数据缓存也无法保存本地 `hooks` 状态

#### 9. `fetch` 的缓存

先来看两段来自同一个版本下，官方文档内容：

-   [[查看](https://nextjs.org/docs/app/building-your-application/caching#fetch)] Data returned from fetch is automatically cached in the Data Cache.
-   [[查看](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api)] The response from fetch is not cached by default.

于是做了这么一个测试：

-   `layout` 和 `page` 分别 `fetch` 当前时间，但 `page` 在发起请求前需要等待 3 秒
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/await)] 说明：先来一个静态目录，看看构建时是否缓存 `fetch`
-   [[演示](https://github.com/cgfeel/tailwind-adam/tree/main/src/app/time/await/%5Bslug%5D)] 说明：再来一个动态目录，看看每次请求的缓存 `fetch`

结果：

-   可以看到 `RSC` 中时间戳在走动，而 `fetch` 请求结果没有变化
-   由此得出 `NextJS v15` 依旧缓存 `fetch` 结果
