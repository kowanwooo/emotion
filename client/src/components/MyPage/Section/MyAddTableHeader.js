import React from 'react'

function MyAddTableHeader() {
    return (
        <table className="cs-table-02">
            <colgroup>
                <col style={{ width: '70px' }} />
                <col />
                <col style={{ width: '70px' }} />
                <col style={{ width: '70px' }} />
                <col style={{ width: '50px' }} />
                <col style={{ width: '50px' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>조회</th>
                    <th>추천</th>
                </tr>
            </thead>
        </table>
    )
}

export default MyAddTableHeader