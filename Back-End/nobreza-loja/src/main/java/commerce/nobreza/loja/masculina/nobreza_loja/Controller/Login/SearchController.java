package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.SearchSuggestionDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.SearchService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/search")
public class SearchController {

    private final SearchService searchService;


    @GetMapping("suggest")
    public ResponseEntity<SearchSuggestionDTO> getSuggestions(@RequestParam String query){
        if(query == null || query.trim().isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        SearchSuggestionDTO suggestion = searchService.findSuggestions(query);
        return ResponseEntity.ok(suggestion);
    }
}
