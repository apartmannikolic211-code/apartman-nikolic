/* =========================================================
   Apartman Nikolić — reusable range calendar widget
   Vanilla JS, no dependency. Select an arrival then a departure date.
   Every future date is selectable (see cahier des charges 6.2: the
   owner confirms real availability manually after receiving the email).

   Uses a single delegated click listener on the outer container
   (which is never destroyed) instead of one listener per day button,
   so clicks keep working reliably even though the day buttons
   themselves are torn down and rebuilt on every render().
   ========================================================= */

class RangeCalendar {
  /**
   * @param {Object} opts
   * @param {HTMLElement} opts.container
   * @param {(range: {start: Date|null, end: Date|null}) => void} opts.onChange
   */
  constructor(opts) {
    this.container = opts.container;
    this.onChange = opts.onChange || function () {};

    const today = new Date();
    this.viewYear = today.getFullYear();
    this.viewMonth = today.getMonth();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    this.start = null;
    this.end = null;

    this._boundLangChange = () => this.render();
    document.addEventListener("i18n:changed", this._boundLangChange);

    this._boundClick = (e) => this._handleContainerClick(e);
    this.container.addEventListener("click", this._boundClick);

    this.render();
  }

  reset() {
    this.start = null;
    this.end = null;
    this.render();
    this.onChange({ start: null, end: null });
  }

  destroy() {
    document.removeEventListener("i18n:changed", this._boundLangChange);
    this.container.removeEventListener("click", this._boundClick);
  }

  _isPast(date) { return date < this.today; }

  _isInRange(date) {
    if (!this.start || !this.end) return false;
    return date > this.start && date < this.end;
  }

  _handleContainerClick(e) {
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      if (navBtn.getAttribute("data-nav") === "prev") {
        this.viewMonth--;
        if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
      } else {
        this.viewMonth++;
        if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
      }
      this.render();
      return;
    }

    const dayBtn = e.target.closest(".calendar-day");
    if (!dayBtn || dayBtn.disabled || !dayBtn.dataset.date) return;
    const [y, m, d] = dayBtn.dataset.date.split("-").map(Number);
    this._handleDayClick(new Date(y, m - 1, d));
  }

  _handleDayClick(date) {
    if (this._isPast(date)) return;

    if (!this.start || (this.start && this.end)) {
      this.start = date;
      this.end = null;
    } else if (date <= this.start) {
      this.start = date;
      this.end = null;
    } else {
      this.end = date;
    }
    this.render();
    this.onChange({ start: this.start, end: this.end });
  }

  render() {
    const lang = getLang();
    const cal = t("bookingPage.calendar", lang);
    const c = this.container;
    c.innerHTML = "";

    const head = document.createElement("div");
    head.className = "calendar-head";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "calendar-nav-btn";
    prevBtn.innerHTML = "&larr;";
    prevBtn.setAttribute("data-nav", "prev");
    prevBtn.setAttribute("aria-label", cal.prevMonth);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "calendar-nav-btn";
    nextBtn.innerHTML = "&rarr;";
    nextBtn.setAttribute("data-nav", "next");
    nextBtn.setAttribute("aria-label", cal.nextMonth);

    const title = document.createElement("div");
    title.className = "calendar-head__title";
    title.textContent = cal.months[this.viewMonth] + " " + this.viewYear;

    head.append(prevBtn, title, nextBtn);
    c.appendChild(head);

    const weekdaysRow = document.createElement("div");
    weekdaysRow.className = "calendar-weekdays";
    cal.weekdays.forEach(function (wd) {
      const div = document.createElement("div");
      div.textContent = wd;
      weekdaysRow.appendChild(div);
    });
    c.appendChild(weekdaysRow);

    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    let startOffset = firstOfMonth.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement("div");
      empty.className = "calendar-day is-empty";
      grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.viewYear, this.viewMonth, day);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "calendar-day";
      btn.textContent = String(day);
      btn.dataset.date = RangeCalendar.toISO(date);

      const past = this._isPast(date);
      const isStart = this.start && date.getTime() === this.start.getTime();
      const isEnd = this.end && date.getTime() === this.end.getTime();
      const inRange = this._isInRange(date);

      btn.classList.add(past ? "is-past" : "is-available");
      if (isStart) btn.classList.add("is-selected-start");
      if (isEnd) btn.classList.add("is-selected-end");
      if (inRange) btn.classList.add("is-in-range");

      if (past) btn.disabled = true;

      grid.appendChild(btn);
    }

    c.appendChild(grid);

    const legend = document.createElement("div");
    legend.className = "calendar-legend";
    legend.innerHTML =
      '<span><span class="legend-dot legend-dot--available"></span>' + cal.legendAvailable + "</span>" +
      '<span><span class="legend-dot legend-dot--selected"></span>' + cal.legendSelected + "</span>";
    c.appendChild(legend);
  }

  static toISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }
}
