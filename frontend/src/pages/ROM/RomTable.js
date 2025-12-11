const RomTable = ({ romData }) => {
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
        <tr>
          <th>관절</th>
          <th>측정 방법</th>
          <th>정상범위</th>
          <th>A 등급 (정상)</th>
          <th>B 등급 (주의)</th>
          <th>C 등급 (제한)</th>
        </tr>
      </thead>
      <tbody>
        {romData.map((item, index) => (
          <tr key={index}>
            <td>{item.joint}</td>
            <td>{item.measurement}</td>
            <td>{item.normal}</td>
            <td>{item.gradeA}</td>
            <td>{item.gradeB}</td>
            <td>{item.gradeC}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RomTable;
