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
  Footer,
  colorGradient,
  Result,
  Paragraph,
} from "../components";
import useSWR from "swr";
import { fetcher } from "../utilities";

export default function Home() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const searchKey = `/api/time?location=${location}`;

  const { data, error, isValidating, mutate } = useSWR(searchKey, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onSuccess: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const scrollToResults = () => {
    const resultElement = document.getElementById("golden-hour");
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getGoldenHour = () => {
    setLoading(true);
    mutate(searchKey);
  };

  useEffect(() => {
    if (!loading && data && !error) {
      scrollToResults();
    }
  }, [loading, data, error]);

  return (
    <div className="container">
      <Head>
        <title>When's Golden Hour? | Light Hour</title>
        <meta
          name="description"
          content="What time is golden hour? Get the closest golden hour time in your city."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={[20, 30]}
      >
        <H1
          fontSize={[5, 6]}
          lineHeight={1.25}
          mt={[2, 3]}
          mb={4}
          fontFamily="display"
          textAlign="center"
          {...fadeIn}
        >
          When's golden hour?
        </H1>
        <Label htmlFor="city" {...fadeIn}>
          What city?
        </Label>
        <Input
          type="text"
          id="city"
          mt={[3, 4]}
          autoComplete="off"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && getGoldenHour();
          }}
          width={["100%", "inherit"]}
          {...fadeIn}
        />
        {error && (
          <Error mt={4} key={error}>
            {error.constructor === String ? error : JSON.stringify(error)}
          </Error>
        )}
        <Button
          key={loading}
          fontFamily="display"
          type="button"
          mt={4}
          disabled={!location}
          onClick={getGoldenHour}
          {...(loading ? colorGradient : fadeIn)}
        >
          {!loading ? "Chase the sun" : "Chasing the sun"}
        </Button>

        <div id="golden-hour" />
        {!loading && data && !error && location && location.trim() !== "" && (
          <Result mt={5} p={[4, 5]} id="golden-hour-results">
            <div>
              <H1 fontSize={5} lineHeight={1.25} fontFamily="display">
                The next golden hour starts{" "}
                {data.what === "sunrise"
                  ? `at sunrise (${data.sunset})`
                  : `an hour before sunset (${data.sunset})`}
                :
              </H1>

              <H2 fontSize={8} mt={5} fontFamily="sans-serif">
                <time>{data.hour}</time>*
              </H2>
              <H2 fontSize={4} mb={5} fontFamily="sans-serif">
                {data.citystate}
              </H2>
            </div>
            <Paragraph fontFamily="display" fontWeight="regular" mt={2}>
              *weather permitting
            </Paragraph>
          </Result>
        )}

        <Footer flexDirection="column" mt={5} width={["100%", "375px"]}>
          <Paragraph fontFamily="sans-serif" fontSize="small">
            © {new Date().getFullYear()} lighthour | N &amp; N |{" "}
            <a
              target="__blank"
              rel="noreferrer"
              rel="noopener"
              href="mailto:naomigracep@gmail.com, rizvinameer@gmail.com?&subject=Feedback%20for%20lighthour&body=Hello%20NG and Nameer,%0ASome feedback for lighthour..."
            >
              send us feedback
            </a>
          </Paragraph>
          <Paragraph fontFamily="sans-serif" fontSize="small">
            golden hour is the period of daytime shortly after sunrise or before
            sunset, during which daylight is redder and softer than when the Sun
            is higher in the sky{" "}
            <a
              target="__blank"
              rel="noreferrer"
              rel="noopener"
              href="https://en.wikipedia.org/wiki/Golden_hour_(photography)"
            >
              [1]
            </a>
          </Paragraph>
        </Footer>
      </Flex>
    </div>
  );
}
