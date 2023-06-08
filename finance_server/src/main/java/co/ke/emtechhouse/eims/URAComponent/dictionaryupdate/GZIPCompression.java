package co.ke.emtechhouse.eims.URAComponent.dictionaryupdate;

import org.apache.commons.io.IOUtils;

import java.io.*;
import java.net.URLDecoder;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Objects.isNull;

public class GZIPCompression {
    public byte[] compress(final String stringToCompress) {
        if (isNull(stringToCompress) || stringToCompress.length() == 0) {
            return null;
        }

        try (final ByteArrayOutputStream baos = new ByteArrayOutputStream();
             final GZIPOutputStream gzipOutput = new GZIPOutputStream(baos)) {
            gzipOutput.write(stringToCompress.getBytes(UTF_8));
            gzipOutput.finish();
            return baos.toByteArray();
        } catch (IOException e) {
            throw new UncheckedIOException("Error while compression!", e);
        }
    }

    public String decompress(final byte[] compressed) {
        if (isNull(compressed) || compressed.length == 0) {
            return null;
        }

        try (final GZIPInputStream gzipInput = new GZIPInputStream(new ByteArrayInputStream(compressed));
             final StringWriter stringWriter = new StringWriter()) {
            IOUtils.copy(gzipInput, stringWriter, UTF_8);
            return stringWriter.toString();
        } catch (IOException e) {
            throw new UncheckedIOException("Error while decompression!", e);
        }
    }

    public String decompressString(String str, String outEncoding) {
        if (str == null || str.length() == 0) {
            return str;
        }

        try {
            String decode = URLDecoder.decode(str, "UTF-8");

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ByteArrayInputStream in = new ByteArrayInputStream(decode.getBytes("ISO-8859-1"));
            GZIPInputStream gunzip = new GZIPInputStream(in);
            byte[] buffer = new byte[256];
            int n;
            while ((n = gunzip.read(buffer)) >= 0) {
                out.write(buffer, 0, n);
            }
            return out.toString(outEncoding);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
