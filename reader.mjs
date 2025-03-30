import { createClient } from "redis";

const PARTITION_KEYS = ["First", "Second", "Third", "Fourth", "Fifth"];

const redisKeys = PARTITION_KEYS.map((key) => `stocks-${key}`);

const getScannerData = async () => {
  await redisKeys.connect();
  console.log("🔌 Connected to Redis");
};

const test = getScannerData();
