//package co.ke.emtechhouse.eims.Utils;
//
//import co.ke.emtechhouse.eims.TransactionComponent.Transheader;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.Date;
//
////@CrossOrigin
//@RestController
//@Slf4j
//@RequestMapping("/api/v1/external/")
//public class BackupRestoreController {
//    @Value("${prod_db}")
//    private String prod_db;
//
//    @Value("${sit_db}")
//    private String  sit_db;
//
//    @Value("${spring.datasource.dbname}")
//    private String dbName;
//
//
//    @Value("${spring.datasource.username}")
//    private String username;
//    @Value("${spring.datasource.password}")
//    private String password;
//    @Value("${spring.datasource.backupfile}")
//    private String outputFile;
//
////    TODO: BACKUP DATABASE
//        public static boolean backup(String dbUsername, String dbPassword, String dbName, String outputFile)
//                throws IOException, InterruptedException {
//            String command = String.format("mysqldump -u%s -p%s --add-drop-table --databases %s -r %s",
//                    dbUsername, dbPassword, dbName, outputFile);
//            Process process = Runtime.getRuntime().exec(command);
//            int processComplete = process.waitFor();
//            System.out.println("------------------------Backup process completed -------------------------");
//            System.out.println(LocalDateTime.now());
//            return processComplete == 0;
//        }
////    TODO: RESTORE DATABASE
//    public static boolean restore(String dbUsername, String dbPassword, String dbName, String sourceFile)
//            throws IOException, InterruptedException {
//        String[] command = new String[]{
//                "mysql",
//                "-u" + dbUsername,
//                "-p" + dbPassword,
//                "-e",
//                " source " + sourceFile,
//                dbName
//        };
//        Process runtimeProcess = Runtime.getRuntime().exec(command);
//        int processComplete = runtimeProcess.waitFor();
//        return processComplete == 0;
//    }
//
//    @GetMapping("/backup")
//    @Scheduled(cron="${cron.exp_batch_process}")
//    public ResponseEntity<?> BackupDB() throws IOException, InterruptedException {
//        System.out.println("------------------------Backup process Initiated-------------------------");
//        System.out.println(LocalDateTime.now());
//        //String fileName = new Date()+"dbBackup.sql";
//        LocalDateTime now = LocalDateTime.now();
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
//		String fileName = now.format(formatter) + "RequestLogs.sql";
//		try {
//			FileWriter writer = new FileWriter(fileName);
//			//writer.write("method: "+ method+" uri: "+uri+" queryString: "+queryString+" protocol: "+protocol+" remoteAddr: "+remoteAddr+" "+" remotePort: "+remotePort+" userAgent: "+userAgent);
//			writer.close();
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//        backup(username, password, dbName, fileName);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
////    LocalDateTime now = LocalDateTime.now();
////		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
////		String fileName = now.format(formatter) + "RequestLogs.log";
////		try {
////			FileWriter writer = new FileWriter(fileName);
////			writer.write("method: "+ method+" uri: "+uri+" queryString: "+queryString+" protocol: "+protocol+" remoteAddr: "+remoteAddr+" "+" remotePort: "+remotePort+" userAgent: "+userAgent);
////			writer.close();
////
////		} catch (IOException e) {
////			e.printStackTrace();
////		}
//
//
////    @GetMapping("/uat-sync")
////    @Scheduled(cron="${cron.dump_uat}")
////    public ResponseEntity<?> UatSync() throws IOException, InterruptedException {
////        System.out.println("------------------------Dump Process Initiated-------------------------");
////        System.out.println(LocalDateTime.now());
////        backup(username, password, sit_db, outputFile);
////        restore(sit_db, password, username, outputFile);
////        return new ResponseEntity<>(HttpStatus.OK);
////    }
//
////    @GetMapping("/restore")
////    public ResponseEntity<?> getById (@PathVariable("id") Long id) throws IOException, InterruptedException {
////        restore(db, password, username, outputFile);
////        return new ResponseEntity<>(HttpStatus.OK);
////    }
//
//}


