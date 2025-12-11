export default function Bmi({ bmi, bmr }) {
  return (
    <div>
      <h3 className="section-title">BMI/BMR 지수</h3>
      <>
        {bmi && <p>BMI: {bmi}</p>}

        {bmr && <p>BMR: {bmr} kcal</p>}
      </>

      <h3
        style={{
          marginTop: "30px",
          fontSize: "0.8rem", // 30% 축소
          fontWeight: "600",
        }}
      >
        BMI 기준표 (대한비만학회)
      </h3>
      <table
        className="bmi-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>저체중</th>
            <th>정상</th>
            <th>비만전단계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>18.5kg/m² 미만</td>
            <td>18.5 ~ 22.9kg/m²</td>
            <td>23 ~ 24.9kg/m²</td>
          </tr>
        </tbody>
      </table>

      <table
        className="bmi-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>1단계 비만</th>
            <th>2단계 비만</th>
            <th>3단계 비만</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25 ~ 29.9kg/m²</td>
            <td>30 ~ 34.9kg/m²</td>
            <td>35kg/m² 이상</td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
        (출처: 2020 대한비만학회 진료지침)
      </p>
    </div>
  );
}
