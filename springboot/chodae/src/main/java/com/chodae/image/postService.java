package com.chodae.image;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chodae.find.category.BoardGroup;
import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.PostContent;
import com.chodae.find.domain.User;
import com.chodae.find5.repository.PostRepo;
import com.chodae.find5.repository.UserRepo;
@Service
public class postService  {

	private final UserRepo userRepo;
	
	@Autowired
	public postService(PostRepo postRepo, UserRepo userRepo) {
		this.postRepo = postRepo;
		this.userRepo = userRepo;
	}
	 
	
private PostRepo postRepo;
	
	public Post insertPost(String boardName, String title,String nickname,  String content) {
		System.out.println( nickname +"왜바뀜?");	
		System.out.println("여기옴?");
		User user = userRepo.findUserByNickname(nickname);
		int boardNo = BoardGroup.valueOf(boardName).getValue();
		System.out.println( nickname +"여기야 여기");	
		Post post = new Post();
		Board board = new Board();
		board.setBoardNo(boardNo);
		System.out.println(boardNo);
		post.setBoard(board);
		post.setPostRegdate(LocalDateTime.now());
		post.setPostModdate(LocalDateTime.now());
		PostContent postContent = new PostContent();
		postContent.setContent(content);
		post.setPostContent(postContent);
		System.out.println(	boardName + "이게 맞어?");
	//	post.setId(null);
		post.setPostTitle(title);
		post.setReplyCount(0);	
		post.setPostViews(0);
		post.setPostLike(0);
		post.setLevel(3);
		post.setPostLevel(3);
		post.setPostNotice("F");
		post.setPostComment("T");
		post.setPostDisplay("T");
		//post set image?
		System.out.println("post 저장전"+post);
		Post post2 = postRepo.save(post);


		
		System.out.println("post저장후"+post);
		
		return post;
	}


}
