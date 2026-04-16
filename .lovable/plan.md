

## Remove All CleanCloud References

CleanCloud is no longer used. Four files contain remnants to clean up:

### Changes

1. **Delete `public/booking.html`** — entire file is a standalone CleanCloud widget page, no longer needed.

2. **`index.html`** — Remove the comment on line 33 (`<!-- CleanCloud resources loaded on-demand by Booking page only -->`).

3. **`src/App.css`** — Remove lines 43–65 (CleanCloud Scroll Fix and Auth Background Override CSS blocks).

4. **`src/index.css`** — Remove lines 107–111 (CleanCloud white background override).

No functional or visual impact — these styles only targeted CleanCloud elements that no longer exist.

