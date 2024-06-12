import { Container, NavLink, Stack } from "@mantine/core";
import useGetPrices from "../hooks/useGetPrices";
import { Link } from "react-router-dom";

export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export default function Index() {

  const { data } = useGetPrices()

  const items = data?.map((d) => {

    return <div key={d.id} className="w-full odd:bg-slate-100 outline outline-1 outline-slate-100 flex justify-between items-center">
      <NavLink
        leftSection={<img alt={d.symbol} src={d.image} width={20} height={20} />}
        to={`prices/${d.id}`}
        label={<span className="text-lg">{d.name} <span className="font-semibold uppercase text-lg">({d.symbol})</span></span>}
        component={Link} />
      <div className="text-lg p-2">{USDollar.format(d.current_price)}</div>
    </div>
  })
  return (
    <Stack>
      {items}
    </Stack>
  );
}