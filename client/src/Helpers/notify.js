import { toast } from "sonner";

const DEFAULTS = {
  success: { duration: 3500 },
  error: { duration: 5500 },
  warning: { duration: 5000 },
  info: { duration: 4000 },
  loading: { duration: Infinity },
};

const merge = (defaults, opts) => ({ ...defaults, ...(opts || {}) });

const pickServerMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback || "Something went wrong";

export const notify = {
  /** Plain neutral toast */
  message: (msg, opts) => toast(msg, opts),

  /** Success — green accent, short duration */
  success: (msg, opts) => toast.success(msg, merge(DEFAULTS.success, opts)),

  /** Error — red accent, longer duration so user can read */
  error: (msg, opts) => toast.error(msg, merge(DEFAULTS.error, opts)),

  /** Warning — amber accent */
  warning: (msg, opts) => toast.warning(msg, merge(DEFAULTS.warning, opts)),

  /** Info — neutral */
  info: (msg, opts) => toast.info(msg, merge(DEFAULTS.info, opts)),

  /** Loading — never auto-dismisses; capture the returned id and pass it
   *  to .success / .error to swap the loading toast for a final state */
  loading: (msg, opts) => toast.loading(msg, merge(DEFAULTS.loading, opts)),

  /** Dismiss a specific toast or all */
  dismiss: (id) => toast.dismiss(id),

  /** Lifecycle wrapper: pass a promise + the messages for each state.
   *  Returns the original promise so callers can still await it. */
  promise: (p, { loading, success, error }, opts) =>
    toast.promise(p, { loading, success, error }, opts),

  /** Run an async function with loading → success/error toasts.
   *  Use when you want to handle an axios call with one helper. */
  async run(promise, { loading = "Working…", success, error }) {
    const id = toast.loading(loading, DEFAULTS.loading);
    try {
      const res = await promise;
      toast.success(
        typeof success === "function" ? success(res) : success ?? "Done",
        { id, ...DEFAULTS.success }
      );
      return res;
    } catch (err) {
      const msg =
        typeof error === "function"
          ? error(err)
          : error ?? pickServerMessage(err);
      toast.error(msg, { id, ...DEFAULTS.error });
      throw err;
    }
  },

  /** Convenience: copy text to clipboard with a confirmation */
  copy: async (text, label = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label, DEFAULTS.success);
    } catch {
      toast.error("Couldn't copy — try again.", DEFAULTS.error);
    }
  },

  /** Multiple field errors rendered as bullet description */
  formErrors: (errors, title = "Please check the form") => {
    if (!errors?.length) return;
    toast.error(title, {
      description: errors.map((e) => `• ${e}`).join("\n"),
      ...DEFAULTS.error,
    });
  },

  /** Toast with a yellow primary action button */
  action: (msg, { label, onClick, ...opts } = {}) =>
    toast(msg, {
      action: label && onClick ? { label, onClick } : undefined,
      ...opts,
    }),
};

export { pickServerMessage };
export default notify;
