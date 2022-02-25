package com.chodae.find.category;

//게시판 그룹 열거형으로 정리   // ENUM을 리스트로 관리? 
public enum BoardGroup {
	공지사항(1),자주하는질문(2),스터디모집(5),국비교육(6),리뷰게시판(7),고민상담(8),취업준비(9),IT뉴스(10),이벤트(11);
	
	private final int value;
	
	private BoardGroup(int value) {
		this.value = value;
	}
	
	public int getValue() {
		return value;
	}
}
