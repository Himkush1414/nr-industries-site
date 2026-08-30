import { lazy, Suspense, useCallback, useState } from "react";
import { WaveformIcon } from "./WaveformIcon";

// Lazy so the modal (and its shared Supabase dependency) only loads when a
// visitor first opens the appointment box.
const AppointmentModal = lazy(() => import("./AppointmentModal"));

/**
 * Fixed circular "Book an appointment" button — pinned to the bottom-right of
 * the viewport on every experimental page, staying in place while the page
 * scrolls. Opens the exact same appointment modal that used to sit in the nav
 * bar (same form, same validation, same Supabase pipeline, same conversion
 * event) — only the trigger's location and shape changed: it was an icon-only
 * rounded square in <ExpNavBar>, it's now this circle. Same waveform icon and
 * blue styling inside.
 */
export function AppointmentFab() {
  const [apptOpen, setApptOpen] = useState(false);
  const closeAppt = useCallback(() => setApptOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setApptOpen(true)}
        aria-haspopup="dialog"
        aria-label="Book an appointment"
        className="exp-appt-fab"
      >
        <WaveformIcon />
      </button>

      {apptOpen && (
        <Suspense fallback={null}>
          <AppointmentModal onClose={closeAppt} />
        </Suspense>
      )}
    </>
  );
}
