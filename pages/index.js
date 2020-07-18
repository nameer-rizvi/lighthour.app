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
import { fetcher, useDebounce } from "../utilities";

export default function Home() {
  const [location, setLocation] = useState("");

  const debouncedSearch = useDebounce(location, 500);

  const { data, error } = useSWR(
    `/api/time?location=${debouncedSearch}`,
    fetcher,
    { shouldRetryOnError: false }
  );

  const loading = !data && !error;

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
        <H1 fontSize={5} textAlign="center" {...fadeIn}>
          When's golden hour?
        </H1>
        <Label htmlFor="city" mt={3} {...fadeIn}>
          What city are you in?
        </Label>
        <Input
          type="text"
          id="city"
          mt={4}
          autoComplete="off"
          onChange={(e) => setLocation(e.target.value)}
          width={["100%", "inherit"]}
          {...fadeIn}
        />
        {error && (
          <Error mt={4} key={error}>
            {error.constructor === String ? error : JSON.stringify(error)}
          </Error>
        )}
        <Button
          type="button"
          mt={4}
          {...(loading ? colorGradient : fadeIn)}
          key={loading}
          // onClick={findLocation}
        >
          {!loading ? "Search" : "Loading"}
        </Button>

        {data && !error && (
          <Result mt={5} p={[4, 5]}>
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