//package co.ke.emtechhouse.eims.Utils;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//
//@Component
//public class BackupRestoreController {
//
//   // private final String DB_NAME = "efrisdb";
//    private final String BACKUP_FOLDER = "backup/";
//    private final String ARCHIVE_FOLDER = "archive/";
//
//    @Value("${spring.datasource.dbname}")
//    private String DB_NAME;
//
//    @Value("${spring.datasource.username}")
//    private String username;
//    @Value("${spring.datasource.password}")
//    private String password;
//
//
//    //@Scheduled(cron = "0 0 0 * * *") // run at midnight every day
//    //@Scheduled(cron = "*/5 * * * * *") // run every 5 seconds
//   // @Scheduled(cron = "0 */3 * * * ?")
//    public void scheduledBackupAndArchive() {
//        backupDatabase();
//        archiveBackups();
//    }
//
////    public void backupDatabase() {
////        try {
////            LocalDateTime now = LocalDateTime.now();
////            String fileName = DB_NAME + "-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + ".sql";
////            String filePath = BACKUP_FOLDER + fileName;
////            ProcessBuilder pb = new ProcessBuilder(
////                    "mysqldump",
////                    "-u" + username,
////                    "-p" + password,
////                    DB_NAME,
////                    "--result-file=" + filePath
////            );
////            pb.environment().put("MYSQL_PWD", password);
////            Process process = pb.start();
////            int exitCode = process.waitFor();
////            if (exitCode == 0) {
////                System.out.println("Database backup successful");
////            } else {
////                System.err.println("Database backup failed");
////            }
////        } catch (IOException | InterruptedException e) {
////            e.printStackTrace();
////            System.err.println("Database backup failed");
////        }
////    }
//
//    // This function backs up a database using mysqldump
//    public void backupDatabase() {
//        try {
//            // Get the current date and time
//            LocalDateTime now = LocalDateTime.now();
//            // Create a filename for the backup with the current date and time
//            String fileName = DB_NAME + "-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + ".sql";
//            // Set the file path for the backup to the backup folder plus the filename
//            String filePath = BACKUP_FOLDER + fileName;
//            // Create a ProcessBuilder object to run the mysqldump command with appropriate arguments
//            ProcessBuilder pb = new ProcessBuilder(
//                    "mysqldump",
//                    "-u" + username,
//                    "-p" + password,
//                    DB_NAME,
//                    "--result-file=" + filePath
//            );
//            // Set the MySQL password in the environment for security purposes
//            pb.environment().put("MYSQL_PWD", password);
//            // Start the process to run the mysqldump command
//            Process process = pb.start();
//            // Wait for the process to finish and get the exit code
//            int exitCode = process.waitFor();
//            // Print out a message indicating whether the backup was successful or not
//            if (exitCode == 0) {
//                System.out.println("Database backup successful");
//            } else {
//                System.err.println("Database backup failed");
//            }
//        } catch (IOException | InterruptedException e) {
//            // Print out an error message if an exception occurs
//            e.printStackTrace();
//            System.err.println("Database backup failed");
//        }
//    }
//
//
////    public void archiveBackups() {
////        try {
////            File backupFolder = new File(BACKUP_FOLDER);
////            if (backupFolder.exists()) {
////                File archiveFolder = new File(ARCHIVE_FOLDER);
////                if (!archiveFolder.exists()) {
////                    archiveFolder.mkdirs();
////                }
////                Files.move(Paths.get(BACKUP_FOLDER), Paths.get(ARCHIVE_FOLDER + backupFolder.getName()));
////                System.out.println("Backup archive successful");
////            } else {
////                System.err.println("Backup archive failed");
////            }
////        } catch (IOException e) {
////            e.printStackTrace();
////            System.err.println("Backup archive failed");
////        }
////    }
//
//    // This function archives backups by moving them from the backup folder to an archive folder
//    public void archiveBackups() {
//        try {
//            // Create a File object for the backup folder
//            File backupFolder = new File(BACKUP_FOLDER);
//            // Check if the backup folder exists
//            if (backupFolder.exists()) {
//                // Create a File object for the archive folder
//                File archiveFolder = new File(ARCHIVE_FOLDER);
//                // If the archive folder does not exist, create it
//                if (!archiveFolder.exists()) {
//                    archiveFolder.mkdirs();
//                }
//                // Move the backup folder to the archive folder
//                Files.move(Paths.get(BACKUP_FOLDER), Paths.get(ARCHIVE_FOLDER + backupFolder.getName()));
//                System.out.println("Backup archive successful");
//            } else {
//                // Print out an error message if the backup folder does not exist
//                System.err.println("Backup archive failed");
//            }
//        } catch (IOException e) {
//            // Print out an error message if an exception occurs
//            e.printStackTrace();
//            System.err.println("Backup archive failed");
//        }
//    }
//
//
//}


