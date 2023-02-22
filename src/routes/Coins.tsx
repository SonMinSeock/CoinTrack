import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface CoinsProps {
  mode: boolean;
}

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const ConinsList = styled.ul``;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins({ mode }: CoinsProps) {
  /* useState, useEffect Hooks 사용한 코드

  const [coins, setCoins] = useState<ICoins[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  
  const getCoins = async () => {
    const json = await (
      await fetch("https://api.coinpaprika.com/v1/coins")
    ).json();

    setCoins(json.slice(0, 100));
    setLoading(false);
    console.log("useEffect loading state : ", loading);
  };

  useEffect(() => {
    getCoins();
  }, []);
  */

  // react-query 사용 한 경우
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  // styled component
  const Coin = styled.li`
    background-color: ${mode ? "#3f4c6b" : "white"};
    color: ${(props) => (mode ? "white" : props.theme.bgColor)};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
      transition: color 0.2s ease-in-out;
      padding: 20px;
      display: flex;
      align-items: center;
    }
    &:hover {
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <ConinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                  },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </ConinsList>
      )}
    </Container>
  );
}

export default Coins;
