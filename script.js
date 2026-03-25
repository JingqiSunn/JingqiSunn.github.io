const filters = {
  venue: "all",
  year: "all",
};

const chips = document.querySelectorAll(".filter-chip");
const papers = document.querySelectorAll(".paper-card");
const emptyState = document.querySelector(".empty-state");
const filterToggle = document.querySelector(".filter-toggle");
const filterGroup = document.querySelector(".filter-group");

function applyFilters() {
  let visibleCount = 0;

  papers.forEach((paper) => {
    const matchesVenue =
      filters.venue === "all" || paper.dataset.venue === filters.venue;
    const matchesYear =
      filters.year === "all" || paper.dataset.year === filters.year;
    const isVisible = matchesVenue && matchesYear;

    paper.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const { filterGroup, filterValue } = chip.dataset;
    filters[filterGroup] = filterValue;

    chips.forEach((candidate) => {
      if (candidate.dataset.filterGroup === filterGroup) {
        candidate.classList.toggle(
          "is-active",
          candidate.dataset.filterValue === filterValue
        );
      }
    });

    applyFilters();
  });
});

if (filterToggle && filterGroup) {
  filterToggle.addEventListener("click", () => {
    const isHidden = filterGroup.hidden;
    filterGroup.hidden = !isHidden;
    filterToggle.setAttribute("aria-expanded", String(isHidden));
    filterToggle.textContent = isHidden ? "Hide filters" : "Show filters";
  });
}

applyFilters();
