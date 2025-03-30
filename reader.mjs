import { createClient } from "redis";

const redis = createClient();

const PARTITION_KEYS = ["First", "Second", "Third", "Fourth", "Fifth"];

const redisKeys = PARTITION_KEYS.map((key) => `stocks-${key}`);

const getScannerData = async () => {
  await redis.connect();
  console.log("🔌 Connected to Redis");

  const result = await redis.xRead([{ key: redisKeys[0], id: "0" }], {
    count: 100,
  });
};

const test = getScannerData();
