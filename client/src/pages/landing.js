import React, { useState, useEffect, useRef } from "react";

function Landing() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [letters, setLetters] = useState([]);
  const [duration, setDuration] = useState(0);

  const ref = useRef([]);

  useEffect(() => {
    ref.current[0] = data;
  }, [data]);
  useEffect(() => {
    ref.current[1] = duration;
  }, [duration]);

  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/77726f"
      );
      let text = await response.text();
      return { success: true, data: text };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      let res = await fetchData();
      if (res.success) {
        setData(res.data.split(""));
        setLoading(false);
      }
    })();
  }, []);

  useEffect(
    (data) => {
      let timerId;
      if (!loading) {
        timerId = setInterval(() => {
          setDuration((prev) => prev + 1);
          if (ref.current[0].length >= ref.current[1]) {
            setLetters(ref.current[0].slice(0, ref.current[1]));
          }
        }, 500);
      }

      return function cleanup() {
        clearInterval(timerId);
      };
    },
    [loading]
  );

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {letters.map((letter, index) => (
            <li key={index}>{letter}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Landing;
