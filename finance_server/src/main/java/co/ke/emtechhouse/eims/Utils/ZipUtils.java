package co.ke.emtechhouse.eims.Utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

//public class DatabaseArchiver {
//
//    public static void archiveDatabase(String folderPath, String zipFilePath) throws IOException {
//        ZipUtils.compressFolder(folderPath, zipFilePath);
//    }
//
//}

class ZipUtils {

    public static void compressFolder(String folderPath, String zipFilePath) throws IOException {
        File folder = new File(folderPath);
        File zipFile = new File(zipFilePath);

        ZipOutputStream zipOutputStream = null;

        try {
            zipOutputStream = new ZipOutputStream(new FileOutputStream(zipFile));
            addFolderToZip(folder, folder.getName(), zipOutputStream);
        } finally {
            if (zipOutputStream != null) {
                zipOutputStream.close();
            }
        }
    }

    private static void addFileToZip(File file, String parentFolderName, ZipOutputStream zipOutputStream) throws IOException {
        FileInputStream fileInputStream = null;

        try {
            fileInputStream = new FileInputStream(file);
            ZipEntry zipEntry = new ZipEntry(parentFolderName + "/" + file.getName());
            zipOutputStream.putNextEntry(zipEntry);

            byte[] buffer = new byte[1024];
            int length;
            while ((length = fileInputStream.read(buffer)) > 0) {
                zipOutputStream.write(buffer, 0, length);
            }

            zipOutputStream.closeEntry();
        } finally {
            if (fileInputStream != null) {
                fileInputStream.close();
            }
        }
    }

    private static void addFolderToZip(File folder, String parentFolderName, ZipOutputStream zipOutputStream) throws IOException {
        for (File file : folder.listFiles()) {
            if (file.isDirectory()) {
                addFolderToZip(file, parentFolderName + "/" + file.getName(), zipOutputStream);
            } else {
                addFileToZip(file, parentFolderName, zipOutputStream);
            }
        }
    }

}
