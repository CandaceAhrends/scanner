import { createClient } from "redis";

const redis = createClient();

const PARTITION_KEYS = ["First", "Second", "Third", "Fourth", "Fifth"];

const redisKeys = PARTITION_KEYS.map((key) => ({
  key: `stocks-${key}`,
  id: "$",
}));

const getScannerData = async () => {
  await redis.connect();
  console.log("🔌 Connected to Redis", redisKeys);

  const result = await redis.xRead(redisKeys, {
    count: 100,
    block: 0,
  });
  console.log("📚 Data from Redis", result);

  result.forEach((data) => {
    data.messages.forEach((msg) => {
      const gainerMessage = msg?.message?.topGainers;
      if (!gainerMessage) return;
      const gaienrs = JSON.parse(gainerMessage);
      console.log(gaienrs);
    });
  });
};

const test = getScannerData();
