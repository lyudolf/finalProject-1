package com.chodae.find.service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.chodae.find.category.BoardGroup;
import com.chodae.find.domain.Board;
import com.chodae.find.domain.Category;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.PostContent;
import com.chodae.find.domain.Recommendation;
import com.chodae.find.domain.Reply;
import com.chodae.find.domain.User;
import com.chodae.find5.repository.CategoryRepo;
import com.chodae.find5.repository.PostRepo;
import com.chodae.find5.repository.RecommendationRepo;
import com.chodae.find5.repository.ReplyRepo;
import com.chodae.find5.repository.UserRepo;

import lombok.extern.java.Log;

@Log
@Service
public class BoardServiceImpl implements BoardService {
	
	private final PostRepo postRepo;
	private final ReplyRepo replyRepo;
	private final RecommendationRepo recommRepo;
	private final CategoryRepo categoryRepo;
	private final UserRepo userRepo;
	
	
	@Autowired
	public BoardServiceImpl(PostRepo postRepo, ReplyRepo replyRepo, RecommendationRepo recommRepo,
			CategoryRepo categoryRepo, UserRepo userRepo) {
		super();
		this.postRepo = postRepo;
		this.replyRepo = replyRepo;
		this.recommRepo = recommRepo;
		this.categoryRepo = categoryRepo;
		this.userRepo = userRepo;
	}



	@Override
	public List<Post> getPostList(String boardName) {
		List<Post> list = postRepo.findPostByBoard(BoardGroup.valueOf(boardName).getValue());
		return list;
	}
	///////
	@Override
	public Page<Post> getPostList3(String boardName, int page) {
		Pageable pageable = PageRequest.of(page-1, 10, Sort.by("postRegdate").descending());
		Page<Post> list = postRepo.findPostByBoard3(BoardGroup.valueOf(boardName).getValue(),pageable);
		return list;
	}
	
	@Override
	public Post getPost(Long boardNo) {
		return postRepo.findById(boardNo).get();
	}
	

	@Override  //게시글 검색
	public List<Post> searchPost(String boardName, String searchType, String keyword) {
		// type : 제목 title, 내용 content, 작성자 writer ,제목+내용 titleOrContent
		// 분류 :  카테고리(지역,언어...), 평점, 
		// 정렬: 추천순 , 댓글순, 조회순,  
		int boardNo = BoardGroup.valueOf(boardName).getValue();//게시판 번호 조회
		
		List<Post> list = null;
		// 타입에 맞춰서 메소드 호출
		if(searchType.equals("titleOrContent")) {
			list = postRepo.getPostLikeTitleOrContent(boardNo, keyword);
			
		} else if (searchType.equals("title")) {
			list = postRepo.getPostLikeTitle(boardNo, keyword);
			
		} else if (searchType.equals("content")) {
			list = postRepo.getPostLikeContent(boardNo, keyword);
			
		} else if (searchType.equals("writer")) {
			User user = userRepo.findUserByNickname(keyword);//회원번호 조회
			list = postRepo.getPostFromWriter(boardNo, user.getId());
		}
		
		return list;
	}

	@Override
	public Post insertPost(String boardName,String title, String content, String nickname,String category) {
		
		User user = userRepo.findUserByNickname(nickname);//회원번호 조회
		int boardNo = BoardGroup.valueOf(boardName).getValue();//게시판 번호 조회
		
		Post post = new Post();
		
		Board board = new Board();
		board.setBoardNo(boardNo);
		post.setBoard(board);
		
		PostContent postContent = new PostContent();
		postContent.setContent(content);
		post.setPostContent(postContent);
		
		post.setId(user.getId());
		
		post.setPostRegdate(LocalDateTime.now());
		post.setPostModdate(LocalDateTime.now());
		
		post.setPostTitle(title);
		post.setReplyCount(0);
		post.setPostViews(0);
		post.setPostLike(0);
		post.setLevel(3);
		post.setPostLevel(3);
		post.setPostNotice("F");//공지사항 등록 여부
		post.setPostComment("T");//댓글 작성 여부
		post.setPostDisplay("T");//게시글 공개 여부
		System.out.println("post 저장전"+post);
		Post post2 = postRepo.save(post); //카테고리도 잘 추가되나 확인
		System.out.println("post저장후"+post);
		
		
		
		// 카테고리 추가
		System.out.println(category);
		
		JSONArray js = new JSONArray(category);
		
		if(js.length() != 0) { //배열이 비어있지 않으면 
			
			for(int i =0; i < js.length();i++) {
				
				Iterator<String> it = js.getJSONObject(i).keys();
				
				while(it.hasNext()) {
					String key = (String) it.next();
					String value = js.getJSONObject(i).getString(key);
					System.out.println(key+":"+value);
					
					Category cate = new Category();
					cate.setPost(post);
					cate.setCategoryKind(key);
					cate.setCategoryName(value);
					cate.setCategoryOrder("순서");
					categoryRepo.save(cate);
				}
			}//for end
			
		}//if end
		
		
		return post2; //추가된 게시판번호 반환 
		 
	}

