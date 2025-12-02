const RomTable = ({ romData }) => {
  // 공통 style 객체
  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={cellStyle}>관절</th>
          <th style={cellStyle}>측정 방법</th>
          <th style={cellStyle}>정상범위</th>
          <th style={cellStyle}>A 등급 (정상)</th>
          <th style={cellStyle}>B 등급 (주의)</th>
          <th style={cellStyle}>C 등급 (제한)</th>
        </tr>
      </thead>
      <tbody>
        {romData.map((item, index) => (
          <tr key={index}>
            <td style={cellStyle}>{item.joint}</td>
            <td style={cellStyle}>{item.measurement}</td>
            <td style={cellStyle}>{item.normal}</td>
            <td style={cellStyle}>{item.gradeA}</td>
            <td style={cellStyle}>{item.gradeB}</td>
            <td style={cellStyle}>{item.gradeC}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RomTable;
