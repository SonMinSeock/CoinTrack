import { useQuery } from "react-query";
import {
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface CoinProps {
  mode: boolean;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface TabProps {
  isActive: boolean;
}

const Container = styled.div`
  padding: 0px 300px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 55%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 45%;
`;

const Btn = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 50px;
  border: none;
  a {
    display: block;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0px;
`;

const Tab = styled.span<TabProps>`
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

function Coin({ mode }: CoinProps) {
  const { coinId } = useParams<RouteParams>();
  const location = useLocation<RouteState>();
  const { state } = location;

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  console.log("tickersData : ", tickersData);

  // styled component
  const Description = styled.p`
    margin: 20px 0px;
    color: ${(props) => (mode ? "#3f4c6b" : "white")};
  `;

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>
            {state?.name
              ? state.name
              : loading
              ? "Loading ..."
              : infoData?.name}
          </Title>
        </TitleContainer>
        <BtnContainer>
          <Btn>
            <Link to={"/"}>Back</Link>
          </Btn>
        </BtnContainer>
      </Header>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
