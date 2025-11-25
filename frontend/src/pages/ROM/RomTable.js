const RomTable = ({ romData }) => {
  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          tableLayout: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Joint</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Measurement
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Normal</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              A 등급 (정상)
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              B 등급 (주의)
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              C 등급 (제한)
            </th>
          </tr>
        </thead>
        <tbody>
          {romData.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.joint}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.measurement}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.normal}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.gradeA}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.gradeB}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.gradeC}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default RomTable;
