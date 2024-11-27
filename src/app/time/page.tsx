import Link from "next/link";
import TimeCom from "./_com/TimeCom";

export default async function Page() {
    return (
        <div className="p-4">
            <TimeCom />
            <h3 className="my-4 text-xl font-bold"> 1. `SSR` 下的动态路由：</h3>
            <ul className="list-inside list-disc">
                <li>动态路由以 `[]` 包裹，不缓存，实时反回数据</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/no-cache/register">
                        演示
                    </Link>
                    ] 说明：打开演示页面，切换导航查看 `fetch` 请求时间的变化
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies/dynamic/register">
                        演示
                    </Link>
                    ] 说明：打开演示页面，切换导航查看时间戳变化
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">原理：</h3>
            <ul className="list-inside list-disc">
                <li>存在动态路由的页面，切换或刷新导航每次都会发送请求到服务端</li>
                <li>打开浏览器调试窗口，每次切换导航即可看到重复发送的请求</li>
            </ul>
            <h3 className="my-4 text-xl font-bold">2. `SSR` 下的动态方法：</h3>
            <ul className="list-inside list-disc">
                <li>`RSC` 用到了 `cookies` 和 `headers` 等动态方法，不缓存，实时反回数据</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies/register">
                        演示
                    </Link>
                    ] 说明：打开演示页面，切换导航查看 `fetch` 请求时间的变化
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies/method/register">
                        演示
                    </Link>
                    ] 说明：打开演示页面，切换导航查看时间戳变化
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">原理：</h3>
            <ul className="list-inside list-disc">
                <li>存在动态方法的页面，切换或刷新导航每次都会发送请求到服务端</li>
                <li>打开浏览器调试窗口，每次切换导航即可看到重复发送的请求</li>
            </ul>
            <div className="p-4">`dev` 环境下 `ssr` 每次都会刷新数据</div>
            <h3 className="my-4 text-xl font-bold">3. `SSR` 下的没有动态路由也没有动态方法等同于 `SSG`：</h3>
            <ul className="list-inside list-disc">
                <li>路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/register">
                        演示
                    </Link>
                    ] 说明：切换或刷新演示中的导航，无法更新缓存中的时间，除非点 `refresh` 手动刷新
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">原理：</h3>
            <ul className="list-inside list-disc">
                <li>没有动态路由，没有动态方法的 `SSR` 等同 `SSG`，缓存分别存储在 `server` 和 `client`</li>
                <li>发起 `server action` 通过 `revalidatePath` 刷新服务端缓存，`useRouter` 刷新本地缓存</li>
            </ul>
            <h3 className="my-4 text-xl font-bold">4. 通过 `generateStaticParams` 将动态路由的作为 `SSG`：</h3>
            <ul className="list-inside list-disc">
                <li>路由下的 `fetch` 将在构建时缓存数据，一旦构建不能更新资源</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/ssg/register">
                        演示
                    </Link>
                    ] 说明：生成的缓存为静态资源，不接受任何刷新
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">原理：</h3>
            <ul className="list-inside list-disc">
                <li>`SSG` 在构建时生成静态资源作为缓存，不能包含动态方法，也不接受手动或自动更新</li>
                <li>请勿通过 `revalidatePath` 手动刷新 `SSG`，只会让服务端清空缓存资源，无法恢复</li>
            </ul>
            <h3 className="my-4 text-base font-bold">
                静态路由下的 `SSR` 和动态路由范围下的 `SSG`，在行为表现上是一致的，区别有 2 个：
            </h3>
            <ul className="list-inside list-disc">
                <li>静态路由下的 `SSR` 可以定期或手动刷新缓存</li>
                <li>当只存在 `generateStaticParams` 预构生成的静态资源，才能将整个项目导出为静态 `html`</li>
            </ul>
            <h3 className="my-4 text-xl font-bold">5. `ISR` 随时间自动更新：</h3>
            <ul className="list-inside list-disc">
                <li>通过导出 `revalidate` 设定时间，自动刷新缓存</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/isr/register">
                        演示
                    </Link>
                    ] 说明：静态路由，每隔 10 秒刷新获取新数据，切换导航不发送请求，除非通过 `useRouter` 刷新本地缓存
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/isr/dynamic/register">
                        演示
                    </Link>
                    ] 说明：动态路由，行为和 `SSR` 一致，实时获取数据，`revalidate` 在这里无效
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/isr/method/register">
                        演示
                    </Link>
                    ] 说明：动态方法，行为和 `SSR` 一致，实时获取数据，`revalidate` 在这里无效
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">原理：</h3>
            <ul className="list-inside list-disc">
                <li>`ISR` 完全按照 `SSR` 标准来，唯一的不同在于定时更新服务端缓存</li>
                <li>因此动态方法、动态路由参考 `SSR`</li>
                <li>而静态路由需要刷新后才能更新数据，是因为存在 `client cache`，需要通过 `useRouter` 来刷新缓存</li>
                <li>静态路由的 `SSR` 则要 `useRouter` 刷新本地缓存前，还需要通过 `revalidatePath` 刷新服务端缓存</li>
            </ul>
            <h3 className="my-4 text-base font-bold">`ISR` 更新资源原理：</h3>
            <div className="px-4">
                <p className="mb-4">
                    先看一段原话 [
                    <Link
                        className="text-blue-400"
                        href="https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation">
                        How Time-based Revalidation Works
                    </Link>
                    ]
                </p>
            </div>
            <h3 className="my-4 text-base font-bold">也就是说：</h3>
            <ul className="list-inside list-disc">
                <li>`ISR` 会为在第一次请求时标记一个时间戳，拿到请求后记录并缓存，例如：60 秒</li>
                <li>60 秒内的请求将直接从缓存中返回数据，60 秒后发起的第一个请求仍旧返回已过期的缓存</li>
                <li>然后 `NextJS` 将从后台发起数据重新校验，一旦成功获取数据将更新数据内存，否则保持不变</li>
            </ul>
            <div className="px-4">
                对于这个行为，官方给出了一个来自 `google` 的经典案例：`Google`
                如何利用“在重新验证时过时”功能提升广告效果 [
                <Link
                    className="text-blue-400"
                    href="https://web.dev/case-studies/ads-case-study-stale-while-revalidate?hl=zh-cn">
                    查看
                </Link>
                ]
            </div>
            <h3 className="my-4 text-xl font-bold">6. 布局：`layout.tsx`、`template`、`page.tsx`</h3>
            <ul className="list-inside list-disc">
                <li>演示说明：输入框中随意写点啥，切换演示中的导航，看输入框内容是否被清空</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/layout/register">
                        layout
                    </Link>
                    ] `client component` 的 `hooks` 状态将会被保存，不随导航切换清空，支持插槽
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/template/register">
                        template
                    </Link>
                    ] `client component` 的 `hooks` 状态随导航切换清空还原初始状态，不支持插槽
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/template/register">
                        page
                    </Link>
                    ] 和 `template` 一样 `hooks` 状态不被保留
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">结论：</h3>
            <ul className="list-inside list-disc">
                <li>只有 `layout.tsx` 能够保留 `hooks` 状态</li>
                <li>
                    `template.tsx` 也是布局，但不能保留 `hooks` 状态，也不支持插槽，但可以包裹当前目录中所有 `page.tsx`
                </li>
                <li>
                    `page.tsx` 是页面中的叶子节点，但借助布局也可以将 `component` 通过 `children` 或其他 `props`
                    作为子组件
                </li>
                <li>
                    如果能够通过布局组合页面和组件的情况，优先考虑组合，而不使用引入，避免 `client component` 引入
                    `server component`
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">布局缓存和数据缓存的区别：</h3>
            <ul className="list-inside list-disc">
                <li>布局缓存仅用于本地 `hooks`，数据缓存用于本地端和服务端数据缓存</li>
                <li>布局无法刷新本地、以及服务端的数据缓存</li>
                <li>数据缓存也无法保存本地 `hooks` 状态</li>
            </ul>
            <h3 className="my-4 text-xl font-bold">7. `fetch` 的缓存</h3>
            <ul className="list-inside list-disc">
                <li>先来看两段来自同一个版本下，官方文档内容：</li>
                <li>
                    [
                    <Link
                        className="text-blue-400"
                        href="https://nextjs.org/docs/app/building-your-application/caching#fetch">
                        查看
                    </Link>
                    ] Data returned from fetch is automatically cached in the Data Cache.
                </li>
                <li>
                    [
                    <Link
                        className="text-blue-400"
                        href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api">
                        查看
                    </Link>
                    ] The response from fetch is not cached by default.
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">于是做了这么一个测试：</h3>
            <ul className="list-inside list-disc">
                <li>`layout` 和 `page` 分别 `fetch` 当前时间，但 `page` 在发起请求前需要等待 3 秒</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/await">
                        演示
                    </Link>
                    ] 说明：静态目录，先看看构建时是否缓存 `fetch`
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/await/now">
                        演示
                    </Link>
                    ] 说明：动态目录，再看看每次请求是否缓存 `fetch`
                </li>
            </ul>
            <h3 className="my-4 text-base font-bold">结果：</h3>
            <ul className="list-inside list-disc">
                <li>可以看到 `RSC` 中时间戳在走动，而 `fetch` 请求结果没有变化</li>
                <li>由此得出 `NextJS v15` 依旧缓存 `fetch` 结果</li>
            </ul>
            <h3 className="my-4 text-base font-bold">
                但是：官方文档既然这么说，肯定也并非空穴来风，参考 `v15` 更新日志 [
                <Link className="text-blue-400" href="https://nextjs.org/blog/next-15#caching-semantics">
                    演示
                </Link>
                ]
            </h3>
            <ul className="list-inside list-disc">
                <li>`Route Handlers` 中 `GET` 请求不再默认缓存</li>
                <li>客户端路由不再缓存 `page` 组件（参考上述总结）</li>
            </ul>
            <div className="p-4">
                客户端是否缓存，以是否发起请求至服务端为准，目前可以肯定的是动态路由以及动态方法下的页面，客户端不会缓存
                `page` 页面
            </div>
        </div>
    );
}
