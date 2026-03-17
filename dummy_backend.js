// dummy-backend.js — simulates your real backend
import express from 'express';
const app = express();
app.use(express.json());

app.use((req, res) => {
  const event = req.body?.event || 'unknown';
  console.log(`[DummyBackend] ${req.method} ${req.path} — event: ${event}`);

  // Simulate a crash on payment.failed
  if (event === 'payment.failed') {
    console.log('  → Responding 500 (simulated failure)');
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error — payment handler crashed',
    });
  }

  // Everything else succeeds
  console.log('  → Responding 200 (success)');
  res.status(200).json({ success: true, message: `Handled ${event}` });
});

app.listen(3001, () => console.log('✅ Dummy backend running on http://localhost:3001'));