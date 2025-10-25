// 라이브러리 페이지: 카드 클릭 시 상세 페이지로 이동
(() => {
	const cards = document.querySelectorAll?.('.book-card[data-book-id]');
	if(!cards || !cards.length) return;

	function goDetail(id){
		// pages/ 하위에서 상대 경로 기준 유지
		window.location.href = `book-detail.html?id=${encodeURIComponent(id)}`;
	}

	cards.forEach(card => {
		const id = card.getAttribute('data-book-id');
		card.addEventListener('click', () => goDetail(id));
		card.addEventListener('keydown', (e) => {
			if(e.key === 'Enter' || e.key === ' '){
				e.preventDefault();
				goDetail(id);
			}
		});
	});
})();
