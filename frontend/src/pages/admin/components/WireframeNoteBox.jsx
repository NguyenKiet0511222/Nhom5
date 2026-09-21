import { useState } from "react";
import { Box, Button, Collapse, Typography, Paper } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

export default function WireframeNoteBox({ title, notes = [] }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Collapse in={open}>
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            bgcolor: "#f8fafc",
            borderColor: "#cbd5e1",
            borderRadius: 2,
            borderStyle: "dashed"
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
            {title}
          </Typography>

          <Box component="ol" sx={{ pl: 2.5, m: 0, fontSize: 13, color: "text.secondary", lineHeight: 1.8 }}>
            {notes.map((note, index) => {
              const parts = note.split(":");
              return (
                <li key={index}>
                  {parts.length > 1 ? (
                    <>
                      <strong style={{ color: "#334155" }}>{parts[0]}:</strong>
                      {parts.slice(1).join(":")}
                    </>
                  ) : (
                    note
                  )}
                </li>
              );
            })}
          </Box>
        </Paper>
      </Collapse>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
        <Typography variant="caption" color="text.disabled">
          Wireframe low-fidelity · Trang quản trị · Tuần 1 · Nguyễn Văn Hà
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setOpen(!open)}
          startIcon={open ? <EyeOff size={14} /> : <Eye size={14} />}
          sx={{ fontSize: 12, textTransform: "none", borderColor: "#cbd5e1", color: "#475569" }}
        >
          {open ? "Ẩn chú thích" : "Hiện chú thích"}
        </Button>
      </Box>
    </Box>
  );
}
