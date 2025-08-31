export function navigateToSection(id?: string) {
  if (!id) return;
  const base = import.meta.env.BASE_URL || "/";
  const currentHash = window.location.hash || "";

  // If not on root hash, navigate to root first, then scroll after a short delay
  if (currentHash !== "#/" && currentHash !== "") {
    // use replace so history isn't cluttered
    window.location.hash = "#/";
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default navigateToSection;
