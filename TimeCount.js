const startDate = new Date("2025-02-26T16:00:00");

function updateTogetherSince() {
  const now = new Date();
  if (now < startDate) return;

  // --- months and remaining days  ---
  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  let tmp = new Date(startDate);
  tmp.setMonth(startDate.getMonth() + months);

  if (tmp > now) {
    months--;
    tmp.setMonth(tmp.getMonth() - 1);
  }

  const msAfterMonths = now - tmp;
  const days = Math.floor(msAfterMonths / (1000 * 60 * 60 * 24));

  const msAfterDays = msAfterMonths % (1000 * 60 * 60 * 24);
  const hours = Math.floor(msAfterDays / (1000 * 60 * 60));
  const mins = Math.floor((msAfterDays % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((msAfterDays % (1000 * 60)) / 1000);

  document.getElementById("monthsNum").textContent = months;
  document.getElementById("daysNum").textContent = days;
  document.getElementById("hoursNum").textContent = hours;
  document.getElementById("minsNum").textContent = mins;
  document.getElementById("secsNum").textContent = secs;
}

updateTogetherSince();
setInterval(updateTogetherSince, 1000);
