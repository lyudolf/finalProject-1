package com.chodae.getsend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	
	@GetMapping("/api")
	public int test() {
		return 1; 
	}
}
