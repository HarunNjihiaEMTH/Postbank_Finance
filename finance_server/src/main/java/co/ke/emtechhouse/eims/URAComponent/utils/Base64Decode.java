package co.ke.emtechhouse.eims.URAComponent.utils;

import org.apache.commons.codec.binary.Base64;

public class Base64Decode {

    public String decodeResponse(String input)
    {
        Base64 base64 = new Base64();
        String decodedString = new String(base64.decode(input.getBytes()));
        return decodedString;
    }

    public String encodeRequest(String input)
    {
        Base64 base64 = new Base64();
        String encodedString = new String(base64.encode(input.getBytes()));
        return encodedString;
    }
}
