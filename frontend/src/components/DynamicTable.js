import { useState, useMemo } from "react";

const DynamicTable = ({ data, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(""); // 페이지 입력 상태
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  const totalPages =
    data && data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 1;

  const sortedData = useMemo(() => {
    if (!data || data.length === 0 || !sortColumn) return data || [];
    return [...data].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA === valB) return 0;
      if (sortOrder === "asc") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });
  }, [data, sortColumn, sortOrder]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSort = (col) => {
    if (sortColumn === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortOrder("asc");
    }
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const goToPage = () => {
    const pageNum = Number(inputPage);
    if (!isNaN(pageNum)) {
      const validPage = Math.min(Math.max(pageNum, 1), totalPages);
      setCurrentPage(validPage);
      setInputPage(""); // 입력 초기화
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") goToPage();
  };

  if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={col}
                className="border px-4 py-2 text-center cursor-pointer select-none"
                onClick={() => handleSort(col)}
              >
                {col}{" "}
                {sortColumn === col && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="border px-4 py-2 text-center">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          이전
        </button>

        <div className="flex items-center space-x-2">
          <span>
            {currentPage} / {totalPages}
          </span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={handlePageInputChange}
            onKeyPress={handleKeyPress}
            placeholder="페이지"
            className="w-16 px-2 py-1 border rounded text-center"
          />
          <button
            onClick={goToPage}
            className="px-3 py-1 border rounded hover:bg-gray-200"
          >
            이동
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
