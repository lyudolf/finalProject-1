package com.chodae.image2;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
import com.chodae.image.postService;

import lombok.extern.java.Log;
import net.coobird.thumbnailator.Thumbnails;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
@Log
@RestController
public class ImageController {


	   
	 @Autowired
	public ImageController(ImageRepository imageRepository, PostRepo postRepo, postService postService, CategoryRepo categoryRepo
			) {
		
		this.imageRepository =imageRepository;
		this.postRepo = postRepo;
		this.postService = postService;
	
	}
   
	private final ImageRepository imageRepository;
   
	private final PostRepo postRepo;
	   
	private final postService postService;
	
	


    
   
	 @GetMapping(path = {"/get/image/{filename}"})
	public ResponseEntity<Resource> downloadFile(@PathVariable String filename,HttpServletRequest request) throws MalformedURLException{
	
			Path filePath = Paths.get("C:\\chodae\\"+filename);
			Resource resource = new  UrlResource(filePath.toUri());
	
		
		return ResponseEntity.ok()
						.body(resource);
	
	
	 }
}
    
    
    
//}