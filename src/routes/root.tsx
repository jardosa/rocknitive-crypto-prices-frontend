import { AppShell, Burger, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useGetPrices from "../hooks/useGetPrices";


export default function Root() {
  const [opened, { toggle }] = useDisclosure();

  const { data } = useGetPrices()


  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p={5}>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Link to={'/'} className="flex gap-2">
          <img
            alt="coin-gecko"
            src="https://yt3.googleusercontent.com/GojVNnQxHXs5QQktrtrUq145i_p4zFnRuiriuS7y170sRtezL79Ke86DkIkiiBH7CnH0nKcCkg=s900-c-k-c0x00ffffff-no-rj"
            height={40}
            width={40}
          />
          <div>
            <Text size="md">CryptoFetcher</Text>
            <Text size="md">powered by: Coin Gecko</Text>
          </div>
        </Link>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink leftSection={<FaHome width={20} height={20} />} to="/" label='Home' component={Link} />
        {data?.map((d) => <NavLink key={d.id} leftSection={<img alt={d.symbol} src={d.image} width={20} height={20} />} to={`prices/${d.id}`} label={<span className="text-lg">{d.name} <span className="font-semibold uppercase text-lg">({d.symbol})</span></span>} component={Link} />)}
      </AppShell.Navbar>

      <AppShell.Main><Outlet /></AppShell.Main>
    </AppShell>
  );
}