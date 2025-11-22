package commerce.nobreza.loja.masculina.nobreza_loja.Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path rootLocation = Paths.get("uploads");

    public String save(MultipartFile file, String folderName) {
        try {

            Path dir = rootLocation.resolve(folderName);
            Files.createDirectories(dir);

            // Gera um nome único para o arquivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path destinationFile = dir.resolve(fileName);


            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);


            return "/uploads/" + folderName + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage());
        }
    }
}
