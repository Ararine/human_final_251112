import { useState, useMemo } from "react";

const DynamicTable = ({ data, setSelectedData, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
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

  const handlePageInputChange = (e) => setInputPage(e.target.value);
  const goToPage = () => {
    const pageNum = Number(inputPage);
    if (!isNaN(pageNum)) {
      const validPage = Math.min(Math.max(pageNum, 1), totalPages);
      setCurrentPage(validPage);
      setInputPage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") goToPage();
  };

  const handleRowClick = (row) => {
    setSelectedData(row); // 선택된 행 저장
  };

  if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border px-4 py-2 text-center cursor-pointer select-none"
                onClick={() => handleSort(col)}
              >
                {col}
                {sortColumn === col && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowClick(row)}
              className={`hover:bg-gray-50 cursor-pointer "bg-blue-100"
              }`}
            >
              {columns.map((col) => (
                <td key={col} className="border px-4 py-2 text-center">
                  <div>{row[col]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            textAlign: "center",
            alignItems: "center",
          }}
        >
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
          />
          <button onClick={goToPage}>이동</button>
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
