import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [getLocation, setGetLocation] = useState(false);
  const { data, error, ...restSWR } = useSWR(
    getLocation ? `/api/time?location=${location}` : null,
    fetcher
  );

  useEffect(() => {
    data && !error && setLoading(false);
  }, [data]);

  useEffect(() => {
    if (location) {
      setGetLocation(false);
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const findLocation = (e) => {
    setLoading(true);
    setGetLocation(true);
  };

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
          type="text"
          id="city"
          mt={3}
          autoComplete="off"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              findLocation();
            }
          }}
          onBlur={findLocation}
          {...fadeIn}
        />
        {error && (
          <Error mt={3}>
            {error.constructor === String ? error : JSON.stringify(error)}
          </Error>
        )}
        <Button
          type="button"
          mt={3}
          {...(loading ? colorGradient : fadeIn)}
          key={loading}
          onClick={findLocation}
        >
          {!loading ? "Search" : "Loading"}
        </Button>

        {data && !error && (
          <Result mt={5} p={5}>
            <div>
              <H1 fontSize={5}>
                The next golden hour starts{" "}
                {data.what === "sunrise"
                  ? `at sunrise (${data.sunset})`
                  : `an hour before sunset (${data.sunset})`}
                :
              </H1>

              <H2 fontSize={7} mt={4} fontFamily="sans-serif">
                {data.hour}*
              </H2>
              <H2 fontSize={4} mt={4} fontFamily="sans-serif">
                {data.citystate}
              </H2>
            </div>
            <p>*weather permitting</p>
          </Result>
        )}
      </Flex>
    </div>
  );
}