//
////package co.ke.emtechhouse.eims.Utils;
////
////import org.springframework.beans.factory.annotation.Value;
////import org.springframework.http.HttpStatus;
////import org.springframework.http.ResponseEntity;
////import org.springframework.scheduling.annotation.Scheduled;
////import org.springframework.stereotype.Component;
////
////import java.io.File;
////import java.io.IOException;
////import java.nio.file.Files;
////import java.nio.file.Path;
////import java.nio.file.Paths;
////import java.time.LocalDateTime;
////import java.time.format.DateTimeFormatter;
////
////@Component
////public class BackupRestoreController {
////
////    private final String BACKUP_FOLDER = "backup/";
////    private final String ARCHIVE_FOLDER = "archive/";
////
////    @Value("${spring.datasource.dbname}")
////    private String DB_NAME;
////
////    @Value("${spring.datasource.username}")
////    private String username;
////
////    @Value("${spring.datasource.password}")
////    private String password;
////
////    @Scheduled(cron = "0 1 * * * ?")
////
////    public ResponseEntity<?> BackupDB() throws IOException {
////        LocalDateTime now = LocalDateTime.now();
////        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
////        String backupFileName = BACKUP_FOLDER + now.format(formatter) + "_backup.sql";
////        String archiveFileName = ARCHIVE_FOLDER + now.format(formatter) + "_backup.zip";
////        try {
////            File backupFile = new File(backupFileName);
////            if (!backupFile.exists()) {
////                backupFile.getParentFile().mkdirs();
////                backupFile.createNewFile();
////            }
////            backup(username, password, DB_NAME, backupFileName);
////            zipFile(backupFileName, archiveFileName);
////            Files.deleteIfExists(Paths.get(backupFileName));
////        } catch (IOException | InterruptedException e) {
////            e.printStackTrace();
////            return new ResponseEntity<>("Failed to backup database", HttpStatus.INTERNAL_SERVER_ERROR);
////        }
////        return new ResponseEntity<>(HttpStatus.OK);
////    }
////
////    private void zipFile(String sourceFileName, String zipFileName) throws IOException {
////        File sourceFile = new File(sourceFileName);
////        File zipFile = new File(zipFileName);
////        try (java.util.zip.ZipOutputStream outputStream = new java.util.zip.ZipOutputStream(new java.io.FileOutputStream(zipFile))) {
////            java.nio.file.Files.copy(sourceFile.toPath(), outputStream);
////        }
////    }
////
////    public static boolean backup(String dbUsername, String dbPassword, String dbName, String outputFile)
////            throws IOException, InterruptedException {
////        String command = String.format("mysqldump -u%s -p%s --add-drop-table --databases %s -r %s",
////                dbUsername, dbPassword, dbName, outputFile);
////        Process process = Runtime.getRuntime().exec(command);
////        int processComplete = process.waitFor();
////        return processComplete == 0;
////    }
////
////
////    @Scheduled(cron = "0 */3 * * * ?")
////    public ResponseEntity<?> archiveDatabase() {
////        try {
////            Path backupFolderPath = Paths.get(BACKUP_FOLDER);
////            Path archiveFolderPath = Paths.get(ARCHIVE_FOLDER);
////            if (!Files.exists(archiveFolderPath)) {
////                Files.createDirectories(archiveFolderPath);
////            }
////            if (!Files.exists(backupFolderPath)) {
////                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
////            }
////
////            String archiveFileName = String.format("%s_%s.zip", DB_NAME, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss")));
////            Path archiveFilePath = Paths.get(archiveFolderPath.toString(), archiveFileName);
////
////            ZipUtils.compressFolder(backupFolderPath.toString(), archiveFilePath.toString());
////
////            Files.walk(backupFolderPath)
////                    .filter(Files::isRegularFile)
////                    .map(Path::toFile)
////                    .forEach(File::delete);
////
////            return new ResponseEntity<>(HttpStatus.OK);
////        } catch (IOException e) {
////            e.printStackTrace();
////            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
////        }
////    }
////
////}
//
//
//package co.ke.emtechhouse.eims.Utils;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//
//@Component
//@Slf4j
//public class BackupRestoreController {
//
//    private final String BACKUP_FOLDER = "backup/";
//    private final String ARCHIVE_FOLDER = "archive/";
//
//    @Value("${spring.datasource.dbname}")
//    private String DB_NAME;
//
//    @Value("${spring.datasource.username}")
//    private String username;
//
//    @Value("${spring.datasource.password}")
//    private String password;
//
//    @Autowired
//    private BackupRestoreService backupRestoreService;
//
//    @GetMapping("/backup")
//    @Scheduled(cron = "${cron.exp_batch_process}")
//    public ResponseEntity<?> backupDB() {
//        log.info("Backup process initiated at: {}", LocalDateTime.now());
//        String fileName = getFileName();
//        boolean backupResult = backupRestoreService.backup(username, password, DB_NAME, fileName);
//        if (!backupResult) {
//            log.error("Backup process failed");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Backup process failed");
//        }
//        archiveBackupFile(fileName);
//        log.info("Backup process completed successfully");
//        return ResponseEntity.ok().build();
//    }
//
//    private String getFileName() {
//        LocalDateTime now = LocalDateTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
//        return BACKUP_FOLDER + now.format(formatter) + "-" + DB_NAME + ".sql";
//    }
//
//    private void archiveBackupFile(String fileName) {
//        try {
//            File backupFile = new File(fileName);
//            String archiveFileName = ARCHIVE_FOLDER + backupFile.getName();
//            Files.move(Paths.get(fileName), Paths.get(archiveFileName));
//            log.info("Backup file moved to archive folder: {}", archiveFileName);
//        } catch (IOException e) {
//            log.error("Failed to archive backup file: {}", fileName);
//            e.printStackTrace();
//        }
//    }