	@Override
	public void deleteCategoryAll(Long postNo){
		
		Optional<Post> result = postRepo.findById(postNo);
		if(result.isPresent()) {
			
			Post post = result.get();
			
			//기존 카테고리 모두 삭제
			List<Category> list =  categoryRepo.findByPostNo(post.getPostNo());
			
			for(Category ca : list) {
				
				categoryRepo.deleteById(ca.getCategoryNo());;
			}
				
			
			
		}
		
	}
	
	
	
	@Override
	public Long updatePost(Long postNo, String title, String content,String category) {
		Optional<Post> result = postRepo.findById(postNo);
		Long updatedPostNo = 0L;
		if(result.isPresent()) {
			Post post = result.get();
			System.out.println(post);
			post.setPostTitle(title); //제목 수정 
			
			PostContent postContent = post.getPostContent();
			postContent.setContent(content);
			post.setPostContent(postContent); //내용 수정 
			
			post.setPostModdate(LocalDateTime.now()); // 수정일자 반영
			System.out.println(post);
			
			
			//카테고리 업데이트 
			JSONArray js = new JSONArray(category);
			
			if(js.length() != 0) { //배열이 비어있지 않으면 
				
				for(int i =0; i < js.length();i++) {
					
					Iterator<String> it = js.getJSONObject(i).keys();
					
					while(it.hasNext()) {
						String key = (String) it.next();
						String value = js.getJSONObject(i).getString(key);
						System.out.println(key+":"+value);
						
						Category cate = new Category();
						cate.setPost(post);
						cate.setCategoryKind(key);
						cate.setCategoryName(value);
						cate.setCategoryOrder("순서");
						categoryRepo.save(cate);
					}
				}//for end
			}//if end
			
			postRepo.save(post);
			updatedPostNo = post.getPostNo();
		}
		return updatedPostNo;		//업데이트된 글 번호를 반환
	}

	@Override
	public Long deletePost(String boardName,Long postNo, String nickname) {
		
		//1.닉네임으로 회원정보 검색해서 아이디와 작성자 일치 확인(아직)
		
		//2.게시글 번호로 게시글 객체 불러와서 삭제후 삭제된 게시글 번호 반환
		postRepo.deleteById(postNo);
	
		return postNo;
	}
	
	@Transactional
	@Override
	public Long insertReply(String boardName, Long postNo,String content, String nickname) {
		
			Reply reply = new Reply();//댓글 엔티티 생성

			reply.setBoardNo(BoardGroup.valueOf(boardName).getValue());//게시판 이름을 전달받아 enum으로 게시판 번호로 변환
		
			Post post =  postRepo.findById(postNo).get();
			post.setReplyCount(post.getReplyCount()+1); //댓글수 1 증가 
			reply.setPost(post);//게시글 번호, 댓글수 1 증가 반영
			
			//닉네임 => id로 변환하여 설정
			User user = userRepo.findUserByNickname(nickname);
			reply.setId(user.getId());//작성 회원번호  (중복체크한 닉네임을  id로 바꿔서 등록) 
			
			
			reply.setReplyContent(content);//댓글 내용
			reply.setReplyRegdate(LocalDateTime.now());//작성일자
			reply.setReplyModdate(LocalDateTime.now());//수정일자
			reply.setReplyLike(0);//추천수 (기본값 0) 
			reply.setLevel(3);//회원등급
			
			reply.setUpperReply(0);//상위댓글번호(임의로 기본값 0으로 설정. 아직 사용하지 않음.) 
			
			replyRepo.save(reply);
			
		
		return postNo;
	}

