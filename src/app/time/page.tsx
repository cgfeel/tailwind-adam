import Link from "next/link";
import TimeCom from "./_com/TimeCom";

export default async function Page() {
    return (
        <div className="p-4">
            <TimeCom />
            <h3 className="my-4 text-xl font-bold">`SSR` 下的动态路由：</h3>
            <ul className="list-inside list-disc">
                <li>动态路由以 `[]` 包裹，不缓存，实时反回数据</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/no-cache/register">
                        演示
                    </Link>
                    ] 说明：切换演示中的导航，查看 `fetch` 请求的时间变化
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies/dynamic/now">
                        演示
                    </Link>
                    ] 说明：打开演示页面，手动刷新，查看时间戳变化
                </li>
            </ul>
            <div className="p-4">
                动态路由可以通过 `generateStaticParams` 将 `SSR` 作为 `SSG`，前提是不能存在动态方法。
            </div>
            <h3 className="my-4 text-xl font-bold">`SSR` 下的动态方法：</h3>
            <ul className="list-inside list-disc">
                <li>`RSC` 用到了 `cookies` 和 `headers` 等动态方法，不缓存，实时反回数据</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies">
                        演示
                    </Link>
                    ] 说明：打开演示页面，手动刷新，查看 `fetch` 请求的时间变化
                </li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cookies/method">
                        演示
                    </Link>
                    ] 说明：打开演示页面，手动刷新，查看时间戳变化
                </li>
            </ul>
            <div className="p-4">
                在 `NextJS 15` 之前默认缓存 `fetch` 结果，导致 `SSR` 虽然动态获取数据，但是由于 `fetch`
                缓存拿到的结果没有变化
            </div>
            <h3 className="my-4 text-xl font-bold">`SSR` 下的没有动态路由也没有动态方法等同于 `SSG`：</h3>
            <ul className="list-inside list-disc">
                <li>路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/register">
                        演示
                    </Link>
                    ] 说明：切换演示中的导航，时间从缓存中获取，没有变化
                </li>
            </ul>
            <h3 className="my-4 text-xl font-bold">手动刷新已缓存的静态 `SSR`：</h3>
            <ul className="list-inside list-disc">
                <li>非动态路由、也不包含动态方法，通过 `revalidatePath` 手动刷新已缓存的 `SSR`</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/revalidate">
                        演示
                    </Link>
                    ] 说明：打开演示页面，刷新时间不变，点 “refresh” 手动刷新页面
                </li>
            </ul>
            <h3 className="my-4 text-xl font-bold">`ISR` 随时间自动更新：</h3>
            <ul className="list-inside list-disc">
                <li>通过导出 `revalidate` 设定时间，自动刷新缓存</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/isr">
                        演示
                    </Link>
                    ] 说明：打开演示页面，刷新时间不变，每隔 10 秒刷新更新一次
                </li>
            </ul>
            <div className="p-4">`dev` 环境下 `ssr` 每次都会刷新数据</div>
            <h3 className="my-4 text-xl font-bold">layout.tsx：</h3>
            <ul className="list-inside list-disc">
                <li>布局下 `client component` 的 `hook` 状态将会被保存，不随导航切换清空</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/register">
                        演示
                    </Link>
                    ] 说明：输入框中随意写点啥，切换演示中的导航，内容不会清空
                </li>
            </ul>
            <h3 className="my-4 text-xl font-bold">template.tsx：</h3>
            <ul className="list-inside list-disc">
                <li>template.tsx：布局下的 `client component` 的 `hook` 状态随导航切换清空还原初始状态</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/register">
                        演示
                    </Link>
                    ] 说明：输入框中随意写点啥，切换演示中的导航，内容被清空
                </li>
            </ul>
        </div>
    );
}