//}


package co.ke.emtechhouse.eims.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Component
public class BackupRestoreController {

    @Value("${spring.datasource.dbname}")
    private String DB_NAME;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    private final String BACKUP_FOLDER = "backup/";

    private final String ARCHIVE_FOLDER = "archive/";


    // Run backup every 12 hours
    //@Scheduled(cron = "0 0 */12 * * *")
//    @Scheduled(cron = "*/30 * * * * *")
    @Scheduled(cron = "${cron.backupDatabase}")
    public void scheduledBackup() {
        backupDatabase();
    }

    // Run archive once every 7 days
    //@Scheduled(cron = "0 0 0 */7 * *")
//    @Scheduled(cron = "0 */1 * * * *")
    @Scheduled(cron = "${cron.archiveDBBackups}")
    public void scheduledArchive() {
        archiveDBBackups();
    }

    // This function archives backups by moving mysqldump to back up folder
public void backupDatabase() {
    try {
        // Delete the old backup file if it exists
        Path oldBackup = Paths.get(BACKUP_FOLDER);
        String pattern = DB_NAME + "-*.sql";
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(oldBackup, pattern)) {
            for (Path file: stream) {
                Files.delete(file);
            }
        } catch (IOException | DirectoryIteratorException e) {
            // Print out an error message if an exception occurs
            e.printStackTrace();
            System.err.println("Error deleting old backup file");
        }

        // Get the current date and time
        LocalDateTime now = LocalDateTime.now();
        // Create a filename for the backup with the current date and time
        String fileName = DB_NAME + "-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + ".sql";
        // Set the file path for the backup to the backup folder plus the filename
        String filePath = BACKUP_FOLDER + fileName;

        // Check if the system has permissions to write to the folder
        if (!Files.isWritable(Paths.get(BACKUP_FOLDER))) {
            System.err.println("Cannot write to backup folder");
            return;
        }

        // Create a ProcessBuilder object to run the mysqldump command with appropriate arguments
//        ProcessBuilder pb = new ProcessBuilder(
//                "mysqldump",
//                "-u" + username,
//                "-p" + password,
//                DB_NAME,
//                "--result-file=" + filePath
//        );

        ProcessBuilder pb = new ProcessBuilder(
                "mysqldump",
                "-u" + username,
                "-p" + password,
                "-h" + "10.128.7.37", // Include the "-h" argument with the IP address
                DB_NAME,
                "--result-file=" + filePath
        );

        // Set the MySQL password in the environment for security purposes
        pb.environment().put("MYSQL_PWD", password);
        // Start the process to run the mysqldump command
        Process process = pb.start();
        // Wait for the process to finish and get the exit code
        int exitCode = process.waitFor();
        // Print out a message indicating whether the backup was successful or not
        if (exitCode == 0) {
            System.out.println("Database backup successful");
        } else {
            System.err.println("Database backup failed");
        }
    } catch (IOException | InterruptedException e) {
        // Print out an error message if an exception occurs
        e.printStackTrace();
        System.err.println("Database backup failed: exception occurred");
    }
}

    public void archiveDBBackups() {
        try {
            // Create a File object for the backup folder
            File backupFolder = new File(BACKUP_FOLDER);
            // Check if the backup folder exists
            if (!backupFolder.exists()) {
                System.err.println("Backup archive failed: backup folder does not exist");
                return;
            }
            // Create a File object for the archive folder
            File archiveFolder = new File(ARCHIVE_FOLDER);
            // If the archive folder does not exist, create it
            if (!archiveFolder.exists()) {
                if (!archiveFolder.mkdirs()) {
                    System.err.println("Backup archive failed: could not create archive folder");
                    return;
                }
            }
            // Get the current date and time
            LocalDateTime now = LocalDateTime.now();
            // Create a filename for the archive with the current date and time
            String archiveName = "backup-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            // Create a File object for the zip file
            File zipFile = new File(archiveFolder, archiveName + ".zip");
            // Create the zip file
            if (!zipFile.createNewFile()) {
                System.err.println("Backup archive failed: could not create zip file");
                return;
            }
            // Create a ZipOutputStream to write to the zip file
            ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
            // Iterate through the files in the backup folder and sort them by date modified in ascending order
            File[] backupFiles = backupFolder.listFiles();
            Arrays.sort(backupFiles, Comparator.comparingLong(File::lastModified));
            // Move the most recent 7 backup files to the zip file
            int i = backupFiles.length - 1;
            while (i >= 0 && i >= backupFiles.length - 7) {
                FileInputStream fileIn = new FileInputStream(backupFiles[i]);
                // Add the file to the zip file
                ZipEntry zipEntry = new ZipEntry(backupFiles[i].getName());
                zipOut.putNextEntry(zipEntry);
                // Write the file contents to the zip file
                byte[] bytes = new byte[1024];
                int length;
                while ((length = fileIn.read(bytes)) >= 0) {
                    zipOut.write(bytes, 0, length);
                }
                // Close the zip entry and input stream
                zipOut.closeEntry();
                fileIn.close();
                i--;
            }
            // Close the zip output stream
            zipOut.close();

            // Delete the oldest .zip file if there are already 10 .zip files in the archive folder
            File[] zipFiles = archiveFolder.listFiles((dir, name) -> name.endsWith(".zip"));
            if (zipFiles.length >= 10) {
                Arrays.sort(zipFiles, Comparator.comparingLong(File::lastModified));
                if (!zipFiles[0].delete()) {
                    System.err.println("Backup archive failed: could not delete oldest zip file");
                }
            }

            System.out.println("Backup archive successful");
        } catch (IOException e) {
            // Print out an error message if an exception occurs
            e.printStackTrace();
            System.err.println("Backup archive failed: exception occurred");
        }
    }

