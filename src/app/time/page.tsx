import Link from "next/link";
import TimeCom from "./_com/TimeCom";

export default async function Page() {
    return (
        <div className="p-4">
            <TimeCom />
            <h3 className="my-4 text-xl font-bold">`SSR` 下的动态路由：</h3>
            <ul className="list-inside list-disc">
                <li>动态路由以 `[]` 包裹，路由下的 `fetch` 将实时更新</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/no-cache/register">
                        演示
                    </Link>
                    ] 说明：切换演示中的导航，查看时间变化
                </li>
            </ul>
            <h3 className="my-4 text-xl font-bold">`SSR` 下的静态路由：</h3>
            <ul className="list-inside list-disc">
                <li>静态路由不包含 `[]`，路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新</li>
                <li>
                    [
                    <Link className="text-blue-400" href="/time/cache/register">
                        演示
                    </Link>
                    ] 说明：切换演示中的导航，时间从缓存中获取，没有变化
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
