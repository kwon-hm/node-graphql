module.exports = {
  paging: async (curPage, totalCount) => {
    let page_size = 5 // 페이지당 게시물 수
    let page_list_size = 5 // 보여지는 페이지의 갯수
    let no = 0 // db에서 가져올 게시물 수 no
    curPage = Number(curPage) // 현재 페이지

    if(curPage <= 0){
        no = 0
        curPage = 1
    }else {
        no = (curPage -1) * page_list_size
    }
    
    if(totalCount < 0) totalCount = 0;
    let totalPage = Math.ceil(totalCount / page_size) // 전체 페이지 수
    if(totalPage < curPage){
        no = 0
        curPage = 1 // totalPage 보다 더 큰 curPage가 호출되면 에러
    }

    // let startPage = ((curPage -1) * page_list_size) +1
    // let endPage = (startPage + page_list_size) -1

    let startPage = (curPage - 1) * page_list_size + 1 ;

    let endPage =  curPage * page_list_size;

    let res = {
        curPage: curPage,
        page_list_size: page_list_size,
        page_size: page_size,
        totalPage: totalPage,
        startPage: startPage,
        endPage: endPage,
        no: no,
        totalCount: totalCount
    }
    return res
  }
}