//    public void backupDatabase() {
//        try {
//            // Delete the old backup file if it exists
//            Path oldBackup = Paths.get(BACKUP_FOLDER);
//            String pattern = DB_NAME + "-*.sql";
//            try (DirectoryStream<Path> stream = Files.newDirectoryStream(oldBackup, pattern)) {
//                for (Path file: stream) {
//                    Files.delete(file);
//                }
//            } catch (IOException | DirectoryIteratorException e) {
//                // Print out an error message if an exception occurs
//                e.printStackTrace();
//                System.err.println("Error deleting old backup file");
//            }
//
//            // Get the current date and time
//            LocalDateTime now = LocalDateTime.now();
//            // Create a filename for the backup with the current date and time
//            String fileName = DB_NAME + "-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + ".sql";
//            // Set the file path for the backup to the backup folder plus the filename
//            String filePath = BACKUP_FOLDER + fileName;
//
//            // Check if the system has permissions to write to the folder
//            if (!Files.isWritable(Paths.get(BACKUP_FOLDER))) {
//                System.err.println("Cannot write to backup folder");
//                return;
//            }
//
//            // Create a ProcessBuilder object to run the mysqldump command with appropriate arguments
//            ProcessBuilder pb = new ProcessBuilder(
//                    "mysqldump",
//                    "-u" + username,
//                    "-p" + password,
//                    "-h10.128.7.37", // Add new host argument
//                    DB_NAME
//            );
//            // Set the MySQL password in the environment for security purposes
//            pb.environment().put("MYSQL_PWD", password);
//            // Redirect the output of mysqldump to a file
//            pb.redirectOutput(new File(filePath));
//            // Start the process to run the mysqldump command
//            Process process = pb.start();
//            // Wait for the process to finish and get the exit code
//            int exitCode = process.waitFor();
//            // Print out a message indicating whether the backup was successful or not
//            if (exitCode == 0) {
//                System.out.println("Database backup successful");
//            } else {
//                System.err.println("Database backup failed");
//            }
//        } catch (IOException | InterruptedException e) {
//            // Print out an error message if an exception occurs
//            e.printStackTrace();
//            System.err.println("Database backup failed: exception occurred");
//        }
//    }

