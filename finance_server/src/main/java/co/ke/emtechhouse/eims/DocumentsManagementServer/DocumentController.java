/*
 * Copyright (c) 2022. Omukubwa Software Solutions, OSS.
 * All Rights Reserved.
 */
package co.ke.emtechhouse.eims.DocumentsManagementServer;
import co.ke.emtechhouse.eims.ResponseMessage.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Slf4j
//@Api(value = "/Document Upload API", tags = "Documents")
@RequestMapping("/api/v1/documents/")
public class DocumentController {
    private final DocumentRepo documentRepo;
    private final DocumentService documentService;

    @Value("${file.upload-dir}")
    public String DIRECTORY;

    public DocumentController(DocumentRepo documentRepo, DocumentService documentService) {
        this.documentRepo = documentRepo;
        this.documentService = documentService;
    }

    @PostMapping("/upload/documents")
    public  ResponseEntity<?> uploadFiles(@RequestParam("file") MultipartFile file, @RequestParam("reference_id") String reference_id ) throws IOException {
        try {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = FilenameUtils.getExtension(filename);
            if (extension.isEmpty()){
                extension = "png";
            }
            String filenameref = LocalDateTime.now() + StringUtils.cleanPath(file.getOriginalFilename());
//            TODO: Figure out a way of using a customised file name when adding a new file
            Optional<Document> documentData = documentRepo.findByFilenameref(filenameref);
            if (documentData.isPresent()) {
                EntityResponse response = new EntityResponse();
                response.setMessage("The file with the name already exist!Kindly change the file naming or update");
                response.setStatusCode(400);
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                Document newDocument = new Document();
                newDocument.setFilename(filename);
                newDocument.setFilenameref(filenameref);
                newDocument.setReference_id(reference_id);
                newDocument.setFileExtension(extension);
                Document document = documentService.addDocument(newDocument);
//                TODO: Check if the file has been saved in the databases first
                Optional<Document> checkData = documentRepo.findByFilenameref(filenameref);
                if (checkData.isPresent()) {
                    Path fileStorage = get(DIRECTORY, filenameref).toAbsolutePath().normalize();
                    copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);

                    return new ResponseEntity<>(document, HttpStatus.CREATED);
                } else {
                    EntityResponse response = new EntityResponse();
                    response.setMessage("File Not Saved");
                    response.setStatusCode(400);
                    response.setEntity("");
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }



    @PostMapping("/addfiles")
    public ResponseEntity<?> updateFiles(@RequestParam("files") List<MultipartFile> multipartFiles) throws IOException {
        try {
            List<String> documents = new ArrayList<>();
            for (MultipartFile file : multipartFiles) {
                String new_filename = StringUtils.cleanPath(file.getOriginalFilename());
                Path fileStorage = get(DIRECTORY, new_filename).toAbsolutePath().normalize();
                copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                documents.add(new_filename);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
        return null;
    }
    @RequestMapping(value = "/sid", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage() throws IOException {

        ClassPathResource imgFile = new ClassPathResource("image/sid.jpg");
        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }


    @GetMapping(value = "download/image/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public  ResponseEntity<byte[]> downloadFiles(@PathVariable("id") Long id) throws IOException {
        try {
            //        Get from the user_id
//        from user_id, get filename
            Optional<Document> documentData = documentRepo.findDocumentById(id);
            if (documentData.isPresent()) {
//            download
                Document _document = documentData.get();
                String filename = _document.getFilenameref();
                Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
                if(!Files.exists(filePath)) {
                    throw new FileNotFoundException(filename + " was not found on the server");
                }

                Resource resource = new UrlResource(filePath.toUri());
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("File-Name", filename);
                httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
                InputStream imgFile = new FileInputStream(filePath.toString());
                byte[] bytes = StreamUtils.copyToByteArray(imgFile);
                return ResponseEntity
                        .ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(bytes);

            }else {
                return null;
            }

        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

        @GetMapping("download/pdf/{id}")
    public ResponseEntity<?> downloadPdfFiles(@PathVariable("id") Long id) throws IOException {
        try {
            //        Get from the user_id
//        from user_id, get filename
            Optional<Document> documentData = documentRepo.findDocumentById(id);
            if (documentData.isPresent()) {
//            download
                Document _document = documentData.get();
                String filename = _document.getFilenameref();
                Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
                if(!Files.exists(filePath)) {
                    throw new FileNotFoundException(filename + " was not found on the server");
                }
                Resource resource = new UrlResource(filePath.toUri());
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("File-Name", filename);
                httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
                System.out.println(filePath);
                return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                        .headers(httpHeaders).body(resource);
            }else {

                EntityResponse response = new EntityResponse();
                response.setMessage("File Not found");
                response.setStatusCode(400);
                response.setEntity("");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    @GetMapping("by/{reference_id}")
    public ResponseEntity<List<Document>> getFiles(@PathVariable("reference_id") String reference_id){
        try {
            List<Document> documents = documentRepo.findByRefId(reference_id);
            return  new ResponseEntity<>(documents, HttpStatus.OK);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
}
