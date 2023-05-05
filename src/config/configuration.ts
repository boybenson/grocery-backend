export interface Configuration {
  database: {
    url: string;
  };
}

export default (): Configuration => ({
  database: {
    url: process.env.DATABASE_URL,
  },
});
