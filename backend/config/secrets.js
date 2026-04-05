const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({ region: "ap-south-1" });

const getSecrets = async () => {
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: "curacloud/secrets" })
  );
  return JSON.parse(response.SecretString);
};

module.exports = getSecrets;