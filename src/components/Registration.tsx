import * as React from "react";
import { useEffect, useRef, useState } from "react";

// Note: this component reproduces the static registration form included in the
// project assets. Configure AS_SCRIPT_URL to your deployed Apps Script /exec URL.
const AS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwdjkWlaz7xwAfEwHJ8qxdajU-ygX2n87h1rs7RoN4XvtS9304A0alcNMWme8ev6fEXhw/exec"; // <- replace with yours

const Registration: React.FC = () => {
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [qrPreviewHtml, setQrPreviewHtml] = useState<JSX.Element | null>(null);
  const [teamType, setTeamType] = useState("Individual");

  const formRef = useRef<HTMLFormElement | null>(null);
  const qrInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // sanity check for AS_SCRIPT_URL
    try {
      const u = new URL(AS_SCRIPT_URL);
      if (!u.pathname.endsWith("/exec")) {
        console.warn(
          "AS_SCRIPT_URL should end with /exec (use deployed Web App URL)."
        );
      }
    } catch {
      console.warn(
        "AS_SCRIPT_URL is not a valid URL. Paste your Apps Script Web App /exec URL."
      );
    }
  }, []);

  function setStatusText(text: string, isError = false) {
    setStatus(text);
    setStatusError(isError);
  }

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = reader.result || "";
          const base64 = String(result).split(",")[1] || "";
          resolve(base64);
        } catch {
          reject(new Error("Could not read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async function uploadToAppsScript(
    payload: Record<string, string>,
    qrFile: File | null
  ) {
    if (!AS_SCRIPT_URL) throw new Error("AS_SCRIPT_URL not set");
    const body = new FormData();
    Object.entries(payload).forEach(([k, v]) => body.append(k, v || ""));
    if (qrFile) {
      body.append("qrFilename", qrFile.name);
      body.append("qrBase64", await readFileAsBase64(qrFile));
    }
    const resp = await fetch(AS_SCRIPT_URL, { method: "POST", body });
    const text = await resp.text();
    const parsed = (() => {
      try {
        return JSON.parse(text) as {
          success?: boolean;
          error?: string;
          [k: string]: unknown;
        };
      } catch {
        return null;
      }
    })();
    if (!parsed) throw new Error("Bad response: " + text);
    if (!parsed.success)
      throw new Error((parsed.error as string) || "Upload failed");
    return parsed;
  }

  function handleQrInputChange() {
    const file = qrInputRef.current?.files?.[0];
    if (!file) {
      setQrPreviewHtml(null);
      return;
    }
    // Only show filename preview for uploaded file; images are not allowed here.
    const info = (
      <div>
        <div className="text-sm text-sky-200/80">Selected: {file.name}</div>
      </div>
    );
    setQrPreviewHtml(info);
  }

  function clearQr() {
    if (qrInputRef.current) qrInputRef.current.value = "";
    setQrPreviewHtml(null);
  }

  function updateGroupVisibility(type: string) {
    setTeamType(type);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hasSubmitted) {
      setStatusText(
        "You have already submitted. Reload the page to submit again.",
        true
      );
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatusText("Submitting...");
    try {
      const form = formRef.current;
      if (!form) throw new Error("Form not found");
      const fd = new FormData(form);

      const team = (fd.get("teamType") || "Individual").toString();
      const primaryName = (fd.get("name") || "").toString().trim();
      const primaryRoll = (fd.get("roll") || "").toString().trim();

      const member2Name = (fd.get("member2Name") || "").toString().trim();
      const member2Roll = (fd.get("member2Roll") || "").toString().trim();
      const member3Name = (fd.get("member3Name") || "").toString().trim();
      const member3Roll = (fd.get("member3Roll") || "").toString().trim();

      if (team === "Double") {
        if (!member2Name || !member2Roll) {
          setStatusText("Please fill in details for Member 2.", true);
          return;
        }
      } else if (team === "Group") {
        if (!member2Name || !member2Roll) {
          setStatusText("Please fill in details for Member 2.", true);
          return;
        }
        if (!member3Name || !member3Roll) {
          setStatusText(
            "For a group, please add at least one more member (Member 3).",
            true
          );
          return;
        }
      }

      let combinedNames = primaryName;
      let combinedRolls = primaryRoll;
      const sep = "\n";
      if (team === "Double" || team === "Group") {
        if (member2Name)
          combinedNames += (combinedNames ? sep : "") + member2Name;
        if (member2Roll)
          combinedRolls += (combinedRolls ? sep : "") + member2Roll;
      }
      if (team === "Group") {
        if (member3Name)
          combinedNames += (combinedNames ? sep : "") + member3Name;
        if (member3Roll)
          combinedRolls += (combinedRolls ? sep : "") + member3Roll;
      }

      const payload: Record<string, string> = {
        teamType: team,
        name: combinedNames || primaryName || "",
        roll: combinedRolls || primaryRoll || "",
        email: String(fd.get("email") || ""),
        branch: String(fd.get("branch") || ""),
        phone: String(fd.get("phone") || ""),
        pitch: String(fd.get("pitch") || ""),
      };

      const qrFile = qrInputRef.current?.files?.[0] || null;

      // Basic validation
      if (!payload.name || !payload.roll || !payload.email || !payload.branch) {
        setStatusText("Please fill required fields.", true);
        return;
      }
      const email = (payload.email || "").toString().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatusText("Please enter a valid email address.", true);
        return;
      }
      const phoneRaw = (payload.phone || "").toString().trim();
      const phoneDigits = phoneRaw.replace(/\D/g, "");
      if (
        phoneDigits.length > 0 &&
        (phoneDigits.length < 7 || phoneDigits.length > 15)
      ) {
        setStatusText("Please enter a valid phone number (7-15 digits).", true);
        return;
      }
      if (qrFile) {
        const allowedMimes = [
          "application/pdf",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];
        const name = qrFile.name.toLowerCase();
        const isImage = qrFile.type.startsWith("image/");
        const isAllowedMime = allowedMimes.includes(qrFile.type);
        const hasAllowedExt =
          name.endsWith(".pdf") ||
          name.endsWith(".ppt") ||
          name.endsWith(".pptx");
        if (!(isImage || isAllowedMime || hasAllowedExt)) {
          setStatusText(
            "Please upload an image (PNG/JPG) or a PDF/PPT file.",
            true
          );
          return;
        }
      }
      if (qrFile && qrFile.size > 50 * 1024 * 1024) {
        setStatusText("File too large. Max 50MB.", true);
        return;
      }

      await uploadToAppsScript(payload, qrFile);
      setStatusText("Uploaded & saved.");
      form.reset();
      clearQr();
      updateGroupVisibility("Individual");
      setHasSubmitted(true);
      alert("Registration successful.");
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error ? err.message : String(err || "Submission failed");
      setStatusText(msg, true);
      const low = msg.toString().toLowerCase();
      if (low.includes("email")) {
        const el = document.querySelector(
          'input[name="email"]'
        ) as HTMLInputElement | null;
        if (el) el.focus();
      } else if (low.includes("phone") || low.includes("mobile")) {
        const el = document.querySelector(
          'input[name="phone"]'
        ) as HTMLInputElement | null;
        if (el) el.focus();
      } else {
        alert("Submission failed: " + msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="register"
      className="pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* decorative wave / background can remain simple */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-900 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* layout: left column will contain header + card; right column contains form */}

        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-start">
          {/* Left column: header + compact card */}
          {/* Left column: combined header + info card */}
          <section className="relative md:col-span-3 p-8 bg-gradient-to-b from-sky-900/70 to-cyan-800/40 rounded-3xl shadow-2xl border border-white/8 backdrop-blur-md overflow-hidden min-h-[320px]">
            <div className="relative z-10 text-white max-w-3xl pb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                AppTank — Registration
              </h1>

              <div className="text-sm text-sky-100/95 mb-3">
                Registration & Idea Submission (Online)
              </div>

              <div className="pl-5 mb-3 text-sky-100/85 text-sm space-y-1">
                <div className="mb-1">
                  <strong>Registration:</strong> 31 Aug 2025 → 04 Sep 2025
                  (closes 04 Sep 12:00 AM IST)
                </div>
                <div className="mb-1">
                  <strong>Format:</strong> PDF, PPT
                </div>
                <div>
                  <strong>Max size:</strong> 50MB
                </div>
              </div>

              <div className="mt-2 text-sm text-sky-200/90">
                Use the form on the right to submit your idea file and team
                details.
              </div>
            </div>

            <div className="absolute inset-0 opacity-20 animate-water-flow pointer-events-none bg-gradient-to-r from-cyan-500 to-blue-700 blur-sm"></div>
            {/* decorative animated wave at bottom of card (smooth fit) */}
            <svg
              className="absolute left-0 bottom-0 w-full h-20 animate-wave opacity-40 pointer-events-none z-0"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="#06b6d4"
                d="M0 65 C150 85 300 40 450 55 C600 70 750 45 900 55 C1050 65 1150 75 1200 65 L1200 120 L0 120 Z"
              />
            </svg>
          </section>

          <section className="md:col-span-4 p-6 bg-white/5 rounded-2xl shadow-md border border-white/8">
            <form
              ref={formRef}
              id="regForm"
              className="space-y-4"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-sky-100/90">
                  Full Name (Leader)
                </label>
                <input
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-sky-100/90">
                    Roll Number (Leader)
                  </label>
                  <input
                    name="roll"
                    id="roll"
                    required
                    className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="eg. IT24024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-100/90">
                    Branch (Leader)
                  </label>
                  <select
                    name="branch"
                    id="branch"
                    aria-label="Branch"
                    required
                    defaultValue=""
                    className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="" disabled>
                      Select your branch (Leader)
                    </option>
                    <option>Information Technology</option>
                    <option>Computer Technology</option>
                    <option>Electronics and Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Electrical Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-100/90">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-100/90">
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-100/90">
                  One-line pitch (why your idea?)
                </label>
                <input
                  name="pitch"
                  id="pitch"
                  maxLength={140}
                  className="mt-1 block w-full rounded-lg bg-white/6 border border-white/10 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Elevator pitch (max 140 chars)"
                />
              </div>

              <div className="pt-2 ">
                <label className="block text-sm font-medium text-sky-100/90 mb-1">
                  Team Type
                </label>
                <div className="flex flex-wrap gap-4 items-center text-white">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teamType"
                      value="Individual"
                      defaultChecked
                      className="mr-2"
                      onChange={() => updateGroupVisibility("Individual")}
                    />
                    Individual
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teamType"
                      value="Double"
                      className="mr-2"
                      onChange={() => updateGroupVisibility("Double")}
                    />
                    Double (2)
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teamType"
                      value="Group"
                      className="mr-2"
                      onChange={() => updateGroupVisibility("Group")}
                    />
                    Group (3)
                  </label>
                </div>
              </div>

              <div
                id="groupMembers"
                className={`${
                  teamType === "Individual" ? "hidden" : "space-y-3 pt-2"
                }`}
              >
                <div className="text-xs text-sky-100/80 -mb-1">
                  Add your team member(s) below:
                </div>
                <div
                  id="member2"
                  className={`${
                    teamType === "Individual"
                      ? "hidden"
                      : "p-2 rounded-lg bg-black/10 text-white"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      name="member2Name"
                      id="member2Name"
                      className="block w-full rounded-md bg-white/10 border-white/10 px-3 py-1.5 text-white placeholder-gray-300 text-sm"
                      placeholder="Member 2 Name"
                    />
                    <input
                      name="member2Roll"
                      id="member2Roll"
                      className="block w-full rounded-md bg-white/10 border-white/10 px-3 py-1.5 text-white placeholder-gray-300 text-sm"
                      placeholder="Member 2 Roll No"
                    />
                  </div>
                </div>
                <div
                  id="member3"
                  className={`${
                    teamType === "Group"
                      ? "p-2 rounded-lg bg-black/10"
                      : "hidden"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      name="member3Name"
                      id="member3Name"
                      className="block w-full rounded-md bg-white/10 border-white/10 px-3 py-1.5 text-white placeholder-gray-300 text-sm"
                      placeholder="Member 3 Name"
                    />
                    <input
                      name="member3Roll"
                      id="member3Roll"
                      className="block w-full rounded-md bg-white/10 border-white/10 px-3 py-1.5 text-white placeholder-gray-300 text-sm"
                      placeholder="Member 3 Roll No"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-100/90">
                  Upload Your Idea 💡
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    id="qrfile"
                    name="qrfile"
                    type="file"
                    accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    aria-label="Upload file (pdf/ppt)"
                    title="Upload your idea (PDF / PPT only)"
                    ref={qrInputRef}
                    onChange={handleQrInputChange}
                    className="block text-sm text-sky-100"
                  />
                  <button
                    type="button"
                    id="clearQr"
                    onClick={clearQr}
                    className="px-3 py-1 bg-white/10 text-sm rounded"
                  >
                    Clear
                  </button>
                </div>
                <div id="qrPreview" className="mt-2 text-sm text-sky-200/80">
                  {qrPreviewHtml}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <button
                  id="submitBtn"
                  type="submit"
                  disabled={isSubmitting || hasSubmitted}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${
                    isSubmitting || hasSubmitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-400 active:scale-95"
                  } text-sky-900 font-semibold px-5 py-2 rounded-lg shadow-lg transition-transform`}
                >
                  {isSubmitting
                    ? "Submitting... "
                    : hasSubmitted
                    ? "Submitted"
                    : "Register"}
                </button>
                <div
                  id="status"
                  className={`text-sm mt-1 sm:mt-0 ${
                    statusError ? "text-red-400" : "text-sky-200/80"
                  }`}
                >
                  {status}
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* QR Modal */}
      {/* {showQrModal && (
        <div
          id="qrModal"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) setShowQrModal(false);
          }}
        >
          <div className="bg-white rounded-xl p-3 max-w-4xl max-h-[85vh] overflow-auto shadow-xl">
            <img
              id="qrModalImg"
              src={qrUrl}
              alt="Payment QR full"
              className="qr-crisp max-w-full h-auto block"
            />
            <div className="text-right mt-3 space-x-2">
              <a
                href={qrUrl}
                target="_blank"
                rel="noopener"
                className="px-3 py-1 rounded bg-cyan-500 text-sky-900 font-semibold shadow"
              >
                Open in new tab
              </a>
              <button
                id="closeQr"
                type="button"
                onClick={() => setShowQrModal(false)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
};

export default Registration;
