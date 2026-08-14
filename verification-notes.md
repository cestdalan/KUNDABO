# Verification notes

The managed preview at `https://5173-i06rb83mh5fh06uoumgo3-4ae20698.us4.manus.computer/` still returns the platform’s “This page is currently unavailable” screen after restart, and screenshot capture is unavailable. The KUNDABO `dev` script currently runs plain `vite`, whose server output reports `Network: use --host to expose`; the likely blocker is that the preview is bound to localhost only. Source inspection and build verification remain successful, and no language-switch references remain in `src`.
