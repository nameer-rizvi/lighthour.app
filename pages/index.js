import Head from "next/head";
import {
  Error,
  Flex,
  H1,
  H2,
  Input,
  Label,
  Button,
  fadeIn,
  colorGradient,
  Result,
} from "../components";
import useSWR from "swr";
import { fetcher } from "../utilities";

export default function Home() {
  const [location, setLocation] = useState("");
  const { data, error } = useSWR(false && `/api/time?${location}`, fetcher);
  const loading = false;
  const sunrise = true;

  return (
    <div className="container">
      <Head>
        <title>When's Golden Hour? | Light Hour</title>
        <meta
          name="description"
          content="What time is golden hour? Get the closest golden hour time in your city."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={[20, 30]}
      >
        <H1 fontSize={5} {...fadeIn}>
          When's golden hour?
        </H1>
        <Label htmlFor="city" mt={3} {...fadeIn}>
          What city are you in?
        </Label>
        <Input
          id="city"
          mt={3}
          autoComplete="off"
          onBlur={(e) => setLocation(e.target.value)}
          {...fadeIn}
        />
        {error && <Error mt={3}>{error}</Error>}
        <Button mt={3} {...(loading ? { ...colorGradient } : { ...fadeIn })}>
          {!loading ? "Search" : "Loading"}
        </Button>

        <Result mt={5} p={5}>
          <div>
            <H1 fontSize={5}>
              The next golden hour starts{" "}
              {sunrise ? "at sunrise" : "an hour before sunset"}:
            </H1>

            <H2 fontSize={7} mt={2} fontFamily="sans-serif">
              4:00pm*
            </H2>
            <H2 fontSize={4} mt={2} fontFamily="sans-serif">
              Washington, DC
            </H2>
          </div>
          <p>*weather permitting</p>
        </Result>
      </Flex>
    </div>
  );
}
