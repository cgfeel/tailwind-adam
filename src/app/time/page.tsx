import TimeCom from "./_com/TimeCom";

export default async function Page() {
    return (
        <div className="p-4">
            <TimeCom />
            <h3 className="my-4 text-xl font-bold">路由分动态路由和静态路由：</h3>
            <ul className="list-inside list-disc">
                <li>静态路由不包含 `[]`，路由下的 `fetch` 将在构建时缓存数据，除非定时或手动更新</li>
                <li>动态路由以 `[]` 包裹，路由下的 `fetch` 将实时更新</li>
            </ul>
            <h3 className="my-4 text-xl font-bold">layout.tsx 和 template.tsx：</h3>
            <ul className="list-inside list-disc">
                <li>layout.tsx：布局下 `client component` 的 `hook` 状态将会被保存，不随路由切换清空</li>
                <li>template.tsx：布局下的 `client component` 的 `hook` 状态随导航切换清空还原初始状态</li>
            </ul>
        </div>
    );
}