	@Override
	public Long updateReply(String boardName, Long postNo, Long replyNo, String content, String nickname) {
		
		Reply reply = replyRepo.findById(replyNo).get();
		
		reply.setReplyContent(content);
		reply.setReplyModdate(LocalDateTime.now());
		
		return reply.getReplyNo();
		
	}

	@Override
	public Long deleteReply(String boardName, Long postNo, Long replyNo, String nickname) {
		
		replyRepo.deleteById(replyNo);
		
		return replyNo;
	}

	@Override
	public Long insertRecommend(String boardName,String nickname,String type,Long targetNo) {
		// 공통 : 회원번호, 게시판 번호
		//댓글 추천시 댓글번호           
		// 게시글 추천시 게시글번호
		
		User user = userRepo.findUserByNickname(nickname);//회원번호 (공통)
		int boardNo = BoardGroup.valueOf(boardName).getValue();//게시판 번호(공통)
		
		Long num = -1L;
		if(type.equals("reply")) {
			
			//댓글 추천 여부 확인 후  저장
			Optional<Recommendation> recom = recommRepo.existReplyRecomm(user.getId(), targetNo);
			
			if(!recom.isPresent()) {
				
				Reply reply =  replyRepo.findById(targetNo).get();//추천할 댓글 객체
				
				if(reply.getId() == user.getId()) {
					return 0L; //본인이 스스로 추천 불가 
				}
				
				reply.setReplyLike(reply.getReplyLike()+1); //댓글의 추천수 1 증가
				
				Recommendation recomm = new Recommendation();
				recomm.setUser(user);
				recomm.setBoardNo(boardNo);
				recomm.setReply(reply);
				recommRepo.save(recomm);
				
				num = reply.getReplyNo();// 추천한 댓글 번호 반환
			}
			
		}else if(type.equals("post")) {
			
			//게시글 추천 여부 확인 후 저장
			Optional<Recommendation> recom = recommRepo.existPostRecomm(user.getId(), targetNo);
			
			if(!recom.isPresent()) {
				
				Post post = postRepo.findById(targetNo).get(); //추천할 게시글 객체
				
				if(post.getId() == user.getId()) {
					return 0L; //본인이 스스로 추천 불가 
				}
				
				post.setPostLike(post.getPostLike()+1); // 게시글의 추천수 1 증가 
				
				Recommendation recomm = new Recommendation();
				recomm.setUser(user);
				recomm.setBoardNo(boardNo);
				recomm.setPost(post);
				recommRepo.save(recomm);
				
				num = post.getPostNo(); // 추천한 게시글 번호 반환
				
			}
		}
		
		return num;//추천된 게시글번호 또는 댓글 번호 반환 
	}

	
	
	@Override
	public Long deleteRecommend(String boardName,String nickname,String type,Long targetNo) {
		
		User user = userRepo.findUserByNickname(nickname);//회원번호 (공통)
		
		Long num = -1L;
		//우선 타입으로 댓글과 게시글 파악,  닉네임과 타겟번호로 추천기록을 조회후 삭제
		if(type.equals("reply")) {
			
			
			Optional<Recommendation> recom = recommRepo.existReplyRecomm(user.getId(), targetNo);
			
			if(recom.isPresent()) {
				
				//추천기록 존재시 삭제
				Recommendation recomEntity = recom.get();
				recommRepo.delete(recomEntity);
				
				Reply reply =  replyRepo.findById(targetNo).get();//추천삭제할 댓글 객체
				reply.setReplyLike(reply.getReplyLike()-1); //댓글의 추천수 1 감소
				
				num = reply.getReplyNo();// 추천삭제한 댓글 번호 반환
				
			}
			
			
		}else if(type.equals("post")) {
			
			Optional<Recommendation> recom = recommRepo.existPostRecomm(user.getId(), targetNo);
			
			if(recom.isPresent()) {
				//추천기록 존재시 삭제
				Recommendation recomEntity = recom.get();
				recommRepo.delete(recomEntity);
				
				Post post = postRepo.findById(targetNo).get(); //추천할 게시글 객체
				post.setPostLike(post.getPostLike()-1); // 게시글의 추천수 1 감소
				
				num = post.getPostNo(); // 추천삭제한 게시글 번호 반환
			}
			
		}
		
		return num;//추천삭제한 게시글번호 또는 댓글 번호 반환 
	}

}
