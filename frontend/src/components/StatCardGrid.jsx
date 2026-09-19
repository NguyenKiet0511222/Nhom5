import { Box, Card, CardContent, Typography } from "@mui/material";

/**
 * Lưới thẻ số liệu cho dashboard seller/admin.
 * stats: [{ label, value, icon: LucideIcon, color: "primary.main" | ... }]
 */
export default function StatCardGrid({ stats }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }
      }}
    >
      {stats.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} variant="outlined">
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ color, display: "flex" }}>
              <Icon size={28} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
