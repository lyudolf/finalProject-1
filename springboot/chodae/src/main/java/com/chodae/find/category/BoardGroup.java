package com.chodae.find.category;

//게시판 그룹 열거형으로 정리   // ENUM을 리스트로 관리?  /생성자 2번쨰 파라미터로 해당 게시판의 url 주소가 같이 와도 될 것 같다.
public enum BoardGroup { //게시판명(게시판번호, 게시판 url이름) ex) http://localhost:3000/notice
	notice(1,"공지사항"), faq(2,"자주하는질문"),
	study(5,"스터디모집"),
	edu(6,"국비교육"),
	review(7,"리뷰게시판"),worry(8,"고민상담"),career(9,"취업준비"),news(10,"IT뉴스"),
	event(11,"이벤트");
	
	private final int value;
	private final String boardName;
	
	private BoardGroup(int value, String boardName) {
		this.value = value;
		this.boardName = boardName;
	}

	public String getBoardName() {
		return boardName;
	}

	public int getValue() {
		return value;
	}
}
