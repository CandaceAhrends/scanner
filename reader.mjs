import { createClient } from "redis";

const redis = createClient();

const PARTITION_KEYS = ["First", "Second", "Third", "Fourth", "Fifth"];

const redisKeys = PARTITION_KEYS.map((key) => ({
  key: `stocks-${key}`,
  id: "0",
}));

const getScannerData = async () => {
  await redis.connect();
  console.log("🔌 Connected to Redis", redisKeys);

  const result = await redis.xRead(redisKeys, {
    count: 100,
  });
  console.log("📚 Data from Redis", result);

  result.forEach((data) => {
    data.messages.forEach((msg) => {
      // console.log(msg);
      //console.log(msg.message.topGainers);
      console.log("-------\n");
      const gaienrs = JSON.parse(msg.message.topGainers);
      console.log(gaienrs);
    });
  });
};

const test = getScannerData();
