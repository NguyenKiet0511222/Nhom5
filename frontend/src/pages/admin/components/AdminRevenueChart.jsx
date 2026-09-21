import { useState } from "react";
import { Box, MenuItem, Select, Typography, Paper } from "@mui/material";
import { REVENUE_CHART_7_DAYS, REVENUE_CHART_30_DAYS } from "../../../data/adminMockData";

export default function AdminRevenueChart() {
  const [period, setPeriod] = useState("7");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = period === "7" ? REVENUE_CHART_7_DAYS : REVENUE_CHART_30_DAYS;

  // Chart dimensions
  const width = 640;
  const height = 220;
  const padding = { top: 25, right: 30, bottom: 40, left: 55 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = 20000000; // 20tr

  const points = data.map((item, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartW;
    const y = padding.top + chartH - (item.revenue / maxVal) * chartH;
    return { ...item, x, y };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Doanh thu {period === "7" ? "7 ngày gần nhất" : "30 ngày gần đây"}
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: "1px solid #94a3b8",
              fontSize: 12,
              color: "text.secondary",
              cursor: "help"
            }}
            title="Biểu đồ thống kê dòng tiền doanh thu"
          >
            4
          </Box>
        </Box>

        <Select
          size="small"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          sx={{ height: 32, fontSize: 13, minWidth: 90 }}
        >
          <MenuItem value="7">7 ngày</MenuItem>
          <MenuItem value="30">30 ngày</MenuItem>
        </Select>
      </Box>

      {/* SVG Line Chart */}
      <Box sx={{ position: "relative", width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Y Axis Grid & Labels */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={width - padding.right}
            y2={padding.top}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
          <text x={padding.left - 10} y={padding.top + 4} textAnchor="end" fontSize="11" fill="#64748b">
            20tr
          </text>

          <line
            x1={padding.left}
            y1={padding.top + chartH / 2}
            x2={width - padding.right}
            y2={padding.top + chartH / 2}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
          <text
            x={padding.left - 10}
            y={padding.top + chartH / 2 + 4}
            textAnchor="end"
            fontSize="11"
            fill="#64748b"
          >
            10tr
          </text>

          <line
            x1={padding.left}
            y1={padding.top + chartH}
            x2={width - padding.right}
            y2={padding.top + chartH}
            stroke="#cbd5e1"
          />
          <text
            x={padding.left - 10}
            y={padding.top + chartH + 4}
            textAnchor="end"
            fontSize="11"
            fill="#64748b"
          >
            0
          </text>

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {points.map((pt, i) => {
            const isHovered = hoveredPoint?.day === pt.day;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? "#22c55e" : "#1e293b"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* X Axis label */}
                <text
                  x={pt.x}
                  y={height - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                  fontWeight={isHovered ? 700 : 500}
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <Box
            sx={{
              position: "absolute",
              top: Math.max(10, (hoveredPoint.y / height) * 100 - 15) + "%",
              left: (hoveredPoint.x / width) * 100 + "%",
              transform: "translate(-50%, -100%)",
              bgcolor: "rgba(15, 23, 42, 0.9)",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 10,
              boxShadow: 2
            }}
          >
            <strong>{hoveredPoint.label || hoveredPoint.day}: </strong>
            {hoveredPoint.revenue.toLocaleString("vi-VN")} đ
          </Box>
        )}
      </Box>
    </Paper>
  );
}
