const admin = require('firebase-admin')


admin.initializeApp({
  credential: admin.credential.cert({
    project_id: "imagedata-b222a",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEtpnm9GGADkdc\nISS+4ocB3FVnaPvwAnkKfoioTnOv/ySMfRFGQymHJ+VDfNLQ0Pj/4XtbY29tagTc\nWtZGbhU6+s+gQKYqpXHsCL4oHmoNhBXd0Pqo3ZkMOlzdVSUvSjyZr3umC2XZe2Td\n2Tjy1pDwf6nqwjJCC0NLD9D5IL5bjMPfyYLWNE5V3Sroka6b0AE9DYA/anqx96J+\nodhbg7F1DLuVmSdtXJONwFhZ5Cjepkmxjfa2FgdXd4OjXqXoBLCVsigyi4BY2sEm\ntgLlMhZ3uZ9/l9VxIWu1bVgg8oG5NeEJQbIOCGxOeqZuqlyLFSJLOPFBdSZsmh0B\n9NtBac41AgMBAAECggEALpyrLrYJNXAMujizTZT9UzRLu2d9zVM0rccqaCFA2fsO\nBMks8vZ+rGNIeNum06q02eMq2Q6gjG9jC/jtTb6PgsyELs+q4C+YZUr0DisYy6+Z\nA9jdUG7D8YkR0LN4jnJbljomBUQto+FQlx3+F9K+gPJrR7Cw+oPTNAHhLWs0GBqC\nNe6kI4lhRqtFwngnV3JrelL1+ubSZE05Cmd/njTgf6MX8pJvRPRp7JPdOK4GhZPY\nQGznArRvXizYBSFEYvhkqbFRtCZ/pyGGOU2apeVCOEN3h5wPdiPvrzM7S++h123T\nwkET5Kwatrgu9r2S+5anL08L6B/j6TTeRfZ+6lKXQQKBgQDn9Zk7zNQi0C56+/wM\nuBtSfTYU9fiw9RUAeM5NN1xZbxEpoJ/l4ugM1dQaiBvyfVQ0VQmSESTMl0CiRK0s\nLU1EJ4hHjrDWKXPQSfEKkf9wyOqoMW8omTwCmK/HjypewtpOgaLMY3JDMep2VrTg\n4BaH/U1ti/JFlewBuuuAdZ5DQQKBgQDZGdhYYD0yLV4AoHAADN1U8GhI0Jq0ASGi\nDKzbX+MiOWoYwJDLBgtjBCL1ZVsk6q0QHmtvlZ/e37a4+2Y1cLxAYHb/ApT9brB2\nW1cRvrGu2BJOf1g2cdKUUCmrXxALNNdlggGQ17oJuhy9gNtJ8C4QD8agLhHNhUsH\nHW6h5RQx9QKBgHDAAOwAdF03tGAzfCDynNVL563ooinh94NzNVRzRIB0bHM/kHm+\nAe27Qo5i+rK0GOoXK7/EdY69Nr2phEOlAZnPXX7q7SosnA7y4iexL+kywF1hKhch\n5PmeHlNyU7YcIOFoQin3bOMcsEs1elaUll8j0S8eh3Urmrx8j1yxz2wBAoGAbqEQ\n8df41zzvDfqzmBL2JnZrbc9/RgLdlKpI23E9WQ9Q1VQrdImb+9T7y3jevS0pC3G0\n5aOlV/lAL3tMVicght2hRcmXCp4BJg7di5lVCffpPD8AQJ435IQE9+L1VgCTUpKx\nIZIMpzBDvP2QwVi24FBpsu5G/CfUV8fTvIPzipECgYBR07ik2o7LEvbBrubmnCD0\nS+jdQye5KU/hDeqFTbQPUSTkTRCHYJvt3/bEiyD9QrVMQT5JPty1U+ahm9VZdXK+\n5JRohzdcRDh0Hshb00+9AkUJs8f2gjDYMa85kiHAsZzXMvL9C+2oOjfPXxXU3/H5\npLwYHb3N35x30Izn5Fx49Q==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
    client_email: "firebase-adminsdk-o5gzm@imagedata-b222a.iam.gserviceaccount.com"
  }),
  storageBucket: "imagedata-b222a.appspot.com"
})

const Bucket = admin.storage().bucket()

module.exports = Bucket