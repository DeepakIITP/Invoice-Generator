package com.deepak.backend.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.math.BigInteger;
import java.net.URI;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Component
public class ClerkJwksProvider {
    @Value("${clerk.jwk-url}")
    private String jwkUrl;

    private final Map<String, PublicKey> keyCache = new HashMap<>();
    private long lastFetchTime=0;
    private static final long CACHE_EXPIRE_TIME = 60*60*1000;

    public PublicKey getPublicKey(String keyId) throws Exception {
        if (keyCache.containsKey(keyId) && System.currentTimeMillis() - lastFetchTime < CACHE_EXPIRE_TIME) {
            return keyCache.get(keyId);
        }
        refreshKeyCache();
        return keyCache.get(keyId);
    }


    private void refreshKeyCache() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        URI uri = URI.create(jwkUrl);

        try (InputStream inputStream = uri.toURL().openStream()) {
            JsonNode jsonNode = mapper.readTree(inputStream);
            JsonNode keys = jsonNode.get("keys");

            for (JsonNode key : keys) {
                String keyId = key.get("kid").asText();
                String keyType = key.get("kty").asText();
                String alg = key.get("alg").asText();

                if ("RSA".equals(keyType) && "RS256".equals(alg)) {
                    String n = key.get("n").asText();
                    String e = key.get("e").asText();
                    PublicKey publicKey = createPublicKey(n, e);
                    keyCache.put(keyId, publicKey);
                }
            }

            lastFetchTime = System.currentTimeMillis();
        }
    }

    private PublicKey createPublicKey(String modulus,String exponent) throws Exception {
        byte[] modulusBytes = Base64.getUrlDecoder().decode(modulus);
        byte[] exponentBytes = Base64.getUrlDecoder().decode(exponent);
        BigInteger modulesBigInteger = new BigInteger(1, modulusBytes);
        BigInteger exponentBigInteger = new BigInteger(1, exponentBytes);
        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(modulesBigInteger, exponentBigInteger);
         KeyFactory keyFactory = KeyFactory.getInstance("RSA");
         return keyFactory.generatePublic(keySpec);
    }
}


//🎯 Goal of the Code:
//To safely get a public key from Clerk’s JWKS URL only when needed, and avoid fetching it repeatedly if it's already available.
//
//        📦 Step-by-Step Flow (with Example):
//        🔑 Let's say Clerk gives you a public key with keyId = "abc123"
//        🧠 You call: getPublicKey("abc123")
//✅ Case 1: First Time
//You don't have this key in your system (cache is empty).
//
//So the method:
//
//Calls the Clerk server
//
//Gets a list of keys (called "JWKS")
//
//Finds the key with id = "abc123"
//
//Converts it into a usable PublicKey object
//
//Stores it in memory (called a cache)
//
//Saves the current time as the lastFetchTime
//
//Then returns that key to you ✅
//
//        ⏰ Now some time passes…
//        🧠 You call again: getPublicKey("abc123")
//✅ Case 2: Within 1 Hour
//The system checks:
//
//Is abc123 in the cache? ✅ Yes
//
//Was it fetched less than 1 hour ago? ✅ Yes
//
//So it returns the key from memory — no network call, super fast ⚡
//
//        🧠 You call again after 2 hours: getPublicKey("abc123")
//❌ Case 3: After 1 Hour (Expired)
//The system checks:
//
//Is abc123 in cache? ✅ Yes
//
//Was it fetched more than 1 hour ago? ❌ Yes (Too old!)
//
//So:
//
//It fetches the latest list of keys again from Clerk
//
//Rebuilds the cache
//
//Updates the time
//
//Then returns the new key ✅
//
//        🧠 Why This Is Smart:
//It saves time by not calling Clerk server every time
//
//It updates the keys regularly to stay safe
//
//It’s like checking a fridge for milk:
//
//If it’s fresh → use it 🥛
//
//If it’s expired → buy new milk 🛒





//This function createPublicKey does the following:
//
//Decodes the modulus and exponent strings
//The input parameters modulus and exponent are Base64 URL-encoded strings (parts of the RSA public key).
//It uses Base64.getUrlDecoder().decode() to convert these strings into raw byte arrays.
//
//Converts bytes to BigInteger
//It converts these byte arrays into BigInteger objects — this is because RSA public keys are defined by two big numbers: the modulus (n) and the exponent (e).
//
//Creates RSA public key specification
//Using these two BigInteger values, it creates an RSAPublicKeySpec object, which holds the parameters needed to generate the RSA public key.
//
//Generates the PublicKey instance
//It obtains an RSA KeyFactory instance and calls generatePublic with the key spec to get a Java PublicKey object representing the RSA public key.
//
//In simple terms:
//The function takes the encoded parts of an RSA public key (modulus and exponent),
//
//decodes and converts them into numbers,
//
//and builds a usable PublicKey object in Java that you can use to verify JWT signatures or encrypt data.
//
//Why is this needed?
//Because JWTs signed with RSA use public/private key pairs — to verify a JWT’s signature, you need the public key in this usable form.
//
//
