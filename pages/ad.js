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
import { useRouter } from "next/router";

export default function Home({ query }) {
  return (
    <div className="container">
      <Head>
        <title>When's Golden Hour? | Light Hour</title>
        <meta
          name="description"
          content="What time is golden hour? Get the closest golden hour time in your city."
        />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={[20, 30]}
        backgroundImage="background.jpeg"
      >
        <Result
          mt={5}
          p={[4, 5]}
          width={["100%", "450px"]}
          height={500}
          id="golden-hour-results"
        >
          <H1 fontSize={6} lineHeight={1.25} fontFamily="display">
            What time is golden hour?
          </H1>

          <H1 fontSize={3} lineHeight={1.25} fontFamily="display">
            LH
          </H1>
        </Result>

        {/* <Footer flexDirection="column" mt={5} width="100%">
          <Paragraph fontFamily="display" fontSize={0} color="textOpaque">
            © {new Date().getFullYear()} lighthour | N &amp; N |{" "}
            <a
              target="__blank"
              rel="noreferrer"
              rel="noopener"
              href="mailto:naomigracep@gmail.com, rizvinameer@gmail.com?&subject=Feedback%20for%20lighthour&body=Hello%20NG and Nameer,%0ASome feedback for lighthour... "
            >
              send us feedback
            </a>
          </Paragraph>
        </Footer> */}
      </Flex>
    </div>
  );
}