//    public void archiveDBBackups() {
//        try {
//            // Create a File object for the backup folder
//            File backupFolder = new File(BACKUP_FOLDER);
//            // Check if the backup folder exists
//            if (!backupFolder.exists()) {
//                System.err.println("Backup archive failed: backup folder does not exist");
//                return;
//            }
//            // Create a File object for the archive folder
//            File archiveFolder = new File(ARCHIVE_FOLDER);
//            // If the archive folder does not exist, create it
//            if (!archiveFolder.exists()) {
//                if (!archiveFolder.mkdirs()) {
//                    System.err.println("Backup archive failed: could not create archive folder");
//                    return;
//                }
//            }
//            // Get the current date and time
//            LocalDateTime now = LocalDateTime.now();
//            // Create a filename for the archive with the current date and time
//            String archiveName = "backup-" + now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
//            // Create a File object for the zip file
//            File zipFile = new File(archiveFolder, archiveName + ".zip");
//            // Create the zip file
//            if (!zipFile.createNewFile()) {
//                System.err.println("Backup archive failed: could not create zip file");
//                return;
//            }
//            // Create a ZipOutputStream to write to the zip file
//            ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
//            // Iterate through the files in the backup folder and sort them by date modified in ascending order
//            File[] backupFiles = backupFolder.listFiles();
//            Arrays.sort(backupFiles, Comparator.comparingLong(File::lastModified));
//            // Move the most recent 7 backup files to the zip file
//            int i = backupFiles.length - 1;
//            while (i >= 0 && i >= backupFiles.length - 7) {
//                FileInputStream fileIn = new FileInputStream(backupFiles[i]);
//                // Add the file to the zip file
//                ZipEntry zipEntry = new ZipEntry(backupFiles[i].getName());
//                zipOut.putNextEntry(zipEntry);
//                // Write the file contents to the zip file
//                byte[] bytes = new byte[1024];
//                int length;
//                while ((length = fileIn.read(bytes)) >= 0) {
//                    zipOut.write(bytes, 0, length);
//                }
//                // Close the zip entry and input stream
//                zipOut.closeEntry();
//                fileIn.close();
//                i--;
//            }
//            // Close the zip output stream
//            zipOut.close();
//            System.out.println("Backup archive successful");
//        } catch (IOException e) {
//            // Print out an error message if an exception occurs
//            e.printStackTrace();
//            System.err.println("Backup archive failed: exception occurred");
//        }
//    }
//

}