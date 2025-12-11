/** ===============================
 * 공통 그래프 컴포넌트
 * =============================== */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function GraphBox({ title, data, dataKey }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis
            dataKey="recorded_at"
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => v.slice(5, 16)} // "MM-DD HH:mm"
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#000"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
