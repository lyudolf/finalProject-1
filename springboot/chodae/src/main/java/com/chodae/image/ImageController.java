package com.chodae.image;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.chodae.find.domain.Category;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.PostContent;
import com.chodae.find5.repository.CategoryRepo;
import com.chodae.find5.repository.PostRepo;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Optional;

@RestController
@CrossOrigin() // open for all ports
public class ImageController {


	   
	 @Autowired
	public ImageController(ImageRepository imageRepository, PostRepo postRepo, postService postService, CategoryRepo categoryRepo) {
		this.imageRepository =imageRepository;
		this.postRepo = postRepo;
		this.postService = postService;
		this.categoryRepo = categoryRepo;
	}
   
	private final ImageRepository imageRepository;
   
	private final PostRepo postRepo;
	   
	private final postService postService;
	
	private final CategoryRepo categoryRepo;



    @PostMapping("/{boardName}")
    public ResponseEntity<?> uploadContent(@PathVariable String boardName,
    		@RequestParam(required = false) MultipartFile file,
    		@RequestParam("title") String title,
    		@RequestParam("content") String content,
    		@RequestParam ("nickname")String nickname,
    		@RequestParam("category[]") String category
    	
    		)
            throws IOException {
    	System.out.println(boardName);
    	System.out.println(category);
    	System.out.println(title);
    	System.out.println(file);
    	System.out.println(nickname);
    	
    	Post post2 = postService.insertPost(boardName, title ,nickname, content);
    	
    	
    	
		JSONArray js = new JSONArray(category);
		
		if(js.length() != 0) { //배열이 비어있지 않으면 
			
			for(int i =0; i < js.length();i++) {
				
				Iterator<String> it = js.getJSONObject(i).keys();
				
				while(it.hasNext()) {
					String key = (String) it.next();
					String value = js.getJSONObject(i).getString(key);
					System.out.println(key+":"+value);
					
					Category cate = new Category();
					cate.setPost(post2);
					cate.setCategoryKind(key);
					cate.setCategoryName(value);
					cate.setCategoryOrder("순서");
					categoryRepo.save(cate);
				}
			}//for end
			
		}//if end
    	
    	
    	
    	
    	

        imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .post(post2)  //image.setPost(post2)
                .image(ImageUtility.compressImage(file.getBytes())).build());
        
        
        
        
        try{
           
                file.transferTo(new File("C:\\Users\\sarob\\OneDrive\\바탕 화면\\새 폴더\\finalProject-main\\springboot\\chodae\\files\\"+file.getOriginalFilename()));
            
        }catch (IllegalStateException | IOException e){
            e.printStackTrace();
        }
        
        
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @GetMapping(path = {"/get/image/info/{name}"})
    public Image getImageDetails(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return Image.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
    
    
    
    
    
}