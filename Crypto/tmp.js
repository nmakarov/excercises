const crypto = require('crypto');

// const privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp
// wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5
// 1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh
// 3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2
// pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX
// GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il
// AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF
// L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k
// X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl
// U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ
// 37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=
// -----END RSA PRIVATE KEY-----`;

// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0
// FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/
// 3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB
// -----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: DES-EDE3-CBC,A2398ED8B7AEB21B

eQNzMh2lltT0FJiWnLF01ORx4ViJKf4nenkyfAu5DO3z2A02MwSDyAAM/3knEn3B
vsJVduqZP0F5C2kn2AN+826KOS/rwPk8Dl58AvLw7C9N2SUdTDGh/ULaY4gqMuQg
YeOBAfVpG+fhOJmvdYhlZCCnB+wR4oxV2ugRN4FusinIf2v4iIQhDrXy+Q+XT1BO
FXLCybfsLSq6s3qXVOR3EoYetvXzOQe2MMcKrzX459w/sos8pT6oysdO8N530jK9
jlBxnJJIRV/JfDvkGIR1BUOb8QGlAEUmw/bX9hcUNM4i2u86HtCchIXPm7hCdR+Y
ojCxp9vOIDLSfKWivtWf7j/nJqNfEYLpYg5SVQfE/R1xiLwyty3AtGxQCVDZOV4R
R17S87UniOZp1XuxIBIj31lGUGWFD5IR+8uF0qU5BmkifmXANn1prTMcdnEnv013
KXFdcvMcp/VFF5/w92ziSETI3fp7Gpfb1S7fu0NKP1uYRbBpa6M3u+SbFdrKhKgi
B54vW0GHzij+xaNz5Q6lpYIuBlGyLn/D2lkxrHM+OL+FgPrLoC/ocZVlF3Inx73X
dp/++H9RJ1yTyo2besHIFfCtCgJnBN66QxXEDFfPGkcOV0ZxhvYXmf/T9bGUPIYl
eaCb4HKorxI6WkVKzOzh6FE9Wq1EXvNNYaKiDwu3BD2QC+Uq6ETxMGtXoawTP83Y
svJHBWCva9X1KrkXaHV4QvP+eFD0uovnPBsFj8njsj8lXHNq5kfRxnAb1EEnNyev
CgtDt6+E7XSTI1vZMQpX9+u4nu1TrKxhfagAKMhWBA5Y65EDz4n6DP9FNDFKuETu
uvl+82AHn0Mkvs9d5NZLeKKmKBkneiUTiS27zqtdFvjGGd2PyRkwSH6hq0pfa6OC
hGddMXg1Wt9mbUm7jF+YAw7xP7AKlpfnE/CPAZGEtKYZBVAbPoyHQMzgnA8f/CUB
5+Uzy/vjVwLknlX4LlkHkyQjalQI8l5cVAZIRKNpdM2wrZd0gmhE52iPPYmy165W
hiXA+aN8HqGoNTbjdbrEXHjuXq60iQlKrNb0E8/mQOzd/l/ZCfZLYXOp2CoEND+M
giPI+1o2UazvAG32YnJQ7LYBW4GWf1GUy/DtxmUREK+LeZRaMAmGEz1h+XnTZ3+n
lhEDIDtX9cXagwHdNKYO7OT1jPZN+hjBWxKv+BlqBzbmamuYKLbtvUCx1SEvh/D4
jjh3lyYMZbjd06qdS/jVOdviUGyRrm9G+0YQ4/PRtQ2NtLJlSJpf+vOWrvYsOyiM
FyCd36pCZVZghg13Abehi/2cdWie54AartsfS9kd9xBvI0+whK18NiMJDXY0l6ED
ibqtSdKtVZUfqrFiwDwmYf5F7HhSU9atUxn56yqTy+EGS5Rw0CSK6KkZM2cqWJ4t
HM/0nZFUBcXhzjIIWajWDs7tO5HoSjzm8IO8TMg5GgwRk07PojnrWRJWYUA0F0Nr
GMc/cHRcsXO3sBnP92cmxz0rR2qYi8+nvwzdwQibRwgjFE5tgQfDD4Bp69c/FZvc
HAfrSkQJdZA6dog+/HupsNy/TfYAFebqMCF+Z5vIJk+asng0J7p8/eoJYmkFUJx5
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs2UjdrfBWUsfqcEWG4W+
9qSJAAFp/km1E58QIfj/FhbSX04VdTOUsGTGu7MifjTxRabHCF1NOMnIYWcsrtZj
tqViSkYe29ja5Evrcr6ubgcdWa5QZsB3lJmUzdc7944dMAfT3LmINjUU5E6lG0uO
cIh3gSrFCpTHhsLha6YHIANfQYnkU6HY6JHJQQinRrIkhgohFwh4XMgCuzGT/kvr
6jbpNbLffKEolMYQA0LeiEa5z8b/XBqhPi6YX0+NIo+rKfDvqn4037VHe7WfxNOH
GLCzh9d3zT6JRQKnw/9CgvhteShHVbDYcakfWG0xMLM69COX0hfspbLgFghjkdWY
JQIDAQAB
-----END PUBLIC KEY-----`;

const plaintext = Buffer.from('Hello world!', 'utf8');

// This is what you usually do to transmit encrypted data.
const enc1 = crypto.publicEncrypt(publicKey, plaintext);
const dec1 = crypto.privateDecrypt(privateKey, enc1);
console.log(dec1.toString('utf8'));

// This works as well.
// const enc2 = crypto.privateEncrypt(privateKey, plaintext);
// const dec2 = crypto.publicDecrypt(publicKey, enc2);
// console.log(dec2.toString('utf8'));