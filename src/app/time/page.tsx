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
            <div className="p-4">
                动态路由可以通过 `generateStaticParams` 将 `SSR` 作为 `SSG`，前提是不能存在动态方法。
            </div>
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
                <li>路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新</li>
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
                静态路由下的 `SSR` 和动态路由范围下的 `SSG`，在行为表现上是一致的，区别只有：
            </h3>
            <ul className="list-inside list-disc">
                <li>静态路由下的 `SSR` 可以定期或手动刷新缓存</li>
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
                    <Link className="text-blue-400" href="/time/isr/dynamic/register">
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
            <ul className="list-inside list-disc">
                <li>`ISR` 会为缓存标记一个时间戳，当有新的请求时会将资源有效期和时间戳进行比对</li>
                <li>未过期直接输出，过期删除缓存，发起 `RSC playload` 请求</li>
            </ul>
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
